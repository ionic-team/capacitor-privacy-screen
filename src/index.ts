import { registerPlugin } from '@capacitor/core';

import type { PrivacyScreenPluginPlugin } from './definitions';

const PrivacyScreenPlugin = registerPlugin<PrivacyScreenPluginPlugin>('PrivacyScreenPlugin', {
  web: () => import('./web').then((m) => new m.PrivacyScreenPluginWeb()),
});

export * from './definitions';
export { PrivacyScreenPlugin };
