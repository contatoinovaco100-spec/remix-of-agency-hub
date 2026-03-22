import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Rocket, Target, Zap, CheckCircle2, ArrowRight, MessageCircle, ShieldCheck, 
  PieChart, Video, Monitor, Sparkles, Bot, Star, Settings, Search, ChevronRight, 
  Shield, CreditCard, Globe, Smartphone, BarChart3, Users, Activity, Layers, 
  Heart, Crown, Quote, Flame, MousePointer2, Trophy, Apple, Dumbbell, Gavel, 
  Scale, Utensils, Coffee, Home, HeartPulse, Leaf, Briefcase, MapPin, Clock, 
  Camera, Mic, Lightbulb, Stethoscope, Building2, Play, Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import LogoInova from '@/assets/logo-inova.png';

// Assets Robustos (Fallbacks Online)
const ASSETS = {
  restaurant: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1200",
  personal: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1200",
  clinica: "https://images.unsplash.com/photo-1512290923902-8a9f81dc2069?auto=format&fit=crop&q=80&w=1200",
  lawyer: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=1200",
  realestate: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200",
};

const THEMES: Record<string, any> = {
  mobbin: { bg: 'bg-[#F9FAFB]', text: 'text-black', accent: 'text-zinc-900', secondary: 'text-zinc-400', button: 'bg-black text-white hover:shadow-[0_0_30px_rgba(0,0,0,0.2)]', card: 'bg-white/70 backdrop-blur-xl border-zinc-100', name: 'Mobbin Discovery' },
  openclaw: { bg: 'bg-[#020617]', text: 'text-white', accent: 'text-orange-500', secondary: 'text-white/40', button: 'bg-orange-600 text-white hover:shadow-[0_0_30px_rgba(234,88,12,0.4)]', card: 'bg-white/5 backdrop-blur-xl border-white/10', name: 'OpenClaw Manifesto', isDark: true },
  fintech: { bg: 'bg-[#050505]', text: 'text-white', accent: 'text-emerald-500', secondary: 'text-white/30', button: 'bg-emerald-600 text-white hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]', card: 'bg-zinc-900/50 backdrop-blur-2xl border-emerald-900/20', name: 'Fintech Escala', isDark: true },
  nutritionist: { bg: 'bg-[#FDFCFB]', text: 'text-emerald-950', accent: 'text-emerald-600', secondary: 'text-emerald-900/40', button: 'bg-emerald-950 text-white hover:shadow-[0_0_30px_rgba(6,78,59,0.2)]', card: 'bg-white/80 backdrop-blur-xl border-emerald-900/5', name: 'Protocolo Nutri' },
  studio: { bg: 'bg-black', text: 'text-white', accent: 'text-[#bff720]', secondary: 'text-white/30', button: 'bg-[#bff720] text-black hover:shadow-[0_0_40px_rgba(191,247,32,0.4)]', card: 'bg-zinc-900/80 backdrop-blur-3xl border-white/5', name: 'Arsenal de Estúdio', isDark: true },
  lawyer: { bg: 'bg-[#0A0D14]', text: 'text-white', accent: 'text-blue-500', secondary: 'text-white/20', button: 'bg-blue-700 text-white hover:shadow-[0_0_30px_rgba(29,78,216,0.3)]', card: 'bg-white/5 backdrop-blur-xl border-white/5', name: 'Prestígio Jurídico', isDark: true, image: ASSETS.lawyer },
  restaurant: { bg: 'bg-[#0F0A0A]', text: 'text-[#F3EFE0]', accent: 'text-orange-600', secondary: 'text-white/20', button: 'bg-orange-600 text-white hover:shadow-[0_0_30px_rgba(234,88,12,0.3)]', card: 'bg-[#1A1515]/80 backdrop-blur-2xl border-white/5', name: 'Autoridade Gastro', isDark: true, image: ASSETS.restaurant },
  personal: { bg: 'bg-[#050505]', text: 'text-[#FAFAFA]', accent: 'text-[#bff720]', secondary: 'text-white/20', button: 'bg-[#bff720] text-black hover:shadow-[0_0_40px_rgba(191,247,32,0.3)]', card: 'bg-zinc-900/60 backdrop-blur-2xl border-white/5', name: 'Physique Power', isDark: true, image: ASSETS.personal },
  clinica: { bg: 'bg-white', text: 'text-slate-900', accent: 'text-rose-500', secondary: 'text-slate-400', button: 'bg-rose-500 text-white hover:shadow-[0_0_30px_rgba(244,63,94,0.3)]', card: 'bg-white/60 backdrop-blur-xl border-slate-100', name: 'Estética de Elite', image: ASSETS.clinica },
  realestate: { bg: 'bg-zinc-50', text: 'text-zinc-900', accent: 'text-amber-600', secondary: 'text-zinc-400', button: 'bg-amber-600 text-white hover:shadow-[0_0_30px_rgba(217,119,6,0.2)]', card: 'bg-white/80 backdrop-blur-xl border-zinc-200', name: 'Imobiliária High-End', image: ASSETS.realestate },
};

const THEME_DEFAULTS: Record<string, any> = {
  hero: { title: "ALÉM DA LENTE. CONSTRUÍMOS NARRATIVAS.", tagline: "Ser visto é fácil. Ser lembrado é estratégia.", badge: "O ESTRATEGISTA • 2026", cta: "INICIAR POSICIONAMENTO" },
  strategy: { problem: "Sua marca é invisível no digital.", solution: "A Inova reconstrói sua autoridade com narrativa cinematográfica.", results: "Autoridade, Escala, Faturamento", steps: "Diagnóstico, Planejamento, Captação, Elite" }
};

export default function SalesLP() {
  const [config, setConfig] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem('agency_lp_config');
    if (saved) {
      try { 
        const parsed = JSON.parse(saved);
        setConfig(parsed); 
      } catch (e) { setConfig({}); }
    } else { setConfig({}); }
  }, []);

  if (!config) return null;
  const theme = THEMES[config.theme] || THEMES.mobbin;
  
  // Safety Guards Absolutos para cada campo
  const heroT = config.hero?.title || THEME_DEFAULTS.hero.title;
  const heroTag = config.hero?.tagline || THEME_DEFAULTS.hero.tagline;
  const heroB = config.hero?.badge || THEME_DEFAULTS.hero.badge;
  const heroC = config.hero?.cta || THEME_DEFAULTS.hero.cta;
  const prob = config.strategy?.problem || THEME_DEFAULTS.strategy.problem;
  const sol = config.strategy?.solution || THEME_DEFAULTS.strategy.solution;
  const results = (config.strategy?.results || THEME_DEFAULTS.strategy.results).split(',').map((s:string)=>s.trim());
  const steps = (config.strategy?.steps || THEME_DEFAULTS.strategy.steps).split(',').map((s:string)=>s.trim());
  const services = (config.services && config.services.length > 0) ? config.services : [{title: "Expertise Inova", desc: "Consultoria Premium"}];
  const plans = (config.plans && config.plans.length > 0) ? config.plans : [{name: "Plano Start", price: "Sob Consulta", features: ["Solicitar Orçamento"]}];

  return (
    <div className={`min-h-screen ${theme.bg} ${theme.text} font-sans selection:bg-[#bff720]/20 overflow-x-hidden transition-colors duration-1000`}>
      <Nav theme={theme} />

      <section className="relative min-h-[92vh] flex items-center justify-center pt-20 px-6 overflow-hidden">
        {theme.image && (
          <div className="absolute inset-0 z-0">
             <img src={theme.image} alt="Nicho" className="w-full h-full object-cover opacity-30 blur-[2px] transition-transform duration-[15s] hover:scale-110" />
             <div className={`absolute inset-0 bg-gradient-to-b ${theme.isDark ? 'from-transparent via-black/80 to-black' : 'from-transparent via-white/80 to-white'}`} />
          </div>
        )}
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Badge className={`${theme.isDark ? 'bg-white/5 text-white/40' : 'bg-black/5 text-zinc-400'} border-none mb-6 px-8 py-2 uppercase font-black tracking-[0.4em] text-[8px] rounded-full`}>{heroB}</Badge>
            <h1 className="text-5xl md:text-[100px] font-black tracking-tighter mb-6 leading-[0.85] uppercase italic drop-shadow-2xl">{heroT}</h1>
            <p className={`text-xl md:text-2xl ${theme.secondary} max-w-3xl mx-auto mb-12 font-medium italic leading-relaxed`}>{heroTag}</p>
            <Button className={`${theme.button} rounded-full h-16 md:h-20 px-12 md:px-16 text-xl font-black uppercase italic shadow-2xl transition-all hover:scale-105 active:scale-95`}>
              {heroC} <ArrowRight className="ml-4 w-6 h-6" />
            </Button>
          </motion.div>
        </div>
      </section>

      <section className="py-8 border-y border-current/5 grayscale opacity-20 overflow-hidden bg-current/5 backdrop-blur-sm">
        <div className="flex animate-marquee gap-24 font-black text-xl italic tracking-[0.2em] uppercase">
          {[...Array(10)].map((_, i) => <span key={i}>DESIGN • ESTRATÉGIA • VÍDEO • FUNIL • PERFORMANCE • NARRATIVA</span>)}
        </div>
      </section>

      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div whileInView={{ opacity: 1, x: 0 }} initial={{ opacity: 0, x: -50 }} className={`${theme.card} p-10 rounded-[3rem] border border-current/10 shadow-xl`}>
             <h3 className={`text-[10px] font-black uppercase tracking-[0.6em] mb-8 ${theme.accent}`}>Problem // Case</h3>
             <p className="text-3xl md:text-4xl font-black italic tracking-tighter leading-[0.9] uppercase">{prob}</p>
          </motion.div>
          <motion.div whileInView={{ opacity: 1, x: 0 }} initial={{ opacity: 0, x: 50 }} className="space-y-8">
             <h3 className={`text-[10px] font-black uppercase tracking-[0.6em] opacity-20`}>Strategy // Inova</h3>
             <p className={`text-xl opacity-60 font-medium italic leading-relaxed`}>{sol}</p>
          </motion.div>
        </div>
      </section>

      <section id="services" className="py-20 max-w-[1600px] mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
           <h2 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">ARSENAL DE <br /> <span className={theme.accent}>ENTREGAS.</span></h2>
           <p className={`max-w-xs text-[10px] font-black uppercase tracking-widest leading-relaxed italic ${theme.secondary}`}>Cada elemento é uma peça na construção da sua autoridade digital.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {services.map((d: any, i: number) => (
            <motion.div whileHover={{ y: -8 }} key={i} className={`${theme.card} p-6 rounded-[2rem] flex flex-col justify-between group transition-all border border-current/5 h-[280px] shadow-lg`}>
               <div className={`${theme.accent} mb-6 w-10 h-10 bg-current/10 rounded-full flex items-center justify-center`}><Sparkles size={20} /></div>
               <div><h3 className="text-lg font-black italic uppercase leading-tight mb-3">{d.title}</h3><p className="text-[9px] opacity-40 uppercase tracking-tighter leading-[1.2]">{d.desc}</p></div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-6 whitespace-nowrap overflow-x-auto custom-scrollbar">
        <div className="flex gap-4">
          {steps.map((step: string, i: number) => (
            <div key={i} className={`${theme.card} min-w-[200px] p-6 rounded-2xl border border-current/5 flex flex-col items-center text-center gap-4 group hover:bg-current/[0.04] transition-all`}>
               <span className="text-3xl font-black italic opacity-5 group-hover:opacity-100 transition-opacity">0{i+1}</span>
               <p className="text-[9px] font-black uppercase tracking-widest leading-relaxed italic opacity-40 group-hover:opacity-100">{step}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="pricing" className="py-24 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {plans.map((p: any, i: number) => (
          <div key={i} className={`${theme.card} p-10 rounded-[3rem] border-2 ${p.popular ? 'border-primary shadow-2xl scale-[1.02]' : 'border-current/5 opacity-80'}`}>
            <div className="flex-1 space-y-8">
               <h4 className="text-[8px] font-black uppercase tracking-[0.4em] opacity-30">{p.name} escala</h4>
               <div className="text-4xl md:text-6xl font-black italic tracking-tighter underline decoration-current/10 decoration-[6px] underline-offset-8">R${p.price}</div>
               <div className="space-y-3">
                  {(p.features || []).map((f: string, j: number) => (
                    <div key={j} className="flex items-center gap-3 text-[9px] font-bold uppercase tracking-widest opacity-40 italic border-b border-current/5 pb-2"><CheckCircle2 className={`w-3 h-3 ${theme.accent}`} /> {f}</div>
                  ))}
               </div>
               <Button className={`${theme.button} w-full h-14 rounded-full font-black`}>ATIVAR PROTOCOLO</Button>
            </div>
          </div>
        ))}
      </section>

      <Footer whatsapp={config.whatsapp || "5562999999999"} theme={theme} cta={heroC} />
    </div>
  );
}

function Nav({ theme }: any) {
  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] md:w-auto">
      <div className={`${theme.card} h-14 border rounded-full px-8 flex items-center justify-between gap-12 shadow-2xl backdrop-blur-3xl`}>
        <img src={LogoInova} alt="Inova" className={`h-5 w-auto ${theme.isDark ? 'brightness-200' : ''}`} />
        <Button className={`${theme.button} rounded-full px-6 h-8 text-[7px] font-black uppercase tracking-widest shadow-xl`}>REUNIÃO</Button>
      </div>
    </nav>
  );
}

function Footer({ whatsapp, theme, cta }: any) {
  return (
    <section className="py-32 text-center relative overflow-hidden">
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] rounded-full blur-[100px] -z-10 ${theme.isDark ? 'bg-zinc-800/40' : 'bg-zinc-200/50'}`} />
      <div className="space-y-12">
        <h2 className="text-5xl md:text-[80px] font-black tracking-tighter uppercase italic leading-[0.8]">VAMOS ESCALAR?</h2>
        <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer">
          <Button className={`${theme.button} h-20 px-16 text-2xl font-black uppercase italic shadow-2xl`}>{cta}</Button>
        </a>
      </div>
    </section>
  );
}
