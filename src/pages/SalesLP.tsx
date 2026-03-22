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
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Helper to map icon names to components
const IconMap: Record<string, any> = {
  Video, Bot, PieChart, Monitor, Rocket, Target, Zap, Sparkles, Star, ShieldCheck
};

const DEFAULT_CONFIG = {
  theme: 'mobbin', // default theme
  hero: {
    title: "A AGÊNCIA QUE REALMENTE FAZ AS COISAS.",
    tagline: "Não entregamos apenas posts. Entregamos a infraestrutura de vendas e a estética de cinema que colocam sua marca no topo.",
    badge: "Proposta Digital 2026"
  },
  whatsapp: "5562999999999",
  services: [
    { title: "Produção Audiovisual", desc: "Equipamentos de cinema e edições de alto impacto.", icon: "Video" },
    { title: "Inteligência Artificial", desc: "Processos tunados por IAs de última geração.", icon: "Bot" },
    { title: "Growth Marketing", desc: "Estratégias baseadas em dados para escalar faturamento.", icon: "PieChart" },
    { title: "Digital Solutions", desc: "De Landing Pages a CRM, construímos o seu ecossistema.", icon: "Monitor" }
  ],
  plans: [
    {
      name: "Essential",
      price: "2.900",
      description: "Ideal para marcas que querem consistência nas redes sociais.",
      features: ["Gestão de Instagram & TikTok", "3 Postagens semanais", "Design de alta performance", "Relatórios mensais"],
      accent: "text-[#bff720]",
      popular: false
    },
    {
      name: "Growth",
      price: "5.500",
      description: "Foco em escala e produção de material visual de cinema.",
      features: ["Tráfego Pago (Meta/Google)", "2 Visitas para Filmagens", "Funil de Vendas", "Suporte VIP"],
      accent: "text-[#bff720]",
      popular: true
    },
    {
      name: "Elite",
      price: "12.000",
      description: "O braço direito completo para dominar o mercado.",
      features: ["Production Day (4x)", "Automação IA (SDR)", "Branding Consulting", "Diretoria de Criação"],
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
        setConfig(JSON.parse(saved));
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
            <div className="bg-black p-1.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-[#bff720]" />
            </div>
            <span className="text-sm font-black tracking-tighter italic">INOVA CO.</span>
          </div>
          <div className="hidden lg:flex items-center gap-10 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
            <a href="#servicos" className="hover:text-black transition-colors">Produtos</a>
            <a href="#precos" className="hover:text-black transition-colors">Preços</a>
          </div>
          <div className="flex items-center gap-2">
             <Button size="sm" className="bg-black text-white rounded-full px-6 text-[10px] font-black uppercase tracking-widest hover:bg-gray-800 transition-all shadow-lg shadow-black/10">
               Começar
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
                <Button className="bg-black text-white rounded-full h-14 px-12 text-sm font-black uppercase shadow-2xl">Aceitar Proposta</Button>
             </a>
             <Button variant="outline" className="rounded-full h-14 px-12 border-gray-200">Ver Case Studies</Button>
          </div>
        </motion.div>
      </section>

      {/* Grid Discovery */}
      <section id="servicos" className="max-w-[1500px] mx-auto px-6 py-20 bg-white rounded-[4rem] shadow-sm">
        <h2 className="text-5xl font-black tracking-tighter mb-12">Browse Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {config.services.map((s: any, i: number) => (
            <div key={i} className="group">
              <div className="aspect-[3/4] rounded-[2.5rem] bg-gray-50 border border-gray-100 flex items-center justify-center group-hover:shadow-xl transition-all duration-500">
                {getIcon(s.icon)}
              </div>
              <div className="mt-6 px-4">
                <h3 className="font-black text-base">{s.title}</h3>
                <p className="text-gray-400 text-xs mt-1 uppercase font-bold tracking-widest">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Pill Style */}
      <section id="precos" className="max-w-6xl mx-auto px-6 py-48">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {config.plans.map((p: any, i: number) => (
            <div key={i} className={`p-10 rounded-[3rem] border ${p.popular ? 'border-zinc-900 bg-white shadow-2xl' : 'border-gray-100 bg-white/50'} flex flex-col`}>
              <p className="text-[10px] font-black uppercase text-gray-400 mb-6">{p.name}</p>
              <div className="text-6xl font-black italic tracking-tighter mb-12">R${p.price}</div>
              <div className="space-y-4 flex-1">
                {p.features.map((f: string, j: number) => (
                  <div key={j} className="flex items-center gap-4 text-[11px] font-bold text-gray-500 uppercase">
                    <CheckCircle2 className="w-3 h-3 text-zinc-900" /> {f}
                  </div>
                ))}
              </div>
              <Button className={`w-full h-14 rounded-full font-black uppercase text-[10px] mt-10 ${p.popular ? 'bg-black text-white' : 'bg-gray-50 text-zinc-400 shadow-none'}`}>Selecionar</Button>
            </div>
          ))}
        </div>
      </section>

      <Footer whatsapp={config.whatsapp} />
    </div>
  );
}

// --- OPENCLAW THEME (Dark Cinematic) ---
function renderOpenClaw(config: any, getIcon: any) {
  return (
    <div className="min-h-screen bg-[#000000] text-white font-sans selection:bg-[#bff720]/30 selection:text-white overflow-x-hidden pb-20">
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-[#015f57]/20 rounded-full blur-[120px] -z-10" />
      <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-[#370616]/20 rounded-full blur-[120px] -z-10" />

      <nav className="max-w-7xl mx-auto px-6 py-12 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-2">
          <div className="bg-[#bff720] p-1.5 rounded-lg"><ShieldCheck className="w-6 h-6 text-black" /></div>
          <span className="text-xl font-black tracking-tighter italic text-[#f8f8f8]">INOVA CO.</span>
        </div>
        <div className="hidden md:flex items-center gap-12 text-sm font-bold uppercase tracking-widest text-zinc-400">
          <a href="#servicos" className="hover:text-white transition-colors">Serviços</a>
          <a href="#precos" className="hover:text-white transition-colors">Preços</a>
        </div>
      </nav>

      <section className="max-w-5xl mx-auto px-6 pt-32 pb-48 text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Badge className="mb-8 bg-[#bff720]/10 text-[#bff720] border-[#bff720]/20 px-6 py-2 text-xs uppercase tracking-widest font-black rounded-full">{config.hero.badge}</Badge>
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-10 leading-[0.85] uppercase italic">{config.hero.title}</h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-12 font-medium italic leading-relaxed">{config.hero.tagline}</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
             <a href={`https://wa.me/${config.whatsapp}`}>
                <Button className="bg-[#bff720] hover:bg-[#bff720]/90 text-black rounded-full h-16 px-14 text-xl font-black shadow-2xl shadow-[#bff720]/20">ACEITAR PROPOSTA</Button>
             </a>
          </div>
        </motion.div>
      </section>

      <section id="servicos" className="max-w-7xl mx-auto px-6 py-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {config.services.map((s: any, i: number) => (
          <div key={i} className="p-10 rounded-[3rem] bg-zinc-900/50 border border-white/5 backdrop-blur-xl hover:border-[#bff720]/30 transition-all group">
            <div className="w-14 h-14 rounded-2xl bg-[#bff720]/10 flex items-center justify-center text-[#bff720] mb-8 group-hover:scale-110 transition-transform">{getIcon(s.icon)}</div>
            <h3 className="text-2xl font-bold mb-4">{s.title}</h3>
            <p className="text-zinc-500 text-sm leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </section>

      <section id="precos" className="max-w-7xl mx-auto px-6 py-40 bg-zinc-900/20 rounded-[4rem] border border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {config.plans.map((p: any, i: number) => (
            <div key={i} className={`p-12 rounded-[3.5rem] border ${p.popular ? 'border-[#bff720]/40 bg-[#bff720]/5' : 'border-white/5 bg-black/40'} flex flex-col`}>
              <span className="text-sm font-black uppercase tracking-widest text-[#bff720] mb-6">{p.name}</span>
              <div className="text-6xl font-black mb-10 tracking-tighter italic">R${p.price}<span className="text-xl text-zinc-600">/mês</span></div>
              <div className="space-y-6 flex-1 mb-12 text-zinc-300">
                {p.features.map((f: string, j: number) => (
                  <div key={j} className="flex items-center gap-4 text-sm font-bold"><CheckCircle2 className="w-5 h-5 text-[#bff720]" /> {f}</div>
                ))}
              </div>
              <Button className={`w-full h-14 rounded-3xl text-md font-bold ${p.popular ? 'bg-[#bff720] text-black' : 'bg-white/5 text-white'}`}>Continuar</Button>
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
      <h2 className={`text-6xl md:text-9xl font-black mb-12 tracking-tighter uppercase italic ${isDark ? 'text-white' : 'text-zinc-900'}`}>Vamos Escalar?</h2>
      <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer">
        <Button className="bg-[#bff720] text-black hover:bg-[#bff720]/90 rounded-full h-20 px-16 text-2xl font-black uppercase italic shadow-2xl">Falar no WhatsApp</Button>
      </a>
      <div className="mt-40 pt-10 border-t border-gray-200/10 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-[0.4em] opacity-40">
        <span>© 2026 INOVA CO. LAB</span>
        <span>All Rights Reserved</span>
      </div>
    </section>
  );
}
