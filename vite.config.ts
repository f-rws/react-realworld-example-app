import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import viteTsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    plugins: [TanStackRouterVite(), react(), viteTsconfigPaths()],
    test: {
        globals: true,
    },
});
