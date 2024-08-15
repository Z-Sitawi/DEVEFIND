import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
  {
    env: {
    node: true,
    es2021: true
    },
    extends: [
      'eslint:recommended'
    ],
    parserOptions: {
      ecmaVersion: 12
    },
    rules: {
      semi: ['error', 'always'],
      'eol-last': ['error', 'always'],
      'no-console': 'off',
      'no-undef': 'off'
    }
  },
  pluginJs.configs.recommended
];
