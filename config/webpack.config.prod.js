const webpack = require("webpack");
const merge = require("webpack-merge");
const baseConfig = require("./webpack.config.dev");
const UglifyPluging = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Vizualizer = require("webpack-visualizer-plugin");

const prodConfig = function(env) {
  return merge([
    {
      optimization: {
        minimizer: [new UglifyPluging({})],
        splitChunks: {
            chunks: "async",
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    enforce: true,
                    name: "vendors",
                    chunks: "all",
                }
            }
        }
      },
      plugins: [
        new MiniCssExtractPlugin(),
        new Vizualizer({
          filename: "./stastics.html"
        })
      ]
    }
  ]);
};

module.exports = env => { return merge(baseConfig(env), prodConfig(env)) };
