import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import typescript from 'rollup-plugin-typescript'
import fs from 'fs'
import path from 'path'
import del from 'del'

clearDir()

async function clearDir () {
  await del.sync('dist/*')
}

const extensions = ['.ts', '.js']
module.exports = {
  input: 'src/index.js',
  output: {
    file: 'dist/index.js',
    format: 'cjs',
    compact: true
  },
  external: [
    'base64-js'
  ],
  plugins: [
    resolve({ extensions }),
    commonjs(),
    typescript({
      target: 'es5',
      lib: ["es5", "es6", "es2015", "es2016", "dom"]
    }),
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true,
      extensions
    })
  ]
}
