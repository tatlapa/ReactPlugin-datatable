import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        dts({
            insertTypesEntry: true,
        }),
    ],
    css: {
        postcss: {
            plugins: [
                tailwindcss(), // Ajout de Tailwind CSS
                autoprefixer(), // Ajout de Autoprefixer
            ],
        },
    },
    build: {
        lib: {
            entry: path.resolve(__dirname, "src/index.ts"),
            name: "datatable",
            formats: ["es", "umd"],
            fileName: function (format) { return "datatable.".concat(format, ".js"); },
        },
        rollupOptions: {
            external: ["react", "react-dom"],
            output: {
                globals: {
                    react: "React",
                    "react-dom": "ReactDOM",
                },
            },
        },
    },
});
