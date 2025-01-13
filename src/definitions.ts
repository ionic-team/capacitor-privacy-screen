export interface PrivacyScreenPluginPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
}
