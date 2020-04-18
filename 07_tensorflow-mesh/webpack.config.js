const path = require('path')
const webpack = require('webpack')

module.exports = {
  mode: 'production',
  entry: ['@babel/polyfill', path.resolve(__dirname, 'src', 'index.js')],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    chrome: 52
                  }
                }
              ]
            ]
          }
        }
      }
    ]
  },
  plugins: [],
  node: {
    fs: 'empty'
  },
  devServer: {
    https: true,
    writeToDisk: true,
    contentBase: path.resolve(__dirname)
  }
}
