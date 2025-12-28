import { Helmet } from 'react-helmet-async';
import { ArrowRight, Check, Play, Users, TrendingUp, Video, Podcast, DollarSign, Zap, Star, Clock, Shield, Award } from 'lucide-react';
import ServiceLeadForm from '@/components/ServiceLeadForm';

export default function MediaEmpireLaunchpad() {
  const features = [
    {
      icon: <Play className="w-8 h-8" />,
      title: 'Custom React, Netflix-Style Site',
      description: 'UX focused on binge consumption; fast, SEO-optimized, mobile-first.'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Members-Only Content Hub (Stripe-Powered)',
      description: 'Membership tiers, gated content, recurring revenue. Build your membership site with paid memberships and gated content.'
    },
    {
      icon: <Podcast className="w-8 h-8" />,
      title: 'Podcast & Video Libraries',
      description: 'On-demand, categorized archives; Netflix-style video library for your content.'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Sales Funnels & Email Flows',
      description: 'Lead magnet opt-ins, sales pages, email sequences; creator funnels that convert.'
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: 'Personal Brand Story Page',
      description: 'Animated "Ace" narrative, authority assets, and flagship offers.'
    },
    {
      icon: <Video className="w-8 h-8" />,
      title: 'Full CMS & Content Ops',
      description: 'Non-technical publishing; episodes, promos, offers managed from one backend.'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Hosting, Speed & Security',
      description: 'Cloud hosting, CDN, Cloudflare, caching; emphasize sub-2s load time.'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Concierge Setup & Training',
      description: 'Implementation, walkthrough, and launch support.'
    }
  ];

  const personas = [
    {
      title: 'The Podcaster',
      description: 'Wants to move from CPM scraps to subscription and backend offers.',
      icon: <Podcast className="w-12 h-12" />
    },
    {
      title: 'The Video Creator',
      description: 'Wants a Netflix-style library + membership site.',
      icon: <Video className="w-12 h-12" />
    },
    {
      title: 'The Personal Brand Mogul',
      description: 'Wants to centralize courses, communities, and live experiences.',
      icon: <Star className="w-12 h-12" />
    }
  ];

  const timeline = [
    {
      week: 'Week 1',
      title: 'Empire Blueprint',
      description: 'Strategy workshop, monetization map, funnel architecture.'
    },
    {
      week: 'Week 1-2',
      title: 'Experience Design',
      description: 'UX, wireframes, brand direction.'
    },
    {
      week: 'Week 2-4',
      title: 'Build & Integrations',
      description: 'React build, membership, email, analytics.'
    },
    {
      week: 'Week 4-5',
      title: 'Content Load & Launch',
      description: 'Content migration, QA, performance optimization.'
    }
  ];

  const deliverablesPlatform = [
    'Netflix-style site architecture',
    'Intuitive navigation system',
    'Content hub with categories',
    'Full CMS backend',
    'Cloud hosting & CDN'
  ];

  const deliverablesMonetization = [
    'Sales funnels & landing pages',
    'Email automation flows',
    'Lead magnet opt-ins',
    'Analytics & conversion tracking',
    'Membership tiers setup'
  ];

  const packages = [
    {
      name: 'Core Launchpad',
      description: 'Base Netflix-style site + membership hub.',
      price: '$15,000+'
    },
    {
      name: 'Launchpad + Funnels',
      description: 'Adds advanced funnels, email automations.',
      price: '$25,000+'
    },
    {
      name: 'Empire Partner',
      description: 'Ongoing optimization, experiments, and additional builds.',
      price: '$50,000+'
    }
  ];

  const faqs = [
    {
      question: 'What platforms are supported?',
      answer: 'We integrate with Stripe for payments, major email marketing tools (ConvertKit, Mailchimp, ActiveCampaign), course platforms (Teachable, Thinkific), and more. We\'ll work with your existing tech stack.'
    },
    {
      question: 'Who writes the copy and sets strategy?',
      answer: 'Strategy is collaborative—we lead the Empire Blueprint workshop to map your monetization, funnels, and content architecture. You provide the raw content and voice; we structure and optimize it for conversion.'
    },
    {
      question: 'What do you need from me before we start?',
      answer: 'Your existing content library (podcasts, videos, courses), brand assets (logo, colors, fonts), and clarity on your monetization model. We\'ll guide you through everything in the Blueprint phase.'
    },
    {
      question: 'How long will the build really take?',
      answer: 'Typically 4-5 weeks from kickoff to launch. Timeline depends on content volume, integration complexity, and your feedback turnaround.'
    },
    {
      question: 'Can this replace my existing website or does it sit beside it?',
      answer: 'It can do either. Many creators use this as their main hub, while others keep a simple landing page and use the Launchpad for premium content and membership.'
    },
    {
      question: 'Do you provide ongoing support after launch?',
      answer: 'Yes! We offer training during launch, and ongoing optimization and support packages are available through our Empire Partner tier.'
    }
  ];

  const outcomes = [
    'Centralize podcasts, videos, and premium drops in one bingeable hub.',
    'Turn followers into members with subscriptions and gated content.',
    'Track what content drives signups, renewals, and backend sales.'
  ];

  const offerColumns = [
    {
      icon: <Play className="w-12 h-12" />,
      title: 'Cinematic Creator HQ',
      description: 'Netflix-style UX, personal brand storytelling.'
    },
    {
      icon: <DollarSign className="w-12 h-12" />,
      title: 'Membership & Monetization Engine',
      description: 'Subscriptions, gated content, funnels.'
    },
    {
      icon: <Shield className="w-12 h-12" />,
      title: 'Done-for-You Implementation',
      description: 'Strategy, build, setup, training.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Media Empire Launchpad - Netflix-Style Creator Hub | Marc Friedman</title>
        <meta
          name="description"
          content="Turn your audience into a media empire. Custom Netflix-style creator hub that transforms your content, clout, and community into recurring revenue in 4-5 weeks. Built for podcasters, video creators, and personal brand moguls."
        />
        <meta
          name="keywords"
          content="media empire launchpad, creator hub, netflix-style site, membership site, paid memberships, gated content, creator monetization, podcast platform, video library, content creator platform, subscription platform"
        />
        <link rel="canonical" href="https://www.marcfriedmanportfolio.com/services/media-empire-launchpad" />

        <meta property="og:type" content="product" />
        <meta property="og:title" content="Media Empire Launchpad - Turn Your Audience Into a Media Empire" />
        <meta property="og:description" content="A custom Netflix-style creator hub that transforms your content, clout, and community into recurring revenue in 4-5 weeks." />
        <meta property="og:url" content="https://www.marcfriedmanportfolio.com/services/media-empire-launchpad" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "Media Empire Launchpad",
            "description": "Custom Netflix-style creator hub for content monetization",
            "offers": {
              "@type": "AggregateOffer",
              "lowPrice": "15000",
              "highPrice": "50000",
              "priceCurrency": "USD",
              "availability": "https://schema.org/InStock",
              "url": "https://www.marcfriedmanportfolio.com/services/media-empire-launchpad"
            },
            "provider": {
              "@type": "Person",
              "name": "Marc Friedman"
            }
          })}
        </script>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })}
        </script>
      </Helmet>

      {/* Hero Section - Media Empire Above the Fold */}
      <section className="relative min-h-[80vh] flex items-center justify-center bg-black overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0a0a0a] to-black"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(163,209,255,0.1),transparent_50%)]"></div>
        </div>

        <div className="container-custom relative z-10 text-center px-4">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 max-w-5xl mx-auto leading-tight">
            Turn Your Audience Into a Media Empire
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto">
            A custom Netflix-style creator hub that transforms your content, clout, and community into recurring revenue in 4–5 weeks.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <button
              onClick={() => {
                const form = document.getElementById('contact-form');
                form?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="mr_btn mr_btn_primary inline-flex items-center gap-2 text-lg font-semibold"
            >
              <span>Book Your Launch Call</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 text-lg font-semibold text-[#A3D1FF] hover:text-white transition-colors"
            >
              <span>See How the Launchpad Works</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>

          <p className="text-sm text-gray-400 italic">
            Built for content kings, podcasters, and personal brand moguls.
          </p>

          {/* Visual Mockup Placeholder */}
          <div className="mt-16 max-w-6xl mx-auto">
            <div className="relative rounded-lg overflow-hidden border border-white/10 bg-gradient-to-br from-[#1b1b1b] to-black p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Desktop mockup placeholder */}
                <div className="aspect-video bg-gradient-to-br from-[#A3D1FF]/20 to-transparent rounded-lg flex items-center justify-center border border-[#A3D1FF]/30">
                  <Play className="w-16 h-16 text-[#A3D1FF]/50" />
                </div>
                {/* Mobile mockup placeholder */}
                <div className="aspect-[9/16] max-h-96 mx-auto bg-gradient-to-br from-[#A3D1FF]/20 to-transparent rounded-lg flex items-center justify-center border border-[#A3D1FF]/30">
                  <Play className="w-12 h-12 text-[#A3D1FF]/50" />
                </div>
              </div>
              <p className="text-center text-gray-500 text-sm mt-4">Netflix-style interface on desktop + mobile</p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem → Agitation Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12 text-center">
            The Hidden Gap in Your Media Business
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <ul className="space-y-6">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-[#A3D1FF] rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <p className="text-lg text-gray-300">Your audience lives on <span className="text-white font-semibold">rented land</span> (YouTube, TikTok, IG).</p>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-[#A3D1FF] rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <p className="text-lg text-gray-300">You are <span className="text-white font-semibold">rich in content</span> but <span className="text-white font-semibold">poor in owned infrastructure</span>.</p>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-[#A3D1FF] rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <p className="text-lg text-gray-300">Sponsors and platforms capture <span className="text-white font-semibold">more value than you do</span>.</p>
                </li>
              </ul>
            </div>
            
            <div className="flex justify-center items-center">
              <div className="relative">
                <div className="grid grid-cols-3 gap-4 opacity-50">
                  <div className="w-20 h-20 bg-red-500/20 rounded-lg flex items-center justify-center border border-red-500/30">
                    <Video className="w-8 h-8 text-red-500" />
                  </div>
                  <div className="w-20 h-20 bg-blue-500/20 rounded-lg flex items-center justify-center border border-blue-500/30">
                    <Users className="w-8 h-8 text-blue-500" />
                  </div>
                  <div className="w-20 h-20 bg-purple-500/20 rounded-lg flex items-center justify-center border border-purple-500/30">
                    <Star className="w-8 h-8 text-purple-500" />
                  </div>
                </div>
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                  <div className="text-4xl">vs</div>
                </div>
                <div className="mt-16 flex justify-center">
                  <div className="w-32 h-32 bg-[#A3D1FF]/20 rounded-lg flex items-center justify-center border-2 border-[#A3D1FF]">
                    <Shield className="w-16 h-16 text-[#A3D1FF]" />
                  </div>
                </div>
                <p className="text-center text-gray-400 text-sm mt-4">Your Owned Site</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transformation Vision Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8 text-center">
            From Scattered Content to a Bingeable Media Empire
          </h2>
          
          <div className="mb-12 text-center">
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Imagine waking up to notification after notification of new memberships, course sales, and backend offers—all flowing through <span className="text-[#A3D1FF] font-semibold">one beautiful, owned platform</span> that you control. No more chasing algorithms. No more begging for sponsorships. Just a seamless hub where your best content lives, your community pays to access it, and you finally capture the full value of your influence.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {outcomes.map((outcome, index) => (
              <div key={index} className="bg-[#1b1b1b] border border-white/10 rounded-lg p-6">
                <Check className="w-8 h-8 text-[#A3D1FF] mb-4" />
                <p className="text-gray-300 text-lg">{outcome}</p>
              </div>
            ))}
          </div>

          {/* Before / After Cards */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-[#1b1b1b] border border-red-500/30 rounded-lg p-8">
              <div className="text-red-500 font-bold text-sm mb-4">BEFORE</div>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-start">
                  <span className="mr-2">❌</span>
                  <span>Content scattered across platforms</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">❌</span>
                  <span>Relying on ads and sponsorships</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">❌</span>
                  <span>No direct relationship with audience</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">❌</span>
                  <span>Limited monetization options</span>
                </li>
              </ul>
            </div>
            <div className="bg-[#1b1b1b] border border-[#A3D1FF]/30 rounded-lg p-8">
              <div className="text-[#A3D1FF] font-bold text-sm mb-4">AFTER</div>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Centralized content hub you own</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Recurring membership revenue</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Direct connection with fans</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Multiple revenue streams</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Offer Overview Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 text-center">
            What Is Media Empire Launchpad?
          </h2>
          <p className="text-xl text-gray-300 mb-16 text-center max-w-4xl mx-auto">
            A custom React, Netflix-style membership site and monetization system for creators.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {offerColumns.map((column, index) => (
              <div key={index} className="bg-black border border-white/10 rounded-lg p-8 text-center hover:border-[#A3D1FF]/50 transition-all">
                <div className="flex justify-center mb-6 text-[#A3D1FF]">
                  {column.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{column.title}</h3>
                <p className="text-gray-400">{column.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-16 text-center">
            Inside Your Launchpad Build
          </h2>

          <div className="space-y-12">
            {features.map((feature, index) => (
              <div key={index} className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}>
                <div className="flex-shrink-0 w-24 h-24 bg-[#A3D1FF]/10 rounded-lg flex items-center justify-center text-[#A3D1FF] border border-[#A3D1FF]/30">
                  {feature.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-lg text-gray-300">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who It's For Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-16 text-center">
            Is the Launchpad for You?
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {personas.map((persona, index) => (
              <div key={index} className="bg-black border border-white/10 rounded-lg p-8 hover:border-[#A3D1FF]/50 transition-all">
                <div className="flex justify-center mb-6 text-[#A3D1FF]">
                  {persona.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4 text-center">{persona.title}</h3>
                <p className="text-gray-300 text-center">{persona.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-[#1b1b1b] border border-yellow-500/30 rounded-lg p-8 max-w-3xl mx-auto">
            <h3 className="text-xl font-bold text-white mb-4">Not a fit if...</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>You're looking for a $99 template or DIY solution</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>You don't have existing content or audience to monetize</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>You're not ready to invest in owning your platform</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>You prefer to stay 100% on social platforms</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Process & Timeline Section */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-16 text-center">
            How the Media Empire Launchpad Works
          </h2>

          <div className="grid md:grid-cols-4 gap-8">
            {timeline.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-[#1b1b1b] border border-white/10 rounded-lg p-6 hover:border-[#A3D1FF]/50 transition-all h-full">
                  <div className="text-[#A3D1FF] font-bold text-sm mb-3">{step.week}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-gray-300">{step.description}</p>
                </div>
                {index < timeline.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-[#A3D1FF]/30" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables Snapshot Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-16 text-center">
            Everything Done For You
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-black border border-white/10 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
                <Play className="w-6 h-6 text-[#A3D1FF] mr-3" />
                Platform & Experience
              </h3>
              <ul className="space-y-4">
                {deliverablesPlatform.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="w-5 h-5 text-[#A3D1FF] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-black border border-white/10 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
                <TrendingUp className="w-6 h-6 text-[#A3D1FF] mr-3" />
                Monetization & Growth
              </h3>
              <ul className="space-y-4">
                {deliverablesMonetization.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="w-5 h-5 text-[#A3D1FF] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing & Packages Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8 text-center">
            Investment & Packages
          </h2>
          <p className="text-xl text-gray-300 mb-16 text-center max-w-3xl mx-auto">
            Projects typically range from $15K–$50K+ depending on scope and integrations.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {packages.map((pkg, index) => (
              <div key={index} className="bg-[#1b1b1b] border border-white/10 rounded-lg p-8 hover:border-[#A3D1FF]/50 transition-all">
                <h3 className="text-2xl font-bold text-white mb-4">{pkg.name}</h3>
                <p className="text-gray-300 mb-6">{pkg.description}</p>
                <div className="text-3xl font-bold text-[#A3D1FF] mb-6">{pkg.price}</div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => {
                const form = document.getElementById('contact-form');
                form?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="mr_btn mr_btn_primary inline-flex items-center gap-2 text-lg font-semibold"
            >
              <span>Apply for a Build Slot</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-16 text-center">
            Why Serious Creators Choose This Build
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-black border border-white/10 rounded-lg p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-[#A3D1FF]/20 rounded-full flex items-center justify-center mr-4">
                  <Users className="w-6 h-6 text-[#A3D1FF]" />
                </div>
                <div>
                  <div className="text-white font-bold">Omar Turner</div>
                  <div className="text-gray-400 text-sm">Chief Executive Officer, Binns Media Group</div>
                </div>
              </div>
              <p className="text-gray-300 italic">
                "Marc was able to execute the vision perfectly! He's big on communication and easy to speak with. Marc dedicates his time to the client, ensuring the client is completely satisfied at each step of the process."
              </p>
            </div>

            <div className="bg-black border border-white/10 rounded-lg p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-[#A3D1FF]/20 rounded-full flex items-center justify-center mr-4">
                  <Star className="w-6 h-6 text-[#A3D1FF]" />
                </div>
                <div>
                  <div className="text-white font-bold">Content Creator Success</div>
                  <div className="text-gray-400 text-sm">Platform Results</div>
                </div>
              </div>
              <p className="text-gray-300 italic">
                "Built for creators who want to own their platform and monetization. Transform scattered content into a cohesive media empire with recurring revenue streams."
              </p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-8 items-center opacity-50">
            <div className="text-gray-500 text-sm font-medium">TRUSTED BY CREATORS & MEDIA TEAMS</div>
          </div>
        </div>
      </section>

      {/* Omar "Ace" Turner Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12 text-center">
            Meet Omar "Ace" Turner
          </h2>

          <div className="bg-[#1b1b1b] border border-white/10 rounded-lg p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-shrink-0">
                <div className="w-48 h-48 bg-gradient-to-br from-[#A3D1FF]/20 to-transparent rounded-lg flex items-center justify-center border border-[#A3D1FF]/30">
                  <Star className="w-24 h-24 text-[#A3D1FF]/50" />
                </div>
              </div>
              
              <div className="flex-1">
                <p className="text-xl text-gray-300 mb-6">
                  Omar "Ace" Turner is the <span className="text-[#A3D1FF] font-semibold">media mogul in the making</span> who embodies the vision behind the Launchpad. From podcasts to reels to brand partnerships, Ace represents the modern creator who's ready to stop renting and start owning.
                </p>
                
                <h3 className="text-lg font-bold text-white mb-4">Associated With:</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-[#A3D1FF] mr-3 mt-0.5 flex-shrink-0" />
                    <span>Binns Media Group - Chief Executive Officer</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-[#A3D1FF] mr-3 mt-0.5 flex-shrink-0" />
                    <span>Multi-platform content creation across podcasts and social media</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-[#A3D1FF] mr-3 mt-0.5 flex-shrink-0" />
                    <span>Building owned infrastructure for long-term audience value</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-16 text-center">
            Answers Before You Launch
          </h2>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-black border border-white/10 rounded-lg p-6 hover:border-[#A3D1FF]/50 transition-all">
                <h3 className="text-xl font-bold text-white mb-3">{faq.question}</h3>
                <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6">
            Ready to Launch Your Media Empire?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Transform your scattered content into a revenue-generating hub. Limited build slots available per month.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <button
              onClick={() => {
                const form = document.getElementById('contact-form');
                form?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="mr_btn mr_btn_primary inline-flex items-center gap-2 text-lg font-semibold"
            >
              <span>Book Your 20-Min Launch Call</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <a
              href="#contact-form"
              className="inline-flex items-center gap-2 text-lg font-semibold text-[#A3D1FF] hover:text-white transition-colors"
            >
              <span>Request a Scope & Investment Breakdown</span>
            </a>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact-form" className="py-16 px-4 sm:px-6 lg:px-8 bg-[#1b1b1b]">
        <div className="max-w-7xl mx-auto">
          <ServiceLeadForm
            benefits={[
              'Custom Netflix-style creator hub',
              'Membership & monetization engine',
              'Done-for-you implementation',
              '4-5 week build timeline',
              'Ongoing support available'
            ]}
          />
        </div>
      </section>
    </>
  );
}
