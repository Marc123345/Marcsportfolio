import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ArrowRight, Filter, CheckCircle2, Calendar, Linkedin, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ReviewCard from '@/components/ReviewCard';
import MagneticButton from '@/components/MagneticButton';
import TextReveal from '@/components/TextReveal';
import ParticleBackground from '@/components/ParticleBackground';
import { AnimatedHeading } from '@/components/TextScramble';
import SectionHeading from '@/components/SectionHeading';

// Testimonial schema for SEO
const testimonialSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Client Success Stories - Marc Friedman",
  "description": "Read what clients say about working with Marc Friedman. Discover how our design and development solutions have helped businesses achieve measurable results.",
  "mainEntity": {
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": "Review",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5"
          },
          "author": {
            "@type": "Person",
            "name": "Omar Turner"
          },
          "reviewBody": "Marc was able to execute the vision perfectly! He's big on communication and easy to speak with. Marc dedicates his time to the client, ensuring the client is completely satisfied at each step of the process."
        }
      },
      {
        "@type": "ListItem",
        "position": 2,
        "item": {
          "@type": "Review",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5"
          },
          "author": {
            "@type": "Person",
            "name": "Yaron Peretz"
          },
          "reviewBody": "Marc was absolutely phenomenal in building the landing page for my business. His care for client satisfaction is unparalleled. He was timely, and took great attention to learning my business & my brand thoroughly."
        }
      },
      {
        "@type": "ListItem",
        "position": 3,
        "item": {
          "@type": "Review",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5"
          },
          "author": {
            "@type": "Person",
            "name": "Peng Zhang"
          },
          "reviewBody": "Marc excels in crafting intuitive, data-centric design solutions that have greatly enhanced our platform's usability and visual analytics."
        }
      }
    ]
  }
};

// Testimonial data
const testimonials = [
  {
    name: "Bradley Thompson",
    rating: 5,
    content: "Marc's expertise in web development is truly exceptional. He delivered a website that not only looks stunning but also performs flawlessly. His attention to detail and commitment to quality made the entire process smooth and enjoyable."
  },
  {
    name: "Jayden Youngleson",
    rating: 5,
    content: "It has been an absolute pleasure working alongside Marc. His deep knowledge, strong work ethic, and commitment to delivering results have made a significant impact on our team. Marc consistently went above and beyond to meet our development needs, and I highly recommend him to anyone seeking a reliable and skilled professional."
  },
  {
    name: "Yaron Peretz",
    rating: 5,
    content: "Marc was absolutely phenomenal in building the landing page for my business. His care for client satisfaction is unparalleled. He was timely, and took great attention to learning my business & my brand thoroughly. Only good things to say about Marc. I highly recommend him."
  },
  {
    name: "Guneet K. Singh",
    rating: 5,
    content: "My team and I loved working with Marc!! He took the time to understand our goals with our website and adapt as needed. His professionalism, patience and openness to our feedback at every stage made the entire process a seamless collaboration. We'll be sure to bring future projects to him because we know he'll be able to execute them with the care and precision they require. I can't recommend Marc's services enough!"
  },
  {
    name: "Ezra Rubinson",
    rating: 5,
    content: "Fantastic work Marc thank you for building my dream website!!"
  },
  {
    name: "Elior Daniely",
    rating: 5,
    content: "Marc did an amazing job on my website! He was professional, responsive, and delivered a design that exceeded my expectations. Highly recommend!"
  },
  {
    name: "Benny Even Ari",
    rating: 5,
    content: "Marc demonstrated exceptional skill in creating a sophisticated platform that perfectly aligns with our investment and real estate needs. His understanding of both technology and business requirements resulted in an outstanding solution."
  },
  {
    name: "Hilla Dayan",
    rating: 5,
    content: "I wanted to wholeheartedly recommend Marc, who helped me build my wellness website. Working with him was professional, precise, and enjoyable from the very first moment. He guided me through the entire process, listened to all my needs, and built a website that exceeded my expectations! He has a great eye for design and knew how to tailor the website perfectly to my target audience. In addition, he also marketed my website and brought me many new clients!"
  },
  {
    name: "Bar Levy",
    rating: 5,
    content: "Marc did a great job studying and elaborating about the various solutions offered nowadays. In addition, he initiated and led UX & UI tasks and provided valuable insights during the entire process. Marc is truly a team player, is constantly eager to learn and build new things and I'm certain that he'll contribute to any project's success."
  },
  {
    name: "Stallone Sweeney",
    rating: 5,
    content: "Loved working with Marc. He listened carefully to my ideas and needs, ensuring that the final website perfectly reflected my vision. His attention to detail and ability to translate complex concepts into a user-friendly design were incredible. I couldn't recommend Marc highly enough for anyone looking for a skilled and reliable web developer."
  },
  {
    name: "Lior Shimon",
    rating: 5,
    content: "Marc built my dream website he is great at what he does and also a great, guy"
  },
  {
    name: "Yosi Lugassy",
    rating: 5,
    content: "Marc built me the website I dreamed of. He was patient, timely, and professional. Thank you and good luck."
  },
  {
    name: "Shalom Landman",
    rating: 5,
    content: "Marc designed and created my website, and I couldn't be happier with the result! The site looks absolutely amazing, runs smoothly, and perfectly captures what I was looking for."
  },
  {
    name: "Julia Friedman",
    rating: 5,
    content: "Marc is super helpful, very knowledgeable and an expert in field. I highly recommend him."
  },
  {
    name: "Peng Zhang",
    rating: 5,
    content: "Marc excels in crafting intuitive, data-centric design solutions that have greatly enhanced our platform's usability and visual analytics. His design system implementation has improved our workflow efficiency and consistency."
  }
];

// Industry categories for filtering
const industries = [
  { id: 'all', label: 'All Industries' },
  { id: 'tech', label: 'Technology & SaaS' },
  { id: 'media', label: 'Media & Entertainment' },
  { id: 'health', label: 'Health & Wellness' },
  { id: 'real-estate', label: 'Real Estate' },
  { id: 'professional', label: 'Professional Services' }
];

// Featured testimonials with more details
const featuredTestimonials = [
  {
    name: "Omar Turner",
    role: "Chief Executive Officer",
    company: "Binns Media Group",
    image: "https://i.imgur.com/NKjkUC9.jpeg",
    content: "Marc was able to execute the vision perfectly! He's big on communication and easy to speak with. Marc dedicates his time to the client, ensuring the client is completely satisfied at each step of the process. I highly recommend Marc's services to anyone who needs a web developer who can execute on a vision and provide a professional finished product!",
    project: "Media Platform Redesign",
    results: [
      "40% increase in user engagement",
      "60% faster load times",
      "98/100 PageSpeed score"
    ],
    linkedin: "https://www.linkedin.com/in/omar-turner-92b188130"
  },
  {
    name: "Yaron Peretz",
    role: "Founder",
    company: "Irreplicable",
    image: "https://i.imgur.com/cP2GDPD.jpeg",
    content: "Marc was absolutely phenomenal in building the landing page for my business. His care for client satisfaction is unparalleled. He was timely, and took great attention to learning my business & my brand thoroughly. Only good things to say about Marc. I highly recommend him.",
    project: "Premium Landing Page",
    results: [
      "90% increase in qualified leads",
      "85% improvement in lead quality",
      "4.8/5 client satisfaction"
    ],
    linkedin: "https://www.linkedin.com/in/yaron-peretz-ghostwriter"
  },
  {
    name: "Peng Zhang",
    role: "VP Product",
    company: "MarginX.ai",
    image: "https://i.imgur.com/3DtZKd7.jpeg",
    content: "Marc excels in B2B SaaS and marketplace design. His ability to understand business needs and translate them into effective, data-driven solutions significantly enhanced our user experience and technical execution. His work on the MarginX dashboard transformed how our dealers interact with market data, directly contributing to our rapid growth and customer satisfaction.",
    project: "SaaS Dashboard Design",
    results: [
      "35% faster decision-making",
      "20% higher profits for clients",
      "40% time saved in operations"
    ],
    linkedin: "https://www.linkedin.com/in/peng-zhang-55a653113"
  }
];

export default function TestimonialsPage() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');
  const [visibleCount, setVisibleCount] = useState(6);
  const [filteredTestimonials, setFilteredTestimonials] = useState(testimonials);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  
  // Filter testimonials based on selected industry
  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredTestimonials(testimonials);
      return;
    }
    
    // In a real implementation, you would filter based on industry tags
    // For this demo, we'll just show a subset based on the filter
    const filtered = testimonials.filter((_, index) => {
      if (activeFilter === 'tech') return [0, 2, 9, 15].includes(index);
      if (activeFilter === 'media') return [0, 4, 11].includes(index);
      if (activeFilter === 'health') return [8, 14].includes(index);
      if (activeFilter === 'real-estate') return [6, 7, 13].includes(index);
      if (activeFilter === 'professional') return [1, 3, 5, 10, 12].includes(index);
      return true;
    });
    
    setFilteredTestimonials(filtered);
    setVisibleCount(6); // Reset visible count when filtering
  }, [activeFilter]);
  
  // Auto-rotate featured testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % featuredTestimonials.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);
  
  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + 6, filteredTestimonials.length));
  };
  
  const handleFilterChange = (filterId: string) => {
    setActiveFilter(filterId);
    
    // Scroll to testimonials section
    if (testimonialsRef.current) {
      testimonialsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <Helmet>
        <title>Client Success Stories & Testimonials - Marc Friedman | 40+ Happy Clients</title>
        <meta name="description" content="Read testimonials from 40+ satisfied clients who achieved measurable results with Marc Friedman's design and development services. 5.0/5 average rating with 98% client retention rate." />
        <meta name="keywords" content="client testimonials, customer reviews, web development testimonials, UI/UX design reviews, client success stories, 5-star reviews" />
        <script type="application/ld+json">
          {JSON.stringify(testimonialSchema)}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-black overflow-hidden">
        <ParticleBackground particleCount={50} particleColor="#A3D1FF" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl">
            <AnimatedHeading 
              text="Client Success Stories" 
              className="text-4xl sm:text-5xl font-bold mb-6"
              element="h1"
            />
            <motion.p 
              className="text-xl text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Don't just take our word for it. Hear directly from clients who have transformed their digital presence and achieved <strong className="text-white">measurable business results</strong> through our partnership.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-[#1b1b1b]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <motion.div 
              className="bg-[#1b1b1b] p-4 sm:p-6 rounded-xl border border-white/10 hover:border-[#A3D1FF] transition-all text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-2xl sm:text-4xl font-bold text-[#A3D1FF] mb-1 sm:mb-2">40+</div>
              <div className="text-xs sm:text-sm text-gray-400">Satisfied Clients</div>
            </motion.div>
            <motion.div 
              className="bg-[#1b1b1b] p-4 sm:p-6 rounded-xl border border-white/10 hover:border-[#A3D1FF] transition-all text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-2xl sm:text-4xl font-bold text-[#A3D1FF] mb-1 sm:mb-2">5.0</div>
              <div className="text-xs sm:text-sm text-gray-400">Average Rating</div>
            </motion.div>
            <motion.div 
              className="bg-[#1b1b1b] p-4 sm:p-6 rounded-xl border border-white/10 hover:border-[#A3D1FF] transition-all text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="text-2xl sm:text-4xl font-bold text-[#A3D1FF] mb-1 sm:mb-2">98%</div>
              <div className="text-xs sm:text-sm text-gray-400">Client Retention</div>
            </motion.div>
            <motion.div 
              className="bg-[#1b1b1b] p-4 sm:p-6 rounded-xl border border-white/10 hover:border-[#A3D1FF] transition-all text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="text-2xl sm:text-4xl font-bold text-[#A3D1FF] mb-1 sm:mb-2">3+</div>
              <div className="text-xs sm:text-sm text-gray-400">Continents Served</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Testimonial Carousel */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#1b1b1b]/50"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <SectionHeading
            title="Featured Client Stories"
            description="See how our solutions have transformed businesses across industries"
          />
          
          <div className="relative h-[500px] sm:h-[400px] md:h-[500px]">
            <AnimatePresence mode="wait">
              {featuredTestimonials.map((testimonial, index) => (
                activeTestimonial === index && (
                  <motion.div
                    key={testimonial.name}
                    className="absolute inset-0"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="bg-[#1b1b1b] p-6 sm:p-8 md:p-12 rounded-xl border border-white/10 h-full">
                      <div className="grid md:grid-cols-5 gap-8 h-full">
                        <div className="md:col-span-2 flex flex-col">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#A3D1FF]">
                              <img 
                                src={testimonial.image} 
                                alt={testimonial.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <h3 className="text-xl font-semibold text-white">{testimonial.name}</h3>
                              <p className="text-[#A3D1FF]">{testimonial.role}</p>
                              <p className="text-gray-400 text-sm">{testimonial.company}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-1 mb-4">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i}
                                className="w-5 h-5 fill-[#FFD700] text-[#FFD700]"
                              />
                            ))}
                          </div>
                          
                          <div className="bg-[#2d3035] p-4 rounded-lg mb-4 flex-grow">
                            <h4 className="text-white font-medium mb-2">Project Results</h4>
                            <ul className="space-y-2">
                              {testimonial.results.map((result, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm">
                                  <CheckCircle2 className="w-4 h-4 text-[#A3D1FF] mt-0.5" />
                                  <span className="text-gray-300">{result}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div className="mt-auto">
                            <a 
                              href={testimonial.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-[#0077B5] hover:underline"
                            >
                              <Linkedin className="w-4 h-4" />
                              <span className="text-sm">Connect on LinkedIn</span>
                            </a>
                          </div>
                        </div>
                        
                        <div className="md:col-span-3 flex flex-col">
                          <div className="relative mb-4">
                            <Quote className="absolute -top-2 -left-2 w-8 h-8 text-[#A3D1FF]/20" />
                            <blockquote className="text-lg sm:text-xl text-gray-300 italic pl-6">
                              "{testimonial.content}"
                            </blockquote>
                          </div>
                          
                          <div className="mt-auto">
                            <div className="bg-[#2d3035] p-4 rounded-lg">
                              <h4 className="text-white font-medium mb-2">Project: {testimonial.project}</h4>
                              <button 
                                onClick={() => navigate('/work')}
                                className="text-[#A3D1FF] text-sm flex items-center gap-1 hover:underline"
                              >
                                View Case Study
                                <ArrowRight className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              ))}
            </AnimatePresence>
            
            {/* Pagination dots */}
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
              {featuredTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    activeTestimonial === index 
                      ? 'bg-[#A3D1FF] w-8' 
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`View testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-[#1b1b1b]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-2xl font-bold text-white">Filter by Industry</h2>
            <div className="flex flex-wrap gap-2">
              {industries.map((industry) => (
                <button
                  key={industry.id}
                  onClick={() => handleFilterChange(industry.id)}
                  className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                    activeFilter === industry.id
                      ? 'bg-[#A3D1FF] text-black'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  {industry.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section ref={testimonialsRef} className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTestimonials.slice(0, visibleCount).map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index % 3 * 0.1,
                  ease: [0.22, 1, 0.36, 1]
                }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <ReviewCard
                  name={testimonial.name}
                  rating={testimonial.rating}
                  content={testimonial.content}
                />
              </motion.div>
            ))}
          </div>
          
          {visibleCount < filteredTestimonials.length && (
            <div className="mt-12 text-center">
              <MagneticButton>
                <button
                  onClick={loadMore}
                  className="inline-flex items-center px-6 py-3 bg-[#A3D1FF] text-black rounded-lg hover:bg-[#92bce6] transition-colors"
                >
                  Load More Testimonials
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              </MagneticButton>
            </div>
          )}
        </div>
      </section>

      {/* Testimonial Stats */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#1b1b1b] relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#A3D1FF]/10 to-transparent"></div>
          <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-gradient-to-tl from-[#A3D1FF]/5 to-transparent rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <SectionHeading
            title="The Results Speak for Themselves"
            description="Our clients consistently see measurable improvements across key performance indicators"
          />
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              className="bg-[#2d3035] p-6 rounded-xl border border-white/10 hover:border-[#A3D1FF] transition-all group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-[#A3D1FF]/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <CheckCircle2 className="w-6 h-6 text-[#A3D1FF]" />
                </div>
                <h3 className="text-xl font-semibold text-white">Website Performance</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-[#A3D1FF] mr-3" />
                  98/100 average PageSpeed score
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-[#A3D1FF] mr-3" />
                  40% increase in page engagement
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-[#A3D1FF] mr-3" />
                  60% faster load times
                </li>
              </ul>
            </motion.div>
            
            <motion.div 
              className="bg-[#2d3035] p-6 rounded-xl border border-white/10 hover:border-[#A3D1FF] transition-all group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-[#A3D1FF]/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <CheckCircle2 className="w-6 h-6 text-[#A3D1FF]" />
                </div>
                <h3 className="text-xl font-semibold text-white">Business Impact</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-[#A3D1FF] mr-3" />
                  35% average increase in conversions
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-[#A3D1FF] mr-3" />
                  150% growth in qualified leads
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-[#A3D1FF] mr-3" />
                  25% reduction in operational costs
                </li>
              </ul>
            </motion.div>
            
            <motion.div 
              className="bg-[#2d3035] p-6 rounded-xl border border-white/10 hover:border-[#A3D1FF] transition-all group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-[#A3D1FF]/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <CheckCircle2 className="w-6 h-6 text-[#A3D1FF]" />
                </div>
                <h3 className="text-xl font-semibold text-white">Client Satisfaction</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-[#A3D1FF] mr-3" />
                  5.0/5.0 average client rating
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-[#A3D1FF] mr-3" />
                  98% client retention rate
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-[#A3D1FF] mr-3" />
                  90% of new clients from referrals
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Recognition Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-white mb-6">Industry Recognition</h2>
              <p className="text-gray-300 mb-6">
                Our commitment to excellence has been recognized by industry leaders and professional organizations.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-[#A3D1FF] mt-1 mr-3" />
                  <p className="text-gray-300">Featured on Awwwards for exceptional design</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-[#A3D1FF] mt-1 mr-3" />
                  <p className="text-gray-300">Top-rated on DesignRush for client satisfaction</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-[#A3D1FF] mt-1 mr-3" />
                  <p className="text-gray-300">Recognized for technical excellence by industry peers</p>
                </div>
              </div>
              <div className="mt-8 flex gap-4">
                <a 
                  href="https://www.linkedin.com/in/portfolio2/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-[#0077B5]/10 hover:bg-[#0077B5]/20 text-[#0077B5] rounded-lg transition-all hover:scale-105 group"
                >
                  <Linkedin className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                  <span className="font-medium">LinkedIn Recommendations</span>
                </a>
                <a 
                  href="https://www.awwwards.com/marc-friedman/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-[#FFB800]/10 hover:bg-[#FFB800]/20 text-[#FFB800] rounded-lg transition-all hover:scale-105 group"
                >
                  <Trophy className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                  <span className="font-medium">Award Recognition</span>
                </a>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="bg-[#1b1b1b] p-6 rounded-xl border border-white/10 hover:border-[#A3D1FF] transition-all flex flex-col items-center justify-center aspect-square">
                <Trophy className="w-12 h-12 text-[#FFB800] mb-4" />
                <h3 className="text-lg font-semibold text-white text-center mb-2">Awwwards</h3>
                <p className="text-gray-400 text-sm text-center">Excellence in Digital Design</p>
              </div>
              <div className="bg-[#1b1b1b] p-6 rounded-xl border border-white/10 hover:border-[#A3D1FF] transition-all flex flex-col items-center justify-center aspect-square">
                <Star className="w-12 h-12 text-[#A3D1FF] mb-4" />
                <h3 className="text-lg font-semibold text-white text-center mb-2">5.0 Rating</h3>
                <p className="text-gray-400 text-sm text-center">Across All Platforms</p>
              </div>
              <div className="bg-[#1b1b1b] p-6 rounded-xl border border-white/10 hover:border-[#A3D1FF] transition-all flex flex-col items-center justify-center aspect-square">
                <Linkedin className="w-12 h-12 text-[#0077B5] mb-4" />
                <h3 className="text-lg font-semibold text-white text-center mb-2">LinkedIn</h3>
                <p className="text-gray-400 text-sm text-center">Top Endorsed Skills</p>
              </div>
              <div className="bg-[#1b1b1b] p-6 rounded-xl border border-white/10 hover:border-[#A3D1FF] transition-all flex flex-col items-center justify-center aspect-square">
                <Calendar className="w-12 h-12 text-[#00A2FF] mb-4" />
                <h3 className="text-lg font-semibold text-white text-center mb-2">5+ Years</h3>
                <p className="text-gray-400 text-sm text-center">Industry Experience</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 relative">
        <ParticleBackground particleCount={30} particleColor="#A3D1FF" />
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Join Our Success Stories?</h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Let's create a digital solution that delivers <strong className="text-white">measurable results</strong> for your business and exceeds your expectations.
            </p>
            <MagneticButton>
              <button 
                onClick={() => navigate('/contact')}
                className="inline-flex items-center px-6 py-3 bg-[#A3D1FF] text-black rounded-lg hover:bg-[#92bce6] transition-colors"
              >
                Start Your Project
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </MagneticButton>
            <p className="text-sm text-gray-500 mt-4">
              No obligation. 100% confidential. Free consultation.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}