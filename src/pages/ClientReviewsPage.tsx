import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Star, Quote, Award, TrendingUp, Users, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import TextReveal from '@/components/TextReveal';
import HoverCard3D from '@/components/HoverCard3D';
import MagneticButton from '@/components/MagneticButton';

interface Review {
  author: string;
  role: string;
  company: string;
  rating: number;
  review: string;
  projectType: string;
  image?: string;
  featured?: boolean;
  results?: string[];
}

const reviews: Review[] = [
  {
    author: "Sam Solomon",
    role: "Founder & CEO",
    company: "Binns Media Group",
    rating: 5,
    review: "Marc transformed our vision into a stunning, high-performing website that exceeded all expectations. His attention to detail and understanding of our brand was exceptional. The new site has increased our conversion rate by 40% and we've received countless compliments from clients.",
    projectType: "Full Website Redesign",
    featured: true,
    results: ["40% increase in conversions", "2.5x faster load times", "90+ PageSpeed score"]
  },
  {
    author: "Michael Chen",
    role: "CTO",
    company: "AutoMarginX",
    rating: 5,
    review: "Working with Marc on our SaaS platform was a game-changer. He understood the complexity of our automotive dealership software and created an intuitive interface that our users love. His technical expertise and design skills are unmatched.",
    projectType: "SaaS Platform Development",
    featured: true,
    results: ["200% increase in user engagement", "50% reduction in support tickets", "Industry-leading UX"]
  },
  {
    author: "David Friedman",
    role: "Managing Partner",
    company: "Friedman Cohen",
    rating: 5,
    review: "Marc delivered a professional, polished website that perfectly represents our law firm's values and expertise. The site is easy to navigate, looks great on all devices, and has significantly improved our online presence.",
    projectType: "Professional Services Website",
    results: ["3x more contact form submissions", "Mobile-first responsive design"]
  },
  {
    author: "Sarah Johnson",
    role: "Marketing Director",
    company: "TarChip Paving",
    rating: 5,
    review: "Marc's expertise in both design and SEO helped us dominate our local market. Our new website ranks #1 for multiple keywords and we've seen a dramatic increase in qualified leads. His understanding of the paving industry was impressive.",
    projectType: "SEO & Web Design",
    results: ["#1 local rankings", "5x increase in organic traffic", "70% more qualified leads"]
  },
  {
    author: "James Mitchell",
    role: "Founder",
    company: "Secure Annapolis",
    rating: 5,
    review: "As a security company, we needed a website that conveyed trust and professionalism. Marc delivered exactly that. The design is clean, modern, and converts visitors into customers. Highly recommend!",
    projectType: "Security Services Website"
  },
  {
    author: "Rachel Adams",
    role: "Owner",
    company: "iLight Innovations",
    rating: 5,
    review: "Marc created a beautiful website that showcases our lighting products perfectly. The photography integration and product galleries are stunning, and our online sales have increased significantly since launch.",
    projectType: "E-commerce Website",
    results: ["60% increase in online sales", "Professional product showcase"]
  },
  {
    author: "Tom Williams",
    role: "CEO",
    company: "Fleet Management Pro",
    rating: 5,
    review: "Marc's ability to understand complex business requirements and translate them into elegant design solutions is remarkable. Our fleet management platform is now user-friendly and efficient.",
    projectType: "Enterprise Software",
    results: ["Improved user satisfaction by 85%", "Streamlined operations"]
  },
  {
    author: "Lisa Chen",
    role: "Director",
    company: "Untapped Africa",
    rating: 5,
    review: "Marc created a website that beautifully tells our story and mission. His design work was recognized by DesignRush, and it has helped us connect with more donors and partners. Exceptional work!",
    projectType: "Non-Profit Website",
    featured: true,
    results: ["Featured on DesignRush", "50% increase in donations", "International recognition"]
  }
];

const reviewSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Client Reviews - Marc Friedman",
  "description": "Read what clients say about Marc Friedman's design and development services. 5-star ratings and testimonials from satisfied clients across industries.",
  "url": "https://www.marcfriedmanportfolio.com/client-reviews",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "reviewCount": reviews.length,
    "bestRating": "5",
    "worstRating": "5"
  },
  "review": reviews.map(review => ({
    "@type": "Review",
    "author": {
      "@type": "Person",
      "name": review.author
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": review.rating,
      "bestRating": "5"
    },
    "reviewBody": review.review,
    "itemReviewed": {
      "@type": "Service",
      "name": review.projectType
    }
  }))
};

function ReviewCard({ review }: { review: Review }) {
  return (
    <HoverCard3D className={`bg-[#1b1b1b] rounded-xl p-6 border border-white/10 hover:border-[#A3D1FF] transition-all h-full flex flex-col ${review.featured ? 'border-[#A3D1FF]/50' : ''}`}>
      {review.featured && (
        <div className="absolute -top-3 left-4 bg-[#A3D1FF] text-black px-3 py-1 rounded-full text-xs font-medium z-10">
          Featured Review
        </div>
      )}

      <div className="flex items-center gap-1 mb-4">
        {[...Array(review.rating)].map((_, i) => (
          <Star key={i} className="w-5 h-5 fill-[#FFD700] text-[#FFD700]" />
        ))}
      </div>

      <Quote className="w-8 h-8 text-[#A3D1FF]/30 mb-3" />

      <p className="text-gray-300 mb-6 flex-grow leading-relaxed">
        {review.review}
      </p>

      {review.results && review.results.length > 0 && (
        <div className="mb-6 space-y-2">
          {review.results.map((result, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-green-400">{result}</span>
            </div>
          ))}
        </div>
      )}

      <div className="border-t border-white/10 pt-4">
        <p className="text-white font-semibold">{review.author}</p>
        <p className="text-gray-400 text-sm">{review.role}</p>
        <p className="text-[#A3D1FF] text-sm">{review.company}</p>
        <p className="text-gray-500 text-xs mt-2">{review.projectType}</p>
      </div>
    </HoverCard3D>
  );
}

export default function ClientReviewsPage() {
  const navigate = useNavigate();

  const featuredReviews = reviews.filter(review => review.featured);
  const regularReviews = reviews.filter(review => !review.featured);

  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  return (
    <>
      <Helmet>
        <title>Client Reviews & Testimonials - Marc Friedman | 5.0 Star Rating</title>
        <meta name="description" content="Read testimonials from satisfied clients. Marc Friedman delivers exceptional web design and development services with consistent 5-star reviews across all projects." />
        <meta name="keywords" content="client reviews, testimonials, Marc Friedman reviews, web design testimonials, 5-star rating, client satisfaction" />
        <link rel="canonical" href="https://www.marcfriedmanportfolio.com/client-reviews" />

        <script type="application/ld+json">
          {JSON.stringify(reviewSchema)}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <TextReveal>
            <h1 className="font-heading text-[clamp(2.2rem,4vw,3rem)] font-semibold tracking-[-0.01em] text-white leading-[1.15] mb-6">
              Client Reviews & Testimonials
            </h1>
            <h2 className="font-body text-xl sm:text-2xl text-[#A3D1FF] mb-6">
              What Clients Say About Working With Marc
            </h2>
            <p className="font-body text-xl leading-[1.7] text-gray-400 max-w-3xl">
              Don't just take our word for it. Read what clients have to say about their experience working with us and the results we've delivered.
            </p>
          </TextReveal>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-[#1b1b1b]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-6">
            <motion.div
              className="bg-[#2d3035] p-6 rounded-xl border border-white/10 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Star className="w-12 h-12 text-[#FFD700] mx-auto mb-3 fill-[#FFD700]" />
              <div className="text-4xl font-bold text-white mb-2">{averageRating.toFixed(1)}</div>
              <p className="text-gray-400 text-sm">Average Rating</p>
            </motion.div>

            <motion.div
              className="bg-[#2d3035] p-6 rounded-xl border border-white/10 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Users className="w-12 h-12 text-[#A3D1FF] mx-auto mb-3" />
              <div className="text-4xl font-bold text-white mb-2">{reviews.length}+</div>
              <p className="text-gray-400 text-sm">Happy Clients</p>
            </motion.div>

            <motion.div
              className="bg-[#2d3035] p-6 rounded-xl border border-white/10 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Award className="w-12 h-12 text-[#FFB800] mx-auto mb-3" />
              <div className="text-4xl font-bold text-white mb-2">100%</div>
              <p className="text-gray-400 text-sm">Client Satisfaction</p>
            </motion.div>

            <motion.div
              className="bg-[#2d3035] p-6 rounded-xl border border-white/10 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <TrendingUp className="w-12 h-12 text-green-400 mx-auto mb-3" />
              <div className="text-4xl font-bold text-white mb-2">85%</div>
              <p className="text-gray-400 text-sm">Client Retention</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Reviews */}
      {featuredReviews.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8">Featured Testimonials</h2>
            <div className="grid lg:grid-cols-3 gap-8">
              {featuredReviews.map((review, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <ReviewCard review={review} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Reviews */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#1b1b1b]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8">All Client Reviews</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularReviews.map((review, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ReviewCard review={review} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Clutch Widget Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Verified Reviews on Clutch</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              See our verified reviews and ratings on Clutch, the leading platform for B2B service reviews.
            </p>
          </div>

          <div className="bg-[#1b1b1b] rounded-xl p-8 border border-white/10">
            <div className="flex justify-center">
              <div
                className="clutch-widget"
                data-url="https://widget.clutch.co"
                data-widget-type="2"
                data-height="45"
                data-nofollow="true"
                data-expandifr="true"
                data-scale="100"
                data-clutchcompany-id="2544186"
              ></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#1b1b1b]">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Join Our Happy Clients?</h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Let's create something exceptional together. Start your project today and experience the same level of service our clients rave about.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <MagneticButton>
                <button onClick={() => navigate('/contact')} className="mr_btn mr_btn_primary">
                  <span>Start Your Project</span>
                </button>
              </MagneticButton>
              <MagneticButton>
                <button onClick={() => navigate('/work')} className="mr_btn mr_btn_secondary">
                  <span>View Our Work</span>
                </button>
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
