const ionic = require('@ionic/eslint-config/recommended');

module.exports = [
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/.build/**',
      '**/example-app/**',
      '**/*.js',
      '**/*.mjs',
      '**/*.cjs',
    ],
  },
  ...ionic,
];
