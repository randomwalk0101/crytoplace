import js from '@eslint/js';
import globals from 'globals';

// --- 导入你新安装的插件 ---
import reactPlugin from 'eslint-plugin-react';
import importPlugin from 'eslint-plugin-import';
// -------------------------

import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['dist', 'node_modules']), // 建议也忽略 node_modules
  {
    files: ['**/*.{js,jsx}'],
    // --- 1. 添加插件到 extends 和 plugins ---
    extends: [
      js.configs.recommended,
      reactPlugin.configs.recommended,       // <-- 添加：核心 React 规则
      importPlugin.configs.recommended,      // <-- 添加：核心 Import 规则
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    plugins: {
      'react': reactPlugin,
      'import': importPlugin,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    // -------------------------------------

    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },

    // --- 2. 添加 settings (非常重要) ---
    settings: {
      'react': {
        'version': 'detect', // 自动检测你项目中的 React 版本
      },
      'import/resolver': {
        'node': {
          'extensions': ['.js', '.jsx'], // 帮助 import 插件识别 .jsx 文件
        },
      },
    },
    // -----------------------------------

    // --- 3. 添加你需要的规则覆盖 ---
    rules: {
      'no-unused-vars': ['warn', { varsIgnorePattern: '^[A-Z_]' }], // 建议改成 warn
      'react/react-in-jsx-scope': 'off', // 现代 React (Vite) 不需要
      'react/prop-types': 'off', // 如果你不用 prop-types，可以关掉
      'react/jsx-filename-extension': ['warn', { 'extensions': ['.js', '.jsx'] }],
    },
    // ---------------------------------
  },
]);