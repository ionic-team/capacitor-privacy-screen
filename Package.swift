// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "CapacitorPrivacyScreen",
    platforms: [.iOS(.v16)],
    products: [
        .library(
            name: "CapacitorPrivacyScreen",
            targets: ["PrivacyScreenPlugin"])
    ],
    dependencies: [
        .package(url: "https://github.com/ionic-team/capacitor-swift-pm.git", from: "9.0.0-alpha.5")
    ],
    targets: [
        .target(
            name: "PrivacyScreenPlugin",
            dependencies: [
                .product(name: "Capacitor", package: "capacitor-swift-pm")
            ],
            path: "ios/Sources/PrivacyScreenPlugin")
    ]
)
