import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import compression from 'vite-plugin-compression';
import imagemin from 'vite-plugin-imagemin';

export default defineConfig({
  envDir: './',
  plugins: [
    react(),
    tsconfigPaths(),
    compression({
      algorithm: 'gzip',
      ext: '.gz',
    }),
    compression({
      algorithm: 'brotliCompress',
      ext: '.br',
    }),
    imagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false,
      },
      optipng: {
        optimizationLevel: 7,
      },
      mozjpeg: {
        quality: 80,
      },
      pngquant: {
        quality: [0.8, 0.9],
        speed: 4,
      },
      svgo: {
        plugins: [
          {
            name: 'removeViewBox',
            active: false,
          },
          {
            name: 'removeEmptyAttrs',
            active: false,
          },
        ],
      },
    }),
  ],
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'zustand',
      'framer-motion',
      '@supabase/supabase-js',
      'lucide-react',
      'sonner',
      'react-helmet-async',
      'react-error-boundary'
    ],
    esbuildOptions: {
      target: 'es2020',
      drop: ['console', 'debugger'],
      legalComments: 'none'
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    target: 'es2020',
    cssCodeSplit: true,
    cssMinify: 'esbuild',
    minify: 'terser',
    reportCompressedSize: false, // Disable to speed up build
    terserOptions: {
      compress: {
        drop_console: true, // Remove console logs in production
        drop_debugger: true,
        ecma: 2020,
        passes: 2,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
      },
      format: {
        comments: false,
        ecma: 2020,
      },
      mangle: {
        safari10: true,
      },
    },
    rollupOptions: {
      treeshake: {
        preset: 'recommended',
        moduleSideEffects: false
      },
      output: {
        // Use a more predictable chunk naming strategy
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
        // Improve chunking strategy
        manualChunks: (id) => {
          // Vendor chunks
          if (id.includes('node_modules')) {
            // Large libraries get their own chunks
            if (id.includes('framer-motion')) return 'vendor-framer';
            if (id.includes('lucide-react')) return 'vendor-icons';
            if (id.includes('@supabase')) return 'vendor-supabase';
            
            // Group smaller vendor packages
            return 'vendor';
          }
          
          // Core React packages
          if (id.includes('node_modules/react/') || 
              id.includes('node_modules/react-dom/') || 
              id.includes('node_modules/react-router-dom/')) {
            return 'vendor-react';
          }
          
          // Group page components by section
          if (id.includes('/pages/blog/')) {
            return 'page-blog';
          }
          
          if (id.includes('/pages/work/')) {
            return 'page-work';
          }
          
          if (id.includes('/pages/tools/')) {
            return 'page-tools';
          }
          
          if (id.includes('/pages/services/')) {
            return 'page-services';
          }
        }
      },
    },
    // Ensure chunks are properly named and cached
    chunkSizeWarningLimit: 500, // Stricter chunk size limits
    assetsInlineLimit: 4096,
  },
  server: {
    fs: {
      strict: true,
    },
  },
  // Ensure base path is set correctly
  base: '/',
  // Add cache busting for dynamic imports
  experimental: {
    renderBuiltUrl(filename, { hostType }) {
      if (hostType === 'js') {
        return { runtime: `globalThis.__vite_public_path + ${JSON.stringify(filename)}` };
      }
      return { relative: true };
    }
  }
});