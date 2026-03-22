import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Rocket, Target, Zap, CheckCircle2, ArrowRight, MessageCircle, ShieldCheck, 
  PieChart, Video, Monitor, Sparkles, Bot, Star, Settings, Search, ChevronRight, 
  Shield, CreditCard, Globe, Smartphone, BarChart3, Users, Activity, Layers, 
  Heart, Crown, Quote, Flame, MousePointer2, Trophy, Apple, Dumbbell, Gavel, 
  Scale, Utensils, Coffee, Home, HeartPulse, Leaf, Briefcase, MapPin, Clock, 
  Camera, Mic, Lightbulb
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import LogoInova from '@/assets/logo-inova.png';

const IconMap: Record<string, any> = {
  Video, Bot, PieChart, Monitor, Rocket, Target, Zap, Sparkles, Star, ShieldCheck, 
  Shield, CreditCard, Globe, Smartphone, BarChart3, Users, Activity, Layers, 
  Heart, Crown, Trophy, Apple, Dumbbell, Gavel, Scale, Utensils, Coffee, Home, 
  HeartPulse, Leaf, Briefcase, MapPin, Clock, Camera, Mic, Lightbulb
};

const THEMES: Record<string, any> = {
  mobbin: { bg: 'bg-[#F9FAFB]', text: 'text-black', accent: 'text-[#bff720]', button: 'bg-black text-white', card: 'bg-white', name: 'Mobbin Discovery' },
  openclaw: { bg: 'bg-[#020617]', text: 'text-white', accent: 'text-orange-500', button: 'bg-orange-600 text-white', card: 'bg-white/5', name: 'OpenClaw Manifesto', isDark: true },
  fintech: { bg: 'bg-white', text: 'text-zinc-900', accent: 'text-emerald-500', button: 'bg-zinc-900 text-white', card: 'bg-zinc-50', name: 'Fintech Escala' },
  nutritionist: { bg: 'bg-[#FDFCFB]', text: 'text-emerald-950', accent: 'text-emerald-600', button: 'bg-emerald-600 text-white', card: 'bg-white', name: 'Protocolo Nutri' },
  studio: { bg: 'bg-black', text: 'text-white', accent: 'text-[#bff720]', button: 'bg-[#bff720] text-black', card: 'bg-zinc-900', name: 'Arsenal de Estúdio', isDark: true },
  lawyer: { bg: 'bg-[#0A0D14]', text: 'text-white', accent: 'text-blue-500', button: 'bg-blue-900 text-white', card: 'bg-white/5', name: 'Prestígio Jurídico', isDark: true },
  restaurant: { bg: 'bg-[#0F0A0A]', text: 'text-[#F3EFE0]', accent: 'text-orange-600', button: 'bg-orange-600 text-white', card: 'bg-white/5', name: 'Autoridade Gastro', isDark: true },
  personal: { bg: 'bg-[#050505]', text: 'text-[#FAFAFA]', accent: 'text-[#bff720]', button: 'bg-[#bff720] text-black', card: 'bg-white/5', name: 'Physique Power', isDark: true },
};

export default function SalesLP() {
  const [config, setConfig] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem('agency_lp_config');
    const defaultConfig = {
      theme: 'mobbin',
      hero: { title: "ALÉM DA LENTE. CONSTRUÍMOS NARRATIVAS.", tagline: "Ser visto é fácil. Ser lembrado é estratégia.", badge: "O ESTRATEGISTA • 2026" },
      whatsapp: "5562999999999",
      services: [
        { title: "Arquitetura de Narrativa", desc: "Posicionamento estratégico e percepção.", icon: "Layers" },
        { title: "Produção Cinema", desc: "Vídeos de alto padrão para autoridade.", icon: "Video" },
        { title: "Funis de Vendas", desc: "Conversão de alto ticket.", icon: "Activity" },
        { title: "Domínio", desc: "Ecossistema de marca completo.", icon: "Crown" }
      ],
      plans: [
        { name: "Fundação", price: "1.200", features: ["3 Posts/semana", "Design", "Relatórios"] },
        { name: "Domínio", price: "2.500", features: ["Tráfego Pago", "2 Diárias", "Funis"], popular: true },
        { name: "Elite", price: "5.000", features: ["4 Diárias", "SDR com IA", "Branding"] }
      ]
    };

    if (saved) {
      try { setConfig({ ...defaultConfig, ...JSON.parse(saved) }); } 
      catch (e) { setConfig(defaultConfig); }
    } else { setConfig(defaultConfig); }
  }, []);

  if (!config) return null;
  const theme = THEMES[config.theme] || THEMES.mobbin;

  return (
    <div className={`min-h-screen ${theme.bg} ${theme.text} font-sans selection:bg-[#bff720]/20 overflow-x-hidden`}>
      {/* 1. Nav */}
      <Nav theme={theme} />

      {/* 2. Hero */}
      <section className="pt-48 pb-32 px-6 text-center max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <Badge className={`${theme.isDark ? 'bg-white/5 text-white/40' : 'bg-white text-zinc-400'} border mb-10 px-6 py-2 uppercase font-black tracking-widest text-[9px]`}>{config.hero.badge}</Badge>
          <h1 className="text-6xl md:text-[120px] font-black tracking-tighter mb-12 uppercase italic leading-[0.85]">{config.hero.title}</h1>
          <p className="text-xl md:text-2xl opacity-40 max-w-2xl mx-auto mb-16 font-medium italic">{config.hero.tagline}</p>
          <Button className={`${theme.button} rounded-full h-20 px-16 text-xl font-black uppercase shadow-2xl`}>COMEÇAR AGORA</Button>
        </motion.div>
      </section>

      {/* 3. Social Proof */}
      <section className="py-20 border-y border-current/5 opacity-10 grayscale overflow-hidden whitespace-nowrap">
        <div className="flex animate-marquee gap-20 font-black text-4xl italic tracking-tighter uppercase">
          {[...Array(10)].map((_, i) => <span key={i}>AUTORIDADE • ESTRATÉGIA • NARRATIVA • DOMÍNIO • CINEMA</span>)}
        </div>
      </section>

      {/* 4. Pillars */}
      <section className="py-40 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-20">
        <Pillar title="Estratégia antes de Estética" sub="Regra 01" desc="Construímos a narrativa, depois captamos com a lente." theme={theme} />
        <Pillar title="Autoridade acima de Volume" sub="Regra 02" desc="Conteúdo com intenção vence. Volume sem rumo some." theme={theme} />
        <Pillar title="Narrativa acima de Tendência" sub="Regra 03" desc="Trends são passageiras. Autoridade é permanente." theme={theme} />
      </section>

      {/* 5. Services */}
      <section id="services" className="py-40 bg-current/5 rounded-[6rem] mx-4 md:mx-10">
        <div className="max-w-7xl mx-auto px-10">
          <h2 className="text-6xl font-black italic uppercase tracking-tighter mb-24">Nossas Expertises.</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {config.services.map((s: any, i: number) => (
              <div key={i} className={`${theme.card} p-12 rounded-[4rem] group hover:scale-105 transition-all shadow-xl`}>
                <div className={`${theme.accent} mb-8 w-14 h-14 bg-current/5 rounded-2xl flex items-center justify-center`}>
                  {IconMap[s.icon] ? <IconMap[s.icon] className="w-8 h-8" /> : <Star className="w-8 h-8" />}
                </div>
                <h3 className="text-2xl font-black italic uppercase italic mb-4">{s.title}</h3>
                <p className="opacity-40 text-sm font-medium italic">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Showcase / Vision */}
      <section className="py-60 text-center max-w-5xl mx-auto px-6">
        <Quote className={`w-20 h-20 ${theme.accent} mx-auto mb-16 opacity-30`} />
        <h2 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter leading-none mb-10">QUEM CONTROLA A NARRATIVA, CONTROLA O MERCADO.</h2>
        <p className={`${theme.accent} text-xs font-black tracking-[1em] uppercase`}>O Protocolo Inova</p>
      </section>

      {/* 7. Stats */}
      <section className="py-40 max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-20 text-center font-black italic">
        <Stat val="324M+" label="Alcance Criado" theme={theme} />
        <Stat val="100%" label="Foco em Autoridade" theme={theme} isHighlight />
        <Stat val="500+" label="Marcas Transformadas" theme={theme} />
        <Stat val="$25M" label="Capital Gerado" theme={theme} />
      </section>

      {/* 8. Pricing */}
      <section id="pricing" className="py-60 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {config.plans.map((p: any, i: number) => (
          <div key={i} className={`${theme.card} p-16 rounded-[4.5rem] flex flex-col border-2 ${p.popular ? 'border-[#bff720] shadow-2xl relative scale-105' : 'border-transparent opacity-60'}`}>
            {p.popular && <div className="absolute top-8 right-8 bg-[#bff720] text-black px-4 py-1 rounded-full text-[8px] font-black uppercase tracking-widest">Recomendado</div>}
            <h4 className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-12">{p.name}</h4>
            <div className="text-7xl font-black italic tracking-tighter mb-16">R${p.price}</div>
            <div className="space-y-6 flex-1 mb-20">
              {p.features.map((f: string, j: number) => (
                <div key={j} className="flex items-center gap-4 text-xs font-black uppercase italic tracking-widest opacity-40 border-b border-current/5 pb-4"><CheckCircle2 className={`w-4 h-4 ${theme.accent}`} /> {f}</div>
              ))}
            </div>
            <Button className={`${theme.button} w-full h-16 rounded-full font-black uppercase tracking-widest text-[10px]`}>SELECIONAR PLANO</Button>
          </div>
        ))}
      </section>

      {/* 9. Footer */}
      <Footer whatsapp={config.whatsapp} theme={theme} />
    </div>
  );
}

function Nav({ theme }: any) {
  return (
    <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-[95%] md:w-auto h-20 bg-white/5 backdrop-blur-xl border border-current/5 rounded-full px-12 flex items-center justify-between gap-20 shadow-2xl">
      <img src={LogoInova} alt="Inova" className={`h-8 w-auto ${theme.isDark ? 'brightness-200' : ''}`} />
      <div className="hidden lg:flex gap-12 text-[9px] font-black uppercase tracking-widest opacity-40">
        <a href="#services" className="hover:opacity-100 transition-opacity">Expertises</a>
        <a href="#pricing" className="hover:opacity-100 transition-opacity">Investimento</a>
      </div>
      <Button className={`${theme.button} rounded-full px-8 text-[9px] font-black uppercase tracking-widest`}>COMEÇAR</Button>
    </nav>
  );
}

function Pillar({ title, sub, desc, theme }: any) {
  return (
    <div className="space-y-6">
      <h3 className={`${theme.accent} text-[10px] font-black tracking-widest uppercase`}>{sub}</h3>
      <p className="text-4xl font-black italic uppercase tracking-tighter leading-none">{title}</p>
      <p className="opacity-40 text-sm font-medium italic">{desc}</p>
    </div>
  );
}

function Stat({ val, label, theme, isHighlight }: any) {
  return (
    <div className={`${isHighlight ? theme.accent : ''}`}>
      <p className="text-7xl mb-4">{val}</p>
      <p className="text-[10px] opacity-20 tracking-[0.4em]">{label}</p>
    </div>
  );
}

function Footer({ whatsapp, theme }: any) {
  return (
    <section className="py-60 text-center relative overflow-hidden">
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full blur-[200px] -z-10 ${theme.isDark ? 'bg-zinc-800/20' : 'bg-[#bff720]/5'}`} />
      <h2 className="text-6xl md:text-[140px] font-black mb-16 tracking-tighter uppercase italic leading-[0.8]">DOMINE O MERCADO AGORA.</h2>
      <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer">
        <Button className="bg-[#bff720] text-black h-24 px-20 text-3xl font-black uppercase italic shadow-2xl hover:scale-105 transition-all">DECOLAR PROJETO</Button>
      </a>
      <div className="mt-40 pt-10 border-t border-current/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-[0.5em] opacity-40 italic">
        <span>© 2026 INOVA CO. LAB</span>
        <span>"Quem controla a narrativa, controla o mercado."</span>
      </div>
    </section>
  );
}
