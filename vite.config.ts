import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/' : '/',
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor chunks for better caching
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-ui': ['@radix-ui/react-accordion', '@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-tabs', '@radix-ui/react-toast'],
          'vendor-charts': ['recharts'],
          'vendor-animation': ['framer-motion'],
          'vendor-utils': ['clsx', 'tailwind-merge', 'class-variance-authority'],
          'vendor-icons': ['lucide-react'],
        },
      },
    },
    // Enable minification and compression (using esbuild for better performance)
    minify: 'esbuild',
    // Optimize chunk size warning limit
    chunkSizeWarningLimit: 600,
  },
}));
