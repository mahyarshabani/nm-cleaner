module.exports = {
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  ignorePatterns: ['app/**/*.js', 'karma.conf.js', 'dist/**/*'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  root: true,
  'env': {
    'browser': true,
    'amd': true,
    'node': true
  }
};
