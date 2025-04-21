module.exports = {
	env: {
		browser: true,
		commonjs: true,
		es2021: true,
	},
	overrides: [
		{
			env: {
				node: true,
			},
			files: [".eslintrc.{js,cjs}"],
			parserOptions: {
				sourceType: "script",
			},
		},
	],
	parserOptions: {
		sourceType: "module",
	},
	plugins: ["bot-whatsapp"],
	extends: ["plugin:bot-whatsapp/recommended"],
};
