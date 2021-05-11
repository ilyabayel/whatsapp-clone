import {Configuration} from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";

export const devConfig = (): Configuration => ({
  mode: "development",
  devServer: {
    port: 3000,
    overlay: true,
    clientLogLevel: "warning",
    historyApiFallback: true,
    writeToDisk: false,
    hot: true,
    stats: "errors-only"
  },
  output: {
    filename: "[name].js"
  },
  cache: {
    type: "memory"
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
      inject: true,
      minify: false
    })
  ]
});
