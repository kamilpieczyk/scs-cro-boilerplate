const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack')
const credentials = require('./credentials')

const stylesHandler = "style-loader";

const config = {
  entry: "./src/index.jsx",
  mode: process.env.NODE_ENV,
  target: ['web', 'es6'],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: 'bundle.js',
    environment: {
      templateLiteral: false,
      forOf: true,
      destructuring: true,
      arrowFunction: true,
      globalThis: true,
    }
  },
  devServer: {
    open: true,
    host: "localhost",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
    }),
    new MiniCssExtractPlugin(),
    new webpack.BannerPlugin({
      banner: credentials
    })
  ],
  "resolve": { 
    "alias": {
      "react": "preact/compat",
      "react-dom/test-utils": "preact/test-utils",
      "react-dom": "preact/compat",     // Must be below test-utils
      "react/jsx-runtime": "preact/jsx-runtime",
      "@": path.resolve(__dirname, "src"),
      "@components": path.resolve(__dirname, "src", "components"),
      "@controllers": path.resolve(__dirname, "src", "controllers"),
      "@style": path.resolve(__dirname, "src", "global-styles"),
      "@store": path.resolve(__dirname, "src", "store"),
    },
    "extensions": ['', '.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/i,
        use: process.env.NODE_ENV=== 'production' 
          ? [MiniCssExtractPlugin.loader, "css-loader"]
          : [stylesHandler, "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: process.env.NODE_ENV === 'production' 
          ? [MiniCssExtractPlugin.loader, "css-loader", {loader: "sass-loader", options: { implementation: require.resolve("sass") }}]
          : [stylesHandler, "css-loader", {loader: "sass-loader", options: { implementation: require.resolve("sass") }}],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },
    ],
  },
  optimization: {
    minimize: true,
    chunkIds: 'size',
    moduleIds: 'size',
    removeAvailableModules: true,
    removeEmptyChunks: false,
    usedExports: true,
  }
};

module.exports = config;
