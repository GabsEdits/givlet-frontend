import tailwindcss from "@tailwindcss/vite";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      external: ["socket.io"], // Externalize the socket.io module
    },
  },
  plugins: [tailwindcss(), sveltekit()],
});
