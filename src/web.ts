import { WebPlugin } from '@capacitor/core';

import type { PrivacyScreenPluginPlugin } from './definitions';

export class PrivacyScreenPluginWeb extends WebPlugin implements PrivacyScreenPluginPlugin {
  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }
}
