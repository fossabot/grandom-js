const strip = require('rollup-plugin-strip-code')
const typescript = require('@rollup/plugin-typescript')
const terser = require('@rollup/plugin-terser')
const commonjs = require('@rollup/plugin-commonjs')
const nodeResolve = require('@rollup/plugin-node-resolve')
const filesize = require('rollup-plugin-filesize')
const dedent = require('string-dedent')

const pkg = require('./package.json')
const version = process.env.SEMANTIC_RELEASE_NEXT_RELEASE_VERSION

if (!version) {
  throw new Error(`Invalid version, got: "${version}".`)
}

/** @type {import('rollup').RollupOptions} */
module.exports = [
  {
    input: 'src/index.ts',

    output: {
      format: 'cjs',
      sourcemap: true,
      preserveModules: true,
      dir: 'dist'
    },

    external: /@grandom\/.*/,

    plugins: [
      strip({
        start_comment: '<umd-only>',
        end_comment: '</umd-only>'
      }),
      typescript()
    ]
  },
  {
    input: 'src/index.ts',

    output: {
      format: 'umd',
      name: 'grandomBoolean',
      sourcemap: true,
      file: 'dist/umd.min.js',

      banner: dedent`
        /*!
        * ${pkg.name} v${version}
        * ${pkg.homepage}
        *
        * Copyright (c) ${new Date().getFullYear()} ${pkg.author}
        * Released under the ${pkg.license} License
        * ${pkg.homepage}/blob/main/LICENSE
        *
        * Date: ${new Date().toISOString()}
        */
      `
    },

    plugins: [
      terser(),
      typescript(),
      commonjs(),
      nodeResolve(),
      filesize()
    ]
  }
]
