import uglify from 'rollup-plugin-uglify';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import buble from 'rollup-plugin-buble';

export default {
	plugins: [
		resolve({
			browser: true,
			extensions: ['.js', '.json']
		}),
		commonjs(),
		buble(),
		uglify()
	]
};
