import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import InternalLinkCard from './InternalLinkCard';

interface RelatedItem {
  title: string;
  description: string;
  href: string;
  category?: string;
}

interface RelatedContentProps {
  title?: string;
  items: RelatedItem[];
  className?: string;
  variant?: 'grid' | 'list';
}

export default function RelatedContent({
  title = "Related Content",
  items,
  className = '',
  variant = 'grid'
}: RelatedContentProps) {
  if (items.length === 0) return null;
  
  return (
    <section className={`py-12 ${className}`}>
      <h2 className="text-heading-large text-white mb-8">{title}</h2>
      
      {variant === 'grid' ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <InternalLinkCard
              key={item.href}
              title={item.title}
              description={item.description}
              href={item.href}
              category={item.category}
              variant="compact"
            />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item, index) => (
            <Link
              key={item.href}
              to={item.href}
              className="block p-4 bg-[#1b1b1b] rounded-lg border border-white/10 hover:border-[#A3D1FF] transition-all group"
              title={`Read about ${item.title}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium group-hover:text-[#A3D1FF] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-sm mt-1">{item.description}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-[#A3D1FF] group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}