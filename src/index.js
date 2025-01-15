import { registerPlugin } from '@capacitor/core';
const PrivacyScreen = registerPlugin('PrivacyScreen', {
  web: () => import('./web').then((m) => new m.PrivacyScreenWeb()),
});
export * from './definitions';
export { PrivacyScreen };
