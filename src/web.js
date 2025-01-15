import { WebPlugin } from '@capacitor/core';
export class PrivacyScreenWeb extends WebPlugin {
  constructor() {
    super(...arguments);
    this.enabled = false;
  }
  async enable(_config) {
    this.enabled = true;
    console.warn('Privacy Screen protection is not available on web platforms');
    return { success: false };
  }
  async disable() {
    this.enabled = false;
    console.warn('Privacy Screen protection is not available on web platforms');
    return { success: false };
  }
  async isEnabled() {
    return {
      enabled: this.enabled,
    };
  }
}
