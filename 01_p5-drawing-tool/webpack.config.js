const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "src", "main.js"),
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
              "presets": [
                "@babel/preset-env"
              ],
              "plugins": [
                "@babel/plugin-proposal-object-rest-spread",
                "@babel/plugin-transform-spread"
              ]
            }
        }
      },
      {
        test: /\.css$/,
        loaders: ['style-loader','css-loader']
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname),
    compress: true,
    port: 3000,
    hot: true,
    writeToDisk: true,
    historyApiFallback: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // Enable hot reloading
  ],
  node: {
    fs: 'empty'
  }
};
