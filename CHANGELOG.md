## [1.1.3](https://github.com/ionic-team/capacitor-privacy-screen/compare/v1.1.2...v1.1.3) (2025-12-16)


### Bug Fixes

* Use latest-7 for 1.x docs ([#24](https://github.com/ionic-team/capacitor-privacy-screen/issues/24)) ([d67a5e7](https://github.com/ionic-team/capacitor-privacy-screen/commit/d67a5e7c64aa1adf09432c23dcf80ed075435d68))

## [1.1.2](https://github.com/ionic-team/capacitor-privacy-screen/compare/v1.1.1...v1.1.2) (2025-12-11)


### Bug Fixes

* **android:** deprecate preventScreenshots and make dialog more reliable ([a92d9bd](https://github.com/ionic-team/capacitor-privacy-screen/commit/a92d9bd6b46be99b1abb411ded49d0dc41fe0747))
* **ios:** use version instead of branch for SPM ([#10](https://github.com/ionic-team/capacitor-privacy-screen/issues/10)) ([ef847b0](https://github.com/ionic-team/capacitor-privacy-screen/commit/ef847b036bc1ca1b2a002ce84bc7ca815e810b29))

## [Unreleased]

### Bug Fixes

* **android:** more reliable handling of the privacy screen in different navigation modes.

### Deprecated

* **android:** `preventScreenshots` config option is now deprecated. FLAG_SECURE is automatically applied when privacy screen is enabled, providing screenshot prevention and app switcher protection. This option will be removed in a future major version. To control screenshot prevention per screen, enable/disable the plugin as needed on specific screens.

### Documentation

* **android:** Added comprehensive documentation for FLAG_SECURE behavior, including screenshot prevention, app switcher protection, and non-secure display restrictions
* **android:** Clarified live view protection: when FLAG_SECURE doesn't fully protect content (e.g., gesture navigation or live views that can persist for minutes), a temporary privacy screen overlay is displayed
* Added per-screen enable/disable example

## [1.1.1](https://github.com/ionic-team/capacitor-privacy-screen/compare/v1.1.0...v1.1.1) (2025-08-21)


### Bug Fixes

* export package.json to fix cap sync issues ([#6](https://github.com/ionic-team/capacitor-privacy-screen/issues/6)) ([19f4bf4](https://github.com/ionic-team/capacitor-privacy-screen/commit/19f4bf41f1b2e253c9911449662687ff0d992bef))

## 1.1.0

### Features
- Added `privacyModeOnActivityHidden` configuration option for Android

## 1.0.0

- Initial release
