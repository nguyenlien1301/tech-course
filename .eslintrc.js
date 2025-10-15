module.exports = {
  settings: {
    "import/resolver": {
      typescript: {}, // dùng tsconfig.json để biết đường dẫn alias
    },
  },
  extends: [
    "next/core-web-vitals",
    "next/typescript",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/jsx-runtime",
    "plugin:prettier/recommended",
    "prettier",
    "plugin:tailwindcss/recommended",
    "plugin:unicorn/recommended", // là ràng buộc các quy tắt đặt tên. VD: props nó sẽ báo lỗi, phải đặt là properties
    "plugin:import/recommended",
  ],
  parser: "@typescript-eslint/parser",
  // "@typescript-eslint/no-explicit-any": "off",
  plugins: [
    "simple-import-sort",
    "@typescript-eslint",
    "react",
    "prettier",
    "unicorn",
    "import",
    "sort-destructure-keys",
    "react-hooks",
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: [".eslintrc.js"],
  rules: {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "off",
    "@typescript-eslint/naming-convention": [
      "error",
      {
        selector: "variableLike",
        format: ["camelCase", "UPPER_CASE", "PascalCase"],
        leadingUnderscore: "allow",
        trailingUnderscore: "allow",
      },
      {
        selector: "variable",
        types: ["boolean"],
        format: ["PascalCase"],
        prefix: [
          "is",
          "should",
          "has",
          "can",
          "did",
          "will",
          "must",
          "need",
          "response",
        ],
      },
      {
        selector: "variable",
        types: ["function"],
        format: ["PascalCase", "camelCase"],
      },
      {
        selector: "function",
        format: ["camelCase", "PascalCase"],
      },
      {
        selector: ["typeLike", "interface", "enum"],
        format: ["PascalCase"],
        custom: {
          regex: "^(?![TIE][A-Z])/u",
          match: false,
        },
      },
    ],
    "react/jsx-sort-props": [
      "error",
      {
        callbacksLast: true,
        shorthandFirst: false,
        ignoreCase: true,
        multiline: "last",
        noSortAlphabetically: false,
        reservedFirst: true,
      },
    ],
    quotes: ["error", "double"],
    "prettier/prettier": [
      "error",
      {
        semi: true,
      },
    ],
    "@typescript-eslint/no-empty-object-type": "off",
    "tailwindcss/no-custom-classname": "off",
    "import/first": "error",
    "import/newline-after-import": "error",
    "import/no-duplicates": "error",
    "import/prefer-default-export": "off",
    "import/no-cycle": "warn",
    "sort-imports": "off", // tắt rule mặc định
    "import/order": "off",
    "react/prop-types": "off",
    "import/no-unresolved": ["error", { caseSensitive: false }],
    "react/no-multi-comp": "off",
    "react/jsx-no-leaked-render": [
      "error",
      {
        validStrategies: ["coerce", "ternary"],
      },
    ],
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "padding-line-between-statements": [
      "warn",
      {
        blankLine: "always",
        prev: "*",
        next: "return",
      },
      {
        blankLine: "always",
        prev: ["const", "let", "var"],
        next: "*",
      },
      {
        blankLine: "any",
        prev: ["const", "let", "var"],
        next: ["const", "let", "var"],
      },
    ],
    "sort-destructure-keys/sort-destructure-keys": [
      "error",
      { caseSensitive: true },
    ],
    "no-useless-return": "warn",
    "prefer-const": "warn",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        varsIgnorePattern: "^_",
        argsIgnorePattern: "^_",
      },
    ],
    "react/self-closing-comp": "error",
    "array-bracket-newline": ["error", "consistent"],
    "array-element-newline": ["error", "consistent"],
    "no-mixed-spaces-and-tabs": ["error", "smart-tabs"],
    "unicorn/prevent-abbreviations": [
      "error",
      {
        allowList: {
          props: true,
          Props: true,
          ref: true,
          Ref: true,
          params: true,
          Params: true,
        },
      },
    ],
    "unicorn/filename-case": [
      "error",
      {
        case: "kebabCase",
      },
    ],
    "unicorn/no-null": "off",
    "unicorn/prefer-structured-clone": "off",
    "unicorn/consistent-function-scoping": "off",
    "unicorn/no-array-callback-reference": "off",
    "import/named": "off",
    "unicorn/prevent-abbreviations": "off",
    "unicorn/prefer-ternary": "off",
  },
};
