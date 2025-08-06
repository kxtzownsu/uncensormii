import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
	plugins: [tailwindcss(), preact()],
	root: "src",
	envDir: "../",
	cacheDir: "../node_modules/.vite",
	publicDir: "../public",
	build: {
		outDir: "../dist",
		emptyOutDir: true,
		rollupOptions: {
			input: {
				iframe: "src/iframe.html",
			},
		},
	},

	// so `pnpm dev` doesn't break
	server: {
		open: "/index.html",
		allowedHosts: true
	},
});
