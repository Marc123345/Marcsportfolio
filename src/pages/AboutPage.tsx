import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Target, Users, Code, Sparkles, Lightbulb, Layers, Database, Zap, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import SplitText from '@/components/SplitText';
import MagneticButton from '@/components/MagneticButton';

interface ExpertiseCardProps {
  icon: any;
  title: string;
  description: string;
  features?: string[];
}

function ExpertiseCard({ icon: Icon, title, description, features }: ExpertiseCardProps) {
  return (
    <div className="bg-[#1b1b1b] p-8 rounded-xl border border-white/10 hover:border-[#A78BFA] transition-all group h-full">
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-[#A78BFA]/20 blur-xl rounded-full"></div>
        <div className="bg-[#A78BFA]/10 p-4 rounded-xl relative">
          <Icon className="w-8 h-8 text-[#A78BFA] group-hover:scale-110 transition-transform" />
        </div>
      </div>
      <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
      <p className="text-gray-400">{description}</p>
      {features && (
        <div className="flex flex-wrap gap-2 mt-4">
          {features.map((feature, index) => (
            <span 
              key={index} 
              className="px-3 py-1 bg-white/5 rounded-full text-sm text-[#A78BFA]"
            >
              {feature}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function BenefitCard({ title, description }: {
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function ProcessCard({ title, description, items }: {
  title: string;
  description: string;
  items: string[];
}) {
  return (
    <div className="bg-[#1b1b1b] p-8 rounded-xl border border-white/10 hover:border-[#A78BFA] transition-all h-full">
      <h3 className="text-xl font-semibold text-white mb-4">{title}</h3>
      <p className="text-gray-400 mb-6">{description}</p>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center text-gray-300">
            <ArrowRight className="w-4 h-4 text-[#A78BFA] mr-2 flex-shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SkillBar({ name, percentage }: { name: string; percentage: string }) {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-white">{name}</span>
        <span className="text-gray-400">{percentage}</span>
      </div>
      <div className="h-2 bg-[#1b1b1b] rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-[#A78BFA] rounded-full transition-all duration-1000"
          initial={{ width: 0 }}
          whileInView={{ width: percentage }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        ></motion.div>
      </div>
    </div>
  );
}

export default function AboutPage() {
  const navigate = useNavigate();
  
  // Person schema for structured data
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Marc Friedman",
    "jobTitle": "Full Stack Designer & Developer",
    "description": "A passionate full-stack designer and developer creating websites that bring businesses customers.",
    "knowsAbout": [
      "Web Development",
      "UI/UX Design",
      "SaaS Development",
      "API Development",
      "Design Systems"
    ],
    "url": "https://www.marcfriedmanportfolio.com/about",
    "sameAs": [
      "https://www.linkedin.com/in/portfolio2/",
      "https://g.co/kgs/78fRZ6r"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Tel Aviv",
      "addressCountry": "IL"
    }
  };

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        ease: [0.22, 1, 0.36, 1] 
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>About Marc Friedman - Full Stack Designer & Developer</title>
        <meta name="description" content="Meet Marc Friedman, a passionate full-stack designer and developer creating websites that bring businesses customers. Specializing in web development, UI/UX design, and SaaS solutions for clients across three continents." />
        
        <meta property="og:type" content="profile" />
        <meta property="og:title" content="About Marc Friedman - Full Stack Designer & Developer" />
        <meta property="og:description" content="Meet Marc Friedman, a passionate full-stack designer and developer creating websites that bring businesses customers." />
        <meta property="og:image" content="https://marcfriedmanportfolio.com/og-image.jpg" />
        <meta property="og:url" content="https://marcfriedmanportfolio.com/about" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Marc Friedman - Full Stack Designer & Developer" />
        <meta name="twitter:description" content="Meet Marc Friedman, a passionate full-stack designer and developer creating websites that bring businesses customers." />
        <meta name="twitter:image" content="https://marcfriedmanportfolio.com/og-image.jpg" />
        
        <meta name="keywords" content="Marc Friedman, Full Stack Developer, UI/UX Designer, Web Development, SaaS Development, Design Systems, Portfolio" />
        <meta name="author" content="Marc Friedman" />
        <link rel="canonical" href="https://www.marcfriedmanportfolio.com/about" />
        
        <script type="application/ld+json">
          {JSON.stringify(personSchema)}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://ik.imagekit.io/qcvroy8xpd/PW8VUKH.png?updatedAt=1759693058055&tr=f-webp"
            alt="Marc Friedman - Full Stack Designer & Developer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/90"></div>
        </div>

        <div className="container-custom relative z-10">
          <motion.div 
            className="max-w-3xl"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            <motion.h1
              className="font-heading text-[clamp(2.2rem,4vw,3rem)] font-semibold tracking-[-0.01em] text-white leading-[1.15] mb-6"
              variants={fadeInUp}
            >
              About Marc Friedman
            </motion.h1>
            <motion.h2
              className="font-body text-xl sm:text-2xl text-[#A78BFA] mb-6"
              variants={fadeInUp}
            >
              Full Stack Designer & Developer
            </motion.h2>
            <motion.p
              className="font-heading text-2xl sm:text-3xl font-semibold tracking-[-0.01em] leading-[1.15] text-[#A78BFA] mb-6"
              variants={fadeInUp}
            >
              The websites I build pay for themselves.
            </motion.p>
            <motion.p 
              className="text-xl text-gray-300 mb-8"
              variants={fadeInUp}
            > 
              I design and build websites that bring businesses customers. Not traffic. Not impressions. <strong className="text-white">Actual paying customers.</strong> Over the last 6 years, I've done this for 50+ businesses across the US, Israel, and Africa — from locksmith shops to fintech startups to Olympic athletes.
            </motion.p>
            <motion.p className="text-xl text-gray-300 mb-8" variants={fadeInUp}>As a freelance designer and developer, I build custom websites from scratch — React, Next.js, TypeScript. No templates, no page builders, no junior devs. Just me and your project.</motion.p>
            <motion.div 
              variants={fadeInUp}
              className="flex flex-wrap gap-4"
            >
              <MagneticButton>
                <Link to="/work" className="mr_btn mr_btn_outline">
                  <span>View Portfolio</span>
                </Link>
              </MagneticButton>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Images */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="aspect-[4/3] overflow-hidden rounded-xl">
                <img
                  src="https://ik.imagekit.io/qcvroy8xpd/PW8VUKH.png?updatedAt=1759693058055&tr=f-webp"
                  alt="Marc Friedman Working"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="aspect-[4/3] overflow-hidden rounded-xl">
                <img 
                  src="https://i.imgur.com/IU0mmH7.jpeg"
                  alt="Marc's Project"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </motion.div>
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="aspect-[4/3] overflow-hidden rounded-xl">
                <img 
                  src="https://ik.imagekit.io/qcvroy8xpd/uoq5Ztg.jpeg"
                  alt="Marc Coding"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="aspect-[4/3] overflow-hidden rounded-xl">
                <img 
                  src="https://ik.imagekit.io/qcvroy8xpd/TTV8Liw.jpg"
                  alt="Technical Skills"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-3xl font-bold mb-12 text-white">The Problems I Solve</h2>
            <div className="bg-[#1b1b1b] p-8 rounded-lg shadow-md mb-16">
              <p className="text-xl text-gray-300 mb-6">
                My clients typically come to me with specific challenges that are holding back their digital growth:
              </p>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <ArrowRight className="w-5 h-5 text-[#A78BFA] mt-1 mr-3 flex-shrink-0" />
                    <p className="text-white"><strong>Outdated digital presence</strong> that fails to reflect their brand quality and vision</p>
                  </div>
                  <div className="flex items-start">
                    <ArrowRight className="w-5 h-5 text-[#A78BFA] mt-1 mr-3 flex-shrink-0" />
                    <p className="text-white"><strong>Low conversion rates</strong> despite decent traffic, with users dropping off before taking action</p>
                  </div>
                  <div className="flex items-start">
                    <ArrowRight className="w-5 h-5 text-[#A78BFA] mt-1 mr-3 flex-shrink-0" />
                    <p className="text-white"><strong>Slow, poorly performing websites</strong> that frustrate users and hurt search rankings</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <ArrowRight className="w-5 h-5 text-[#A78BFA] mt-1 mr-3 flex-shrink-0" />
                    <p className="text-white"><strong>Disconnected systems</strong> requiring manual work that could be automated</p>
                  </div>
                  <div className="flex items-start">
                    <ArrowRight className="w-5 h-5 text-[#A78BFA] mt-1 mr-3 flex-shrink-0" />
                    <p className="text-white"><strong>Difficulty translating business ideas</strong> into technical requirements</p>
                  </div>
                  <div className="flex items-start">
                    <ArrowRight className="w-5 h-5 text-[#A78BFA] mt-1 mr-3 flex-shrink-0" />
                    <p className="text-white"><strong>Lack of strategic direction</strong> for digital initiatives and technology investments</p>
                  </div>
                </div>
              </div>
              <p className="text-xl text-gray-300 mt-6">
                My approach combines strategic thinking with technical skill to solve these challenges. I don't just build websites or apps—I create <strong className="text-white">digital experiences that solve real business problems and drive real revenue</strong>.
              </p>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <h2 className="text-3xl font-bold text-white mb-12">My Expertise</h2>
              <div className="grid gap-8">
                <ExpertiseCard
                  icon={Target}
                  title="Strategy & Planning"
                  description="Strategic planning and roadmap development that aligns with your business goals."
                  features={[
                    "Market Research",
                    "User Analysis",
                    "Competitive Analysis",
                    "ROI Planning"
                  ]}
                />
                <ExpertiseCard
                  icon={Users}
                  title="UI/UX Design"
                  description="User-centered design that transforms visitors into customers."
                  features={[
                    "User Research",
                    "Wireframing",
                    "Prototyping",
                    "Design Systems"
                  ]}
                />
                <ExpertiseCard
                  icon={Code}
                  title="Development"
                  description="Modern technologies and performance optimization for strong results."
                  features={[
                    "React/Next.js",
                    "Node.js",
                    "TypeScript",
                    "API Development"
                  ]}
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <img
                src="https://ik.imagekit.io/qcvroy8xpd/PW8VUKH.png?updatedAt=1759693058055&tr=f-webp"
                alt="Marc Friedman"
                className="rounded-xl shadow-2xl hover:scale-105 transition-transform duration-500"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#1b1b1b]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <img 
                src="https://i.imgur.com/PiKh199.png"
                alt="Technical Skills"
                className="rounded-xl shadow-2xl hover:scale-105 transition-transform duration-500"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <h2 className="text-3xl font-bold text-white mb-12">Technical Skills</h2>
              <div className="grid gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-6 text-white">Design</h3>
                  <SkillBar name="UI/UX Design" percentage="95%" />
                  <SkillBar name="Design Systems" percentage="90%" />
                  <SkillBar name="Wireframing" percentage="95%" />
                  <SkillBar name="Prototyping" percentage="90%" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-6 text-white">Development</h3>
                  <SkillBar name="React/Next.js" percentage="95%" />
                  <SkillBar name="TypeScript" percentage="90%" />
                  <SkillBar name="Node.js" percentage="85%" />
                  <SkillBar name="PostgreSQL" percentage="80%" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-3xl font-bold text-white mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, amount: 0.3 }}
          >
            My Approach
          </motion.h2>
          <div className="grid md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <ProcessCard
                title="Discover"
                description="Understanding your business goals, challenges, and market position."
                items={[
                  "In-depth stakeholder interviews",
                  "Market analysis",
                  "User research with real customers",
                  "Competitive audit with actionable insights"
                ]}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <ProcessCard
                title="Define"
                description="Translating research insights into clear strategies and requirements."
                items={[
                  "Strategic roadmap with measurable KPIs",
                  "Detailed user personas based on research",
                  "Information architecture optimized for conversions",
                  "Technical requirements with scalability in mind"
                ]}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <ProcessCard
                title="Design"
                description="Creating intuitive interfaces and seamless user experiences."
                items={[
                  "Data-driven wireframing process",
                  "Conversion-focused UI design",
                  "Interactive prototyping for user testing",
                  "Design systems for consistency"
                ]}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <ProcessCard
                title="Develop"
                description="Building scalable solutions with modern technologies."
                items={[
                  "SEO-optimized frontend development",
                  "Secure backend integration",
                  "High quality scores through best practices",
                  "Thorough testing & QA process"
                ]}
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#1b1b1b]">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-3xl font-bold text-white mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, amount: 0.3 }}
          >
            Client Success Stories
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="bg-[#2d3035] p-6 rounded-xl border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-4">Binns Media Group</h3>
                <p className="text-gray-400 mb-4">
                  <strong className="text-white">Challenge:</strong> Outdated platform with poor user engagement and high bounce rates.
                </p>
                <p className="text-gray-400 mb-4">
                  <strong className="text-white">Solution:</strong> Complete redesign with modern architecture, intuitive navigation, and optimized performance.
                </p>
                <p className="text-gray-400">
                  <strong className="text-white">Result:</strong> Increased engagement, faster load times, and improved content discovery.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="bg-[#2d3035] p-6 rounded-xl border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-4">Wellness TCYS</h3>
                <p className="text-gray-400 mb-4">
                  <strong className="text-white">Challenge:</strong> Manual booking processes consuming hours weekly and limiting business growth.
                </p>
                <p className="text-gray-400 mb-4">
                  <strong className="text-white">Solution:</strong> Full digital platform with automated booking and client management.
                </p>
                <p className="text-gray-400">
                  <strong className="text-white">Result:</strong> Dramatic increase in bookings, reduced administrative work, and improved client retention.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="bg-[#2d3035] p-6 rounded-xl border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-4">MarginX</h3>
                <p className="text-gray-400 mb-4">
                  <strong className="text-white">Challenge:</strong> Dealerships making decisions based on outdated, fragmented market data.
                </p>
                <p className="text-gray-400 mb-4">
                  <strong className="text-white">Solution:</strong> Real-time data platform with intuitive visualizations and AI-powered recommendations.
                </p>
                <p className="text-gray-400">
                  <strong className="text-white">Result:</strong> Faster decisions, higher profits, and significant time savings for dealerships.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-3xl font-bold text-white mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, amount: 0.3 }}
          >
            Why Work With Me
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="bg-[#2d3035] p-6 rounded-xl border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-4">Results-Driven</h3>
                <p className="text-gray-400"> 
                  I focus on creating digital experiences that drive <strong className="text-white">measurable business outcomes</strong>, not just pretty designs. My projects deliver <strong className="text-white">increased conversions</strong>.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="bg-[#2d3035] p-6 rounded-xl border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-4">Full-Stack Expertise</h3>
                <p className="text-gray-400"> 
                  With skills spanning design and development, I deliver <strong className="text-white">cohesive solutions without handoff issues</strong>. This integrated approach <strong className="text-white">reduces project timelines</strong>.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="bg-[#2d3035] p-6 rounded-xl border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-4">Strategic Partner</h3>
                <p className="text-gray-400"> 
                  I work as an extension of your team, providing <strong className="text-white">strategic guidance beyond just execution</strong>. My clients report <strong className="text-white">improvement in decision-making</strong> efficiency.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Personal Life Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-3xl font-bold text-white mb-8">Beyond Work</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <p className="text-xl text-gray-300 mb-6">
                  I live in Tel Aviv, where I split my time between Figma and the Mediterranean. I mentor design students, contribute to open-source React tooling, and have an unreasonable opinion about which café in Florentin has the best espresso.
                </p>
                <p className="text-xl text-gray-300 mb-6">
                  When I'm not building websites, I'm probably hiking somewhere with a camera. The photography helps me see composition differently — which shows up in every layout I design.
                </p>
                <p className="text-xl text-gray-300">
                  Having worked on both the design and engineering side of 50+ projects, I see problems from angles that specialists miss. That's the real advantage of hiring someone who does both.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-square overflow-hidden rounded-xl">
                  <img
                    src="https://ik.imagekit.io/qcvroy8xpd/PW8VUKH.png?updatedAt=1759693058055&tr=f-webp"
                    alt="Marc Friedman Portrait"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="aspect-square overflow-hidden rounded-xl">
                  <img
                    src="https://ik.imagekit.io/qcvroy8xpd/PW8VUKH.png?updatedAt=1759693058055&tr=f-webp"
                    alt="Marc Friedman Working"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="aspect-square overflow-hidden rounded-xl">
                  <img 
                    src="https://ik.imagekit.io/qcvroy8xpd/uoq5Ztg.jpeg"
                    alt="Marc Coding"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="aspect-square overflow-hidden rounded-xl">
                  <img 
                    src="https://ik.imagekit.io/qcvroy8xpd/TTV8Liw.jpg"
                    alt="Marc's Workspace"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Discuss Your Project?</h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Let's schedule a call to explore how I can help you achieve your digital goals.
            </p>
            <MagneticButton>
              <button onClick={() => navigate('/contact')} className="mr_btn mr_btn_primary">
                <span>Get in Touch</span>
              </button>
            </MagneticButton>
            
            {/* Related Links */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <h3 className="text-xl font-semibold text-white mb-6">Explore My Work</h3>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/work"
                  className="mr_btn mr_btn_outline"
                  title="View portfolio and case studies"
                >
                  <span>Portfolio & Case Studies</span>
                </Link>
                <Link
                  to="/blog"
                  className="mr_btn mr_btn_outline"
                  title="Read design and development insights"
                >
                  <span>Blog & Insights</span>
                </Link>
                <Link
                  to="/tools/website-analyzer"
                  className="mr_btn mr_btn_outline"
                  title="Try my free website analyzer"
                >
                  <span>Free Website Analysis</span>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}