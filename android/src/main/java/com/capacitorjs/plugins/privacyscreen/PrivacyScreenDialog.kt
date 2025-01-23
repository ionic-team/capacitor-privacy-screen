package com.capacitorjs.plugins.privacyscreen

import android.annotation.SuppressLint
import android.app.Dialog
import android.content.Context
import android.os.Handler
import android.os.Looper
import android.view.MotionEvent
import android.view.View
import android.view.Window
import android.view.WindowManager

@SuppressLint("DiscouragedApi")
class PrivacyScreenDialog(
    context: Context,
    private val dimBackground: Boolean
) : Dialog(context, android.R.style.Theme_Black) {

    init {
        requestWindowFeature(Window.FEATURE_NO_TITLE)
        window?.apply {
            if (dimBackground) {
                addFlags(WindowManager.LayoutParams.FLAG_DIM_BEHIND)
                setDimAmount(0.9f)
            } else {
                try {
                    val resourceId = context.resources.getIdentifier("splash", "drawable", context.packageName)
                    val themeId = context.resources.getIdentifier("Splash", "style", context.packageName)

                    context.setTheme(themeId)
                    decorView.findViewById<View>(android.R.id.content).setBackgroundResource(resourceId)
                } catch (e: Exception) {
                    // Fallback to dim if splash screen not available
                    addFlags(WindowManager.LayoutParams.FLAG_DIM_BEHIND)
                    setDimAmount(0.9f)
                }
            }
        }
    }

    override fun dispatchTouchEvent(ev: MotionEvent): Boolean {
        this.dismiss()
        return super.dispatchTouchEvent(ev)
    }

    override fun onWindowFocusChanged(hasFocus: Boolean) {
        this.hide()
        // Dismiss must run on next loop to avoid race condition
        Handler(Looper.getMainLooper()).postDelayed({
            this.dismiss()
        }, 0)
    }
}