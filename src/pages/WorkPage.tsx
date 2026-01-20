import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ArrowUpRight, Star, CheckCircle2, Globe, Palette, Award } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import TextReveal from '@/components/TextReveal';
import HoverCard3D from '@/components/HoverCard3D';
import ProjectCard3D from '@/components/ProjectCard3D';
import ParticleBackground from '@/components/ParticleBackground';
import DynamicBackground from '@/components/DynamicBackground';
import PortfolioFilter from '@/components/PortfolioFilter';

interface Project {
  title: string;
  description: string;
  image: string;
  liveUrl?: string;
  caseStudyUrl?: string;
  impact: string[];
  technologies: string[];
  category: 'website' | 'landing' | 'saas';
  featured?: boolean;
  customContent?: React.ReactNode;
}

const projects: Project[] = [
  // Featured Project
  {
    title: "Untapped Africa",
    description: "Revolutionizing water infrastructure solutions across Africa with innovative technology and sustainable practices. A comprehensive platform for project management, data visualization, and community engagement.",
    image: "https://ik.imagekit.io/qcvroy8xpd/New%20Folder/Mockup%201%20-%201x1(1).png?updatedAt=1767539579782",
    liveUrl: "https://untappedafrica.co.za",
    caseStudyUrl: "/work/case-studies/untapped-africa",
    impact: [
      "250% increase in engagement",
      "8 countries impacted",
      "500,000+ people served"
    ],
    technologies: ["Next.js", "TypeScript", "Supabase", "Mapbox GL"],
    category: "website",
    featured: true
  },
  
  // Original Featured Project now as regular
  {
    title: "Binns Media Group Platform",
    description: "A cutting-edge digital media platform designed to showcase BMG's diverse content portfolio including podcasts, TV shows, and exclusive content. The platform serves as both a content hub and a representation of BMG's commitment to amplifying diverse voices in media.",
    image: "https://ik.imagekit.io/qcvroy8xpd/New%20Folder/Mockup%204%20-%2016x9.png?updatedAt=1767539579710",
    liveUrl: "https://www.binnsmediagroup.com",
    caseStudyUrl: "/work/case-studies/binns-media",
    impact: [
      "High performance score",
      "Increased engagement",
      "Faster load times",
      "Excellent uptime"
    ],
    technologies: ["React 18", "TypeScript", "Supabase", "GSAP"],
    category: "website"
  },
  {
    title: "Paving Leads",
    description: "High-velocity SEO engine that dominated search results and ranked #1 on Google for competitive keywords.",
    image: "https://ik.imagekit.io/qcvroy8xpd/New%20Folder/Mockup%204%20-%2016_9.png?updatedAt=1767539579010",
    liveUrl: "https://pavinglead.com/",
    caseStudyUrl: "/work/case-studies/paving-leads",
    impact: [
      "#1 Google ranking",
      "300% increase in organic traffic",
      "Strong lead conversion"
    ],
    technologies: ["React", "Node.js", "SEO Optimization", "Analytics"],
    category: "website"
  },

  // Websites
  {
    title: "A Secure Annapolis Locksmith",
    description: "Professional locksmith website showcasing residential, commercial, and automotive services.",
    image: "https://ik.imagekit.io/qcvroy8xpd/New%20Folder/Mockup%201%20-%201x1(2).png?updatedAt=1767539579194",
    liveUrl: "https://www.asecureannapolislocksmith.com",
    caseStudyUrl: "/work/case-studies/secure-annapolis",
    impact: [
      "Increased leads",
      "Strong mobile conversion",
      "Excellent customer rating"
    ],
    technologies: ["React", "Node.js", "Tailwind CSS", "Local SEO"],
    category: "website"
  },
  {
    title: "Friedman & Cohen",
    description: "Professional B2B procurement platform for property developers.",
    image: "https://ik.imagekit.io/qcvroy8xpd/New%20Folder/Mockup%201%20-%201x1(3).png?updatedAt=1767539579776",
    liveUrl: "https://b2b.fandc.co.za",
    caseStudyUrl: "/work/case-studies/friedman-cohen",
    impact: [
      "100+ years of excellence",
      "High customer rating",
      "Multiple property partners"
    ],
    technologies: ["React", "Node.js", "PostgreSQL"],
    category: "saas"
  },
  {
    title: "Tar & Chip Paving",
    description: "Specialized surface solutions showcase for tar and chip paving applications.",
    image: "https://ik.imagekit.io/qcvroy8xpd/New%20Folder/Mockup%204%20-%2016x9(5).png?updatedAt=1767539578933",
    liveUrl: "https://cumberlandtarchip.org/",
    caseStudyUrl: "/work/case-studies/tar-chip-paving",
    impact: [
      "Professional web presence",
      "Mobile-optimized design",
      "Industry-focused aesthetic"
    ],
    technologies: ["React", "Tailwind CSS", "Responsive Design"],
    category: "website"
  },

  // Landing Pages
  {
    title: "Chad Le Clos Swimming",
    description: "Professional landing page for Olympic champion's swimming clinics.",
    image: "https://i.imgur.com/ApfYPlH.jpg",
    liveUrl: "https://chadleclosswimming.com",
    caseStudyUrl: "/work/case-studies/chad-le-clos",
    impact: [
      "Numerous sign-ups in days",
      "High form completion rate",
      "Strong mobile conversion rate"
    ],
    technologies: ["Next.js", "Tailwind CSS", "Framer Motion"],
    category: "landing"
  },

  // SaaS Projects
  {
    title: "iLight",
    description: "Modern lighting e-commerce platform with seamless user experience.",
    image: "https://ik.imagekit.io/qcvroy8xpd/New%20Folder/Mockup%204%20-%2016x9(4).png?updatedAt=1767539579060",
    liveUrl: "https://ilight.co.za",
    caseStudyUrl: "/work/case-studies/ilight",
    impact: [
      "Modern shopping experience",
      "Increased conversions",
      "Excellent mobile performance"
    ],
    technologies: ["Next.js", "Shopify", "TypeScript"],
    category: "saas"
  },
  {
    title: "MyTube Platform",
    description: "Video metadata management system for media and manufacturing.",
    image: "https://ik.imagekit.io/qcvroy8xpd/QNHXpzT%20(1).jpeg",
    caseStudyUrl: "/work/case-studies/mytube",
    impact: [
      "Faster metadata processing",
      "High user satisfaction",
      "Significant time saved in analysis"
    ],
    technologies: ["React", "Node.js", "AI/ML", "PostgreSQL"],
    category: "saas"
  },
  {
    title: "Fleet Management System",
    description: "Comprehensive fleet tracking and management solution.",
    image: "https://i.imgur.com/EwgHAuK.png",
    caseStudyUrl: "/work/case-studies/fleet-management",
    impact: [
      "Improved fleet efficiency",
      "Cost reduction",
      "High user satisfaction"
    ],
    technologies: ["React Native", "Node.js", "MongoDB"],
    category: "saas"
  },
  {
    title: "AutoMarginX",
    description: "Dealership management platform with real-time analytics.",
    image: "https://i.imgur.com/PiKh199.png",
    caseStudyUrl: "/work/case-studies/automarginx",
    impact: [
      "Faster decisions",
      "Higher profits",
      "Significant time saved"
    ],
    technologies: ["React", "Node.js", "PostgreSQL"],
    category: "saas"
  },
  {
    title: "Videoleap",
    description: "AI-powered video editing platform with template marketplace.",
    image: "https://i.imgur.com/SubVB9A.jpeg",
    caseStudyUrl: "/work/case-studies/videoleap",
    impact: [
      "Increased template usage",
      "Better user retention",
      "Enhanced content sharing"
    ],
    technologies: ["React", "Node.js", "AI/ML", "AWS"],
    category: "saas"
  }
];

const portfolioSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Portfolio - Marc Friedman's Digital Design & Development Work",
  "description": "Explore our portfolio of results-driven digital solutions that combine thoughtful design with robust development. Featured projects include websites, landing pages, and SaaS applications.",
  "creator": {
    "@type": "Person",
    "name": "Marc Friedman",
    "jobTitle": "Full Stack Designer & Developer",
    "url": "https://marcfriedmanportfolio.com"
  },
  "mainEntity": {
    "@type": "ItemList",
    "itemListElement": projects.map((project, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "CreativeWork",
        "name": project.title,
        "description": project.description,
        "image": project.image,
        "url": project.liveUrl || `https://marcfriedmanportfolio.com/work/case-studies/${project.caseStudyUrl?.split('/').pop()}`,
        "creator": {
          "@type": "Person",
          "name": "Marc Friedman"
        }
      }
    }))
  }
};

function FeaturedProjectCard({ project }: { project: Project }) {
  const navigate = useNavigate();
  
  return (
    <motion.div 
      className="bg-[#1b1b1b] rounded-xl overflow-hidden border border-white/10 hover:border-[#A3D1FF] transition-all group col-span-full mb-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="grid md:grid-cols-2 gap-8">
        <div className="aspect-[16/10] overflow-hidden relative">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1b1b1b] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <div className="p-6 md:p-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[#A3D1FF] text-sm bg-[#A3D1FF]/10 px-4 py-2 rounded-full">Featured Project</span>
          </div>
          <h3 className="text-xl md:text-3xl font-bold text-white mb-3 md:mb-4">{project.title}</h3>
          <p className="text-sm md:text-base text-gray-400 mb-4 md:mb-6">{project.description}</p>
          <div className="space-y-3 md:space-y-4 mb-4 md:mb-6">
            {project.impact.map((impact, index) => (
              <div key={index} className="flex items-center text-xs md:text-sm">
                <CheckCircle2 className="w-4 h-4 text-[#A3D1FF] mr-2 flex-shrink-0" />
                <span className="text-gray-300">{impact}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
            {project.technologies.map((tech, index) => (
              <span 
                key={index} 
                className="px-2 md:px-3 py-1 bg-white/5 text-[#A3D1FF] rounded-full text-xs md:text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="mr_btn mr_btn_outline">
                <span>View Live Website</span>
              </a>
            )}
            {project.caseStudyUrl && (
              <button onClick={() => navigate(project.caseStudyUrl)} className="mr_btn mr_btn_primary">
                <span>Read Case Study</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function CategoryButton({ children, isActive = false, onClick }: { 
  children: React.ReactNode; 
  isActive?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 md:px-6 py-2 rounded-full transition-all duration-300 text-sm ${
        isActive
          ? 'bg-[#A3D1FF] text-black'
          : 'bg-white/5 text-gray-300 hover:bg-white/10'
      }`}
    >
      {children}
    </button>
  );
}

export default function WorkPage() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  
  // Get filter from URL params
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const filter = urlParams.get('filter');
    if (filter) {
      setActiveFilter(filter);
    }
  }, []);
  
  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(project => {
        switch (activeFilter) {
          case 'media':
            return ['Binns Media Group Platform', 'Videoleap', 'MyTube Platform'].includes(project.title);
          case 'saas':
            return project.category === 'saas';
          case 'ecommerce':
            return ['Friedman & Cohen'].includes(project.title);
          case 'automotive':
            return ['AutoMarginX', 'Fleet Management System'].includes(project.title);
          case 'professional':
            return ['A Secure Annapolis Locksmith', 'Tar & Chip Paving', 'Paving Leads'].includes(project.title);
          case 'social-impact':
            return ['Untapped Africa'].includes(project.title);
          case 'sports':
            return ['Chad Le Clos Swimming'].includes(project.title);
          default:
            return true;
        }
      });

  const filterOptions = [
    { id: 'all', label: 'All Projects' },
    { id: 'media', label: 'Media & Entertainment' },
    { id: 'saas', label: 'SaaS & Technology' },
    { id: 'ecommerce', label: 'E-commerce' },
    { id: 'automotive', label: 'Automotive' },
    { id: 'professional', label: 'Professional Services' },
    { id: 'social-impact', label: 'Social Impact' },
    { id: 'sports', label: 'Sports & Entertainment' }
  ];
  
  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Helmet>
        <title>Portfolio - Marc Friedman's Award-Winning Digital Design & Development Work</title>
        <meta name="description" content="Explore our award-winning portfolio of 50+ digital solutions that drive real business results. Featured projects include high-converting websites, SaaS platforms, and mobile applications for clients across three continents." />
        <meta name="keywords" content="web development portfolio, UI/UX design portfolio, SaaS development case studies, website design examples, digital solutions portfolio, Marc Friedman projects" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Portfolio - Marc Friedman's Award-Winning Digital Design & Development Work" />
        <meta property="og:description" content="Explore our award-winning portfolio of 50+ digital solutions that drive real business results." />
        <meta property="og:image" content="https://marcfriedmanportfolio.com/og-image.jpg" />
        <meta property="og:url" content="https://marcfriedmanportfolio.com/work" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Portfolio - Marc Friedman's Award-Winning Digital Design & Development Work" />
        <meta name="twitter:description" content="Explore our award-winning portfolio of 50+ digital solutions that drive real business results." />
        <meta name="twitter:image" content="https://marcfriedmanportfolio.com/og-image.jpg" />
        
        {/* Additional SEO meta tags */}
        <meta name="keywords" content="portfolio, web development, UI/UX design, SaaS development, case studies, digital projects, Marc Friedman" />
        <meta name="author" content="Marc Friedman" />
        <link rel="canonical" href="https://www.marcfriedmanportfolio.com/work" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(portfolioSchema)}
        </script>
      </Helmet>

      <section 
        ref={heroRef}
        className="relative min-h-[60vh] md:min-h-[80vh] flex items-center justify-center bg-black overflow-hidden"
      >
        {/* Dynamic Background with Depth */}
        <DynamicBackground streakCount={15} particleCount={40} color="#A3D1FF" />
        
        <div className="absolute inset-0 z-0">
          <img 
            src="https://i.imgur.com/IU0mmH7.jpeg"
            alt="Featured portfolio projects by Marc Friedman - web development and design showcase"
            className="w-full h-full object-cover"
            style={{ 
              transform: `translateY(${scrollY * 0.2}px)`,
              transition: 'transform 0.2s ease-out'
            }}
          />
          <div 
            className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/90"
            style={{ backdropFilter: 'blur(2px)' }}
          ></div>
        </div>

        <div className="container-custom relative z-10 py-16 md:py-0">
          <TextReveal className="max-w-3xl">
            <h1 className="font-heading text-[clamp(2.2rem,4vw,3rem)] font-semibold tracking-[-0.01em] text-white leading-[1.15] mb-4 md:mb-6">
              Featured Work
            </h1>
            <p className="font-body text-base md:text-xl leading-[1.7] text-gray-300 mb-6 md:mb-8">
              Explore our portfolio of results-driven digital solutions that combine thoughtful design with robust development.
            </p>
          </TextReveal>

          <motion.div 
            className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8 mt-8 md:mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
          >
            <div className="bg-[#1b1b1b]/80 backdrop-blur-sm p-4 md:p-6 rounded-xl border border-white/10 hover:border-[#A3D1FF] transition-all text-center">
              <div className="text-2xl md:text-4xl font-bold text-[#A3D1FF] mb-1 md:mb-2 counter">50+</div>
              <div className="text-xs md:text-base text-gray-400">Projects Completed</div>
            </div>
            <div className="bg-[#1b1b1b]/80 backdrop-blur-sm p-4 md:p-6 rounded-xl border border-white/10 hover:border-[#A3D1FF] transition-all text-center">
              <div className="text-2xl md:text-4xl font-bold text-[#A3D1FF] mb-1 md:mb-2 counter">6+</div>
              <div className="text-xs md:text-base text-gray-400">Years Experience</div>
            </div>
            <div className="bg-[#1b1b1b]/80 backdrop-blur-sm p-4 md:p-6 rounded-xl border border-white/10 hover:border-[#A3D1FF] transition-all text-center">
              <div className="text-2xl md:text-4xl font-bold text-[#A3D1FF] mb-1 md:mb-2 counter">99%</div>
              <div className="text-xs md:text-base text-gray-400">Client Satisfaction</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 md:py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-[#1b1b1b]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <h2 className="text-2xl font-bold text-white">Filter by Industry</h2>
            <div className="flex flex-wrap gap-2">
              {filterOptions.map((option) => (
                <CategoryButton
                  key={option.id}
                  isActive={activeFilter === option.id}
                  onClick={() => setActiveFilter(option.id)}
                >
                  {option.label}
                </CategoryButton>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-8 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">Portfolio Projects</h2>
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.9 }}
          >
            {filteredProjects.map((project, index) => (
              project.featured ? (
                <FeaturedProjectCard key={index} project={project} />
              ) : (
                <ProjectCard3D 
                  key={index}
                  title={project.title}
                  description={project.description}
                  image={project.image}
                  liveUrl={project.liveUrl}
                  caseStudyUrl={project.caseStudyUrl}
                  impact={project.impact}
                  technologies={project.technologies}
                  index={index}
                />
              )
            ))}
          </motion.div>
          
          {/* Related Content Links */}
          <div className="mt-16 bg-[#1b1b1b] p-8 rounded-xl border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-6">Explore More</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Our Services</h4>
                <div className="space-y-2">
                  <Link 
                    to="/services/web-development" 
                    className="block text-[#A3D1FF] hover:text-white transition-colors"
                    title="Professional web development services"
                  >
                    Web Development Services
                  </Link>
                  <Link 
                    to="/services/design" 
                    className="block text-[#A3D1FF] hover:text-white transition-colors"
                    title="UI/UX design solutions"
                  >
                    UI/UX Design Solutions
                  </Link>
                  <Link 
                    to="/services/saas" 
                    className="block text-[#A3D1FF] hover:text-white transition-colors"
                    title="SaaS development services"
                  >
                    SaaS Development
                  </Link>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Free Tools</h4>
                <div className="space-y-2">
                  <Link 
                    to="/tools/website-analyzer" 
                    className="block text-[#A3D1FF] hover:text-white transition-colors"
                    title="Free website analysis tool"
                  >
                    Website Analyzer Tool
                  </Link>
                  <Link 
                    to="/tools/roi-calculator" 
                    className="block text-[#A3D1FF] hover:text-white transition-colors"
                    title="Calculate website ROI"
                  >
                    ROI Calculator
                  </Link>
                  <Link 
                    to="/tools/project-timeline" 
                    className="block text-[#A3D1FF] hover:text-white transition-colors"
                    title="Project timeline visualization"
                  >
                    Project Timeline
                  </Link>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Learn More</h4>
                <div className="space-y-2">
                  <Link 
                    to="/about" 
                    className="block text-[#A3D1FF] hover:text-white transition-colors"
                    title="About Marc Friedman"
                  >
                    About Marc Friedman
                  </Link>
                  <Link 
                    to="/blog" 
                    className="block text-[#A3D1FF] hover:text-white transition-colors"
                    title="Design and development insights"
                  >
                    Design & Development Blog
                  </Link>
                  <Link 
                    to="/contact" 
                    className="block text-[#A3D1FF] hover:text-white transition-colors"
                    title="Get in touch for your project"
                  >
                    Start Your Project
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#1b1b1b] to-black relative overflow-hidden">
        <DynamicBackground streakCount={8} particleCount={20} color="#A3D1FF" />
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <TextReveal>
            <h2 className="font-heading text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold tracking-[-0.01em] text-white leading-[1.15] mb-4 md:mb-6">Ready to Create Your Success Story?</h2>
            <p className="font-body text-base md:text-xl leading-[1.7] text-gray-400 mb-6 md:mb-10 max-w-2xl mx-auto">
              Let's build something extraordinary together that drives real results for your business.
            </p>
            <Link to="/contact" className="mr_btn mr_btn_primary">
              <span>Start Your Project</span>
            </Link>
          </TextReveal>
        </div>
      </section>
    </>
  );
}