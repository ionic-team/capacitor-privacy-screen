# @capacitor/privacy-screen

The Privacy Screen plugin provides functionality to prevent sensitive information from being visible in app switchers and when leaving an app.

## Install

```bash
npm install @capacitor/privacy-screen
npx cap sync
```

## API

<docgen-index>

* [`enable(...)`](#enable)
* [`disable()`](#disable)
* [`isEnabled()`](#isenabled)
* [Interfaces](#interfaces)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### enable(...)

```typescript
enable(config?: PrivacyScreenConfig | undefined) => Promise<{ success: boolean; }>
```

Enable privacy screen protection

| Param        | Type                                                                | Description                                           |
| ------------ | ------------------------------------------------------------------- | ----------------------------------------------------- |
| **`config`** | <code><a href="#privacyscreenconfig">PrivacyScreenConfig</a></code> | Optional configuration for platform-specific behavior |

**Returns:** <code>Promise&lt;{ success: boolean; }&gt;</code>

--------------------


### disable()

```typescript
disable() => Promise<{ success: boolean; }>
```

Disable privacy screen protection

**Returns:** <code>Promise&lt;{ success: boolean; }&gt;</code>

--------------------


### isEnabled()

```typescript
isEnabled() => Promise<{ enabled: boolean; }>
```

Check if privacy screen is currently enabled

**Returns:** <code>Promise&lt;{ enabled: boolean; }&gt;</code>

--------------------


### Interfaces


#### PrivacyScreenConfig

| Prop          | Type                                                       |
| ------------- | ---------------------------------------------------------- |
| **`android`** | <code>{ dimBackground?: boolean; }</code>                  |
| **`ios`**     | <code>{ blurEffect?: 'light' \| 'dark' \| 'none'; }</code> |

</docgen-api>
