const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");
const { appBuild, moduleRegex } = require("./constants");

module.exports = {
  mode: "development",
  entry: { server: ["./src/index.server.tsx"] },
  output: {
    filename: "server.js",
    path: appBuild,
    libraryTarget: "commonjs2",
  },
  target: "node",
  node: false,
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
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  externals: [nodeExternals()],
};
