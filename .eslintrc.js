module.exports = {
  root: true,
  extends: "plugin:@typescript-eslint/recommended",
  parser: "@typescript-eslint/parser",
  parserOptions: {
		project: "./tsconfig.json",
		ecmaVersion: 6,
		sourceType: "module",
		ecmaFeatures: {
			module: true,
			ts: true
		},
  },
  rules: {
		"no-console": ["warn", {
				"allow": ["log", "warn", "error", "info", "table"]
		}],
		"@typescript-eslint/indent": ["warn", 2],
		"linebreak-style": ["warn", "unix"],
		"quotes": ["error", "single"],
		"semi": ["error", "always"],
		"no-extra-semi": ["warn"],
		"prefer-rest-params": ["warn"],
		"@typescript-eslint/camelcase": ["off"],
		"@typescript-eslint/restrict-plus-operands": ["off"],
		"@typescript-eslint/array-type": ["off"],
		"@typescript-eslint/no-use-before-define": ["off"],
		"@typescript-eslint/no-angle-bracket-type-assertion": ["off"],
		"@typescript-eslint/interface-name-prefix": ["off"],
		"@typescript-eslint/explicit-function-return-type": ["off"],
		"@typescript-eslint/no-explicit-any": ["off"],
		"@typescript-eslint/no-empty-function": ["off"]
  },
  plugins: ["@typescript-eslint"],
  globals: {
		// "window": true,
		"Atomics": "readonly",
		"SharedArrayBuffer": "readonly"
  },
  env: {
		"browser": true,
		"commonjs": true,
		"es6": true,
		"mocha": true
  }
}