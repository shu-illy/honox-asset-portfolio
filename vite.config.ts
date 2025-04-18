import build from "@hono/vite-build/cloudflare-workers";
import adapter from "@hono/vite-dev-server/cloudflare";
import tailwindcss from "@tailwindcss/vite";
import honox from "honox/vite";
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
  if (mode === "client") {
    return {
      build: {
        rollupOptions: {
          input: ["./app/client.ts"],
          output: {
            entryFileNames: "static/client.js",
            chunkFileNames: "static/assets/[name]-[hash].js",
            assetFileNames: "static/assets/[name].[ext]",
          },
        },
        emptyOutDir: false,
      },
      plugins: [
        tailwindcss(),
        honox({
          devServer: { adapter },
          client: { input: ["./app/style.css"] },
        }),
        build(),
      ],
    };
  }
  return {
    ssr: {
      external: ["react", "react-dom", "@prisma/client"],
    },
    plugins: [
      tailwindcss(),
      honox({
        devServer: { adapter },
        client: { input: ["./app/style.css"] },
      }),
      build(),
    ],
  };
});
