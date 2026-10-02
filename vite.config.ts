import vinext from "vinext";
import { defineConfig } from "vite";
import { fumadocsMdx } from "fumadocs-mdx/vite";
import tailwindcss from "@tailwindcss/vite";
import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
  plugins: [
    tailwindcss(),
    fumadocsMdx(),
    vinext(),
    cloudflare({
      viteEnvironment: {
        name: "rsc",
        childEnvironments: ["ssr"],
      },
    }),
  ],
  css: {
    postcss: { plugins: [] },
  },
});
