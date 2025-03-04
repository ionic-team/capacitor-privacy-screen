export interface PrivacyScreenConfig {
  android?: {
    /**
     * Controls how the app appears when the privacy screen is being displayed.
     * When true, the app will be dimmed to obscure its content.
     * When false, the app will show the splash screen if available, otherwise falling back to dimming.
     * Note: This only applies to the app switcher privacy screen. For activity background behavior, see privacyModeOnActivityHidden.
     * @default false
     */
    dimBackground?: boolean;

    /**
     * Controls whether screenshots can be taken while the app is in use.
     * This uses `FLAG_SECURE` so it will also prevent the window from being displayed on a non-secure display, such as a TV or projector.`
     * Note: Privacy screen protection in app switcher is always enabled when the plugin is enabled.
     * @default false
     */
    preventScreenshots?: boolean;

    /**
     * Controls how the app appears when the activity goes to background (e.g. when showing system dialogs like a biometric prompt activity).
     * - 'none': No privacy screen is shown
     * - 'dim': The app will be dimmed to obscure its content
     * - 'splash': The app will show the splash screen if available, otherwise falling back to dimming
     * @default 'none'
     */
    privacyModeOnActivityHidden?: 'none' | 'dim' | 'splash';
  };
  ios?: {
    /**
     * Controls how the app appears when the privacy screen is being displayed.
     * When 'light' or 'dark', the app will be blurred to obscure its content.
     * When 'none', the app will show the splash screen if available.
     * @default 'none'
     */
    blurEffect?: 'light' | 'dark' | 'none';
  };
}

export interface PrivacyScreenPlugin {
  /**
   * Enable privacy screen protection
   * @param config Optional configuration for platform-specific behavior
   * @returns Object containing the success state
   */
  enable(config?: PrivacyScreenConfig): Promise<{ success: boolean }>;

  /**
   * Disable privacy screen protection
   * @returns Object containing the success state
   */
  disable(): Promise<{ success: boolean }>;

  /**
   * Check if privacy screen is currently enabled
   * @returns Object containing the current enabled state
   */
  isEnabled(): Promise<{ enabled: boolean }>;
}
