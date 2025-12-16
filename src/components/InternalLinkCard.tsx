import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface InternalLinkCardProps {
  title: string;
  description: string;
  href: string;
  category?: string;
  className?: string;
  variant?: 'default' | 'compact' | 'featured';
}

export default function InternalLinkCard({
  title,
  description,
  href,
  category,
  className = '',
  variant = 'default'
}: InternalLinkCardProps) {
  const baseClasses = "group block bg-[#1b1b1b] rounded-xl border border-white/10 hover:border-[#A3D1FF] transition-all duration-300 hover:transform hover:-translate-y-1";
  
  const variantClasses = {
    default: "p-6",
    compact: "p-4",
    featured: "p-8 border-[#A3D1FF]/30"
  };
  
  return (
    <Link 
      to={href}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      title={`Learn more about ${title}`}
    >
      {category && (
        <span className="inline-block px-3 py-1 bg-[#A3D1FF]/10 text-[#A3D1FF] rounded-full text-xs font-medium mb-3">
          {category}
        </span>
      )}
      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#A3D1FF] transition-colors">
        {title}
      </h3>
      <p className="text-gray-400 text-sm mb-4 line-clamp-2">
        {description}
      </p>
      <div className="flex items-center text-[#A3D1FF] text-sm font-medium">
        <span>Learn more</span>
        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
}