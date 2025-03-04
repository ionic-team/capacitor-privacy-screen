package com.capacitorjs.plugins.privacyscreen

import android.annotation.SuppressLint
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.os.Build
import android.view.WindowManager
import androidx.appcompat.app.AppCompatActivity
import com.getcapacitor.JSObject
import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.CapacitorPlugin

private const val ACTION_CLOSE_SYSTEM_DIALOGS = "android.intent.action.CLOSE_SYSTEM_DIALOGS"
private const val SYSTEM_DIALOG_REASON_KEY = "reason"
private const val SYSTEM_DIALOG_REASON_RECENT_APPS = "recentapps"
private const val SYSTEM_DIALOG_REASON_RECENT_APPS_XIAOMI = "fs_gesture"

enum class PrivacyMode {
    NONE,
    DIM,
    SPLASH
}

@CapacitorPlugin(name = "PrivacyScreen")
class PrivacyScreenPlugin : Plugin() {
    private var privacyScreenEnabled = false
    private var preventScreenshots = false
    private var dimBackground = false
    private var privacyModeOnActivityHidden = PrivacyMode.NONE
    private var dialog: PrivacyScreenDialog? = null

    private val recentAppsReceiver = object : BroadcastReceiver() {
        override fun onReceive(context: Context, intent: Intent) {
            if ((Build.VERSION.SDK_INT >= 31 || usesGestureNavigation(context)) &&
                ACTION_CLOSE_SYSTEM_DIALOGS == intent.action) {
                val reason = intent.getStringExtra(SYSTEM_DIALOG_REASON_KEY)
                if (reason != null) {
                    when (reason) {
                        SYSTEM_DIALOG_REASON_RECENT_APPS,
                        SYSTEM_DIALOG_REASON_RECENT_APPS_XIAOMI -> onRecentAppsTriggered(true)
                    }
                }
            }
        }
    }

    @SuppressLint("UnspecifiedRegisterReceiverFlag")
    override fun load() {
        if (Build.VERSION.SDK_INT >= 33) {
            context.registerReceiver(recentAppsReceiver,
                IntentFilter(ACTION_CLOSE_SYSTEM_DIALOGS), Context.RECEIVER_NOT_EXPORTED)
        } else {
            context.registerReceiver(recentAppsReceiver,
                IntentFilter(ACTION_CLOSE_SYSTEM_DIALOGS))
        }
    }

    @PluginMethod
    fun enable(call: PluginCall) {
        try {
            val config = call.getObject("android")
            dimBackground = config?.optBoolean("dimBackground") ?: false
            preventScreenshots = config?.optBoolean("preventScreenshots") ?: false
            privacyModeOnActivityHidden = when (config?.optString("privacyModeOnActivityHidden", "none")) {
                "dim" -> PrivacyMode.DIM
                "splash" -> PrivacyMode.SPLASH
                else -> PrivacyMode.NONE
            }

            activity.runOnUiThread {
                if (preventScreenshots) {
                    activity.window.addFlags(WindowManager.LayoutParams.FLAG_SECURE)
                } else {
                    activity.window.clearFlags(WindowManager.LayoutParams.FLAG_SECURE)
                }
                privacyScreenEnabled = true
                dialog = PrivacyScreenDialog(activity, dimBackground)

                val ret = JSObject()
                ret.put("success", true)
                call.resolve(ret)
            }
        } catch (e: Exception) {
            val ret = JSObject()
            ret.put("success", false)
            call.resolve(ret)
        }
    }

    @PluginMethod
    fun disable(call: PluginCall) {
        privacyScreenEnabled = false
        preventScreenshots = false
        privacyModeOnActivityHidden = PrivacyMode.NONE
        activity.runOnUiThread {
            activity.window.clearFlags(WindowManager.LayoutParams.FLAG_SECURE)
            dialog?.dismiss()
            dialog = null
        }
        val ret = JSObject()
        ret.put("success", true)
        call.resolve(ret)
    }

    @PluginMethod
    fun isEnabled(call: PluginCall) {
        val ret = JSObject()
        ret.put("enabled", privacyScreenEnabled)
        call.resolve(ret)
    }

    override fun handleOnResume() {
        super.handleOnResume()
        onRecentAppsTriggered(false)
        if (preventScreenshots) {
            activity.window.addFlags(WindowManager.LayoutParams.FLAG_SECURE)
        } else {
            activity.window.clearFlags(WindowManager.LayoutParams.FLAG_SECURE)
        }
    }

    override fun handleOnPause() {
        super.handleOnPause()
        if (privacyScreenEnabled) {
            activity.window.addFlags(WindowManager.LayoutParams.FLAG_SECURE)
            when (privacyModeOnActivityHidden) {
                PrivacyMode.DIM -> showPrivacyDialog(true)
                PrivacyMode.SPLASH -> showPrivacyDialog(false)
                PrivacyMode.NONE -> {}
            }
        }
    }

    private fun onRecentAppsTriggered(isRecentAppsOpen: Boolean) {
        if (privacyScreenEnabled && isRecentAppsOpen) {
            showPrivacyDialog(dimBackground)
        } else {
            dialog?.dismiss()
            dialog = null
        }
    }

    private fun showPrivacyDialog(dim: Boolean) {
        if (dialog != null && isDialogViewAttachedToWindowManager()) {
            dialog?.dismiss()
            dialog = null
        }
        context.let { context ->
            if (context is AppCompatActivity &&
                !context.isFinishing &&
                dialog?.isShowing != true &&
                !isDialogViewAttachedToWindowManager()) {
                dialog = PrivacyScreenDialog(context, dim)
                dialog?.show()
            }
        }
    }

    private fun isDialogViewAttachedToWindowManager(): Boolean {
        return dialog?.window?.decorView?.parent != null
    }

    @SuppressLint("DiscouragedApi")
    private fun usesGestureNavigation(context: Context): Boolean {
        val resources = context.resources
        val resourceId = resources.getIdentifier("config_navBarInteractionMode", "integer", "android")
        return resourceId > 0 && resources.getInteger(resourceId) == 2
    }

    override fun handleOnDestroy() {
        dialog?.dismiss()
        dialog = null
        context.unregisterReceiver(recentAppsReceiver)
        super.handleOnDestroy()
    }
}