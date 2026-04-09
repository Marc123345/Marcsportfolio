import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import compression from 'vite-plugin-compression';

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
    reportCompressedSize: false,
    terserOptions: {
      compress: {
        drop_console: true,
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
      },
      output: {
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('framer-motion')) return 'vendor-framer';
            if (id.includes('lucide-react')) return 'vendor-icons';
            if (id.includes('@supabase')) return 'vendor-supabase';
            if (id.includes('gsap')) return 'vendor-gsap';
            return 'vendor';
          }
        }
      },
    },
    chunkSizeWarningLimit: 500,
    assetsInlineLimit: 4096,
  },
  server: {
    fs: {
      strict: true,
    },
  },
  base: '/',
});
