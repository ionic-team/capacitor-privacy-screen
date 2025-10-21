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
