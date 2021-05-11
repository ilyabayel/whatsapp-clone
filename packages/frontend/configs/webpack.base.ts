import path from "path";
import {Configuration} from "webpack";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import Dotenv from "dotenv-webpack";
import {EnvVars} from "../webpack.config";

export const baseConfig = (env: EnvVars, dirname: string): Configuration => {
  return {
    entry: "./src/index.tsx",
    target: "web",
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
      alias: {
        components: path.resolve(dirname, "./src/components/"),
        "@/": path.resolve(dirname, "./src")
      }
    },
    output: {
      path: path.resolve(dirname, "dist"),
      publicPath: "/"
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: "ts-loader",
          options: {
            happyPackMode: true,
            transpileOnly: true
          },
          include: path.resolve(dirname, "src")
        },
        {
          test: /\.s[ac]ss$/i,
          include: path.resolve(dirname, "src"),
          use: [
            "style-loader",
            "css-loader",
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: [["postcss-preset-env", "autoprefixer"]]
                }
              }
            },
            "sass-loader"
          ]
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          loader: "file-loader",
          options: {
            name: "images/[path][name].[ext]"
          }
        }
      ]
    },
    plugins: [
      new ForkTsCheckerWebpackPlugin({
        eslint: {
          files: "./src/**/*.{ts,tsx,js,jsx}"
        }
      }),
      new CopyPlugin({
        patterns: [
          {
            from: "./public/images",
            to: "./images"
          }
        ]
      }),
      new Dotenv({
        ignoreStub: true
      })
    ]
  };
};
