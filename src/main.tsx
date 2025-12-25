import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AppProviders } from '@/providers/AppProviders';
import App from '@/App';
import '@/index.css';
import { initPlausible } from '@/lib/plausible';

// Performance optimizations
const initializeApp = () => {
  // Initialize Plausible Analytics
  initPlausible();

  // Define public path for dynamic imports
  window.__vite_public_path = window.location.origin + '/';

  // Prefetch critical routes only on fast connections
  const prefetchRoutes = () => {
    // Check connection quality and data saver mode
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      if (connection.saveData || connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
        return; // Skip prefetching on slow connections
      }
    }
    
    const routes = ['/work', '/services', '/about', '/contact'];
    
    // Use requestIdleCallback for better performance
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(() => {
        routes.forEach(route => {
          const link = document.createElement('link');
          link.rel = 'prefetch';
          link.href = route;
          link.as = 'document';
          document.head.appendChild(link);
        });
      });
    }
  };
  
  // Delay prefetching until after initial render
  setTimeout(prefetchRoutes, 3000);
};

// Use a more performant approach to rendering
const root = document.getElementById('root');
if (root) {
  createRoot(root).render(
    <BrowserRouter>
      <AppProviders>
        <App />
      </AppProviders>
    </BrowserRouter>
  );
  
  // Initialize performance optimizations
  initializeApp();
} else {
  console.error('Root element not found');
}

// Cleanup on page unload
window.addEventListener('pagehide', () => {
  // Minimal cleanup for better performance
}, { passive: true });