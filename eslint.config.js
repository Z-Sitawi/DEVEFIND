import pluginJs from '@eslint/js';

export default [
  {
    env: {
      node: true,
      es2021: true,
    },
    extends: [
      'eslint:recommended',
    ],
    parserOptions: {
      ecmaVersion: 12,
    },
    rules: {
      semi: ['warn', 'always'], // Show a warning if a semicolon is missing
      'eol-last': ['warn', 'always'], // Show a warning if there is no newline at the end of the file
      indent: ['warn', 2], // Enforce 2-space indentation and show a warning if not followed
      'no-console': 'off',
      'no-undef': 'off',
    },
  },
  pluginJs.configs.recommended,
];
