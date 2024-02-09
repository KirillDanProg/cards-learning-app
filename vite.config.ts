import react from "@vitejs/plugin-react-swc";
import {defineConfig} from "vite";
import viteTsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react(), viteTsconfigPaths()],
  server: {
    open: true,
    port: 3000
  }
});
