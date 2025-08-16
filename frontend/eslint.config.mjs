import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ['next/core-web-vitals', 'next/typescript', 'prettier'],
    rules: {
      ...compat.config.rules,
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      'prefer-rest-params': 'warn',
    },
  }),
  eslintConfigPrettier,
  eslintPluginPrettierRecommended,
];

export default eslintConfig;
