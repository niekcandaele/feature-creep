module.exports = {
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: [
    'react-hooks',
    'react'
  ],
  settings: {
    react: {
      version: 'detect'
    }
  },
  globals: {
    '__API__': 'readonly',
    'mountWithRouterAndTheme': 'readonly',
    'mount': 'readonly'
  },
  env: {
    'browser': true,
    'node': true,
    'jest': true,
    'es6': true
  },
  rules: {
    'arrow-body-style': ['error', 'as-needed'],
    'arrow-spacing': 2,
    'brace-style': [2, '1tbs', { 'allowSingleLine': true }],
    'camelcase': 2,
    'comma-dangle': [2, {
      'arrays': 'never',
      'objects': 'never',
      'imports': 'never',
      'exports': 'never',
      'functions': 'never'
    }],
    'eol-last': 2,
    'eqeqeq': 2,
    'indent': [2, 2, { 'SwitchCase': 1 }],
    'key-spacing': 0,
    'keyword-spacing': 2,
    'linebreak-style': [2, 'unix'],
    'no-console': 0,
    'no-multi-spaces': 2,
    'no-multiple-empty-lines': [2, { 'max': 1, 'maxEOF': 0, 'maxBOF': 0 }],
    'no-return-assign': 2,
    'no-trailing-spaces': 2,
    'no-var': 2,
    'no-void': 2,
    'object-curly-spacing': [2, 'always'],
    'padded-blocks': [2, 'never'],
    'prefer-arrow-callback': 2,
    'prefer-const': 2,
    'quotes': [2, 'single'],
    'semi': [2, 'always'],
    'space-before-function-paren': [2, 'never'],
    'space-in-parens': [2, 'never'],
    'space-infix-ops': [2, { 'int32Hint': true }],
    'strict': 0,

    'react-hooks/exhaustive-deps': 0,
    'react-hooks/rules-of-hooks': 2,

    'jsx-quotes': [2, 'prefer-double'],
    'react/jsx-closing-bracket-location': [2, {
      'nonEmpty': 'after-props',
      'selfClosing': 'after-props'
    }],
    'react/no-array-index-key': 2,
    'react/jsx-curly-spacing': 2,
    'react/jsx-first-prop-new-line': [2, 'multiline'],
    'react/jsx-no-duplicate-props': 2,
    'react/jsx-sort-default-props': 2,
    'react/jsx-tag-spacing': [2, {
      'beforeSelfClosing': 'always'
    }],
    'react/react-in-jsx-scope': 0,
    'react/jsx-sort-props': [2, { 'ignoreCase': true }],
    'react/jsx-uses-react': 2,
    'react/jsx-uses-vars': 2,
    'react/jsx-wrap-multilines': [2, { 'return': 'parens-new-line' }],
    'react/prefer-stateless-function': 2,
    'react/prop-types': 2,
    'react/sort-comp': [1, {
      'order': ['lifecycle', 'render', 'static-methods', 'everything-else']
    }],
    'react/sort-prop-types': [2, { 'ignoreCase': true }],
    'react/display-name': 0
  }
};
