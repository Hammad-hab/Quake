import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  appType: "mpa",
  server: { port: 3000 },
  plugins: [
    viteStaticCopy({
      targets: [{ src: "src/*", dest: "git" }]
    })
  ]
});