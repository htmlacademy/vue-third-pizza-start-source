/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: "latest",
    sourceType: "module",
    extraFileExtensions: [".vue"],
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "plugin:vue/vue3-recommended",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "@vue/eslint-config-prettier",
  ],
  env: {
    "vue/setup-compiler-macros": true,
  },
  overrides: [
    {
      files: ["*.cjs"],
      env: { node: true },
      rules: {
        "@typescript-eslint/no-require-imports": "off",
      },
    },
  ],
};
