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
  Trophy,
  Apple,
  Dumbbell,
  Gavel,
  Scale,
  Utensils,
  Coffee,
  Home,
  HeartPulse,
  Leaf,
  Briefcase,
  MapPin,
  Clock,
  Camera,
  Mic,
  Lightbulb
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import LogoInova from '@/assets/logo-inova.png';

// Helper to map icon names to components
const IconMap: Record<string, any> = {
  Video, Bot, PieChart, Monitor, Rocket, Target, Zap, Sparkles, Star, ShieldCheck, Shield, CreditCard, Globe, Smartphone, BarChart3, Users, Activity, Layers, Heart, Crown, Trophy, Apple, Dumbbell, Gavel, Scale, Utensils, Coffee, Home, HeartPulse, Leaf, Briefcase, MapPin, Clock, Camera, Mic, Lightbulb
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
    return <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />;
  };

  if (config.theme === 'openclaw') return renderOpenClawManifesto(config, getIcon);
  if (config.theme === 'fintech') return renderFintechEcosystem(config, getIcon);
  if (config.theme === 'nutritionist') return renderNutritionist(config, getIcon);
  if (config.theme === 'studio') return renderStudioRental(config, getIcon);
  if (config.theme === 'lawyer') return renderLawyer(config, getIcon);
  if (config.theme === 'restaurant') return renderRestaurant(config, getIcon);
  if (config.theme === 'personal') return renderPersonal(config, getIcon);

  return renderMobbinDiscovery(config, getIcon);
}

// --- SHARED COMPONENTS ---
function Footer({ whatsapp, isDark, brand = "INOVA CO. LAB" }: { whatsapp: string, isDark?: boolean, brand?: string }) {
  return (
    <section id="cta" className="max-w-7xl mx-auto px-6 py-40 text-center relative">
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full -z-10 blur-[150px] ${isDark ? 'bg-zinc-800/20' : 'bg-[#bff720]/5'}`} />
      <h2 className={`text-6xl md:text-[140px] font-black mb-12 tracking-tighter uppercase italic ${isDark ? 'text-white' : 'text-zinc-900'} leading-[0.8]`}>DOMINATE NOW.</h2>
      <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer">
        <Button className="bg-[#bff720] text-black hover:bg-[#bff720]/90 rounded-full h-24 px-20 text-3xl font-black uppercase italic shadow-2xl transition-all hover:scale-105 active:scale-95 group">
           START DEPLOYMENT <ChevronRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
        </Button>
      </a>
      <div className="mt-40 pt-10 border-t border-gray-200/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-[0.5em] opacity-40 italic">
        <span>© 2026 {brand}</span>
        <span>"Who controls the narrative, controls the market."</span>
      </div>
    </section>
  );
}

// --- 1. MOBBIN DISCOVERY --- (Same as previous)
function renderMobbinDiscovery(config: any, getIcon: any) {
  return (
    <div className="min-h-screen bg-[#F9FAFB] text-black font-sans selection:bg-[#bff720]/30 overflow-x-hidden">
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] md:w-auto">
        <nav className="bg-white/70 backdrop-blur-xl border border-gray-200/50 rounded-full py-2.5 px-3 md:px-8 flex items-center justify-between gap-8 shadow-lg">
          <img src={LogoInova} alt="Inova" className="h-6 w-auto pl-2" />
           <div className="hidden lg:flex items-center gap-10 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
            <a href="#services">Solutions</a>
            <a href="#pricing">Pricing</a>
          </div>
          <Button size="sm" className="bg-black text-white rounded-full px-6 text-[10px] font-black uppercase tracking-widest">Get Started</Button>
        </nav>
      </div>
      <section className="max-w-4xl mx-auto px-6 pt-48 pb-32 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <Badge className="bg-white border border-gray-100 px-4 py-1.5 rounded-full shadow-sm mb-10 text-[10px] font-black uppercase tracking-widest text-[#bff720]">{config.hero.badge}</Badge>
          <h1 className="text-6xl md:text-[90px] font-black tracking-tighter mb-8 leading-[0.85] text-zinc-900 uppercase italic">{config.hero.title}</h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 font-medium italic">{config.hero.tagline}</p>
        </motion.div>
      </section>
      <section id="services" className="max-w-[1500px] mx-auto px-6 py-32 bg-white rounded-[5rem] shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {config.services.map((s: any, i: number) => (
            <div key={i} className="group cursor-pointer">
              <div className="aspect-[3/4] rounded-[3rem] bg-gray-50 flex items-center justify-center group-hover:bg-zinc-900 duration-700">
                <div className="group-hover:text-[#bff720] transition-colors">{getIcon(s.icon)}</div>
              </div>
              <div className="mt-8 px-4"><h3 className="font-black text-lg italic uppercase">{s.title}</h3><p className="text-gray-400 text-[10px] uppercase font-bold tracking-widest leading-relaxed italic opacity-70">{s.desc}</p></div>
            </div>
          ))}
        </div>
      </section>
      <Footer whatsapp={config.whatsapp} />
    </div>
  );
}

// --- 2. NUTRITIONIST --- (Same as previous)
function renderNutritionist(config: any, getIcon: any) {
  return (
    <div className="min-h-screen bg-[#FDFCFB] text-zinc-800 font-sans selection:bg-emerald-500/20 overflow-x-hidden">
      <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-[90%] md:w-auto bg-white/40 backdrop-blur-xl border border-emerald-900/5 rounded-full px-10 py-4 flex items-center justify-between gap-20 shadow-sm">
        <h4 className="font-black italic text-emerald-900 tracking-tighter">WELLNESS PROTOCOL</h4>
        <Button className="bg-emerald-600 text-white rounded-full px-6 text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700">Start Transformation</Button>
      </nav>
      <section className="max-w-5xl mx-auto px-6 pt-48 pb-32 text-center">
         <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <Badge className="bg-emerald-100 text-emerald-800 border-none mb-10 rounded-full px-6 py-2 uppercase font-black text-[9px] tracking-widest">NUTRITIONAL POSITIONING</Badge>
            <h1 className="text-6xl md:text-[100px] font-black tracking-tighter mb-8 leading-[0.9] text-emerald-950 italic">FUEL YOUR NARRATIVE.</h1>
            <p className="text-lg md:text-xl text-emerald-900/40 max-w-2xl mx-auto mb-16 font-medium italic">We don't just count calories. We engineer authority through metabolic precision.</p>
            <Button className="bg-emerald-950 text-white rounded-full h-20 px-16 text-xl font-black uppercase shadow-2xl">DECODE MY PLAN</Button>
         </motion.div>
      </section>
       <section id="services" className="max-w-7xl mx-auto px-6 py-40 grid grid-cols-1 md:grid-cols-4 gap-12">
            {config.services.map((s: any, i: number) => (
                <div key={i} className="group p-10 bg-white border border-emerald-900/5 rounded-[3rem] hover:shadow-2xl transition-all">
                   <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-8">{getIcon('Apple')}</div>
                   <h3 className="text-2xl font-black italic uppercase italic tracking-tighter mb-4">{s.title}</h3>
                   <p className="text-emerald-900/30 text-sm font-medium italic">{s.desc}</p>
                </div>
            ))}
      </section>
      <Footer whatsapp={config.whatsapp} brand="WELLNESS CO. LAB" />
    </div>
  );
}

// --- 3. STUDIO RENTAL (Refined for Gear & Scenery) ---
function renderStudioRental(config: any, getIcon: any) {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#bff720]/20 overflow-x-hidden">
      
      {/* 1. Nav */}
      <nav className="fixed top-0 left-0 w-full px-12 h-24 flex items-center justify-between z-50 border-b border-white/5 bg-black/50 backdrop-blur-md">
         <img src={LogoInova} alt="Inova" className="h-8 brightness-200" />
         <div className="hidden md:flex gap-12 text-[10px] font-black uppercase tracking-[0.5em] text-white/30">
            <span>The Setup</span>
            <span>The Gear</span>
            <span>The Stages</span>
         </div>
         <Button className="bg-[#bff720] text-black rounded-none px-8 font-black uppercase italic tracking-widest">Book Studio</Button>
      </nav>

      {/* 2. Hero */}
      <section className="h-screen relative flex items-center justify-center text-center">
         <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40rem] font-black text-white/[0.02] italic select-none">GEAR</div>
         </div>
         <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="relative z-20 space-y-12">
            <Badge className="bg-white/5 text-[#bff720] border-white/10 mb-4 px-6 py-2 uppercase font-black text-[10px] tracking-[0.5em]">OPERATIONAL READINESS</Badge>
            <h1 className="text-7xl md:text-[140px] font-black tracking-tighter uppercase italic leading-[0.8] drop-shadow-2xl">
               NOT JUST A STUDIO. <br /> <span className="text-white">A NARRATIVE WEAPON.</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/30 max-w-3xl mx-auto italic font-medium uppercase tracking-widest">Rental of our professional studio with high-end equipment <br /> and custom scenery for elite creators.</p>
            <Button className="bg-white text-black h-24 px-16 text-3xl font-black uppercase italic shadow-2xl hover:bg-[#bff720] transition-colors">INITIATE RENTAL</Button>
         </motion.div>
      </section>

      {/* 3. The Gear (Equipment) */}
      <section className="py-48 px-10 bg-zinc-950">
         <div className="max-w-7xl mx-auto">
            <h2 className="text-6xl md:text-[10rem] font-black italic uppercase leading-[0.8] mb-32 tracking-tighter text-white">The Arsenal.</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
               <div className="p-12 border border-white/5 rounded-[4rem] bg-black hover:border-[#bff720]/20 transition-all group">
                  <Camera className="w-12 h-12 text-[#bff720] mb-8" />
                  <h4 className="text-3xl font-black italic uppercase italic mb-4">Cinema 8K Flow</h4>
                  <p className="text-white/30 text-sm font-medium italic">High-end sensors and lenses ready for commercial authority. Narrative clarity at its peak.</p>
               </div>
               <div className="p-12 border border-white/5 rounded-[4rem] bg-black hover:border-[#bff720]/20 transition-all group">
                  <Mic className="w-12 h-12 text-[#bff720] mb-8" />
                  <h4 className="text-3xl font-black italic uppercase italic mb-4">Acoustic Shield</h4>
                  <p className="text-white/30 text-sm font-medium italic">Neumann & Shure ecosystem. Your voice with the texture of industry leaders.</p>
               </div>
               <div className="p-12 border border-white/5 rounded-[4rem] bg-black hover:border-[#bff720]/20 transition-all group">
                  <Lightbulb className="w-12 h-12 text-[#bff720] mb-8" />
                  <h4 className="text-3xl font-black italic uppercase italic mb-4">Luminosity Grid</h4>
                  <p className="text-white/30 text-sm font-medium italic">Strategic lighting setup for every skin tone and every atmospheric requirement.</p>
               </div>
            </div>
         </div>
      </section>

      {/* 4. The Stages (Scenery) */}
      <section className="py-48 bg-white text-black rounded-[6rem] mx-4 md:mx-10 my-20">
         <div className="max-w-7xl mx-auto px-10">
            <h2 className="text-7xl font-black italic uppercase tracking-tighter mb-20 italic">The Scenery.</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
               <div className="space-y-8">
                  <div className="aspect-[16/10] bg-zinc-100 rounded-[3rem] flex items-center justify-center font-black italic text-zinc-300 text-6xl">PODCAST_ENV</div>
                  <h4 className="text-3xl font-black italic uppercase italic">The Talk Hub</h4>
                  <p className="text-zinc-400 text-sm font-medium italic uppercase tracking-widest leading-relaxed">Perfect for long-form interviews and authority manifestos.</p>
               </div>
               <div className="space-y-8 pt-32">
                  <div className="aspect-[16/10] bg-zinc-100 rounded-[3rem] flex items-center justify-center font-black italic text-zinc-300 text-6xl">MINIMAL_LOFT</div>
                  <h4 className="text-3xl font-black italic uppercase italic">The Clean Canvas</h4>
                  <p className="text-zinc-400 text-sm font-medium italic uppercase tracking-widest leading-relaxed">High-end minimalism for luxury product videos and personal branding.</p>
               </div>
            </div>
         </div>
      </section>

      <Footer whatsapp={config.whatsapp} isDark brand="INOVA STUDIO LAB" />
    </div>
  );
}

// --- 4. LAWYER --- (Same as previous)
function renderLawyer(config: any, getIcon: any) {
  return (
    <div className="min-h-screen bg-[#0A0D14] text-white font-sans selection:bg-blue-500/20 overflow-x-hidden">
      <nav className="max-w-7xl mx-auto px-10 py-12 flex justify-between items-center relative z-10 border-b border-white/5">
         <img src={LogoInova} alt="Inova" className="h-10 brightness-200" />
         <Button variant="outline" className="rounded-none border-white/20 text-white hover:bg-white hover:text-black transition-all px-10 h-12 text-[10px] font-black uppercase tracking-widest">Legal Inquiry</Button>
      </nav>
      <section className="max-w-6xl mx-auto px-10 pt-48 pb-60 text-center">
         <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <Badge className="bg-transparent border border-white/10 text-white/40 mb-10 px-6 py-2 uppercase font-black tracking-[0.6em] text-[8px] rounded-none">PRESTIGE • AUTHORITY</Badge>
            <h1 className="text-6xl md:text-[120px] font-black tracking-tighter mb-12 uppercase italic leading-[0.85]">WHO CONTROLS THE FACTS, WINS.</h1>
            <p className="text-xl md:text-2xl text-white/30 max-w-3xl mx-auto mb-20 italic font-medium leading-relaxed">Strategic Legal Architecture for High-End Cases.</p>
            <Button className="bg-blue-950 text-white rounded-none h-20 px-20 text-xl font-black uppercase border border-blue-800/50">Establish Legal Protocol</Button>
         </motion.div>
      </section>
      <Footer whatsapp={config.whatsapp} isDark brand="LEGAL ARCHITECT CO." />
    </div>
  );
}

// --- 5. RESTAURANT --- (Same as previous)
function renderRestaurant(config: any, getIcon: any) {
  return (
    <div className="min-h-screen bg-[#0F0A0A] text-[#F3EFE0] font-sans selection:bg-orange-500/20 overflow-x-hidden">
      <section className="h-screen relative flex items-center justify-center">
         <nav className="absolute top-12 left-0 w-full px-12 flex justify-between items-center z-50">
            <img src={LogoInova} alt="Inova" className="h-8 brightness-200" />
            <span className="text-[10px] font-black uppercase tracking-[0.6em] text-white/20">RESERVATIONS ALIVE</span>
         </nav>
         <div className="relative z-20 text-center space-y-12">
            <h1 className="text-7xl md:text-[180px] font-black italic tracking-tighter uppercase leading-[0.7] text-white">GASTRONOMIC AUTHORITY.</h1>
            <p className="text-2xl text-white/30 max-w-2xl mx-auto font-medium italic uppercase tracking-[0.3em]">Where every texture is a strategic choice.</p>
         </div>
         <div className="absolute inset-x-0 bottom-20 flex justify-center z-20">
            <Button className="bg-orange-600 text-white rounded-full h-24 px-16 text-3xl font-black uppercase italic shadow-2xl">TASTE THE POSITIONING</Button>
         </div>
      </section>
      <Footer whatsapp={config.whatsapp} isDark brand="GASTRO LAB CO." />
    </div>
  );
}

// --- 6. PERSONAL TRAINER --- (Same as previous)
function renderPersonal(config: any, getIcon: any) {
  return (
    <div className="min-h-screen bg-[#050505] text-[#FAFAFA] font-sans selection:bg-[#bff720]/20 overflow-x-hidden">
      <section className="h-screen relative flex items-center justify-center overflow-hidden">
         <div className="relative z-20 text-center px-6">
            <motion.div initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }}>
               <Badge className="bg-[#bff720] text-black font-black uppercase tracking-[0.4em] text-[10px] px-8 py-2 rounded-none mb-10">THE PHYSIQUE ARCHITECT</Badge>
               <h1 className="text-8xl md:text-[180px] font-black italic tracking-tighter uppercase leading-[0.75] mb-12">BEYOND LIMITS.</h1>
               <Button className="bg-[#bff720] text-black rounded-none h-24 px-20 text-3xl font-black uppercase italic">REWRITE MY DNA</Button>
            </motion.div>
         </div>
      </section>
      <Footer whatsapp={config.whatsapp} isDark brand="PHYS’X ARCHITECTS" />
    </div>
  );
}
