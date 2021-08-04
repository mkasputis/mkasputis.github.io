const webpack = require("webpack");

module.exports = {
  entry: "./src",
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/i,
        exclude: /node_modules/,
        use: ["ts-loader"],
      },
      {
        test: /\.s?[ac]ss$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.svg$/i,
        use: ["xml-loader"],
      },
      {
        test: /\.(png|woff|woff2)$/i,
        use: ["url-loader"],
      },
    ],
  },
  //plugins: [new webpack.HotModuleReplacementPlugin()],
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
  },
  devServer: {
    contentBase: "./public",
    port: 8080,
  },
  devtool: "source-map",
};
