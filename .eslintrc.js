module.exports = {
  env: {
    node: true,
    es2021: true,
    jest: true
  },
  extends: [
    'standard',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint'
  ],
  rules: {
    indent: 'off',
    'no-tabs': 'off',
    '@typescript-eslint/indent': ['error', 2],
    semi: ['error', 'never'],
    '@typescript-eslint/semi': ['error', 'never'],
    'no-unexpected-multiline': 'error',
    '@typescript-eslint/member-delimiter-style': [
      'error',
      {
        multiline: {
          delimiter: 'none',
          requireLast: true
        },
        singleline: {
          delimiter: 'semi',
          requireLast: true
        }
      }
    ]
  },
  ignorePatterns: ['src/**/*.js', 'src/**/*.d.ts']
}
