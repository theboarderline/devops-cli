module.exports = {
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:react-hooks/recommended'
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['babel'],
  // parserOptions: {
  //   babelOptions: {
  //     configFile: './.babelrc',
  //   },
  // },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    }
  },
  ignorePatterns: ['src/reportWebVitals.ts'],
  rules: {
    quotes: ['error', 'single'],
    '@typescript-eslint/no-explicit-any': ['off'],
    'no-use-before-define': ['off'],
    'prettier/prettier': [
      'error',
      { singleQuote: true, trailingComma: 'none' }
    ],
    'import/extensions': ['off'],
    'comma-dangle': ['off']
  }
};
