import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Rocket, 
  Target, 
  Zap, 
  CheckCircle2, 
  ArrowRight, 
  MessageCircle, 
  ShieldCheck, 
  PieChart, 
  Video, 
  Monitor,
  Sparkles,
  Bot,
  Star,
  Settings,
  Search,
  ChevronRight,
  Shield,
  CreditCard,
  Globe,
  Smartphone,
  BarChart3,
  Users,
  Activity,
  Layers,
  Heart,
  Crown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import LogoInova from '@/assets/logo-inova.png';

// Helper to map icon names to components
const IconMap: Record<string, any> = {
  Video, Bot, PieChart, Monitor, Rocket, Target, Zap, Sparkles, Star, ShieldCheck, Shield, CreditCard, Globe, Smartphone, BarChart3, Users, Activity, Layers, Heart, Crown
};

const DEFAULT_CONFIG = {
  theme: 'mobbin', // default theme
  hero: {
    title: "BRANDING AS A WEAPON. NARRATIVE AS POWER.",
    tagline: "Being seen is easy. Being remembered is strategy. We build perception, authority, and market dominance through high-end cinematic execution.",
    badge: "STRATEGIC POSITIONING 2026"
  },
  whatsapp: "5562999999999",
  services: [
    { title: "Narrative Architecture", desc: "Strategic positioning and differential mapping to dominate your market.", icon: "Layers" },
    { title: "Cinematic Production", desc: "Professional video capture and high-impact reels designed for authority.", icon: "Video" },
    { title: "Conversion Funnels", desc: "Strategic scripts and funnel structures focused on high-ticket sales.", icon: "Activity" },
    { title: "Authority Growth", desc: "Building a structured ecosystem for your brand to dominate the industry.", icon: "Crown" }
  ],
  plans: [
    {
      name: "Essential",
      price: "1.200",
      description: "For brands seeking consistency and clear positioning in the market.",
      features: ["Social Media Management", "3 Strategic posts weekly", "High-performance design", "Monthly reports"],
      accent: "text-[#bff720]",
      popular: false
    },
    {
      name: "Authority",
      price: "2.500",
      description: "Full-service production and high-impact sales funnel integration.",
      features: ["Paid Traffic (Meta/Google)", "2 Monthly Filming Visits", "Sales Funnel Structure", "VIP Support"],
      accent: "text-[#bff720]",
      popular: true
    },
    {
      name: "Elite",
      price: "5.000",
      description: "The complete strategic arm to control the narrative of your industry.",
      features: ["4 Production Days", "AI Automation (SDR)", "Branding Consulting", "Creative Direction"],
      accent: "text-[#bff720]",
      popular: false
    }
  ]
};

export default function SalesLP() {
  const [config, setConfig] = useState(DEFAULT_CONFIG);

  useEffect(() => {
    const saved = localStorage.getItem('agency_lp_config');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Safely merge with default config to prevent crashes from missing fields
        setConfig({
          ...DEFAULT_CONFIG,
          ...parsed,
          hero: { ...DEFAULT_CONFIG.hero, ...parsed.hero },
          // Ensure arrays exist
          services: parsed.services || DEFAULT_CONFIG.services,
          plans: (parsed.plans || DEFAULT_CONFIG.plans).map((p: any, i: number) => ({
            ...DEFAULT_CONFIG.plans[i],
            ...p,
            features: p.features || DEFAULT_CONFIG.plans[i]?.features || []
          }))
        });
      } catch (e) {
        console.error('Error loading config', e);
      }
    }
  }, []);

  const getIcon = (name: string) => {
    const Icon = IconMap[name] || Star;
    return <Icon className="w-5 h-5" />;
  };

  if (config.theme === 'openclaw') {
    return renderOpenClaw(config, getIcon);
  }

  if (config.theme === 'fintech') {
    return renderFintech(config, getIcon);
  }

  return renderMobbin(config, getIcon);
}

// --- MOBBIN THEME (Light Discovery) ---
function renderMobbin(config: any, getIcon: any) {
  return (
    <div className="min-h-screen bg-[#F9FAFB] text-black font-sans selection:bg-[#bff720]/30 selection:text-black overflow-x-hidden pb-20">
      
      {/* Floating Pill Nav */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] md:w-auto">
        <nav className="bg-white/70 backdrop-blur-xl border border-gray-200/50 rounded-full py-2.5 px-3 md:px-8 flex items-center justify-between gap-8 md:gap-16 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <div className="flex items-center gap-2.5 pl-2">
            <img src={LogoInova} alt="Inova Co." className="h-6 w-auto object-contain" />
          </div>
          <div className="hidden lg:flex items-center gap-10 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
            <a href="#services" className="hover:text-black transition-colors">Solutions</a>
            <a href="#pricing" className="hover:text-black transition-colors">Pricing</a>
          </div>
          <div className="flex items-center gap-2">
             <Button size="sm" className="bg-black text-white rounded-full px-6 text-[10px] font-black uppercase tracking-widest hover:bg-gray-800 transition-all shadow-lg shadow-black/10">
               Get Started
             </Button>
          </div>
        </nav>
      </div>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-48 pb-32 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="inline-flex items-center gap-2 bg-white border border-gray-100 px-4 py-1.5 rounded-full shadow-sm mb-10">
             <span className="w-2 h-2 bg-[#bff720] rounded-full animate-pulse" />
             <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">{config.hero.badge}</span>
          </div>
          <h1 className="text-6xl md:text-[100px] font-black tracking-tighter mb-10 leading-[0.85] text-zinc-900">{config.hero.title}</h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 font-medium italic">{config.hero.tagline}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <a href={`https://wa.me/${config.whatsapp}`}>
                <Button className="bg-black text-white rounded-full h-14 px-12 text-sm font-black uppercase shadow-2xl">Accept Proposal</Button>
             </a>
             <Button variant="outline" className="rounded-full h-14 px-12 border-gray-200">View Case Studies</Button>
          </div>
        </motion.div>
      </section>

      {/* Grid Discovery */}
      <section id="services" className="max-w-[1500px] mx-auto px-6 py-20 bg-white rounded-[4rem] shadow-sm">
        <h2 className="text-5xl font-black tracking-tighter mb-12">Browse Solutions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {config.services.map((s: any, i: number) => (
            <div key={i} className="group">
              <div className="aspect-[3/4] rounded-[2.5rem] bg-gray-50 border border-gray-100 flex items-center justify-center group-hover:shadow-xl transition-all duration-500">
                {getIcon(s.icon)}
              </div>
              <div className="mt-6 px-4">
                <h3 className="font-black text-base">{s.title}</h3>
                <p className="text-gray-400 text-[10px] mt-1 uppercase font-bold tracking-widest leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Pill Style */}
      <section id="pricing" className="max-w-6xl mx-auto px-6 py-48">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {config.plans.map((p: any, i: number) => (
            <div key={i} className={`p-10 rounded-[3rem] border ${p.popular ? 'border-zinc-900 bg-white shadow-2xl' : 'border-gray-100 bg-white/50'} flex flex-col`}>
              <p className="text-[10px] font-black uppercase text-gray-400 mb-6">{p.name}</p>
              <div className="text-6xl font-black italic tracking-tighter mb-12">${p.price}</div>
              <div className="space-y-4 flex-1">
                {p.features.map((f: string, j: number) => (
                  <div key={j} className="flex items-center gap-4 text-[11px] font-bold text-gray-500 uppercase">
                    <CheckCircle2 className="w-3 h-3 text-zinc-900" /> {f}
                  </div>
                ))}
              </div>
              <Button className={`w-full h-14 rounded-full font-black uppercase text-[10px] mt-10 ${p.popular ? 'bg-black text-white' : 'bg-gray-50 text-zinc-400 shadow-none'}`}>Select Plan</Button>
            </div>
          ))}
        </div>
      </section>

      <Footer whatsapp={config.whatsapp} />
    </div>
  );
}

// --- FINTECH THEME ---
function renderFintech(config: any, getIcon: any) {
  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-[#bff720]/30 selection:text-black overflow-x-hidden">
      
      <div className="bg-gradient-to-b from-[#001D11] via-[#00311D] to-white pt-6 pb-40 relative">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
           <div className="absolute top-[10%] left-[20%] w-[300px] h-[300px] bg-[#bff720]/10 blur-[100px] rounded-full" />
        </div>

        <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center bg-white/5 backdrop-blur-xl rounded-full border border-white/10 mb-24 mx-4 md:mx-auto">
           <img src={LogoInova} alt="Inova Co." className="h-8 md:h-10 w-auto object-contain brightness-200" />
           <div className="hidden lg:flex gap-12 text-[10px] font-black uppercase tracking-[0.3em] text-white/50">
             <a href="#services" className="hover:text-[#bff720] transition-colors">Solutions</a>
             <a href="#pricing" className="hover:text-[#bff720] transition-colors">Investment</a>
           </div>
           <Button className="bg-[#bff720] text-black rounded-full px-10 h-12 text-[10px] font-black uppercase tracking-widest hover:scale-110 shadow-lg shadow-[#bff720]/20">
             Start Dominating
           </Button>
        </nav>

        <section className="max-w-6xl mx-auto px-6 text-center text-white relative z-10">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
             <Badge className="bg-white/5 text-[#bff720] border-white/10 mb-10 px-6 py-2 uppercase font-black text-[10px] tracking-[0.4em]">
               {config.hero.badge}
             </Badge>
             <h1 className="text-6xl md:text-[110px] font-black tracking-tight mb-8 leading-[0.85] italic uppercase">
               {config.hero.title}
             </h1>
             <p className="text-xl md:text-2xl text-white/50 max-w-2xl mx-auto mb-16 font-medium leading-relaxed italic">
               {config.hero.tagline}
             </p>
             <div className="flex flex-col sm:flex-row gap-4 justify-center">
                 <Button className="bg-[#bff720] text-black hover:bg-[#bff720]/90 rounded-full h-16 px-16 text-xs font-black uppercase tracking-widest shadow-2xl shadow-[#bff720]/30 transition-transform active:scale-95">Accept Proposal</Button>
                 <Button variant="ghost" className="text-white hover:bg-white/5 rounded-full h-16 px-16 text-xs font-black uppercase tracking-widest border border-white/20">View Case Studies</Button>
             </div>
          </motion.div>
        </section>
      </div>

      {/* Stats Bar */}
      <section className="py-32 bg-white">
         <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="p-10 rounded-[2.5rem] border border-gray-100 bg-gray-50/50 flex flex-col items-center justify-center text-center">
               <p className="text-5xl font-black tracking-tighter text-zinc-900 leading-none">324M+</p>
               <p className="text-[10px] font-black uppercase text-gray-400 tracking-[0.3em] mt-4">Growth Rate</p>
            </div>
            <div className="p-10 rounded-[2.5rem] bg-[#bff720] flex flex-col items-center justify-center text-center shadow-xl shadow-[#bff720]/20 scale-105">
               <p className="text-5xl font-black tracking-tighter text-black leading-none">100%</p>
               <p className="text-[10px] font-black uppercase text-black/40 tracking-[0.3em] mt-4">Narrative Power</p>
            </div>
            <div className="p-10 rounded-[2.5rem] border border-gray-100 bg-gray-50/50 flex flex-col items-center justify-center text-center">
               <p className="text-5xl font-black tracking-tighter text-zinc-900 leading-none">500+</p>
               <p className="text-[10px] font-black uppercase text-gray-400 tracking-[0.3em] mt-4">Authorities Built</p>
            </div>
            <div className="p-10 rounded-[2.5rem] border border-gray-100 bg-gray-50/50 flex flex-col items-center justify-center text-center">
               <p className="text-5xl font-black tracking-tighter text-zinc-900 leading-none">$25M</p>
               <p className="text-[10px] font-black uppercase text-gray-400 tracking-[0.3em] mt-4">Revenue Scaled</p>
            </div>
         </div>
      </section>

      <section id="services" className="max-w-7xl mx-auto px-6 py-32 bg-gray-50/50 rounded-[5rem] mb-32 border border-gray-100/50">
         <div className="text-center mb-24 space-y-4">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter italic uppercase text-zinc-900">Strategic Solutions</h2>
            <p className="text-gray-400 text-lg font-medium">Control the narrative. Control the market.</p>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {config.services.map((s: any, i: number) => (
               <div key={i} className="p-10 bg-white border border-gray-100 rounded-[3rem] transition-all duration-500 hover:shadow-2xl group">
                  <div className="w-16 h-16 bg-emerald-50 group-hover:bg-[#bff720]/20 rounded-2xl flex items-center justify-center text-emerald-600 mb-8">
                     {getIcon(s.icon)}
                  </div>
                  <h3 className="text-2xl font-black mb-4 tracking-tight">{s.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed font-medium">{s.desc}</p>
               </div>
            ))}
         </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="bg-[#000E08] text-white py-48 rounded-[6rem] mx-4 md:mx-10 my-32">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-32 space-y-6">
               <h2 className="text-7xl font-black tracking-tight italic uppercase">Pricing Plans</h2>
               <p className="text-white/40 text-lg italic">"Who dominates perception, dominates the market."</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
               {config.plans.map((p: any, i: number) => (
                  <div key={i} className={`p-14 rounded-[4rem] border ${p.popular ? 'border-[#bff720]/40 bg-white/[0.04]' : 'border-white/5 bg-transparent'} flex flex-col relative`}>
                     {p.popular && <div className="absolute top-8 left-8 bg-[#bff720] text-black px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg shadow-[#bff720]/20">Most Strategic</div>}
                     <div className="mb-14">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 block mb-6">{p.name}</span>
                        <div className="flex items-baseline gap-2">
                           <span className="text-7xl font-black tracking-tighter italic">${p.price}</span>
                           <span className="text-white/20 text-sm font-black uppercase">/mo</span>
                        </div>
                     </div>
                     <div className="space-y-6 flex-1 mb-16">
                        {p.features.map((f: string, idx: number) => (
                           <div key={idx} className="flex items-center gap-4 text-sm font-black italic uppercase tracking-tighter text-white/80">
                              <CheckCircle2 className="w-5 h-5 text-[#bff720]" /> {f}
                           </div>
                        ))}
                     </div>
                     <Button className={`w-full h-16 rounded-full font-black uppercase tracking-widest text-[10px] ${p.popular ? 'bg-[#bff720] text-black shadow-xl shadow-[#bff720]/30' : 'bg-white/5 border border-white/10 text-white'}`}>Select Plan</Button>
                  </div>
               ))}
            </div>
         </div>
      </section>

      <Footer whatsapp={config.whatsapp} isDark />
    </div>
  );
}

// --- OPENCLAW THEME ---
function renderOpenClaw(config: any, getIcon: any) {
  return (
    <div className="min-h-screen bg-[#000000] text-white font-sans selection:bg-[#bff720]/30 selection:text-white overflow-x-hidden pb-20">
      <nav className="max-w-7xl mx-auto px-6 py-12 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-2">
           <img src={LogoInova} alt="Inova Co." className="h-8 w-auto object-contain" />
        </div>
        <div className="hidden md:flex items-center gap-12 text-sm font-bold uppercase tracking-widest text-zinc-400">
          <a href="#services" className="hover:text-white transition-colors">Solutions</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
        </div>
      </nav>

      <section className="max-w-5xl mx-auto px-6 pt-32 pb-48 text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Badge className="mb-8 bg-[#bff720]/10 text-[#bff720] border-[#bff720]/20 px-6 py-2 text-xs uppercase tracking-widest font-black rounded-full">{config.hero.badge}</Badge>
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-10 leading-[0.85] uppercase italic">{config.hero.title}</h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-12 font-medium italic leading-relaxed">{config.hero.tagline}</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
             <a href={`https://wa.me/${config.whatsapp}`}>
                <Button className="bg-[#bff720] hover:bg-[#bff720]/90 text-black rounded-full h-16 px-14 text-xl font-black shadow-2xl shadow-[#bff720]/20">ACCEPT PROPOSAL</Button>
             </a>
          </div>
        </motion.div>
      </section>

      <section id="pricing" className="max-w-7xl mx-auto px-6 py-40 bg-zinc-900/20 rounded-[4rem] border border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {config.plans.map((p: any, i: number) => (
            <div key={i} className={`p-12 rounded-[3.5rem] border ${p.popular ? 'border-[#bff720]/40 bg-[#bff720]/5' : 'border-white/5 bg-black/40'} flex flex-col`}>
              <span className="text-sm font-black uppercase tracking-widest text-[#bff720] mb-6">{p.name}</span>
              <div className="text-6xl font-black mb-10 tracking-tighter italic">${p.price}<span className="text-xl text-zinc-600">/mo</span></div>
              <div className="space-y-6 flex-1 mb-12 text-zinc-300">
                {p.features.map((f: string, j: number) => (
                  <div key={j} className="flex items-center gap-4 text-sm font-bold uppercase tracking-tighter italic"><CheckCircle2 className="w-5 h-5 text-[#bff720]" /> {f}</div>
                ))}
              </div>
              <Button className={`w-full h-14 rounded-3xl text-sm font-black uppercase italic ${p.popular ? 'bg-[#bff720] text-black' : 'bg-white/5 text-white'}`}>Select Growth</Button>
            </div>
          ))}
        </div>
      </section>

      <Footer whatsapp={config.whatsapp} isDark />
    </div>
  );
}

function Footer({ whatsapp, isDark }: { whatsapp: string, isDark?: boolean }) {
  return (
    <section id="cta" className="max-w-7xl mx-auto px-6 py-40 text-center relative">
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full -z-10 blur-[120px] ${isDark ? 'bg-[#015f57]/10' : 'bg-[#bff720]/5'}`} />
      <Sparkles className="w-12 h-12 text-[#bff720] mx-auto mb-10 animate-pulse" />
      <h2 className={`text-6xl md:text-9xl font-black mb-12 tracking-tighter uppercase italic ${isDark ? 'text-white' : 'text-zinc-900'}`}>LET'S SCALE</h2>
      <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer">
        <Button className="bg-[#bff720] text-black hover:bg-[#bff720]/90 rounded-full h-20 px-16 text-2xl font-black uppercase italic shadow-2xl transition-all hover:scale-105">Talk on WhatsApp</Button>
      </a>
      <div className="mt-40 pt-10 border-t border-gray-200/10 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-[0.4em] opacity-40">
        <span>© 2026 INOVA CO. LAB</span>
        <span>Narrative is Power</span>
      </div>
    </section>
  );
}
