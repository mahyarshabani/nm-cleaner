module.exports = {
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  overrides: [
    {
      parser: "@angular-eslint/template-parser",
      plugins: ["@angular-eslint/eslint-plugin-template"],
      rules: {
        "@angular-eslint/template/no-inline-styles": [
          "error",
          {
            allowNgStyle: true,
          },
        ],
      },
      files: "**/*.html",
      excludedFiles: "index.html",
    },
  ],
  root: true,
  env: {
    browser: true,
    amd: true,
    node: true,
  },
};
