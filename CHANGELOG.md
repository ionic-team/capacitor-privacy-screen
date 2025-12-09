# [2.0.0](https://github.com/ionic-team/capacitor-privacy-screen/compare/v1.1.1...v2.0.0) (2025-12-08)


### Bug Fixes

* **android:** deprecate preventScreenshots and make dialog more reliable ([a92d9bd](https://github.com/ionic-team/capacitor-privacy-screen/commit/a92d9bd6b46be99b1abb411ded49d0dc41fe0747))
* **android:** replace kotlinOptions to support Kotlin 2.2.0 ([359e5f3](https://github.com/ionic-team/capacitor-privacy-screen/commit/359e5f3496ebdf571b03628b4c0d07ef617b5e69))
* **android:** use 'propName = value' assignment syntax in build.gradle files ([049f980](https://github.com/ionic-team/capacitor-privacy-screen/commit/049f980527ed17bd1b63d049477cc281850dacb8))
* **ios:** use version instead of branch for SPM ([#10](https://github.com/ionic-team/capacitor-privacy-screen/issues/10)) ([ef847b0](https://github.com/ionic-team/capacitor-privacy-screen/commit/ef847b036bc1ca1b2a002ce84bc7ca815e810b29))


### Features

* Capacitor 8 support ([bd15f56](https://github.com/ionic-team/capacitor-privacy-screen/commit/bd15f56817d4aa42d10c6ffeb35ae09094e432ff))


### Deprecated

* **android:** `preventScreenshots` config option is now deprecated. FLAG_SECURE is automatically applied when privacy screen is enabled, providing screenshot prevention and app switcher protection. This option will be removed in a future major version. To control screenshot prevention per screen, enable/disable the plugin as needed on specific screens.


### Documentation

* **android:** Added comprehensive documentation for FLAG_SECURE behavior, including screenshot prevention, app switcher protection, and non-secure display restrictions
* **android:** Clarified live view protection: when FLAG_SECURE doesn't fully protect content (e.g., gesture navigation or live views that can persist for minutes), a temporary privacy screen overlay is displayed
* Added per-screen enable/disable example


### BREAKING CHANGES

* Capacitor major version update requires major version update on the plugin.

# [2.0.0-next.5](https://github.com/ionic-team/capacitor-privacy-screen/compare/v2.0.0-next.4...v2.0.0-next.5) (2025-11-17)


* **android:** Update gradle dependencies to latest versions
* **ios:** Minor updates to Package.swift

# [2.0.0-next.4](https://github.com/ionic-team/capacitor-privacy-screen/compare/v2.0.0-next.3...v2.0.0-next.4) (2025-11-10)


### Bug Fixes

* **android:** use 'propName = value' assignment syntax in build.gradle files ([049f980](https://github.com/ionic-team/capacitor-privacy-screen/commit/049f980527ed17bd1b63d049477cc281850dacb8))

# [2.0.0-next.3](https://github.com/ionic-team/capacitor-privacy-screen/compare/v2.0.0-next.2...v2.0.0-next.3) (2025-10-28)


### Bug Fixes

* **ios:** use version instead of branch for SPM ([#10](https://github.com/ionic-team/capacitor-privacy-screen/issues/10)) ([ef847b0](https://github.com/ionic-team/capacitor-privacy-screen/commit/ef847b036bc1ca1b2a002ce84bc7ca815e810b29))

# [2.0.0-next.2](https://github.com/ionic-team/capacitor-privacy-screen/compare/v2.0.0-next.1...v2.0.0-next.2) (2025-10-15)


### Bug Fixes

* **android:** replace kotlinOptions to support Kotlin 2.2.0 ([359e5f3](https://github.com/ionic-team/capacitor-privacy-screen/commit/359e5f3496ebdf571b03628b4c0d07ef617b5e69))

# [2.0.0-next.1](https://github.com/ionic-team/capacitor-privacy-screen/compare/v1.1.1...v2.0.0-next.1) (2025-09-09)


### Features

* Capacitor 8 support ([bd15f56](https://github.com/ionic-team/capacitor-privacy-screen/commit/bd15f56817d4aa42d10c6ffeb35ae09094e432ff))


### BREAKING CHANGES

* Capacitor major version update requires major version update on the plugin.

## [1.1.1](https://github.com/ionic-team/capacitor-privacy-screen/compare/v1.1.0...v1.1.1) (2025-08-21)


### Bug Fixes

* export package.json to fix cap sync issues ([#6](https://github.com/ionic-team/capacitor-privacy-screen/issues/6)) ([19f4bf4](https://github.com/ionic-team/capacitor-privacy-screen/commit/19f4bf41f1b2e253c9911449662687ff0d992bef))

## 1.1.0

### Features
- Added `privacyModeOnActivityHidden` configuration option for Android

## 1.0.0

- Initial release
