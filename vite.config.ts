import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// "./" keeps asset paths relative, so the built site also works when it is
// served from a sub-path such as https://user.github.io/portfolio/.
export default defineConfig({
  base: "./",
  plugins: [react()],
});
