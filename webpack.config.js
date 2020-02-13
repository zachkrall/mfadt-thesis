const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
// must manually npm install 'vue-template-compiler' for vue-loader to work

module.exports = {
  entry: ["@babel/polyfill", path.join(__dirname, "_vue", "main.js")],
  output: {
    path: path.join(__dirname, ".."),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.vue$/,
        use: {
          loader: "vue-loader"
        }
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },
      {
        test: /\.(png|woff|woff2|eot|otf|ttf|svg)$/,
        use: ["file-loader?name=_vue/assets/[name].[ext]"]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: "style.css"
    })
  ],
  watchOptions: {
    ignored: ["./www/**", "node_modules"]
  }
};
