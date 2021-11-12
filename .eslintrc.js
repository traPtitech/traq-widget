module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ],
  overrides: [
    {
      // 直下のファイル
      files: ['*.{js,mjs}'],
      excludedFiles: ['*/**/*.{js,mjs}'],
      env: {
        node: true
      },
      rules: {
        '@typescript-eslint/no-var-requires': 'off'
      }
    }
  ],
  reportUnusedDisableDirectives: true
}
