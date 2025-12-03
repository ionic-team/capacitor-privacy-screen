/* eslint-disable no-unused-vars */
import { WebPlugin } from '@capacitor/core';
import type { PrivacyScreenConfig, PrivacyScreenPlugin } from './definitions';

export class PrivacyScreenWeb extends WebPlugin implements PrivacyScreenPlugin {
  private enabled: boolean = false;

  async enable(_config?: PrivacyScreenConfig): Promise<{ success: boolean }> {
    this.enabled = true;
    console.warn('Privacy Screen protection is not available on web platforms');
    return { success: false };
  }

  async disable(): Promise<{ success: boolean }> {
    this.enabled = false;
    console.warn('Privacy Screen protection is not available on web platforms');
    return { success: true };
  }

  async isEnabled(): Promise<{ enabled: boolean }> {
    return {
      enabled: this.enabled,
    };
  }
}
