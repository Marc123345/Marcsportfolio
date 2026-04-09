import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AppProviders } from '@/providers/AppProviders';
import App from '@/App';
import '@/index.css';

const prefetchRoutes = () => {
  if ('connection' in navigator) {
    const connection = (navigator as any).connection;
    if (connection.saveData || connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
      return;
    }
  }

  const routes = ['/work', '/services', '/about', '/contact'];

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

const root = document.getElementById('root');
if (root) {
  createRoot(root).render(
    <BrowserRouter>
      <AppProviders>
        <App />
      </AppProviders>
    </BrowserRouter>
  );

  setTimeout(prefetchRoutes, 3000);
}
