import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href: string;
  current?: boolean;
}

interface BreadcrumbNavigationProps {
  className?: string;
  customItems?: BreadcrumbItem[];
}

export default function BreadcrumbNavigation({ className = '', customItems }: BreadcrumbNavigationProps) {
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
      const labelMap: Record<string, string> = {
        'case-studies': 'Case Studies',
        'web-development': 'Web Development',
        'ai-integration': 'AI Integration',
        'startup-mvp': 'Startup MVP',
        'roi-calculator': 'ROI Calculator',
        'website-analyzer': 'Website Analyzer',
        'project-timeline': 'Project Timeline',
        'ai-crawler-optimization': 'AI Crawler Optimization',
        'design-systems': 'Design Systems',
        'brand-design': 'Brand Design',
        'fractional-cmo': 'Marketing Partner',
      };
      
      if (labelMap[segment]) {
        label = labelMap[segment];
      }
      
      breadcrumbs.push({
        label,
        href: currentPath,
        current: isLast
      });
    });
    
    return breadcrumbs;
  };
  
  const breadcrumbs = generateBreadcrumbs();
  
  // Don't show breadcrumbs on home page or if only one item
  if (location.pathname === '/' || breadcrumbs.length <= 1) return null;
  
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
                className="text-[#A3D1FF] hover:text-white transition-colors hover:underline flex items-center"
                title={`Navigate to ${item.label}`}
              >
                {index === 0 && (
                  <Home className="w-4 h-4 mr-1" aria-hidden="true" />
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