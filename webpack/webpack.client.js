const webpack = require("webpack");
const ReactRefreshPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");

const { appBuild, moduleRegex } = require("./constants");

module.exports = {
  mode: "development",
  entry: {
    client: ["webpack-hot-middleware/client", "./src/index.client.tsx"],
  },
  output: {
    filename: "[name].[contenthash].js",
    path: appBuild,
    publicPath: "/",
    clean: true,
  },
  target: ["web", "es5"],
  module: {
    rules: [
      {
        test: moduleRegex,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              ["@babel/preset-env"],
              ["@babel/preset-react"],
              "@babel/preset-typescript",
            ],
            plugins: ["react-refresh/babel"],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  plugins: [
    new WebpackManifestPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshPlugin({
      overlay: {
        sockIntegration: "whm",
      },
    }),
  ],
};
