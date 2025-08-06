import { defineConfig } from "eslint/config";

export default defineConfig({
	ignores: ["public/baremux/*", "public/uv/*", "public/epoxy/*", "dist/*"],
	rules: {
		semi: "error",
		"prefer-const": "error",
	},
});
