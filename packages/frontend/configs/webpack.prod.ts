import {Configuration} from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";

export const prodConfig = (): Configuration => ({
  mode: "production",
  output: {
    filename: "[name].[contenthash].js"
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
      inject: true,
      minify: true
    })
  ]
});
