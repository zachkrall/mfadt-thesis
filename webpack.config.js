const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')
// must manually npm install 'vue-template-compiler' for vue-loader to work

const src_path = '_src'

module.exports = {
  entry: ['@babel/polyfill', path.join(__dirname, src_path, 'main.js')],
  output: {
    path: path.join(__dirname, '_dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader'
        }
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.(png|woff|woff2|eot|otf|ttf)$/,
        use: ['file-loader?name=/assets/[name].[ext]']
      },
      {
        test: /\.svg$/,
        use: ['babel-loader', 'vue-svg-loader']
      }
    ]
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, '_src')
    }
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: 'style.css'
    })
  ],
  watchOptions: {
    ignored: ['./www/**', 'node_modules']
  },
  devServer: {
    writeToDisk: true,
    contentBase: path.resolve(__dirname)
  }
}
