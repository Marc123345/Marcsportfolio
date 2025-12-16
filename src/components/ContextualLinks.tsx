import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';

interface ContextualLink {
  text: string;
  href: string;
  external?: boolean;
  title?: string;
}

interface ContextualLinksProps {
  links: ContextualLink[];
  className?: string;
  inline?: boolean;
}

export default function ContextualLinks({ 
  links, 
  className = '', 
  inline = false 
}: ContextualLinksProps) {
  if (links.length === 0) return null;
  
  const containerClass = inline 
    ? `inline-flex flex-wrap gap-4 ${className}`
    : `space-y-3 ${className}`;
  
  return (
    <div className={containerClass}>
      {links.map((link, index) => (
        <div key={index} className={inline ? '' : 'flex items-center'}>
          {link.external ? (
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-[#A3D1FF] hover:text-white transition-colors hover:underline"
              title={link.title || `Visit ${link.text}`}
            >
              {link.text}
              <ExternalLink className="w-4 h-4 ml-1" />
            </a>
          ) : (
            <Link
              to={link.href}
              className="inline-flex items-center text-[#A3D1FF] hover:text-white transition-colors hover:underline"
              title={link.title || `Learn more about ${link.text}`}
            >
              {link.text}
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          )}
        </div>
      ))}
    </div>
  );
}