const dedent = require('string-dedent')
const typescript = require('@rollup/plugin-typescript')
// const terser = require('@rollup/plugin-terser')

const pkg = require('./package.json')

const version = process.env.SEMANTIC_RELEASE_NEXT_RELEASE_VERSION

if (!version) {
  throw new Error(`Invalid version, got: "${version}".`)
}

const banner = dedent`
  /*!
   * ${pkg.name} v${version}
   * ${pkg.homepage}
   *
   * Copyright (c) 2023 ${pkg.author}
   * Released under the ${pkg.license} License
   * ${pkg.homepage}/blob/main/LICENSE
   *
   * Date: ${new Date().toISOString()}
   */
`
/** @type {import('rollup').RollupOptions} */
module.exports = {
  input: [
    'src/bigint/index.ts',
    'src/boolean/index.ts',
    // 'src/Grandom/index.ts',
    'src/number/index.ts',
    'src/pick/index.ts',
    'src/string/index.ts',
    'src/index.ts'
  ],

  output: {
    banner,
    sourcemap: true,
    exports: 'named',

    format: 'cjs',
    preserveModules: true,

    dir: 'dist'
  },

  plugins: [
    typescript()
    // terser(),
  ]
}
