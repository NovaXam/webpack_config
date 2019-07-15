const webpack = require("webpack");
const merge = require("webpack-merge");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const htmlWebpackPlugin = require("html-webpack-plugin");

module.exports = function(env) {
  const { PLATFORM } = env;
  return merge([
    {
      entry: {
        main: path.resolve(__dirname, "..", "src")
      },
      output: {
        path: path.resolve(__dirname, "..", "dist"),
        filename: PLATFORM === "prod" ? "[name].[hash].js" : "[name].js",
        publicPath: "/",
        chunkFilename: "[name].[chunkhash].js"
      },
      mode: "development",
      devtool:
        PLATFORM === "prod"
          ? "cheap-source-map"
          : "cheap-module-eval-source-map",
      devServer: {
        contentBase: path.join(__dirname, "..", "dist"),
        overlay: true,
        historyApiFallback: true,
        hot: true,
        stats: {
          colors: true
        }
      },
      resolve: {
        extensions: [".jsx", ".js"]
      },
      module: {
        rules: [
          {
            test: /\.jsx?$/,
            loader: "babel-loader",
            exclude: /node_modules/
          },
          {
            test: /\.(css|sass)$/,
            use: [
              {
                loader:
                  PLATFORM === "prod"
                    ? MiniCssExtractPlugin.loader
                    : "style-loader"
              },
              {
                loader: "css-loader",
                options: {
                  modules: {
                    localIdentName: "[name]_[local]_[hash:base64:5]"
                  }
                }
              },
              {
                loader: "postcss-loader"
              },
              {
                loader: "sass-loader"
              }
 
            ]
          },
          {
            test: /\.(jpe?g|png|gif|pdf)$/,
            use: [
              {
                loader: "url-loader",
                options: {
                  limit: 10000
                }
              }
            ]
          }
        ]
      },
      plugins: [
        // new webpack.HotModuleReplacementPlugin(),
        new htmlWebpackPlugin({
          template: path.resolve(__dirname, "../src/index.html"),
          filename: "index.html"
        }),
        new webpack.DefinePlugin({
          "process.env.PLATFORM": JSON.stringify(env)
        })
      ]
    }
  ]);
};
