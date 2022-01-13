import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import alias from '@rollup/plugin-alias'
import path from 'path'
import typescript from "@rollup/plugin-typescript";

export default {
	input: 'lib/index.ts',
	plugins: [
		typescript(),
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
			],
			include: ["node_modules/**"],
			exclude: ["lib/**"]
		}),
	],
	output: [
		{
			dir: 'dist',
			format: 'esm',
			sourcemap: true,
			name: 'oxmsg'
		}
	],
}