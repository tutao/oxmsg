import babel from '@rollup/plugin-babel'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import alias from '@rollup/plugin-alias'
import path from 'path'
import flowCopySource from "flow-copy-source"

export default {
	input: 'lib/index.js',
	plugins: [
		babel({babelHelpers: 'bundled'}),
		alias({
			entries: {
				"uuid": path.resolve("./node_modules/uuid/dist/esm-node/index.js"),
			}
		}),
		nodeResolve({
			preferBuiltins: true,
		}),
		commonjs({
			transformMixedEsModules: true,
			ignore: [
				'memcpy' // optional dep of bytebuffer
			]
		}),
		json(),
		flowCopySourcePlugin()
	],
	output: [
		{
			file: 'dist/index.js',
			format: 'esm',
			sourcemap: true,
			name: 'oxmsg'
		}
	]
}

/** Copy all sources do dist with .flow extensions */
function flowCopySourcePlugin() {
	return {
		name: "flow-copy-source",
		writeBundle() {
			return flowCopySource(["lib"], "dist")
		}
	};
}
