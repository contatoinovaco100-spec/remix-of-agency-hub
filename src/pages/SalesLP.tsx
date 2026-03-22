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
  Crown,
  Quote,
  Flame,
  MousePointer2,
  Trophy
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import LogoInova from '@/assets/logo-inova.png';

// Helper to map icon names to components
const IconMap: Record<string, any> = {
  Video, Bot, PieChart, Monitor, Rocket, Target, Zap, Sparkles, Star, ShieldCheck, Shield, CreditCard, Globe, Smartphone, BarChart3, Users, Activity, Layers, Heart, Crown, Trophy
};

const DEFAULT_CONFIG = {
  theme: 'mobbin',
  hero: {
    title: "BEYOND THE LENS. WE BUILD POWERFUL NARRATIVES.",
    tagline: "Being seen is easy. Being remembered is strategy. We build perception, authority, and market dominance through high-end cinematic execution.",
    badge: "THE STRATEGIST • 2026"
  },
  whatsapp: "5562999999999",
  services: [
    { title: "Narrative Architecture", desc: "Strategic positioning and differential mapping to define how the market perceives your brand.", icon: "Layers" },
    { title: "Cinematic Production", desc: "High-end video capture and strategic reels designed to build immediate authority.", icon: "Video" },
    { title: "Performance Funnels", desc: "Result-driven content and funnel structures focused on high-ticket sales conversion.", icon: "Activity" },
    { title: "Market Dominance", desc: "A complete strategic ecosystem to ensure your brand is not just seen, but remembered.", icon: "Crown" }
  ],
  plans: [
    {
      name: "Strategic Foundation",
      price: "1.200",
      description: "For brands seeking consistency and clear positioning in the market.",
      features: ["Social Media Management", "3 Strategic posts weekly", "High-performance design", "Monthly reports"],
      accent: "text-[#bff720]",
      popular: false
    },
    {
      name: "Authority Dominance",
      price: "2.500",
      description: "Full-service production and high-impact sales funnel integration.",
      features: ["Paid Traffic (Meta/Google)", "2 Monthly Filming Visits", "Sales Funnel Structure", "VIP Support"],
      accent: "text-[#bff720]",
      popular: true
    },
    {
      name: "Elite Ecosystem",
      price: "5.000",
      description: "The complete strategic arm for market leaders who want to control the narrative.",
      features: ["4 Production Days", "AI-Powered SDR Automation", "Branding Consulting", "Creative Direction"],
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
        setConfig({
          ...DEFAULT_CONFIG,
          ...parsed,
          hero: { ...DEFAULT_CONFIG.hero, ...parsed.hero },
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

  if (config.theme === 'openclaw') return renderOpenClawManifesto(config, getIcon);
  if (config.theme === 'fintech') return renderFintechEcosystem(config, getIcon);

  return renderMobbinDiscovery(config, getIcon);
}

// --- 1. MOBBIN DISCOVERY (8+ SECTIONS) ---
function renderMobbinDiscovery(config: any, getIcon: any) {
  return (
    <div className="min-h-screen bg-[#F9FAFB] text-black font-sans selection:bg-[#bff720]/30 selection:text-black overflow-x-hidden">
      
      {/* 1. Nav */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] md:w-auto">
        <nav className="bg-white/70 backdrop-blur-xl border border-gray-200/50 rounded-full py-2.5 px-3 md:px-8 flex items-center justify-between gap-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <img src={LogoInova} alt="Inova Co." className="h-6 w-auto object-contain pl-2" />
          <div className="hidden lg:flex items-center gap-10 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
            <a href="#services">Solutions</a>
            <a href="#pricing">Pricing</a>
          </div>
          <Button size="sm" className="bg-black text-white rounded-full px-6 text-[10px] font-black uppercase tracking-widest">Get Started</Button>
        </nav>
      </div>

      {/* 2. Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-48 pb-32 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <Badge className="bg-white border border-gray-100 px-4 py-1.5 rounded-full shadow-sm mb-10 text-[10px] font-black uppercase tracking-widest text-[#bff720]">{config.hero.badge}</Badge>
          <h1 className="text-6xl md:text-[90px] font-black tracking-tighter mb-8 leading-[0.85] text-zinc-900 uppercase italic">
             {config.hero.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 font-medium italic leading-relaxed">
             {config.hero.tagline}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <Button className="bg-black text-white rounded-full h-14 px-12 text-sm font-black uppercase">Accept Proposal</Button>
             <Button variant="outline" className="rounded-full h-14 px-12 border-gray-200">The Strategist View</Button>
          </div>
        </motion.div>
      </section>

      {/* 3. Trusted By (Logos) */}
      <section className="max-w-6xl mx-auto px-6 py-20 border-y border-gray-100/50 text-center">
         <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-gray-300 mb-10 italic">Trusted by Visionary Brands</p>
         <div className="flex flex-wrap justify-center items-center gap-16 opacity-30 grayscale hover:grayscale-0 transition-all">
            <span className="font-black text-2xl italic tracking-tighter">APPLE</span>
            <span className="font-black text-2xl italic tracking-tighter">MITSUBISHI</span>
            <span className="font-black text-2xl italic tracking-tighter">REDBULL</span>
            <span className="font-black text-2xl italic tracking-tighter">PORSCHE</span>
         </div>
      </section>

      {/* 4. Strategic Pillars (Full width banner) */}
      <section className="py-32 bg-white">
         <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="space-y-4">
               <h3 className="text-[#bff720] text-sm font-black tracking-widest">RULE 01</h3>
               <p className="text-3xl font-black italic uppercase italic">Strategy before Aesthetics</p>
               <p className="text-gray-400 text-xs font-medium uppercase tracking-widest">We build the narrative, then we capture the lens.</p>
            </div>
            <div className="space-y-4 md:border-x border-gray-50 px-10">
               <h3 className="text-[#bff720] text-sm font-black tracking-widest">RULE 02</h3>
               <p className="text-3xl font-black italic uppercase italic tracking-tighter">Positioning above Volume</p>
               <p className="text-gray-400 text-xs font-medium uppercase tracking-widest">Content with intention wins. Volume fades.</p>
            </div>
            <div className="space-y-4">
               <h3 className="text-[#bff720] text-sm font-black tracking-widest">RULE 03</h3>
               <p className="text-3xl font-black italic uppercase italic">Narrative over Trends</p>
               <p className="text-gray-400 text-xs font-medium uppercase tracking-widest">Trends are momentary. Authority remains.</p>
            </div>
         </div>
      </section>

      {/* 5. Services Grid */}
      <section id="services" className="max-w-[1500px] mx-auto px-6 py-32 bg-white rounded-[5rem] shadow-[0_50px_100px_rgba(0,0,0,0.02)]">
        <h2 className="text-4xl font-black tracking-tighter mb-20 italic uppercase">Operational Catalog</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {config.services.map((s: any, i: number) => (
            <div key={i} className="group cursor-pointer">
              <div className="aspect-[3/4] rounded-[3rem] bg-gray-50 border border-gray-100 flex items-center justify-center group-hover:bg-zinc-900 group-hover:text-[#bff720] transition-all duration-700 relative overflow-hidden">
                <span className="absolute top-8 left-8 text-[10px] font-black text-gray-200 group-hover:text-[#bff720]/40">0{i+1}</span>
                <div className="group-hover:scale-150 transition-transform duration-700">{getIcon(s.icon)}</div>
              </div>
              <div className="mt-8 px-4">
                <h3 className="font-black text-lg italic uppercase">{s.title}</h3>
                <p className="text-gray-400 text-[10px] mt-2 uppercase font-bold tracking-widest leading-relaxed italic opacity-70">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Stats Highlight */}
      <section className="py-40 max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
         <div>
            <p className="text-6xl font-black italic tracking-tighter">324M+</p>
            <p className="text-[10px] font-black uppercase text-gray-400 tracking-[0.4em] mt-4">Narrative Reach</p>
         </div>
         <div className="bg-[#bff720] py-14 rounded-[3.5rem] shadow-2xl scale-105">
            <p className="text-6xl font-black italic tracking-tighter">100%</p>
            <p className="text-[10px] font-black uppercase text-black/50 tracking-[0.4em] mt-4">Authority Focus</p>
         </div>
         <div>
            <p className="text-6xl font-black italic tracking-tighter">500+</p>
            <p className="text-[10px] font-black uppercase text-gray-400 tracking-[0.4em] mt-4">Brands Transformed</p>
         </div>
         <div>
            <p className="text-6xl font-black italic tracking-tighter">$25M</p>
            <p className="text-[10px] font-black uppercase text-gray-400 tracking-[0.4em] mt-4">Revenue Built</p>
         </div>
      </section>

      {/* 7. Testimonials */}
      <section className="bg-zinc-900 text-white py-40 rounded-[5rem] mx-4 md:mx-10 my-20">
         <div className="max-w-6xl mx-auto px-6 text-center">
            <Quote className="w-12 h-12 text-[#bff720] mx-auto mb-12 opacity-50" />
            <h3 className="text-4xl md:text-6xl font-black italic uppercase italic tracking-tighter mb-10 leading-tight">
               "Inova didn't just film a video. They structured my entire market authority. Who controls the narrative, controls the niche."
            </h3>
            <div className="flex items-center justify-center gap-4">
               <div className="w-12 h-12 rounded-full bg-zinc-800" />
               <div className="text-left">
                  <p className="font-black italic uppercase text-sm">Marcus V. • CEO</p>
                  <p className="text-[#bff720] text-[10px] font-black uppercase tracking-widest italic leading-none">Market Leader</p>
               </div>
            </div>
         </div>
      </section>

      {/* 8. Pricing */}
      <section id="pricing" className="max-w-7xl mx-auto px-6 py-40">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {config.plans.map((p: any, i: number) => (
            <div key={i} className={`p-12 rounded-[4rem] border ${p.popular ? 'border-[#bff720] bg-white shadow-2xl' : 'border-gray-100 bg-white/40'} flex flex-col`}>
              <p className="text-[10px] font-black uppercase text-[#bff720] mb-8 italic">{p.name} Strategy</p>
              <div className="text-7xl font-black italic tracking-tighter mb-14 underline decoration-gray-100 decoration-4 underline-offset-8">${p.price}</div>
              <div className="space-y-6 flex-1 mb-16">
                {p.features.map((f: string, j: number) => (
                  <div key={j} className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-gray-500 italic">
                    <CheckCircle2 className="w-4 h-4 text-[#bff720]" /> {f}
                  </div>
                ))}
              </div>
              <Button className={`w-full h-16 rounded-full font-black uppercase text-[10px] tracking-[0.3em] ${p.popular ? 'bg-black text-white shadow-xl shadow-black/20' : 'bg-gray-100 text-zinc-400'}`}>Operate Plan</Button>
            </div>
          ))}
        </div>
      </section>

      <Footer whatsapp={config.whatsapp} />
    </div>
  );
}

// --- 2. OPENCLAW MANIFESTO (8+ SECTIONS) ---
function renderOpenClawManifesto(config: any, getIcon: any) {
  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-orange-500/30 overflow-x-hidden">
      
      {/* 1. Global Nav */}
      <nav className="max-w-7xl mx-auto px-6 py-12 flex justify-between items-center relative z-10">
        <img src={LogoInova} alt="Inova Co." className="h-8 w-auto object-contain brightness-200" />
        <div className="flex items-center gap-10">
           <span className="hidden md:block text-[10px] font-black tracking-[0.5em] text-white/40">THE STRATEGIST ARREST</span>
           <Button className="bg-white text-black rounded-full px-8 text-[10px] font-black uppercase tracking-widest">START</Button>
        </div>
      </nav>

      {/* 2. Hero Manifesto */}
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-48 text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }}>
          <Badge className="mb-10 bg-white/5 text-orange-500 border-white/10 px-6 py-2 text-[10px] uppercase font-black rounded-full tracking-widest">POSITIONING IS WAR</Badge>
          <h1 className="text-7xl md:text-[140px] font-black tracking-tighter mb-14 leading-[0.8] uppercase italic drop-shadow-[0_0_80px_rgba(255,255,255,0.05)]">
             {config.hero.title}
          </h1>
          <p className="text-xl md:text-3xl text-white/40 max-w-4xl mx-auto mb-20 font-medium italic leading-relaxed">
             {config.hero.tagline}
          </p>
          <Button className="bg-orange-600 hover:bg-orange-700 text-white rounded-full h-20 px-20 text-xl font-black shadow-2xl shadow-orange-950/20 transform hover:scale-110 transition-transform">ACCEPT POWER</Button>
        </motion.div>
      </section>

      {/* 3. Trusted By */}
      <section className="py-24 border-y border-white/5 opacity-40">
         <div className="max-w-7xl mx-auto px-6 flex justify-between items-center flex-wrap gap-10 grayscale">
            <span className="text-4xl font-black italic tracking-tighter uppercase opacity-20">Dominance</span>
            <span className="text-4xl font-black italic tracking-tighter uppercase opacity-20">Authority</span>
            <span className="text-4xl font-black italic tracking-tighter uppercase opacity-20">Narrative</span>
            <span className="text-4xl font-black italic tracking-tighter uppercase opacity-20">Mission</span>
         </div>
      </section>

      {/* 4. Strategic Pillars (Glassmorphism) */}
      <section className="max-w-7xl mx-auto px-6 py-48 grid grid-cols-1 md:grid-cols-3 gap-20">
         <div className="p-10 bg-white/5 backdrop-blur-3xl rounded-[3rem] border border-white/10 space-y-6">
            <Trophy className="w-10 h-10 text-orange-500" />
            <h3 className="text-3xl font-black italic uppercase">Authority is not improvised.</h3>
            <p className="text-white/40 text-sm italic font-medium">It is built brick by brick through cinematic perception and strategic intent.</p>
         </div>
         <div className="p-10 bg-white/5 backdrop-blur-3xl rounded-[3rem] border border-white/10 space-y-6 rotate-3 transform">
            <Target className="w-10 h-10 text-orange-500" />
            <h3 className="text-3xl font-black italic uppercase">Silence the competition.</h3>
            <p className="text-white/40 text-sm italic font-medium">Positioning is a silent war. We provide the weapons of perception.</p>
         </div>
         <div className="p-10 bg-white/5 backdrop-blur-3xl rounded-[3rem] border border-white/10 space-y-6">
            <Zap className="w-10 h-10 text-orange-500" />
            <h3 className="text-3xl font-black italic uppercase">Scale through Story.</h3>
            <p className="text-white/40 text-sm italic font-medium">Narrative is the ultimate leverage. We architect your story for growth.</p>
         </div>
      </section>

      {/* 5. Services (Cinematic Cards) */}
      <section className="bg-white text-black py-48 rounded-[6rem] mx-4 md:mx-10 my-20">
         <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-6xl md:text-9xl font-black tracking-tighter italic uppercase underline decoration-orange-500 decoration-wavy mb-32 drop-shadow-lg">Expertises</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
               {config.services.map((s: any, i: number) => (
                  <div key={i} className="flex gap-10 items-start pb-20 border-b border-black/10">
                     <span className="text-6xl font-black italic opacity-5 leading-none">0{i+1}</span>
                     <div className="space-y-4">
                        <h3 className="text-4xl font-black uppercase italic tracking-tighter underline underline-offset-8 decoration-orange-500">{s.title}</h3>
                        <p className="text-black/60 text-lg font-bold italic leading-relaxed uppercase tracking-tighter">{s.desc}</p>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* 6. Big Quote / Manifesto Split */}
      <section className="py-60 bg-black text-center max-w-5xl mx-auto px-6">
         <Quote className="w-20 h-20 text-orange-600 mx-auto mb-20 opacity-30" />
         <h2 className="text-5xl md:text-8xl font-black italic uppercase italic tracking-tighter text-white leading-[0.85] mb-20">
            WHO CONTROLS THE NARRATIVE, CONTROLS THE MARKET.
         </h2>
         <p className="text-orange-500 text-xs font-black tracking-[1em] uppercase">The Inova Core Protocol</p>
      </section>

      {/* 7. Stats Manifest */}
      <section className="py-40 bg-zinc-900 border-y border-white/5">
         <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-20 text-center uppercase tracking-widest font-black italic">
            <div>
               <p className="text-orange-600 text-[10px] mb-4">REACH</p>
               <p className="text-7xl">324M</p>
            </div>
            <div>
               <p className="text-orange-600 text-[10px] mb-4">IMPACT</p>
               <p className="text-7xl">100%</p>
            </div>
            <div>
               <p className="text-orange-600 text-[10px] mb-4">LEADERS</p>
               <p className="text-7xl">500+</p>
            </div>
            <div>
               <p className="text-orange-600 text-[10px] mb-4">CAPITAL</p>
               <p className="text-7xl">$25M</p>
            </div>
         </div>
      </section>

      {/* 8. Pricing Manifesto */}
      <section id="pricing" className="max-w-7xl mx-auto px-6 py-60">
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-end">
            {config.plans.map((p: any, i: number) => (
               <div key={i} className={`p-16 rounded-[4.5rem] border ${p.popular ? 'bg-orange-600 border-none shadow-[0_0_100px_rgba(234,88,12,0.3)] transform scale-105' : 'bg-white/5 border-white/10'}`}>
                  <h4 className="text-[9px] font-black uppercase tracking-[0.6em] mb-12 opacity-50">{p.name}</h4>
                  <div className="text-8xl font-black italic tracking-tighter mb-16 leading-none">${p.price}</div>
                  <div className="space-y-8 mb-20">
                     {p.features.map((f: string, idx: number) => (
                        <p key={idx} className="text-xs font-black uppercase italic tracking-widest leading-none border-b border-white/10 pb-4">{f}</p>
                     ))}
                  </div>
                  <Button className={`w-full h-16 rounded-full font-black uppercase tracking-widest ${p.popular ? 'bg-black text-white' : 'bg-white text-black'}`}>DEPLOY</Button>
               </div>
            ))}
         </div>
      </section>

      <Footer whatsapp={config.whatsapp} isDark />
    </div>
  );
}

// --- 3. FINTECH ECOSYSTEM (8+ SECTIONS) ---
function renderFintechEcosystem(config: any, getIcon: any) {
  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-[#bff720]/30 overflow-x-hidden">
      
      {/* 1. Fin Nav */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
         <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
            <img src={LogoInova} alt="Inova Co." className="h-8 w-auto object-contain" />
            <div className="hidden md:flex gap-10 text-[10px] font-black uppercase tracking-widest text-zinc-400">
               <a href="#services">Architecture</a>
               <a href="#growth">Scaling</a>
               <a href="#pricing">Operating Model</a>
            </div>
            <Button className="bg-[#bff720] text-black rounded-full px-8 h-10 text-[10px] font-black uppercase tracking-widest">Login</Button>
         </div>
      </nav>

      {/* 2. Hero Sector */}
      <section className="bg-gradient-to-b from-gray-50 to-white pt-48 pb-32 border-b border-gray-100">
         <div className="max-w-6xl mx-auto px-6 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
               <Badge className="bg-zinc-900 text-[#bff720] mb-8 rounded-full px-6 py-1.5 uppercase font-black text-[9px] tracking-widest">FINANCIAL NARRATIVE PROTOCOL</Badge>
               <h1 className="text-6xl md:text-[100px] font-black tracking-tight mb-8 leading-[0.9] text-zinc-900">
                  {config.hero.title}
               </h1>
               <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto mb-16 font-medium italic">
                  {config.hero.tagline}
               </p>
               <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="bg-zinc-900 text-white hover:bg-black rounded-full h-16 px-14 text-xs font-black uppercase tracking-[0.2em] shadow-2xl">Integrate Proposal</Button>
                  <Button variant="ghost" className="text-zinc-600 rounded-full h-16 px-14 text-xs font-black uppercase tracking-[0.2em] border border-gray-100">Market Research</Button>
               </div>
            </motion.div>
         </div>
      </section>

      {/* 3. Trusted row */}
      <section className="py-16 bg-white overflow-hidden whitespace-nowrap">
         <div className="flex animate-marquee gap-20 opacity-10 font-black text-4xl italic tracking-tighter grayscale">
            {[...Array(10)].map((_, i) => (
               <span key={i}>STRATEGIC ASSET MANAGEMENT • GLOBAL AUTHORITY SCALE • CINEMATIC REVENUE • NARRATIVE EQUITY</span>
            ))}
         </div>
      </section>

      {/* 4. Core Architecture (Services) */}
      <section id="services" className="max-w-7xl mx-auto px-6 py-40 grid grid-cols-1 md:grid-cols-2 gap-32 border-b border-gray-100">
         <div className="space-y-10">
            <h2 className="text-6xl font-black italic uppercase italic tracking-tighter leading-none">The Strategic Architecture</h2>
            <p className="text-zinc-400 text-lg font-medium leading-relaxed italic">We build brands that are lembradas, not just vistas. Everything starts with the narrative infrastructure.</p>
            <Button size="lg" className="rounded-full bg-zinc-900 text-white px-10">Review Infrastructure</Button>
         </div>
         <div className="grid grid-cols-1 gap-12">
            {config.services.map((s: any, i: number) => (
                <div key={i} className="flex gap-8 group pb-8 border-b border-gray-50 last:border-0">
                   <div className="w-14 h-14 shrink-0 bg-[#bff720] rounded-2xl flex items-center justify-center text-black">
                      {getIcon(s.icon)}
                   </div>
                   <div className="space-y-2">
                      <h3 className="text-xl font-black uppercase tracking-tight italic">{s.title}</h3>
                      <p className="text-gray-400 text-sm font-medium italic">{s.desc}</p>
                   </div>
                </div>
            ))}
         </div>
      </section>

      {/* 5. Mockup / Feature Showcase */}
      <section className="py-40 bg-[#001D11] text-white overflow-hidden relative">
         <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10 relative z-10">
               <Badge className="bg-[#bff720] text-black mb-4">THE OPERATIONAL HUB</Badge>
               <h3 className="text-6xl font-black italic uppercase italic tracking-tighter leading-none">Who dominates perception, dominates market.</h3>
               <p className="text-white/40 text-xl font-medium leading-relaxed">Our platform provides the cinematic tools and strategic funnels required to scale from a common brand to a market reference.</p>
               <ul className="space-y-4">
                  <li className="flex items-center gap-4 text-xs font-black uppercase italic tracking-widest"><Flame className="w-5 h-5 text-[#bff720]" /> High-Ticket Conversion Engine</li>
                  <li className="flex items-center gap-4 text-xs font-black uppercase italic tracking-widest"><MousePointer2 className="w-5 h-5 text-[#bff720]" /> Intentional Content Dashboard</li>
                  <li className="flex items-center gap-4 text-xs font-black uppercase italic tracking-widest"><Shield className="w-5 h-5 text-[#bff720]" /> Authority Shield Protocol</li>
               </ul>
            </div>
            <div className="relative">
               <div className="bg-white/5 backdrop-blur-3xl p-10 rounded-[3rem] border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.5)] transform rotate-2">
                  <div className="aspect-video bg-zinc-900 rounded-2xl flex items-center justify-center text-[#bff720]/20 font-black italic text-4xl">DASHBOARD_PREVIEW</div>
               </div>
            </div>
         </div>
      </section>

      {/* 6. Growth Stats */}
      <section id="growth" className="max-w-7xl mx-auto px-6 py-40 border-b border-gray-100">
         <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center uppercase tracking-widest font-black italic">
            <div>
               <p className="text-zinc-300 text-[10px] mb-4">REACH</p>
               <p className="text-7xl">324M+</p>
            </div>
            <div className="bg-[#bff720] py-10 rounded-[3rem] shadow-xl">
               <p className="text-black/30 text-[10px] mb-4">CONFIDENCE</p>
               <p className="text-7xl">100%</p>
            </div>
            <div>
               <p className="text-zinc-300 text-[10px] mb-4">TRANSACTIONS</p>
               <p className="text-7xl">50k+</p>
            </div>
            <div>
               <p className="text-zinc-300 text-[10px] mb-4">CAPITAL VALUE</p>
               <p className="text-7xl">$25M</p>
            </div>
         </div>
      </section>

      {/* 7. Authority Testimonials */}
      <section className="py-40 bg-zinc-50 border-y border-gray-100 italic font-medium">
         <div className="max-w-5xl mx-auto px-6 text-center">
            <h4 className="text-[10px] font-black uppercase tracking-[1em] text-zinc-300 mb-20 italic">Validated by Performance</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 text-left">
               <div className="p-10 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm">
                  <p className="text-lg italic leading-relaxed mb-6">"Inova understood exactly what perception I wanted to build. My faturamento doubled after we fixed the narrative."</p>
                  <p className="font-black uppercase text-xs">Clara Dias • Mentor</p>
               </div>
               <div className="p-10 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm transform translate-y-10">
                  <p className="text-lg italic leading-relaxed mb-6">"Strategy before aesthetics. That's the key. They are not a filming crew, they are market weapons."</p>
                  <p className="font-black uppercase text-xs">Paulo Lima • CEO</p>
               </div>
            </div>
         </div>
      </section>

      {/* 8. Pricing Model */}
      <section id="pricing" className="max-w-7xl mx-auto px-6 py-60">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {config.plans.map((p: any, i: number) => (
               <div key={i} className={`p-14 rounded-[3.5rem] border ${p.popular ? 'border-zinc-900 bg-white shadow-2xl relative overflow-hidden' : 'border-gray-100 bg-white'}`}>
                  {p.popular && <div className="absolute top-8 right-8 bg-[#bff720] text-black px-4 py-1 rounded-full text-[8px] font-black uppercase tracking-widest">Recommended Investment</div>}
                  <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-300 mb-10">{p.name}</h4>
                  <div className="text-8xl font-black italic tracking-tighter mb-12 leading-none underline underline-offset-[12px] decoration-[#bff720] decoration-8">${p.price}</div>
                  <div className="space-y-6 flex-1 mb-20">
                     {p.features.map((f: string, j: number) => (
                        <div key={j} className="flex items-center gap-4 text-[11px] font-black uppercase tracking-widest text-zinc-900/40 italic"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> {f}</div>
                     ))}
                  </div>
                  <Button className={`w-full h-16 rounded-full font-black uppercase tracking-widest text-[10px] ${p.popular ? 'bg-zinc-900 text-white shadow-xl' : 'bg-gray-50 text-zinc-400'}`}>Execute Plan</Button>
               </div>
            ))}
         </div>
      </section>
      <Footer whatsapp={config.whatsapp} />
    </div>
  );
}

function Footer({ whatsapp, isDark }: { whatsapp: string, isDark?: boolean }) {
  return (
    <section id="cta" className="max-w-7xl mx-auto px-6 py-40 text-center relative">
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full -z-10 blur-[150px] ${isDark ? 'bg-orange-950/20' : 'bg-[#bff720]/5'}`} />
      <h2 className={`text-6xl md:text-[140px] font-black mb-12 tracking-tighter uppercase italic ${isDark ? 'text-white' : 'text-zinc-900'} leading-[0.8]`}>OWN THE MARKET.</h2>
      <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer">
        <Button className="bg-[#bff720] text-black hover:bg-[#bff720]/90 rounded-full h-24 px-20 text-3xl font-black uppercase italic shadow-2xl transition-all hover:scale-105 active:scale-95 group">
           START DEPLOYMENT <ChevronRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
        </Button>
      </a>
      <div className="mt-40 pt-10 border-t border-gray-200/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-[0.5em] opacity-40 italic">
        <span>© 2026 INOVA CO. LAB</span>
        <span>"Who controls the narrative, controls the market."</span>
      </div>
    </section>
  );
}
