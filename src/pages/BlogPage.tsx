import React from 'react';
import PageWrapper from '@/components/PageWrapper';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const posts = [
  { date: "10.2025", title: "Ecommerce UX Flaws Killing Conversions", cat: "UX Design", slug: "ecommerce-ux-flaws-killing-conversions" },
  { date: "09.2025", title: "Contrast & Balance in UI Design", cat: "Theory", slug: "contrast-balance-ui-design" },
  { date: "08.2025", title: "The Future of SaaS Web Design", cat: "Tech", slug: "future-of-saas-web-design" },
  { date: "07.2025", title: "Optimizing for AI Crawlers", cat: "SEO", slug: "optimizing-websites-for-ai-crawlers" }
];

export default function BlogPage() {
  return (
    <PageWrapper 
      category="Journal"
      title="Insights"
      subtitle="Deep dives into conversion psychology, design engineering, and B2B growth."
    >
      <div className="border-t border-white/10">
        {posts.map((post, i) => (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
          >
            <Link 
              to={`/blog/${post.slug}`}
              className="group flex flex-col md:flex-row md:items-center justify-between py-12 border-b border-white/10 hover:px-8 transition-all duration-500"
            >
              <div className="flex items-center gap-8 md:gap-16">
                <span className="hidden md:block text-gray-600 font-mono text-xs">{post.date}</span>
                <h3 className="text-3xl md:text-5xl font-black group-hover:text-[#A3D1FF] transition-colors tracking-tighter">
                  {post.title}
                </h3>
              </div>
              <div className="mt-6 md:mt-0 flex items-center gap-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                  {post.cat}
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </PageWrapper>
  );
}