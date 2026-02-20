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
    private var privacyWindow: UIWindow?
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
        blurEffect = nil

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
        DispatchQueue.main.async { [weak self] in
            self?.unobscureScreen()
        }
        call.resolve(["success": true])
    }

    @objc func isEnabled(_ call: CAPPluginCall) {
        call.resolve(["enabled": isEnabled])
    }

    private func obscureScreen() {
        guard privacyWindow == nil,
              let windowScene = getWindowScene() else {
            return
        }

        let window = UIWindow(windowScene: windowScene)
        window.windowLevel = .alert + 1
        window.rootViewController = UIViewController()
        window.rootViewController?.view.isUserInteractionEnabled = false

        let contentView = createProtectionView()
        contentView.frame = window.bounds
        contentView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        window.rootViewController?.view.addSubview(contentView)

        window.isHidden = false
        privacyWindow = window
    }

    private func unobscureScreen() {
        privacyWindow?.isHidden = true
        privacyWindow = nil
    }

    private func createProtectionView() -> UIView {
        if let blurEffect = blurEffect {
            let container = UIView()

            let blurEffectView = UIVisualEffectView(effect: UIBlurEffect(style: blurEffect))
            blurEffectView.translatesAutoresizingMaskIntoConstraints = false
            container.addSubview(blurEffectView)
            NSLayoutConstraint.activate([
                blurEffectView.topAnchor.constraint(equalTo: container.topAnchor),
                blurEffectView.bottomAnchor.constraint(equalTo: container.bottomAnchor),
                blurEffectView.leadingAnchor.constraint(equalTo: container.leadingAnchor),
                blurEffectView.trailingAnchor.constraint(equalTo: container.trailingAnchor)
            ])

            return container
        }

        let contentView = UIView()

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

        return contentView
    }

    private func getWindowScene() -> UIWindowScene? {
        return UIApplication.shared.connectedScenes
            .compactMap { $0 as? UIWindowScene }
            .first
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
