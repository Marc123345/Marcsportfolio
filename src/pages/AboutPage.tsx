import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Target, Users, Code, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import PageWrapper from '@/components/PageWrapper';
import MagneticButton from '@/components/MagneticButton';

// Refined Expertise Card using the .card utility
function ExpertiseCard({ icon: Icon, title, description, features }: any) {
  return (
    <div className="card group h-full">
      <div className="relative mb-8 w-fit">
        <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full group-hover:bg-primary/40 transition-colors"></div>
        <div className="bg-white/5 p-4 rounded-2xl relative border border-white/10">
          <Icon className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-500" />
        </div>
      </div>
      <h3 className="text-2xl font-black mb-4 tracking-tighter text-white">{title}</h3>
      <p className="text-gray-400 leading-relaxed mb-6">{description}</p>
      {features && (
        <div className="flex flex-wrap gap-2">
          {features.map((feature: string, index: number) => (
            <span 
              key={index} 
              className="px-3 py-1 bg-white/5 border border-white/5 rounded-full text-[10px] font-bold uppercase tracking-widest text-primary"
            >
              {feature}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// Refined Process Card with numbering
function ProcessCard({ title, description, items, index }: any) {
  return (
    <div className="card h-full flex flex-col">
      <span className="text-4xl font-black text-white/5 mb-4">0{index + 1}</span>
      <h3 className="text-2xl font-black text-white mb-4 tracking-tighter">{title}</h3>
      <p className="text-gray-400 mb-8 flex-grow">{description}</p>
      <ul className="space-y-3">
        {items.map((item: string, idx: number) => (
          <li key={idx} className="flex items-start text-sm text-gray-300">
            <CheckCircle2 className="w-4 h-4 text-primary mr-3 mt-0.5 flex-shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SkillBar({ name, percentage }: { name: string; percentage: string }) {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-3">
        <span className="text-xs font-bold uppercase tracking-widest text-gray-400">{name}</span>
        <span className="text-xs font-mono text-primary">{percentage}</span>
      </div>
      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-primary"
          initial={{ width: 0 }}
          whileInView={{ width: percentage }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        ></motion.div>
      </div>
    </div>
  );
}

export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>About Marc Friedman | B2B Growth Engineer</title>
        <meta name="description" content="Marc Friedman is a growth-focused designer and developer building high-performance digital ecosystems for B2B brands." />
      </Helmet>

      <PageWrapper 
        category="The Partner"
        title="Engineering Results Through Design"
        subtitle="I bridge the gap between stunning visuals and robust engineering to solve real business challenges."
      >
        {/* Profile/Intro Section */}
        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-20 items-start mb-32">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="sticky top-40 aspect-[4/5] rounded-[3rem] overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 border border-white/10"
          >
            <img src="/images/marc-friedman-profile.jpg" alt="Marc" className="w-full h-full object-cover" />
          </motion.div>

          <div className="space-y-12">
            <div className="space-y-6">
              <h2 className="text-3xl font-black tracking-tighter text-primary uppercase">The Philosophy</h2>
              <p className="text-xl text-gray-300 leading-relaxed">
                Transforming ideas into digital realities for clients across three continents, I've built a reputation for creating <strong className="text-white">conversion-focused experiences</strong>. I don't just build websites; I engineer sales systems.
              </p>
              <p className="text-xl text-gray-400">
                As a freelance partner, I bring a unique blend of creative vision and technical expertise to every project, ensuring your digital presence is beautiful, functional, and profitable.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-8 pt-8">
              <div className="p-8 border border-white/5 rounded-3xl bg-white/[0.02]">
                <h4 className="text-5xl font-black mb-2 tracking-tighter">10+</h4>
                <p className="text-gray-500 uppercase tracking-widest text-[10px] font-bold">Years Experience</p>
              </div>
              <div className="p-8 border border-white/5 rounded-3xl bg-white/[0.02]">
                <h4 className="text-5xl font-black mb-2 tracking-tighter">3</h4>
                <p className="text-gray-500 uppercase tracking-widest text-[10px] font-bold">Continents Served</p>
              </div>
            </div>
          </div>
        </div>

        {/* Expertise Grid */}
        <section className="mb-32">
          <h2 className="text-4xl font-black mb-16 tracking-tighter uppercase">Core Expertise</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <ExpertiseCard
              icon={Target}
              title="Strategy & Planning"
              description="Strategic roadmap development that aligns with your bottom-line business goals."
              features={["Market Research", "User Analysis", "ROI Planning"]}
            />
            <ExpertiseCard
              icon={Users}
              title="UI/UX Design"
              description="User-centered design that transforms passive visitors into loyal customers."
              features={["Wireframing", "Prototyping", "Design Systems"]}
            />
            <ExpertiseCard
              icon={Code}
              title="Development"
              description="Modern tech stacks and performance optimization for sub-second load times."
              features={["React/Next.js", "TypeScript", "API Systems"]}
            />
          </div>
        </section>

        {/* Skills & Tech */}
        <section className="mb-32 grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl font-black mb-12 tracking-tighter uppercase">Technical Benchmarks</h2>
            <div className="space-y-2">
              <SkillBar name="UI/UX Design" percentage="95%" />
              <SkillBar name="React/Next.js" percentage="95%" />
              <SkillBar name="Design Systems" percentage="90%" />
              <SkillBar name="TypeScript" percentage="90%" />
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-4 bg-primary/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
            <img 
              src="https://ik.imagekit.io/qcvroy8xpd/TTV8Liw.jpg" 
              className="relative rounded-[2.5rem] border border-white/10 shadow-2xl" 
              alt="Workspace" 
            />
          </div>
        </section>

        {/* Process Section */}
        <section className="mb-32">
          <h2 className="text-4xl font-black mb-16 tracking-tighter uppercase text-center">The Workflow</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Discover", desc: "Understanding goals, market position, and obstacles.", items: ["Stakeholder Interviews", "Market Analysis"] },
              { title: "Define", desc: "Translating insights into clear strategies.", items: ["KPI Framework", "Information Architecture"] },
              { title: "Design", desc: "Creating intuitive, high-conversion interfaces.", items: ["Wireframing", "Interactive Prototypes"] },
              { title: "Develop", desc: "Building scalable, secure React solutions.", items: ["SEO Optimization", "Clean Code QA"] }
            ].map((step, i) => (
              <ProcessCard key={i} index={i} {...step} />
            ))}
          </div>
        </section>

        {/* Success Stories / Proof */}
        <section className="mb-32 bg-white/[0.03] p-12 md:p-20 rounded-[3rem] border border-white/5">
          <h2 className="text-4xl font-black mb-12 tracking-tighter uppercase">Success Stories</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { client: "Binns Media Group", result: "Complete redesign, intuitive navigation, and 40% faster load times." },
              { client: "Wellness TCYS", result: "Automated booking system reducing admin overhead by 15 hours/week." },
              { client: "MarginX", result: "Real-time data platform with AI-powered dealership recommendations." }
            ].map((story, i) => (
              <div key={i} className="space-y-4">
                <h3 className="text-xl font-black text-primary uppercase tracking-widest">{story.client}</h3>
                <p className="text-gray-400 leading-relaxed">{story.result}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="text-center py-20">
          <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter">Ready to start?</h2>
          <p className="text-xl text-gray-500 mb-12 max-w-xl mx-auto">Let's schedule a call to explore how we can hit your growth targets this quarter.</p>
          <div className="flex justify-center gap-6">
            <MagneticButton>
              <button onClick={() => navigate('/contact')} className="mr_btn mr_btn_primary">
                <span>Book Free Audit</span>
              </button>
            </MagneticButton>
          </div>
        </section>
      </PageWrapper>
    </>
  );
}