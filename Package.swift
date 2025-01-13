// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "CapacitorPrivacyScreen",
    platforms: [.iOS(.v13)],
    products: [
        .library(
            name: "CapacitorPrivacyScreen",
            targets: ["PrivacyScreenPluginPlugin"])
    ],
    dependencies: [
        .package(url: "https://github.com/ionic-team/capacitor-swift-pm.git", branch: "main")
    ],
    targets: [
        .target(
            name: "PrivacyScreenPluginPlugin",
            dependencies: [
                .product(name: "Capacitor", package: "capacitor-swift-pm"),
                .product(name: "Cordova", package: "capacitor-swift-pm")
            ],
            path: "ios/Sources/PrivacyScreenPluginPlugin"),
        .testTarget(
            name: "PrivacyScreenPluginPluginTests",
            dependencies: ["PrivacyScreenPluginPlugin"],
            path: "ios/Tests/PrivacyScreenPluginPluginTests")
    ]
)
