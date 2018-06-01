const path = require("path");

module.exports = {
  devtool: "cheap-module-source-map",
  context: path.resolve(__dirname, "src"),
  entry: path.join(__dirname, "src", "index.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/dist/",
    filename: "app.min.js"
  },
  mode: "development",
  resolve: {
    modules: [path.resolve(__dirname), "node_modules"]
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /node_modules\/.+\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          cacheDirectory: true,
          presets: [
            "@babel/preset-env",
            "@babel/preset-react",
            "@babel/preset-stage-0"
          ],
          env: {
            development: {
              presets: ["react-hmre"]
            }
          }
        }
      },
      {
        test: /\.woff\d?(\?.+)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          mimetype: "application/font-woff"
        }
      },
      {
        test: /\.ttf(\?.+)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          mimetype: "application/octet-stream"
        }
      },
      {
        test: /\.eot(\?.+)?$/,
        loader: "url-loader",
        options: {
          limit: 10000
        }
      },
      {
        test: /\.svg(\?.+)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          mimetype: "image/svg+xml"
        }
      },
      {
        test: /\.png$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          mimetype: "image/png"
        }
      },
      {
        test: /\.gif$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          mimetype: "image/gif"
        }
      }
    ]
  }
};
