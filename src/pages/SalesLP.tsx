import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Rocket, Target, Zap, CheckCircle2, ArrowRight, MessageCircle, ShieldCheck, 
  PieChart, Video, Monitor, Sparkles, Bot, Star, Settings, Search, ChevronRight, 
  Shield, CreditCard, Globe, Smartphone, BarChart3, Users, Activity, Layers, 
  Heart, Crown, Quote, Flame, MousePointer2, Trophy, Apple, Dumbbell, Gavel, 
  Scale, Utensils, Coffee, Home, HeartPulse, Leaf, Briefcase, MapPin, Clock, 
  Camera, Mic, Lightbulb, Stethoscope, Building2, Play, Plus, Share2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import LogoInova from '@/assets/logo-inova.png';

// Assets Cinematográficos Inova
const ASSETS = {
  restaurant: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1200",
  personal: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1200",
  clinica: "file:///Users/lucassoares/.gemini/antigravity/brain/70a0d96f-4a74-42d0-b5c4-b4af4b35c6d6/luxury_aesthetic_clinic_v1774133230214_1774149064393.png",
  lawyer: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=1200",
  realestate: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200",
  studio: "file:///Users/lucassoares/.gemini/antigravity/brain/70a0d96f-4a74-42d0-b5c4-b4af4b35c6d6/inova_studio_arsenal_v1774133230214_1774149048384.png",
};

const THEMES: Record<string, any> = {
  mobbin: { bg: 'bg-[#F9FAFB]', text: 'text-black', accent: 'text-zinc-950', secondary: 'text-zinc-400', button: 'bg-black text-white hover:shadow-[0_0_30px_rgba(0,0,0,0.2)]', card: 'bg-white/70 backdrop-blur-xl border-zinc-100', name: 'Mobbin Discovery' },
  openclaw: { bg: 'bg-[#050505]', text: 'text-white', accent: 'text-[#bff720]', secondary: 'text-white/40', button: 'bg-[#bff720] text-black hover:shadow-[0_0_30px_rgba(191,247,32,0.4)]', card: 'bg-white/5 backdrop-blur-xl border-white/10', name: 'OpenClaw 0.1', isDark: true },
  fintech: { bg: 'bg-[#050505]', text: 'text-white', accent: 'text-emerald-500', secondary: 'text-white/30', button: 'bg-emerald-600 text-white hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]', card: 'bg-zinc-900/50 backdrop-blur-2xl border-emerald-900/20', name: 'Fintech Escala', isDark: true },
  nutritionist: { bg: 'bg-[#FDFCFB]', text: 'text-emerald-950', accent: 'text-emerald-600', secondary: 'text-emerald-900/40', button: 'bg-emerald-950 text-white hover:shadow-[0_0_30px_rgba(6,78,59,0.2)]', card: 'bg-white/80 backdrop-blur-xl border-emerald-900/5', name: 'Protocolo Nutri' },
  studio: { bg: 'bg-black', text: 'text-white', accent: 'text-[#bff720]', secondary: 'text-white/30', button: 'bg-[#bff720] text-black hover:shadow-[0_0_40px_rgba(191,247,32,0.4)]', card: 'bg-zinc-900/80 backdrop-blur-3xl border-white/5', name: 'Arsenal de Estúdio', isDark: true, image: ASSETS.studio },
  lawyer: { bg: 'bg-[#0A0D14]', text: 'text-white', accent: 'text-blue-500', secondary: 'text-white/20', button: 'bg-blue-700 text-white hover:shadow-[0_0_30px_rgba(29,78,216,0.3)]', card: 'bg-white/5 backdrop-blur-xl border-white/5', name: 'Prestígio Jurídico', isDark: true, image: ASSETS.lawyer },
  restaurant: { bg: 'bg-[#0F0A0A]', text: 'text-[#F3EFE0]', accent: 'text-orange-600', secondary: 'text-white/20', button: 'bg-orange-600 text-white hover:shadow-[0_0_30px_rgba(234,88,12,0.3)]', card: 'bg-[#1A1515]/80 backdrop-blur-2xl border-white/5', name: 'Autoridade Gastro', isDark: true, image: ASSETS.restaurant },
  personal: { bg: 'bg-[#050505]', text: 'text-[#FAFAFA]', accent: 'text-[#bff720]', secondary: 'text-white/20', button: 'bg-[#bff720] text-black hover:shadow-[0_0_40px_rgba(191,247,32,0.3)]', card: 'bg-zinc-900/60 backdrop-blur-2xl border-white/5', name: 'Physique Power', isDark: true, image: ASSETS.personal },
  clinica: { bg: 'bg-white', text: 'text-slate-900', accent: 'text-rose-500', secondary: 'text-slate-400', button: 'bg-rose-500 text-white hover:shadow-[0_0_30px_rgba(244,63,94,0.3)]', card: 'bg-white/60 backdrop-blur-xl border-slate-100', name: 'Estética de Elite', image: ASSETS.clinica },
  realestate: { bg: 'bg-zinc-50', text: 'text-zinc-900', accent: 'text-amber-600', secondary: 'text-zinc-400', button: 'bg-amber-600 text-white hover:shadow-[0_0_30px_rgba(217,119,6,0.2)]', card: 'bg-white/80 backdrop-blur-xl border-zinc-200', name: 'Imobiliária High-End', image: ASSETS.realestate },
};

const THEME_DEFAULTS = {
  hero: { title: "ALÉM DA LENTE. CONSTRUÍMOS NARRATIVAS.", tagline: "Ser visto é fácil. Ser lembrado é estratégia.", badge: "O ESTRATEGISTA • 2026", cta: "INICIAR POSICIONAMENTO" },
  strategy: { problem: "Sua marca é invisível no digital.", solution: "A Inova reconstrói sua autoridade com narrativa cinematográfica.", results: "Autoridade, Escala, Faturamento", steps: "Diagnóstico, Planejamento, Captação, Elite" },
  styles: { heroTitleSize: "72", accentColor: "#bff720", fontFamily: "Inter", isItalic: true }
};

export default function SalesLP() {
  const [config, setConfig] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem('agency_lp_config');
    if (saved) {
      try { setConfig(JSON.parse(saved)); } 
      catch (e) { setConfig({}); }
    } else { setConfig({}); }
  }, []);

  if (!config) return null;
  const theme = THEMES[config.theme] || THEMES.openclaw;
  
  // Font Size standardized to max 72px for Desktop
  const heroSize = config.styles?.heroTitleSize || THEME_DEFAULTS.styles.heroTitleSize;
  const accent = config.styles?.accentColor || THEME_DEFAULTS.styles.accentColor;
  const fontFam = config.styles?.fontFamily || THEME_DEFAULTS.styles.fontFamily;
  const italicClass = (config.styles?.isItalic !== false) ? 'italic' : 'not-italic';

  const heroT = config.hero?.title || THEME_DEFAULTS.hero.title;
  const heroTag = config.hero?.tagline || THEME_DEFAULTS.hero.tagline;
  const heroB = config.hero?.badge || THEME_DEFAULTS.hero.badge;
  const heroC = config.hero?.cta || THEME_DEFAULTS.hero.cta;
  const prob = config.strategy?.problem || THEME_DEFAULTS.strategy.problem;
  const sol = config.strategy?.solution || THEME_DEFAULTS.strategy.solution;
  const results = (config.strategy?.results || THEME_DEFAULTS.strategy.results).split(',').map((s:string)=>s.trim());
  const steps = (config.strategy?.steps || THEME_DEFAULTS.strategy.steps).split(',').map((s:string)=>s.trim());
  const services = (config.services && config.services.length > 0) ? config.services : [{title: "Expertise Inova", desc: "Consultoria Premium"}];
  const plans = (config.plans && config.plans.length > 0) ? config.plans : [{name: "Plano Start", price: "2300", features: ["Aceleração Digital"]}];

  return (
    <div className={`min-h-screen ${theme.bg} ${theme.text} selection:bg-[#bff720]/20 overflow-x-hidden transition-colors duration-1000`} style={{ fontFamily: fontFam }}>
      <Nav theme={theme} accent={accent} />

      {/* Hero Refinado & Proporcional */}
      <section className="relative min-h-[95vh] flex items-center justify-center pt-24 px-6 overflow-hidden">
        {theme.image && (
          <div className="absolute inset-0 z-0">
             <img src={theme.image} alt="Nicho" className="w-full h-full object-cover opacity-20 blur-[1px] transition-transform duration-[15s]" />
             <div className={`absolute inset-0 bg-gradient-to-b ${theme.isDark ? 'from-transparent via-black to-black' : 'from-transparent via-white to-white'}`} />
          </div>
        )}
        <div className="relative z-10 max-w-7xl mx-auto text-center px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Badge className={`${theme.isDark ? 'bg-white/5 text-white/40' : 'bg-black/5 text-zinc-400'} border-none mb-10 px-8 py-2 uppercase font-black tracking-[0.4em] text-[8px] rounded-full`}>{heroB}</Badge>
            <h1 className={`text-4xl md:text-[${heroSize}px] font-black tracking-tighter mb-8 leading-[1] uppercase ${italicClass} drop-shadow-2xl`} style={{ fontSize: `${heroSize}px` }}>{heroT}</h1>
            <p className={`text-lg md:text-2xl ${theme.secondary} max-w-2xl mx-auto mb-16 font-medium leading-relaxed uppercase tracking-tight`}>{heroTag}</p>
            <Button className="rounded-full h-20 px-16 text-xl font-black uppercase italic shadow-2xl transition-all hover:scale-105 active:scale-95 group" style={{ backgroundColor: accent, color: theme.isDark ? '#000' : '#fff' }}>
              {heroC} <ArrowRight className="ml-4 w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Marquee Suave */}
      <section className="py-10 border-y border-current/10 grayscale opacity-20 overflow-hidden bg-current/5">
        <div className="flex animate-marquee gap-24 font-black text-xl italic tracking-[0.2em] uppercase">
          {[...Array(10)].map((_, i) => <span key={i}>DESIGN • ESTRATÉGIA • VÍDEO • FUNIL • PERFORMANCE • NARRATIVA</span>)}
        </div>
      </section>

      {/* Estrutura de Vendas Clean */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div whileInView={{ opacity: 1, x: 0 }} initial={{ opacity: 0, x: -30 }} className="space-y-6">
             <h3 className="text-[10px] font-black uppercase tracking-[0.6em] mb-4 opacity-30" style={{ color: accent }}>The Challenge</h3>
             <p className={`text-3xl md:text-5xl font-black tracking-tighter leading-[1] uppercase ${italicClass}`}>{prob}</p>
          </motion.div>
          <motion.div whileInView={{ opacity: 1, x: 0 }} initial={{ opacity: 0, x: 30 }} className="pt-8 md:pt-0">
             <div className={`${theme.card} p-10 md:p-14 rounded-[3rem] border border-current/10 relative shadow-2xl`}>
                <div className="absolute -top-10 -right-10 opacity-5" style={{ color: accent }}><Target size={150}/></div>
                <h3 className="text-[10px] font-black uppercase tracking-[0.5em] opacity-30 mb-8 italic">A Solução Inova</h3>
                <p className="text-xl opacity-70 font-medium leading-relaxed uppercase tracking-tight italic">{sol}</p>
             </div>
          </motion.div>
        </div>
      </section>

      {/* Grid de Serviços */}
      <section className="py-24 max-w-[1600px] mx-auto px-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
           <h2 className={`text-4xl md:text-7xl font-black italic uppercase tracking-tighter leading-[0.9]`}>ARSENAL DE <br /> <span style={{ color: accent }}>ENTREGAS.</span></h2>
           <p className={`max-w-xs text-[10px] font-extrabold uppercase tracking-widest leading-relaxed italic ${theme.secondary} opacity-30`}>Cada elemento é um pilar na construção da sua autoridade digital.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {services.map((d: any, i: number) => (
            <motion.div whileHover={{ y: -8 }} key={i} className={`${theme.card} p-8 rounded-[2.5rem] flex flex-col justify-between group transition-all border border-current/5 h-[320px] shadow-2xl relative overflow-hidden`}>
               <div className="mb-8 w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: `${accent}20`, color: accent }}><Sparkles size={24} /></div>
               <div>
                  <h3 className={`text-xl font-black italic uppercase leading-tight mb-4`}>{d.title}</h3>
                  <p className="text-[10px] opacity-40 uppercase tracking-widest leading-[1.3] font-bold italic">{d.desc}</p>
               </div>
               <div className="absolute bottom-0 left-0 h-[4px] transition-all duration-700 w-0 group-hover:w-full opacity-20" style={{ backgroundColor: accent }} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Planos Standard */}
      <section id="pricing" className="py-32 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {plans.map((p: any, i: number) => (
          <div key={i} className={`${theme.card} p-12 rounded-[3.5rem] border-2 flex flex-col justify-between h-[600px] transition-all`} style={{ borderColor: p.popular ? accent : 'transparent', opacity: p.popular ? 1 : 0.8 }}>
            <div className="space-y-12">
               <div className="flex justify-between items-start">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30 italic">{p.name}</h4>
                  {p.popular && <Badge className="text-black text-[8px] font-black px-4 py-1.5 uppercase tracking-widest rounded-full" style={{ backgroundColor: accent }}>Prêmio</Badge>}
               </div>
               <div className="text-6xl md:text-[80px] font-black italic tracking-tighter leading-none underline decoration-current/10 decoration-[6px] underline-offset-8">R${p.price}</div>
               <div className="space-y-4">
                  {(p.features || []).map((f: string, j: number) => (
                    <div key={j} className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest opacity-40 italic border-b border-current/5 pb-3"> <Plus className="w-3.5 h-3.5" style={{color: accent}}/> {f}</div>
                  ))}
               </div>
            </div>
            <Button className="w-full h-16 rounded-full font-black uppercase italic tracking-tighter transition-all shadow-xl" style={{ backgroundColor: accent, color: theme.isDark ? '#000' : '#fff' }}>ASSINAR AGORA</Button>
          </div>
        ))}
      </section>

      <Footer whatsapp={config.whatsapp || "5562999999999"} theme={theme} cta={heroC} accent={accent} />
    </div>
  );
}

function Nav({ theme, accent }: any) {
  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] md:w-auto">
      <div className={`${theme.card} h-14 border rounded-full px-12 flex items-center justify-between gap-12 shadow-2xl backdrop-blur-3xl bg-opacity-95`}>
        <img src={LogoInova} alt="Inova" className={`h-5 w-auto ${theme.isDark ? 'brightness-200' : ''}`} />
        <Button className="rounded-full px-8 h-9 text-[8px] font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all" style={{ backgroundColor: accent, color: theme.isDark ? '#000' : '#fff' }}>REUNIÃO</Button>
      </div>
    </nav>
  );
}

function Footer({ whatsapp, theme, cta, accent }: any) {
  return (
    <section className="py-40 text-center relative overflow-hidden">
      <div className="space-y-14 relative z-10">
        <h2 className="text-6xl md:text-[90px] font-black tracking-tighter uppercase italic leading-[0.7] mb-4">VAMOS <br /> <span style={{ color: accent }}>ESCALAR?</span></h2>
        <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer">
          <Button className="h-24 px-20 text-3xl font-black uppercase italic shadow-2xl transition-all hover:scale-105" style={{ backgroundColor: accent, color: theme.isDark ? '#000' : '#fff' }}>{cta}</Button>
        </a>
        <p className="text-[10px] font-black uppercase tracking-[0.8em] opacity-20 pt-20">© 2026 INOVA PRODUÇÕES.</p>
      </div>
    </section>
  );
}
