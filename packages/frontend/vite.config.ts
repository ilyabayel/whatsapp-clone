import {defineConfig} from "vite";
import path from "path";
import reactRefresh from "@vitejs/plugin-react-refresh";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  publicDir: path.join(__dirname, "public"),
  resolve: {
    alias: {
      components: path.join(__dirname, "src/components")
    }
  }
});
