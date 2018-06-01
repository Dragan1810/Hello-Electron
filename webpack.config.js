const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  watch: true,
  target: "electron-renderer",
  entry: ["@babel/polyfill", "./app/src/renderer_process"],
  output: {
    path: __dirname + "/app/build",
    publicPath: "build/",
    filename: "bundle.js"
  },

  module: {
    rules: [
      {
        test: /(\.js|\.ts)x?$|/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: [
            "@babel/env",
            "@babel/react",
            "@babel/typescript",
            ["@babel/preset-stage-0", { decoratorsLegacy: true }]
          ]
        }
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          loader: "css-loader",
          options: {
            modules: true
          }
        })
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "file-loader",
        query: {
          name: "[name].[ext]?[hash]"
        }
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin({
      filename: "bundle.css",
      disable: false,
      allChunks: true
    })
  ],

  resolve: {
    extensions: [".js", ".json", ".jsx", ".ts", ".tsx"]
  }
};
