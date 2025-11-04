import js from "@eslint/js"
import typescript from "@typescript-eslint/eslint-plugin"
import tsParser from "@typescript-eslint/parser"

/** @type {import("eslint").Linter.Config} */
export default [
	js.configs.recommended,
	{
		files: ["**/*.ts"],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				ecmaVersion: 2022,
				sourceType: "module",
			},
			globals: {
				console: "readonly",
				process: "readonly",
				__dirname: "readonly",
				setTimeout: "readonly",
				clearTimeout: "readonly",
				NodeJS: "readonly",
			},
		},
		plugins: {
			"@typescript-eslint": typescript,
		},
		rules: {
			"@typescript-eslint/naming-convention": [
				"warn",
				{
					selector: "import",
					format: ["camelCase", "PascalCase"],
				},
			],
			"@typescript-eslint/semi": "off",
			"no-unused-vars": "off",
			"@typescript-eslint/no-unused-vars": ["error", { varsIgnorePattern: "^_", argsIgnorePattern: "^_" }],
			eqeqeq: "warn",
			"no-throw-literal": "warn",
			semi: "off",
			"no-undef": "error",
		},
	},
	{
		files: ["**/*.test.ts"],
		languageOptions: {
			globals: {
				suite: "readonly",
				test: "readonly",
				describe: "readonly",
				it: "readonly",
				before: "readonly",
				after: "readonly",
				beforeEach: "readonly",
				afterEach: "readonly",
			},
		},
		rules: {
			"@typescript-eslint/no-explicit-any": "off",
			"@typescript-eslint/no-non-null-assertion": "off",
			"no-undef": "off",
		},
	},
]