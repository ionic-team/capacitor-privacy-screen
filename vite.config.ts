import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [dts()],
  build: {
    outDir: 'dist',
    target: 'es2020',
    lib: {
      entry: './src/index.ts',
      name: 'CapacitorPrivacyScreen',
      fileName: (format) => `plugin.${format === 'es' ? 'mjs' : format === 'cjs' ? 'cjs' : 'js'}`,
      formats: ['es', 'cjs', 'umd'],
    },
    rollupOptions: {
      external: ['@capacitor/core'],
      output: {
        globals: {
          '@capacitor/core': 'capacitorExports',
        },
      },
    },
  },
});
