const webpack = require("webpack");

module.exports = {
  entry: "./src/index.jsx",
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        exclude: /node_modules/,
        use: ["ts-loader"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.svg$/,
        use: ["xml-loader"],
      },
      {
        test: /\.(png|woff|woff2)$/,
        use: ["url-loader"],
      },
    ],
  },
  //plugins: [new webpack.HotModuleReplacementPlugin()],
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
  },
  devServer: {
    contentBase: "./dist",
    port: 8080,
  },
  devtool: "source-map",
};
