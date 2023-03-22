module.exports = require('@backstage/cli/config/eslint-factory')(__dirname, {
  extends: ['plugin:prettier/recommended'],
  rules: {
    'react-hooks/rules-of-hooks': [
      'error',
      {
        additionalHooks: '(useAsync|useAsync)',
      },
    ],
    'react-hooks/exhaustive-deps': [
      'error',
      {
        additionalHooks: '(useAsync|useAsyncFn)',
      },
    ],
    'prettier/prettier': [
      'error',
      {
        printWidth: 120,
        singleQuote: true,
        semi: true,
        tabWidth: 2,
        trailingComma: 'all',
      },
    ],
  },
});
