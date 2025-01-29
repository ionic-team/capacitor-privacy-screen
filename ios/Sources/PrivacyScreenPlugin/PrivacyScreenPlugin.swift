import Foundation
import Capacitor
import UIKit

@objc(PrivacyScreenPlugin)
public class PrivacyScreenPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "PrivacyScreenPlugin"
    public let jsName = "PrivacyScreen"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "enable", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "disable", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "isEnabled", returnType: CAPPluginReturnPromise)
    ]

    private var isEnabled = false
    private var screenProtectionViewController: UIViewController?
    private var blurEffect: UIBlurEffect.Style?

    override public func load() {
        NotificationCenter.default.addObserver(
            self,
            selector: #selector(applicationDidBecomeActive),
            name: UIApplication.didBecomeActiveNotification,
            object: nil
        )

        NotificationCenter.default.addObserver(
            self,
            selector: #selector(applicationWillResignActive),
            name: UIApplication.willResignActiveNotification,
            object: nil
        )
    }

    @objc func enable(_ call: CAPPluginCall) {
        if let config = call.getObject("ios"),
           let blurEffectString = config["blurEffect"] as? String {
            switch blurEffectString {
            case "light":
                blurEffect = .light
            case "dark":
                blurEffect = .dark
            default:
                blurEffect = nil
            }
        }

        isEnabled = true
        call.resolve(["success": true])
    }

    @objc func disable(_ call: CAPPluginCall) {
        isEnabled = false
        unobscureScreen()
        call.resolve(["success": true])
    }

    @objc func isEnabled(_ call: CAPPluginCall) {
        call.resolve(["enabled": isEnabled])
    }

    private func obscureScreen() {
        guard let window = getKeyWindow(),
              var topViewController = window.rootViewController else {
            return
        }

        while let presentedVC = topViewController.presentedViewController {
            topViewController = presentedVC
        }

        if screenProtectionViewController == nil {
            let protectionVC = createProtectionViewController()
            topViewController.present(protectionVC, animated: false)
            screenProtectionViewController = protectionVC
        }
    }

    private func unobscureScreen() {
        screenProtectionViewController?.dismiss(animated: false)
        screenProtectionViewController = nil
    }

    private func createProtectionViewController() -> UIViewController {
        let viewController = UIViewController()
        viewController.modalPresentationStyle = .overFullScreen
        viewController.view.isUserInteractionEnabled = false

        if let blurEffect = blurEffect {
            let blurEffectView = UIVisualEffectView(effect: UIBlurEffect(style: blurEffect))
            blurEffectView.frame = UIScreen.main.bounds
            blurEffectView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
            viewController.view.addSubview(blurEffectView)
        } else {
            let contentView = UIView(frame: UIScreen.main.bounds)
            contentView.autoresizingMask = [.flexibleWidth, .flexibleHeight]

            if let launchImage = UIImage(named: "LaunchImage") ?? UIImage(named: "Splash") {
                let imageView = UIImageView(image: launchImage)
                imageView.frame = contentView.bounds
                imageView.contentMode = .scaleAspectFill
                imageView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
                contentView.addSubview(imageView)
            } else {
                if let launchStoryboard = Bundle.main.object(forInfoDictionaryKey: "UILaunchStoryboardName") as? String,
                   let launchVC = UIStoryboard(name: launchStoryboard, bundle: nil).instantiateInitialViewController() {
                    contentView.backgroundColor = launchVC.view.backgroundColor
                } else {
                    contentView.backgroundColor = .white
                }
            }

            viewController.view = contentView
        }

        return viewController
    }

    private func getKeyWindow() -> UIWindow? {
        return UIApplication.shared.connectedScenes
            .filter { $0.activationState == .foregroundActive || $0.activationState == .foregroundInactive }
            .compactMap { $0 as? UIWindowScene }
            .first?
            .windows
            .first { $0.isKeyWindow }
    }

    @objc private func applicationDidBecomeActive(_ notification: NSNotification) {
        unobscureScreen()
    }

    @objc private func applicationWillResignActive(_ notification: NSNotification) {
        if isEnabled {
            obscureScreen()
        }
    }

    deinit {
        NotificationCenter.default.removeObserver(self)
    }
}
