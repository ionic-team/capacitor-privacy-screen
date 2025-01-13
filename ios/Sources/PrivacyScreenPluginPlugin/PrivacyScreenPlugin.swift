import Foundation

@objc public class PrivacyScreenPlugin: NSObject {
    @objc public func echo(_ value: String) -> String {
        print(value)
        return value
    }
}
