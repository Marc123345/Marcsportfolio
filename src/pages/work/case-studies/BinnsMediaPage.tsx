import React, { Suspense } from 'react';
import { 
  BarChart3, Code2, Globe, Layout, 
  PlayCircle, Rocket, ShieldCheck, Zap, 
  ChevronRight, ExternalLink 
} from 'lucide-react';

// Import the 3D Mockup we built earlier
const BMG3DMockup = React.lazy(() => import('./BMG3DMockup'));

const BinnsMediaPage = () => {
  return (
    <div className="bg-[#0a0a0a] text-white selection:bg-[#A3D1FF] selection:text-black">
      
      {/* 1. HERO SECTION: The Hook */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20">
        <div className="max-w-4xl text-center z-10">
          <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-[#A3D1FF] text-sm font-medium mb-6">
            Case Study: Scalable Media Infrastructure
          </span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
            Amplifying Diverse Voices <br className="hidden md:block" /> with 98% Performance.
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            How I engineered a high-performance content hub for Binns Media Group, 
            slashing load times by 60% while managing 500+ hours of media.
          </p>
        </div>

        {/* The "Crazy" 3D Mockup Container */}
        <div className="w-full max-w-6xl -mt-20 scale-75 md:scale-100">
          <Suspense fallback={<div className="h-96 w-full animate-pulse bg-white/5 rounded-3xl" />}>
            <BMG3DMockup />
          </Suspense>
        </div>
      </section>

      {/* 2. EXECUTIVE SUMMARY TABLE */}
      <section className="py-20 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
          <div>
            <h4 className="text-gray-500 text-xs uppercase tracking-widest mb-2">Role</h4>
            <p className="font-medium text-lg text-white">Lead Full-Stack Engineer</p>
          </div>
          <div>
            <h4 className="text-gray-500 text-xs uppercase tracking-widest mb-2">Timeline</h4>
            <p className="font-medium text-lg text-white">12 Weeks (2024)</p>
          </div>
          <div>
            <h4 className="text-gray-500 text-xs uppercase tracking-widest mb-2">Core Tech</h4>
            <p className="font-medium text-lg text-white text-[#A3D1FF]">React 18, TypeScript, Supabase</p>
          </div>
          <div>
            <h4 className="text-gray-500 text-xs uppercase tracking-widest mb-2">Impact</h4>
            <p className="font-medium text-lg text-white">40% Engagement Lift</p>
          </div>
        </div>
      </section>

      {/* 3. THE PROBLEM & SOLUTION */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20">
          <div>
            <h2 className="text-3xl font-bold mb-8">The Friction</h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              BMG was struggling with a fragmented content pipeline. Podcasts, TV segments, and exclusive talent interviews were hosted on disparate platforms, leading to a high "bounce rate" and poor SEO visibility.
            </p>
            <ul className="space-y-4">
              {[
                "Average LCP (Largest Contentful Paint) exceeded 4 seconds.",
                "Manual content updates took hours for the marketing team.",
                "Zero centralized user analytics across media types."
              ].map((item, i) => (
                <li key={i} className="flex gap-3 text-gray-300">
                  <span className="text-red-400 font-bold">✕</span> {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-8">The Strategy</h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              I architected a custom "Headless Media Engine" using **React 18** and **Supabase**. This allowed for real-time content synchronization and "edge-rendered" pages that rank instantly on Google.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                <Zap className="text-[#A3D1FF] mb-4" />
                <h4 className="font-bold mb-1 text-white">Edge-First</h4>
                <p className="text-sm text-gray-500">Fast global delivery via CDN distribution.</p>
              </div>
              <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                <ShieldCheck className="text-[#A3D1FF] mb-4" />
                <h4 className="font-bold mb-1 text-white">Type Safety</h4>
                <p className="text-sm text-gray-500">Reduced production bugs by 35% with TS.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TECHNICAL DEEP DIVE: The "Secret Sauce" */}
      <section className="py-32 bg-[#111] px-6">
        <div className="max-w-5xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 italic text-[#A3D1FF]">"Engineering Excellence"</h2>
          <p className="text-gray-400">Implemented a custom observer-pattern for media pre-loading.</p>
        </div>
        
        <div className="max-w-4xl mx-auto bg-black p-8 rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
          <div className="flex gap-2 mb-6">
            <div className="w-3 h-3 rounded-full bg-red-500/20" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
            <div className="w-3 h-3 rounded-full bg-green-500/20" />
          </div>
          <pre className="text-sm md:text-base font-mono text-gray-300 overflow-x-auto">
            <code>{`
// Custom Hook for Smart Media Hydration
const useMediaHydration = (mediaId: string) => {
  const [data, setData] = useState<MediaRecord | null>(null);

  useEffect(() => {
    // 1. Check local cache (Memory First)
    const cached = cache.get(mediaId);
    if (cached) return setData(cached);

    // 2. Fetch via Supabase Edge Functions
    const fetchMedia = async () => {
      const { data, error } = await supabase
        .from('media_vault')
        .select('*')
        .eq('id', mediaId)
        .single();

      if (data) cache.set(mediaId, data);
      setData(data);
    };

    fetchMedia();
  }, [mediaId]);

  return data;
};
            `}</code>
          </pre>
        </div>
      </section>

      {/* 5. FINAL RESULTS */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-16">Measurable Success</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-10 border border-white/5 bg-gradient-to-br from-white/5 to-transparent rounded-3xl">
              <BarChart3 className="text-[#A3D1FF] mb-6 w-10 h-10" />
              <div className="text-5xl font-bold mb-2">+40%</div>
              <p className="text-gray-500 font-medium">Monthly Active Users</p>
            </div>
            <div className="p-10 border border-white/5 bg-gradient-to-br from-white/5 to-transparent rounded-3xl">
              <Zap className="text-[#A3D1FF] mb-6 w-10 h-10" />
              <div className="text-5xl font-bold mb-2">0.8s</div>
              <p className="text-gray-500 font-medium">Avg. Time to Interactive</p>
            </div>
            <div className="p-10 border border-white/5 bg-gradient-to-br from-white/5 to-transparent rounded-3xl">
              <Globe className="text-[#A3D1FF] mb-6 w-10 h-10" />
              <div className="text-5xl font-bold mb-2">#1</div>
              <p className="text-gray-500 font-medium">Google Rank for key terms</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA: Start your next project */}
      <section className="py-40 text-center">
        <h2 className="text-4xl font-bold mb-10">Have a vision for 2026?</h2>
        <a href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-[#A3D1FF] transition-colors">
          Build it with me <ChevronRight className="w-5 h-5" />
        </a>
      </section>
    </div>
  );
};

export default BinnsMediaPage;