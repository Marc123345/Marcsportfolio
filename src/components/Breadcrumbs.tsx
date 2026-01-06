import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href: string;
  current?: boolean;
}

interface BreadcrumbsProps {
  className?: string;
  customItems?: BreadcrumbItem[];
}

export default function Breadcrumbs({ className = '', customItems }: BreadcrumbsProps) {
  const location = useLocation();
  
  // Generate breadcrumbs from current path
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    if (customItems) return customItems;
    
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'Home', href: '/' }
    ];
    
    let currentPath = '';
    
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === pathSegments.length - 1;
      
      // Convert segment to readable label
      let label = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      // Special cases for better labels
      if (segment === 'case-studies') label = 'Case Studies';
      if (segment === 'web-development') label = 'Web Development';
      if (segment === 'roi-calculator') label = 'ROI Calculator';
      if (segment === 'website-analyzer') label = 'Website Analyzer';
      if (segment === 'project-timeline') label = 'Project Timeline';
      if (segment === 'ai-crawler-optimization') label = 'AI Crawler Optimization';
      
      breadcrumbs.push({
        label,
        href: currentPath,
        current: isLast
      });
    });
    
    return breadcrumbs;
  };
  
  const breadcrumbs = generateBreadcrumbs();
  
  // Don't show breadcrumbs on home page
  if (location.pathname === '/') return null;
  
  return (
    <nav 
      className={`flex items-center space-x-1 text-sm ${className}`}
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center space-x-1">
        {breadcrumbs.map((item, index) => (
          <li key={item.href} className="flex items-center">
            {index > 0 && (
              <ChevronRight 
                className="w-4 h-4 text-gray-400 mx-2" 
                aria-hidden="true" 
              />
            )}
            {item.current ? (
              <span 
                className="text-gray-400 font-medium"
                aria-current="page"
              >
                {item.label}
              </span>
            ) : (
              <Link
                to={item.href}
                className="text-[#A3D1FF] hover:text-white transition-colors hover:underline"
                title={`Navigate to ${item.label}`}
              >
                {index === 0 && (
                  <Home className="w-4 h-4 inline mr-1" aria-hidden="true" />
                )}
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}