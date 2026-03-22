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

// Assets Gerados via IA
const ASSETS = {
  restaurant: "file:///Users/lucassoares/.gemini/antigravity/brain/70a0d96f-4a74-42d0-b5c4-b4af4b35c6d6/luxury_restaurant_hero_v1774133230214_1774147543501.png",
  personal: "file:///Users/lucassoares/.gemini/antigravity/brain/70a0d96f-4a74-42d0-b5c4-b4af4b35c6d6/futuristic_gym_hero_v1774133230214_1774147559627.png",
  clinica: "file:///Users/lucassoares/.gemini/antigravity/brain/70a0d96f-4a74-42d0-b5c4-b4af4b35c6d6/luxury_clinic_hero_v1774133230214_1774147578064.png",
  lawyer: "file:///Users/lucassoares/.gemini/antigravity/brain/70a0d96f-4a74-42d0-b5c4-b4af4b35c6d6/luxury_lawyer_hero_v1774133230214_1774147696964.png",
  realestate: "file:///Users/lucassoares/.gemini/antigravity/brain/70a0d96f-4a74-42d0-b5c4-b4af4b35c6d6/luxury_realestate_hero_v1774133230214_1774147714444.png",
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

const THEME_CONTENT_DEFAULTS: Record<string, any> = {
  restaurant: {
    heroTitle: "Seu restaurante pode estar cheio… mas invisível no digital.",
    heroTagline: "Transformamos restaurantes em marcas desejadas nas redes sociais.",
    problem: "Hoje a maioria das pessoas escolhe onde comer pelo Instagram. Se o seu restaurante não aparece com conteúdo profissional, ele simplesmente não entra na decisão.",
    solution: "A Inova cria conteúdos cinematográficos que despertam o desejo imediato e posicionam seu restaurante como autoridade.",
    results: ["Visibilidade", "Reservas", "Autoridade"],
    cta: "DIGITALIZAR MEU SABOR",
    steps: ["Briefing", "Captação", "Edição", "Entrega"]
  },
  // ... outros temas seriam similares se não editados
};

export default function SalesLP() {
  const [config, setConfig] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem('agency_lp_config');
    const defaultData = {
      theme: 'restaurant',
      hero: { title: "ALÉM DA LENTE. CONSTRUÍMOS NARRATIVAS.", tagline: "Ser visto é fácil. Ser lembrado é estratégia.", badge: "O ESTRATEGISTA • 2026", cta: "INICIAR POSICIONAMENTO" },
      strategy: { problem: "Sua marca é invisível.", solution: "Nós criamos sua autoridade.", results: "Visibilidade, Vendas, Fama", steps: "Brief, Film, Cut, Sale" },
      whatsapp: "5562999999999",
      services: [],
      plans: [{ name: "Plano Start", price: "1500", features: ["Editável"] }]
    };

    if (saved) {
      try { setConfig({ ...defaultData, ...JSON.parse(saved) }); } 
      catch (e) { setConfig(defaultData); }
    } else { setConfig(defaultData); }
  }, []);

  if (!config) return null;
  const theme = THEMES[config.theme] || THEMES.mobbin;
  const themeDefaults = THEME_CONTENT_DEFAULTS[config.theme] || THEME_CONTENT_DEFAULTS.restaurant;

  // Lógica de Prioridade: Config do Usuário (Local) > Tema Default
  const content = {
    heroTitle: config.hero?.title || themeDefaults.heroTitle,
    heroTagline: config.hero?.tagline || themeDefaults.heroTagline,
    heroBadge: config.hero?.badge || "NARRATIVA ESTRATÉGICA",
    heroCTA: config.hero?.cta || themeDefaults.cta,
    problem: config.strategy?.problem || themeDefaults.problem,
    solution: config.strategy?.solution || themeDefaults.solution,
    results: (config.strategy?.results || "Autoridade, Escala, Faturamento").split(',').map((s:string)=>s.trim()),
    steps: (config.strategy?.steps || "Diagnóstico, Planejamento, Set, Elite").split(',').map((s:string)=>s.trim()),
    deliverables: config.services.length > 0 ? config.services : [{title: "Estratégia", desc: "Plano de conteúdo"}]
  };

  return (
    <div className={`min-h-screen ${theme.bg} ${theme.text} font-sans selection:bg-[#bff720]/20 overflow-x-hidden transition-colors duration-1000`}>
      <Nav theme={theme} />

      <section className="relative min-h-[95vh] flex items-center justify-center pt-20 px-6 overflow-hidden">
        {theme.image && (
          <div className="absolute inset-0 z-0">
             <img src={theme.image} alt="Background" className="w-full h-full object-cover opacity-30 blur-[2px] transition-transform duration-[10s] hover:scale-110" />
             <div className={`absolute inset-0 bg-gradient-to-b ${theme.isDark ? 'from-transparent via-black/80 to-black' : 'from-transparent via-white/80 to-white'}`} />
          </div>
        )}
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Badge className={`${theme.isDark ? 'bg-white/5 text-white/40' : 'bg-black/5 text-zinc-400'} border-none mb-6 px-8 py-2 uppercase font-black tracking-[0.4em] text-[8px] rounded-full`}>{content.heroBadge}</Badge>
            <h1 className="text-5xl md:text-[110px] font-black tracking-tighter mb-6 leading-[0.85] uppercase italic transition-all drop-shadow-2xl">{content.heroTitle}</h1>
            <p className={`text-xl md:text-2xl ${theme.secondary} max-w-3xl mx-auto mb-12 font-medium italic leading-relaxed`}>{content.heroTagline}</p>
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              <Button className={`${theme.button} rounded-full h-16 md:h-20 px-12 md:px-16 text-xl font-black uppercase italic shadow-2xl transition-all hover:scale-105 active:scale-95`}>
                {content.heroCTA} <ArrowRight className="ml-4 w-6 h-6" />
              </Button>
            </div>
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
          <motion.div whileInView={{ opacity: 1, x: 0 }} initial={{ opacity: 0, x: -50 }} className={`${theme.card} p-10 rounded-[3rem] relative overflow-hidden transition-all border border-current/10 shadow-xl`}>
             <h3 className={`text-[10px] font-black uppercase tracking-[0.6em] mb-8 ${theme.accent}`}>Diagnosis // 01</h3>
             <p className="text-3xl md:text-4xl font-black italic tracking-tighter leading-[0.9] uppercase">{content.problem}</p>
          </motion.div>
          <motion.div whileInView={{ opacity: 1, x: 0 }} initial={{ opacity: 0, x: 50 }} className="space-y-8">
             <h3 className={`text-[10px] font-black uppercase tracking-[0.6em] opacity-20`}>Strategy // Inova</h3>
             <p className={`text-xl opacity-60 font-medium italic leading-relaxed`}>{content.solution}</p>
          </motion.div>
        </div>
      </section>

      <section id="services" className="py-20 max-w-[1600px] mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 text-center md:text-left">
           <h2 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">ARSENAL DE <br /> <span className={theme.accent}>ENTREGAS.</span></h2>
           <p className={`max-w-xs text-[10px] font-black uppercase tracking-widest leading-relaxed italic ${theme.secondary}`}>Cada elemento é uma peça na construção da sua autoridade digital.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {content.deliverables.map((d: any, i: number) => (
            <motion.div whileHover={{ y: -8 }} key={i} className={`${theme.card} p-6 rounded-[2rem] flex flex-col justify-between group transition-all border border-current/5 h-[280px] shadow-lg`}>
               <div className={`${theme.accent} mb-6 w-10 h-10 bg-current/5 rounded-full flex items-center justify-center`}><Sparkles size={20} /></div>
               <div><h3 className="text-lg font-black italic uppercase leading-tight mb-3">{d.title}</h3><p className="text-[9px] opacity-40 uppercase tracking-tighter leading-[1.2]">{d.desc}</p></div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {content.steps.map((step: string, i: number) => (
            <div key={i} className={`${theme.card} p-6 rounded-2xl border border-current/5 flex flex-col items-center text-center gap-4 group hover:bg-current/[0.04]`}>
               <span className="text-3xl font-black italic opacity-5 group-hover:opacity-100 transition-opacity">0{i+1}</span>
               <p className="text-[9px] font-black uppercase tracking-widest leading-relaxed italic opacity-40 group-hover:opacity-100">{step}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="pricing" className="py-24 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {config.plans.map((p: any, i: number) => (
          <div key={i} className={`${theme.card} p-10 rounded-[3rem] border-2 ${p.popular ? 'border-primary shadow-2xl scale-[1.02]' : 'border-current/5 opacity-80'}`}>
            <div className="flex-1 space-y-8">
               <h4 className="text-[8px] font-black uppercase tracking-[0.4em] opacity-30">{p.name} escala</h4>
               <div className="text-5xl md:text-7xl font-black italic tracking-tighter underline decoration-current/10 decoration-[6px] underline-offset-8">R${p.price}</div>
               <div className="space-y-3">
                  {p.features?.map((f: string, j: number) => (
                    <div key={j} className="flex items-center gap-3 text-[9px] font-bold uppercase tracking-widest opacity-40 italic border-b border-current/5 pb-2"><CheckCircle2 className={`w-3 h-3 ${theme.accent}`} /> {f}</div>
                  ))}
               </div>
               <Button className={`${theme.button} w-full h-14 rounded-full font-black`}>ATIVAR PROTOCOLO</Button>
            </div>
          </div>
        ))}
      </section>

      <Footer whatsapp={config.whatsapp} theme={theme} cta={content.heroCTA} />
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
        <h2 className="text-5xl md:text-[100px] font-black tracking-tighter uppercase italic leading-[0.8]">VAMOS ESCALAR?</h2>
        <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer">
          <Button className={`${theme.button} h-20 px-16 text-2xl font-black uppercase italic shadow-2xl`}>{cta}</Button>
        </a>
      </div>
    </section>
  );
}
