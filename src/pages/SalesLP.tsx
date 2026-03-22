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
      features: ["Tudo do plano Essential", "Tráfego Pago (Meta/Google)", "2 Visitas para Filmagens", "Funil de Vendas"],
      accent: "text-[#bff720]",
      popular: true
    },
    {
      name: "Elite",
      price: "12.000",
      description: "O braço direito completo para dominar o mercado.",
      features: ["Tudo do plano Growth", "Production Day (4x)", "Automação IA (SDR)", "Branding Consulting"],
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

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-black font-sans selection:bg-[#bff720]/30 selection:text-black overflow-x-hidden pb-20">
      
      {/* Floating Pill Nav - Mobbin Style */}
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
            <a href="#cta" className="hover:text-black transition-colors">Agência</a>
          </div>
          <div className="flex items-center gap-2">
             <Button size="sm" variant="ghost" className="rounded-full text-[10px] font-black uppercase tracking-widest hidden md:flex">
               Login
             </Button>
             <Button size="sm" className="bg-black text-white rounded-full px-6 text-[10px] font-black uppercase tracking-widest hover:bg-gray-800 transition-all shadow-lg shadow-black/10">
               Começar
             </Button>
          </div>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-6 pt-48 pb-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2 bg-white border border-gray-100 px-4 py-1.5 rounded-full shadow-sm mb-10">
             <span className="w-2 h-2 bg-[#bff720] rounded-full animate-pulse" />
             <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Upgrade Your Brand 2026</span>
          </div>
          <h1 className="text-6xl md:text-[110px] font-black tracking-tighter mb-10 leading-[0.85] text-zinc-900">
            {config.hero.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 font-medium leading-relaxed italic">
            {config.hero.tagline}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <a href={`https://wa.me/${config.whatsapp}`}>
                <Button className="bg-black text-white hover:bg-gray-800 rounded-full h-14 px-12 text-sm font-black uppercase tracking-widest shadow-2xl shadow-black/20 group">
                  Solicitar Proposta <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
             </a>
             <Button variant="outline" className="rounded-full h-14 px-12 border-gray-200 bg-white hover:bg-gray-50 text-sm font-black uppercase tracking-widest text-gray-600">
               Ver Case Studies
             </Button>
          </div>
        </motion.div>
      </section>

      {/* Logo Wall */}
      <section className="max-w-7xl mx-auto px-8 mb-32">
         <div className="grid grid-cols-2 md:grid-cols-6 gap-16 opacity-[0.08] grayscale items-center justify-items-center">
            <div className="font-black text-2xl italic tracking-tighter">APPLE</div>
            <div className="font-black text-2xl italic tracking-tighter">NIKE</div>
            <div className="font-black text-2xl italic tracking-tighter">TESLA</div>
            <div className="font-black text-2xl italic tracking-tighter">DISNEY</div>
            <div className="font-black text-2xl italic tracking-tighter">UBER</div>
            <div className="font-black text-2xl italic tracking-tighter">AIRBNB</div>
         </div>
      </section>

      {/* Discovery Grid - Mobbin Style */}
      <section id="servicos" className="max-w-[1500px] mx-auto px-6 py-20 bg-white rounded-[4rem] shadow-[0_-20px_80px_rgba(0,0,0,0.02)]">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="space-y-4">
            <h2 className="text-5xl font-black tracking-tighter leading-none">Browse our services</h2>
            <p className="text-gray-400 font-medium text-lg">Curated marketing solutions for modern companies.</p>
          </div>
          <div className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-full px-6 py-3.5 w-full md:w-[450px] shadow-inner">
            <Search className="w-5 h-5 text-gray-300" />
            <input type="text" placeholder="Search patterns, flows, screens..." className="bg-transparent border-none outline-none text-sm w-full placeholder:text-gray-300 font-medium" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {config.services.map((s, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="aspect-[3/4.5] rounded-[2.5rem] bg-gray-50 border border-gray-100 overflow-hidden relative shadow-sm hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-700">
                {/* Visual Representation */}
                <div className="absolute inset-4 bg-white rounded-[2rem] border border-gray-50 flex items-center justify-center overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-br from-[#bff720]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                   <div className="text-gray-100 group-hover:text-[#bff720] transition-all duration-700 group-hover:scale-110">
                     {IconMap[s.icon] ? <IconMap[s.icon] className="w-32 h-32 stroke-[1px]" /> : <Star className="w-32 h-32 stroke-[1px]" />}
                   </div>
                   
                   {/* "Screenshot" Mock Details */}
                   <div className="absolute bottom-6 left-6 right-6 h-1 bg-gray-50 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className="h-full bg-[#bff720]"
                      />
                   </div>
                </div>
              </div>
              
              <div className="mt-6 px-4 flex justify-between items-start">
                <div>
                  <h3 className="font-black text-base tracking-tight text-zinc-800">{s.title}</h3>
                  <p className="text-gray-400 text-xs mt-1 font-bold uppercase tracking-widest">{s.desc}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing - Minimalist Modals */}
      <section id="precos" className="max-w-6xl mx-auto px-6 py-48">
        <div className="text-center mb-24 space-y-4">
           <h2 className="text-7xl font-black tracking-tighter text-zinc-900 italic">Select a Plan</h2>
           <p className="text-gray-400 font-medium">No hidden fees. Just high performance.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {config.plans.map((p, i) => (
            <motion.div 
              key={i} 
              whileHover={{ y: -5 }}
              className={`p-10 rounded-[3rem] border ${p.popular ? 'border-zinc-900 bg-white shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)]' : 'border-gray-100 bg-white/50'} flex flex-col relative overflow-hidden`}
            >
              {p.popular && (
                <div className="absolute top-6 right-6 bg-[#bff720] text-black text-[8px] font-black uppercase px-3 py-1 rounded-full tracking-widest">
                  Featured
                </div>
              )}
              <div className="mb-12">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-6">{p.name}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-6xl font-black tracking-tighter text-zinc-900 italic">R${p.price}</span>
                  <span className="text-gray-300 font-black text-sm uppercase">/Mo</span>
                </div>
              </div>

              <div className="space-y-5 mb-14 flex-1">
                {p.features.map((f, j) => (
                  <div key={j} className="flex items-center gap-4">
                    <div className="w-5 h-5 rounded-full bg-[#bff720]/10 flex items-center justify-center">
                       <CheckCircle2 className="w-3 h-3 text-zinc-900" />
                    </div>
                    <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">{f}</span>
                  </div>
                ))}
              </div>

              <a href={`https://wa.me/${config.whatsapp}`}>
                <Button className={`w-full h-14 rounded-full font-black uppercase tracking-widest text-[10px] ${p.popular ? 'bg-black text-white hover:bg-zinc-800 shadow-xl shadow-black/10' : 'bg-gray-50 text-zinc-400 hover:bg-gray-100 shadow-none'}`}>
                  Get Started
                </Button>
              </a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Final CTA - Large Pill */}
      <section id="cta" className="max-w-6xl mx-auto px-6 py-20 text-center">
         <div className="bg-[#bff720] text-black p-16 md:p-32 rounded-[5rem] relative shadow-[0_50px_100px_-20px_rgba(191,247,32,0.3)]">
            <h2 className="text-6xl md:text-[120px] font-black tracking-tighter mb-12 leading-[0.85] italic uppercase underline decoration-black decoration-[12px] underline-offset-8">Let's build together</h2>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <a href={`https://wa.me/${config.whatsapp}`} target="_blank" rel="noopener noreferrer">
                <Button className="bg-black text-white hover:bg-zinc-800 rounded-full h-16 px-16 text-xs font-black uppercase tracking-[0.2em] shadow-2xl">
                  Contact via WhatsApp
                </Button>
              </a>
            </div>
         </div>
         
         <div className="mt-32 pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-8 text-gray-300 text-[9px] font-black uppercase tracking-[0.5em]">
            <span>© 2026 INOVA CO. LAB — ALL RIGHTS RESERVED.</span>
            <div className="flex gap-12">
              <a href="#" className="hover:text-black transition-colors">Instagram</a>
              <a href="#" className="hover:text-black transition-colors">TikTok</a>
              <a href="#" className="hover:text-black transition-colors">LinkedIn</a>
            </div>
         </div>
      </section>

      {/* Admin Quick Editor */}
      <div className="fixed bottom-8 left-8 z-50">
         <Button size="icon" className="rounded-full w-12 h-12 bg-white border border-gray-200 text-gray-400 hover:text-black shadow-lg hover:shadow-xl transition-all" asChild>
           <a href="/proposta/editar"><Settings className="w-5 h-5" /></a>
         </Button>
      </div>

    </div>
  );
}
