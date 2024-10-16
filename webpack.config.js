const port = process.env.PORT || 1337

const rendererConfig = {
  target: ['web'],
  entry: {
    loader: ['./index.tsx'],
  },
  output: {
    publicPath: `http://localhost:${port}/`,
    filename: '[name].js',
    assetModuleFilename: 'assets/[hash][ext][query]',
    library: {
      type: 'module' // used to be commonjs
    },
    chunkFormat: 'module',
    module: true
  },
  resolve: {
    extensions: ['.js', '.jsx', '.mjs', '.json', '.mts', '.ts', '.tsx', '.wasm', '.esm.js'],
    modules: ['./node_modules'],
    extensionAlias: {
      // necessary for typescript / esm since we resolve .ts files from .js extensions in imports
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.jsx': ['.tsx', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
      '.cjs': ['.cts', '.cjs']
    },
    conditionNames: ['import', 'node', 'require']
  },
  experiments: {
    // enabled top level wait for our generated icon/language files
    topLevelAwait: true,
    // to enable esm output
    outputModule: true
  },
  // externals: electronRendererExternals,
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'swc-loader',
          options: {
            env: { mode: 'usage' },
            module: {
              type: 'es6'
            },
            jsc: {
              // in recent swc versions you cant set both target and env anymore
              // target: 'es2021', // es2016
              parser: {
                syntax: 'typescript',
                tsx: true,
                dynamicImport: true
              },
              transform: {
                react: {
                  runtime: 'classic'
                }
              }
            }
          }
        }
      }
    ]
  }

}

export default rendererConfig
