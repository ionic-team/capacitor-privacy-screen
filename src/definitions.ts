export interface PrivacyScreenConfig {
  android?: {
    /**
     * Controls how the app appears when the privacy screen is being displayed.
     * When true, the app will be dimmed to obscure its content.
     * When false, the app will show the splash screen if available, otherwise falling back to dimming.
     * @default false
     */
    dimBackground?: boolean;
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
