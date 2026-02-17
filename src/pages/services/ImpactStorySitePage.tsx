import { Helmet } from 'react-helmet-async';
import { ArrowRight, Heart, TrendingUp, MessageSquare, Eye, HandHeart, Palette, Rocket, Users, Star, CheckCircle2, Quote, Shield } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import ServiceLeadForm from '@/components/ServiceLeadForm';

const ACCENT = '#C8913C';
const ACCENT_LIGHT = '#D4A853';

const pillars = [
  {
    icon: Eye,
    title: 'Immersive Storytelling',
    focus: 'Custom-animated visuals and cinematic layouts.',
    outcome: 'Deep emotional connection with partners and donors.',
  },
  {
    icon: HandHeart,
    title: 'Frictionless Giving',
    focus: 'Integrated, secure donation flows and campaign tools.',
    outcome: 'Increased conversion and recurring funding.',
  },
  {
    icon: MessageSquare,
    title: 'Narrative Clarity',
    focus: 'Strategic messaging that simplifies complex missions.',
    outcome: 'A clear, professional global presence.',
  },
];

const processSteps = [
  {
    number: '01',
    title: 'Discovery & Empathy',
    description: 'We dive deep into your cause, your community, and the change you want to create. We listen before we design.',
  },
  {
    number: '02',
    title: 'Creative Direction',
    description: 'We define the visual language of your impact. Typography, color, motion -- every detail chosen to amplify your mission.',
  },
  {
    number: '03',
    title: 'The Build',
    description: 'High-performance CMS development with donation integration, multilingual support, and SEO infrastructure for global reach.',
  },
  {
    number: '04',
    title: 'Launch & Scale',
    description: 'We equip your team to manage campaigns independently. Training, documentation, and ongoing support included.',
  },
];

const includedFeatures = [
  'Emotional, story-driven layout with custom visuals',
  'Smooth GSAP & Framer Motion animations',
  'Impact-focused hero section + team/mission content',
  'Donation integration (Stripe, PayPal, crypto optional)',
  'CMS for blogs, initiatives, and campaign updates',
  'Video embeds + multilingual support',
  'SEO infrastructure for international discoverability',
  'Mobile-first responsive design',
  'Accessibility compliance (WCAG 2.1)',
  'Analytics & conversion tracking',
];

function AnimatedSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function ImpactStorySitePage() {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>The Impact Story Site - NGO & Non-Profit Web Design | Marc Friedman</title>
        <meta
          name="description"
          content="Mission-first storytelling platforms for NGOs and social enterprises. Emotional design, donation integration, and strategic messaging that turns spectators into supporters. Starting at $4,000."
        />
        <meta
          name="keywords"
          content="NGO website design, non-profit web development, donation website, impact storytelling, social enterprise website, charity website design, fundraising platform"
        />
        <link rel="canonical" href="https://www.marcfriedmanportfolio.com/services/impact-story-site" />

        <meta property="og:type" content="product" />
        <meta property="og:title" content="The Impact Story Site - NGO & Non-Profit Web Design" />
        <meta property="og:description" content="Mission-first storytelling platforms that turn spectators into supporters. Starting at $4,000." />
        <meta property="og:url" content="https://www.marcfriedmanportfolio.com/services/impact-story-site" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "The Impact Story Site",
            "description": "Mission-first storytelling platform for NGOs and social enterprises. Includes emotional design, donation integration, CMS, and SEO infrastructure.",
            "offers": {
              "@type": "AggregateOffer",
              "lowPrice": "4000",
              "highPrice": "12000",
              "priceCurrency": "USD",
              "availability": "https://schema.org/LimitedAvailability",
              "url": "https://www.marcfriedmanportfolio.com/services/impact-story-site"
            },
            "provider": {
              "@type": "Person",
              "name": "Marc Friedman"
            }
          })}
        </script>
      </Helmet>

      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-black">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920&q=80"
            alt=""
            className="w-full h-full object-cover opacity-20"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
        </div>

        <div
          className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full pointer-events-none mix-blend-screen blur-[180px]"
          style={{ backgroundColor: ACCENT, opacity: 0.06 }}
        />

        <div className="container-custom relative z-10 py-32 md:py-40">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl"
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase mb-8 border"
              style={{ backgroundColor: `${ACCENT}15`, borderColor: `${ACCENT}30`, color: ACCENT }}
            >
              <Heart size={14} />
              Specialized Package for NGOs & Social Enterprises
            </div>

            <h1
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight mb-8 leading-[0.95]"
              style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
            >
              Digital Experiences
              <br />
              That Turn{' '}
              <span
                className="italic"
                style={{
                  background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_LIGHT})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Spectators
              </span>
              <br />
              into Supporters.
            </h1>

            <p className="text-xl md:text-2xl text-gray-400 max-w-2xl leading-relaxed mb-10" style={{ fontFamily: 'Inter, sans-serif' }}>
              We build high-impact storytelling platforms for NGOs and social enterprises that need more than a website -- they need a movement.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => {
                  const form = document.getElementById('contact-form');
                  form?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group px-8 py-4 font-bold rounded-full flex items-center gap-3 transition-all text-black hover:scale-[1.02]"
                style={{ backgroundColor: ACCENT }}
              >
                <span>Start Your Impact Journey</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <Link
                to="/work/case-studies/untapped-africa"
                className="px-8 py-4 font-bold rounded-full flex items-center gap-3 border border-white/20 text-white hover:border-white/40 transition-all"
              >
                <span>See It in Action</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== STAKES SECTION ===== */}
      <section className="py-20 md:py-28 bg-[#0a0a0a] border-y border-white/5">
        <div className="container-custom">
          <AnimatedSection>
            <div className="max-w-4xl mx-auto text-center mb-16">
              <p className="text-sm font-bold uppercase tracking-widest mb-6" style={{ color: ACCENT }}>
                The Reality
              </p>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-8 leading-tight"
                style={{ fontFamily: 'Georgia, "Times New Roman", serif', textTransform: 'none' }}
              >
                Your mission is world-changing, but an outdated digital presence is holding your funding back.
              </h2>
              <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
                If your website doesn't reflect your impact, donors won't feel the urgency to act. You're not just losing traffic -- you're losing the partnerships and funding that fuel your cause.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                {
                  label: 'The Problem',
                  title: 'Fragmented Narratives',
                  description: 'Disconnected pages, clunky donation flows, and outdated designs that fail to communicate the urgency of your mission.',
                  icon: Shield,
                },
                {
                  label: 'The Cost',
                  title: 'Lost Opportunities',
                  description: 'Every day with a subpar digital presence means missed funding rounds, overlooked partnerships, and supporters who never convert.',
                  icon: TrendingUp,
                },
                {
                  label: 'The Shift',
                  title: 'Global Impact Brand',
                  description: 'Transform from "just an NGO with a website" to a recognized global impact brand that commands attention and trust.',
                  icon: Rocket,
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-[#111] border border-white/5 rounded-2xl p-8 hover:border-white/10 transition-all group"
                >
                  <div
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
                    style={{ backgroundColor: `${ACCENT}15`, color: ACCENT }}
                  >
                    {item.label}
                  </div>
                  <item.icon className="w-8 h-8 mb-4 text-gray-500 group-hover:text-white transition-colors" />
                  <h3 className="text-xl font-bold text-white mb-3" style={{ fontFamily: 'Georgia, "Times New Roman", serif', textTransform: 'none' }}>
                    {item.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== IMPACT FRAMEWORK ===== */}
      <section className="py-20 md:py-28">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center mb-16">
              <p className="text-sm font-bold uppercase tracking-widest mb-6" style={{ color: ACCENT }}>
                Our Framework
              </p>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6"
                style={{ fontFamily: 'Georgia, "Times New Roman", serif', textTransform: 'none' }}
              >
                Three Pillars of Impact
              </h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Every element of your platform is designed around the outcomes that matter most to mission-driven organizations.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pillars.map((pillar, i) => (
              <AnimatedSection key={i}>
                <div className="relative bg-[#0a0a0a] border border-white/5 rounded-2xl p-8 h-full hover:border-white/15 transition-all group">
                  <div
                    className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl transition-all group-hover:h-1.5"
                    style={{ backgroundColor: ACCENT }}
                  />
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                    style={{ backgroundColor: `${ACCENT}15` }}
                  >
                    <pillar.icon className="w-7 h-7" style={{ color: ACCENT }} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'Georgia, "Times New Roman", serif', textTransform: 'none' }}>
                    {pillar.title}
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">Focus</p>
                      <p className="text-gray-300 leading-relaxed">{pillar.focus}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">Outcome</p>
                      <p className="text-white font-medium leading-relaxed">{pillar.outcome}</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CASE STUDY SHOWCASE ===== */}
      <section className="py-20 md:py-28 bg-[#0a0a0a] border-y border-white/5">
        <div className="container-custom">
          <AnimatedSection>
            <div className="mb-12">
              <p className="text-sm font-bold uppercase tracking-widest mb-6" style={{ color: ACCENT }}>
                From Purpose to Presence
              </p>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white"
                style={{ fontFamily: 'Georgia, "Times New Roman", serif', textTransform: 'none' }}
              >
                See the Framework in Action
              </h2>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div className="grid lg:grid-cols-2 gap-8 items-stretch">
              <div className="relative rounded-2xl overflow-hidden border border-white/10 group">
                <img
                  src="https://ik.imagekit.io/qcvroy8xpd/New%20Folder/Mockup%204%20-%2016x9(1).png?updatedAt=1767539578544"
                  alt="Untapped Africa website showcase"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Star size={14} className="fill-[#FFD700] text-[#FFD700]" />
                    <span className="text-sm font-bold text-[#FFD700]">DesignRush Best Web Design 2025</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">Untapped Africa</h3>
                  <p className="text-gray-300 text-sm mt-1">Clean water initiative across 8 countries</p>
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <div className="bg-[#111] border border-white/5 rounded-2xl p-8 flex-1">
                  <div className="grid grid-cols-3 gap-6 mb-8">
                    <div>
                      <div className="text-3xl font-bold text-white">500k+</div>
                      <p className="text-xs font-bold uppercase tracking-widest mt-1" style={{ color: ACCENT }}>People Served</p>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-white">12</div>
                      <p className="text-xs font-bold uppercase tracking-widest mt-1" style={{ color: ACCENT }}>New Partners</p>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-white">40%</div>
                      <p className="text-xs font-bold uppercase tracking-widest mt-1" style={{ color: ACCENT }}>More Engagement</p>
                    </div>
                  </div>
                  <p className="text-gray-400 leading-relaxed mb-6">
                    Untapped Africa had a world-changing mission but their digital presence wasn't doing it justice. We deployed the Impact Story framework to build a platform that moves hearts and opens wallets.
                  </p>
                  <Link
                    to="/work/case-studies/untapped-africa"
                    className="inline-flex items-center gap-2 font-bold transition-colors hover:gap-3"
                    style={{ color: ACCENT }}
                  >
                    <span>Read the Full Case Study</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>

                <div className="bg-[#111] border border-white/5 rounded-2xl p-8 relative">
                  <Quote className="absolute top-6 right-6 w-10 h-10 text-white/5" />
                  <blockquote className="text-lg text-gray-300 italic leading-relaxed mb-4" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
                    "Working with Marc was a fantastic experience. He delivered a stunning, user-friendly site that exceeded our expectations. He captured the heart of our mission."
                  </blockquote>
                  <div className="flex items-center gap-3">
                    <img
                      src="https://ik.imagekit.io/qcvroy8xpd/1682479506906.jpeg?updatedAt=1754019693073"
                      alt="Gabriel Sher"
                      className="w-12 h-12 rounded-full object-cover border-2"
                      style={{ borderColor: `${ACCENT}40` }}
                      loading="lazy"
                    />
                    <div>
                      <div className="font-bold text-white text-sm">Gabriel Sher</div>
                      <div className="text-xs uppercase tracking-widest font-bold" style={{ color: ACCENT }}>CEO, Untapped Africa</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== WHAT'S INCLUDED ===== */}
      <section className="py-20 md:py-28">
        <div className="container-custom">
          <AnimatedSection>
            <div className="grid lg:grid-cols-2 gap-16 items-start max-w-6xl mx-auto">
              <div>
                <p className="text-sm font-bold uppercase tracking-widest mb-6" style={{ color: ACCENT }}>
                  What's Included
                </p>
                <h2
                  className="text-3xl sm:text-4xl font-bold text-white mb-8"
                  style={{ fontFamily: 'Georgia, "Times New Roman", serif', textTransform: 'none' }}
                >
                  Everything Your Mission Needs
                </h2>
                <div className="space-y-4">
                  {includedFeatures.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: ACCENT }} />
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 sticky top-32">
                <div className="text-center mb-8">
                  <p className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-2">Partnership Investment</p>
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-5xl font-bold text-white">$4K</span>
                    <span className="text-2xl text-gray-500">-</span>
                    <span className="text-5xl font-bold text-white">$12K</span>
                  </div>
                  <p className="text-gray-400 mt-3 text-sm">Based on scope, integrations, and content volume</p>
                </div>

                <div className="space-y-4 mb-8">
                  {[
                    { label: 'Timeline', value: '2-3 weeks' },
                    { label: 'Revisions', value: 'Unlimited during build' },
                    { label: 'Support', value: '30 days post-launch' },
                    { label: 'Projects/year', value: 'Limited to 4' },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center py-3 border-b border-white/5">
                      <span className="text-gray-400 text-sm">{item.label}</span>
                      <span className="text-white font-bold text-sm">{item.value}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => {
                    const form = document.getElementById('contact-form');
                    form?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full py-4 font-bold rounded-lg flex items-center justify-center gap-2 transition-all text-black hover:opacity-90"
                  style={{ backgroundColor: ACCENT }}
                >
                  <span>Start Your Impact Journey</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== PROCESS ===== */}
      <section className="py-20 md:py-28 bg-[#0a0a0a] border-y border-white/5">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center mb-16">
              <p className="text-sm font-bold uppercase tracking-widest mb-6" style={{ color: ACCENT }}>
                Mission-Aligned Collaboration
              </p>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6"
                style={{ fontFamily: 'Georgia, "Times New Roman", serif', textTransform: 'none' }}
              >
                We're a Partner, Not a Vendor
              </h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                NGOs deserve collaborators who care about the cause as much as the craft. Here's how we work together.
              </p>
            </div>
          </AnimatedSection>

          <div className="max-w-4xl mx-auto">
            {processSteps.map((step, i) => (
              <AnimatedSection key={i}>
                <div className="flex gap-8 mb-12 last:mb-0 group">
                  <div className="flex-shrink-0 relative">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold border-2 transition-colors"
                      style={{ borderColor: `${ACCENT}40`, color: ACCENT }}
                    >
                      {step.number}
                    </div>
                    {i < processSteps.length - 1 && (
                      <div className="absolute top-16 left-1/2 -translate-x-1/2 w-px h-12" style={{ backgroundColor: `${ACCENT}20` }} />
                    )}
                  </div>
                  <div className="pt-3">
                    <h3 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: 'Georgia, "Times New Roman", serif', textTransform: 'none' }}>
                      {step.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed max-w-xl">{step.description}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CLOSING CTA ===== */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div
          className="absolute bottom-[-30%] left-[-10%] w-[600px] h-[600px] rounded-full pointer-events-none mix-blend-screen blur-[180px]"
          style={{ backgroundColor: ACCENT, opacity: 0.05 }}
        />

        <div className="container-custom relative z-10">
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <Users className="w-12 h-12 mx-auto mb-6" style={{ color: ACCENT }} />
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6"
              style={{ fontFamily: 'Georgia, "Times New Roman", serif', textTransform: 'none' }}
            >
              Ready to Scale Your Impact?
            </h2>
            <p className="text-lg text-gray-400 leading-relaxed mb-4">
              We only take on <span className="text-white font-bold">4 mission-driven projects a year</span> to ensure every story gets the depth it deserves.
            </p>
            <p className="text-gray-500 mb-10">
              Partnerships starting at $4,000.
            </p>
            <button
              onClick={() => {
                const form = document.getElementById('contact-form');
                form?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group px-10 py-5 font-bold rounded-full inline-flex items-center gap-3 transition-all text-black hover:scale-[1.02] text-lg"
              style={{ backgroundColor: ACCENT }}
            >
              <span>Let's Make Yours One of Them</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== CONTACT FORM ===== */}
      <section id="contact-form" className="py-16 px-4 sm:px-6 lg:px-8 bg-[#1b1b1b]">
        <div className="max-w-7xl mx-auto">
          <ServiceLeadForm
            service="The Impact Story Site"
            benefits={[
              'Mission-first storytelling design',
              'Donation & fundraising integration',
              'CMS for campaigns & blog content',
              'SEO for international visibility',
              'Multilingual support available',
              '2-3 week delivery timeline',
            ]}
            testimonial={{
              quote: "Working with Marc was a fantastic experience. He delivered a stunning, user-friendly site that exceeded our expectations. His professionalism and creativity made the process smooth.",
              author: "Gabriel Sher",
              role: "CEO, Untapped Africa"
            }}
          />
        </div>
      </section>
    </>
  );
}
