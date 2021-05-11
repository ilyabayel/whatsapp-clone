import merge from "webpack-merge";
import {Configuration} from "webpack";
import {baseConfig} from "./configs/webpack.base";
import {devConfig} from "./configs/webpack.dev";
import {prodConfig} from "./configs/webpack.prod";

export interface EnvVars {
  ENV?: string,
}

const webpackConfig = async (env: EnvVars): Promise<Configuration> => {
  if (!env.ENV) {
    throw new Error("No ENV variable in env")
  }
  return merge(baseConfig(env, __dirname), env.ENV === "prod" ? prodConfig(env, __dirname) : devConfig(env, __dirname))
}

export default webpackConfig;
