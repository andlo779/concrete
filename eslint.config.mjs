import unusedImportsPlugin from "eslint-plugin-unused-imports";
import tslint from "typescript-eslint";

export default
  tslint.config({
    files: ["**/*.ts"],
    languageOptions: {
      parser: tslint.parser,
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
        // sourceType: "module",
      },
      globals: {
        node: true,
        jest: true,
      },
    },
    plugins: {
      '@typescript-eslint': tslint.plugin,
      'unused-imports': unusedImportsPlugin,
    },
    rules: {
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-vars': [
        'error',
        {
          'vars': "all",
          'varsIgnorePattern': "^_",
          'args': "after-used",
          'argsIgnorePattern': "^_",
          "caughtErrorsIgnorePattern": "^_",
        },
      ],
      'unused-imports/no-unused-imports': 'error',
    },
    ignores: ['eslint.config.js'],
  })