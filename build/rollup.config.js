import buble from "@rollup/plugin-buble" // Transpile/polyfill with reasonable browser support
import commonjs from "@rollup/plugin-commonjs" // Convert CommonJS modules to ES6
import vue from "rollup-plugin-vue" // Handle .vue SFC files
export default {
	input: "src/index.js", // Path relative to package.json
	output: {
		name: "Keystone6DocumentReaderVue",
		exports: "named",
	},
	plugins: [
		commonjs(),
		vue({
			css: true, // Dynamically inject css as a <style> tag
			compileTemplate: true, // Explicitly convert template to render function
		}),
		buble(), // Transpile to ES5
	],
}