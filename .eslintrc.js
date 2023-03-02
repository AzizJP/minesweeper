module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:jsx-a11y/recommended',
    'prettier',
    'airbnb-typescript',
    'plugin:import/errors',
    'plugin:import/typescript',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['react', 'react-hooks', 'import', '@typescript-eslint', 'prettier'],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    '@next/next/no-html-link-for-pages': [0],

    'prettier/prettier': [2],

    '@typescript-eslint/no-unused-vars': [
      2,
      {
        // args: 'after-used',
        // ignoreRestSiblings: true,
        argsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/no-explicit-any': [2],
    '@typescript-eslint/array-type': [
      2,
      {
        default: 'generic',
      },
    ],

    'import/order': [
      2,
      {
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        'newlines-between': 'always-and-inside-groups',
      },
    ],
    'import/no-unresolved': [2],
    'import/no-cycle': [2],

    'quote-props': ['error', 'consistent'],

    '@typescript-eslint/dot-notation': 'off',

    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: 'react',
            importNames: ['default'],
            message: "Dont use 'import React from 'react''.",
          },
          {
            name: 'antd',
            importNames: ['Button', 'Tag'],
            message: 'Dont use this component from antd.',
          },
        ],
      },
    ],

    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',

    'react/jsx-boolean-value': [2],
    'react/jsx-curly-brace-presence': [2],
    'react/jsx-props-no-spreading': [0],
    'react/react-in-jsx-scope': [0],
    'react/prop-types': [0],
    'react/display-name': [0],
    'react/self-closing-comp': [2],

    'no-console': [2],
    'no-empty': [2],
    'no-empty-pattern': [2],
    'no-multiple-empty-lines': [2, {max: 1}],
    'prefer-template': [2],
    'max-lines': [1, {max: 300}],
  },
};
