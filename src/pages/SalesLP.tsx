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

// --- FINTECH THEME (Premium SaaS - Improved faithfulness to reference) ---
function renderFintech(config: any, getIcon: any) {
  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-[#bff720]/30 selection:text-black overflow-x-hidden">
      
      {/* Background Deep Green Gradient Hero */}
      <div className="bg-gradient-to-b from-[#001D11] via-[#00311D] to-white pt-6 pb-40 relative">
        {/* Floating Abstract Glows */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
           <div className="absolute top-[10%] left-[20%] w-[300px] h-[300px] bg-[#bff720]/10 blur-[100px] rounded-full" />
           <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] bg-emerald-500/10 blur-[150px] rounded-full" />
        </div>

        <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center bg-white/5 backdrop-blur-xl rounded-full border border-white/10 mb-24 mx-4 md:mx-auto">
           <img src={LogoInova} alt="Inova Co." className="h-8 md:h-10 w-auto object-contain brightness-200" />
           <div className="hidden lg:flex gap-12 text-[10px] font-black uppercase tracking-[0.3em] text-white/50">
             <a href="#servicos" className="hover:text-[#bff720] transition-colors">Soluções</a>
             <a href="#precos" className="hover:text-[#bff720] transition-colors">Investimento</a>
             <a href="#contato" className="hover:text-[#bff720] transition-colors">Contato</a>
           </div>
           <Button className="bg-[#bff720] text-black rounded-full px-10 h-12 text-[10px] font-black uppercase tracking-widest hover:scale-110 active:scale-95 transition-all shadow-lg shadow-[#bff720]/20">
             Let's scale
           </Button>
        </nav>

        <section className="max-w-6xl mx-auto px-6 text-center text-white relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 40 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
             <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-6 py-2 rounded-full mb-10 backdrop-blur-sm">
                <span className="text-[#bff720] animate-pulse">●</span>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/70">{config.hero.badge}</span>
             </div>
             <h1 className="text-6xl md:text-[110px] font-black tracking-tight mb-8 leading-[0.85] italic uppercase selection:bg-[#bff720] selection:text-black">
               {config.hero.title}
             </h1>
             <p className="text-xl md:text-2xl text-white/50 max-w-2xl mx-auto mb-16 font-medium leading-relaxed italic">
               {config.hero.tagline}
             </p>
             <div className="flex flex-col sm:flex-row gap-4 justify-center">
                 <Button className="bg-[#bff720] text-black hover:bg-[#bff720]/90 rounded-full h-16 px-16 text-xs font-black uppercase tracking-widest shadow-2xl shadow-[#bff720]/30 transition-all hover:scale-105 active:scale-95">Get Started</Button>
                 <Button variant="ghost" className="text-white hover:bg-white/5 rounded-full h-16 px-16 text-xs font-black uppercase tracking-widest border border-white/20 transition-all hover:scale-105 backdrop-blur-sm">Learn More</Button>
             </div>
          </motion.div>
          
          {/* Mockup Simulation - Floating Visual element */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 60 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1.2 }}
            className="mt-32 max-w-4xl mx-auto relative group"
          >
             <div className="bg-gradient-to-br from-zinc-800 to-zinc-950 p-4 rounded-[3rem] shadow-[0_50px_100px_rgba(0,0,0,0.5)] border border-white/10 relative overflow-hidden">
                <div className="aspect-video bg-zinc-900 rounded-[2.5rem] flex items-center justify-center border border-white/5 relative">
                   <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                   <Sparkles className="w-20 h-20 text-[#bff720]/20 animate-pulse" />
                   
                   {/* Abstract UI Elements */}
                   <div className="absolute top-10 left-10 w-48 h-2 bg-white/5 rounded-full" />
                   <div className="absolute top-16 left-10 w-32 h-2 bg-white/5 rounded-full" />
                   <div className="absolute bottom-10 right-10 w-12 h-12 bg-[#bff720]/10 rounded-full" />
                </div>
             </div>
             {/* Floating cards around the mockup */}
             <div className="absolute -left-12 top-1/2 -translate-y-1/2 hidden lg:block">
                <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 4, repeat: Infinity }} className="bg-white p-6 rounded-3xl shadow-2xl border border-gray-100 flex items-center gap-4 text-left">
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600"><Shield className="w-5 h-5" /></div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase">Secure</p>
                    <p className="text-sm font-black text-zinc-800">100% Verified</p>
                  </div>
                </motion.div>
             </div>
             <div className="absolute -right-12 bottom-20 hidden lg:block">
                <motion.div animate={{ y: [0, 20, 0] }} transition={{ duration: 5, repeat: Infinity, delay: 1 }} className="bg-zinc-900 p-6 rounded-3xl shadow-2xl border border-white/10 flex items-center gap-4 text-left text-white">
                  <div className="w-10 h-10 bg-[#bff720] rounded-full flex items-center justify-center text-black"><Activity className="w-5 h-5" /></div>
                  <div>
                    <p className="text-[10px] font-black text-white/40 uppercase">Performance</p>
                    <p className="text-sm font-black text-[#bff720]">+320% Scale</p>
                  </div>
                </motion.div>
             </div>
          </motion.div>
        </section>
      </div>

      {/* Trust Bar */}
      <section className="bg-white py-24">
         <div className="max-w-7xl mx-auto px-8">
            <p className="text-center text-[10px] font-black uppercase tracking-[0.6em] text-gray-300 mb-12">Trusted by global market leaders</p>
            <div className="flex flex-wrap justify-between items-center gap-12 opacity-20 grayscale hover:grayscale-0 transition-all duration-700 cursor-default">
               <div className="text-2xl font-black tracking-tighter italic">FINANCE_X</div>
               <div className="text-2xl font-black tracking-tighter italic">BANK_SMART</div>
               <div className="text-2xl font-black tracking-tighter italic">CRYPTO_FLOW</div>
               <div className="text-2xl font-black tracking-tighter italic">PAYMENT_PRO</div>
               <div className="text-2xl font-black tracking-tighter italic">WALLET_DEEP</div>
               <div className="text-2xl font-black tracking-tighter italic">SECURE_PAY</div>
            </div>
         </div>
      </section>

      {/* Feature Grid - Improved faithfully to reference boxes */}
      <section id="servicos" className="max-w-7xl mx-auto px-6 py-32 bg-gray-50/50 rounded-[5rem] mb-32 border border-gray-100/50">
         <div className="text-center mb-24 space-y-4">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter italic uppercase text-zinc-900">Banking Remagined</h2>
            <p className="text-gray-400 text-lg font-medium">Built for the future of digital currency and operations.</p>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {config.services.concat(config.services.slice(0, 2)).map((s: any, i: number) => (
               <motion.div 
                 key={i}
                 whileHover={{ y: -10 }}
                 className="p-10 bg-white border border-gray-100 rounded-[3rem] transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-emerald-500/5 group"
               >
                  <div className="w-16 h-16 bg-emerald-50 group-hover:bg-[#bff720]/20 rounded-2xl flex items-center justify-center text-emerald-600 transition-colors mb-8">
                     {getIcon(s.icon)}
                  </div>
                  <h3 className="text-2xl font-black mb-4 tracking-tight">{s.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed font-medium">{s.desc}</p>
                  <div className="mt-8 pt-8 border-t border-gray-50 flex items-center gap-2 text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity">
                     <span className="text-[10px] font-black uppercase tracking-widest">Explore features</span>
                     <ArrowRight className="w-3 h-3" />
                  </div>
               </motion.div>
            ))}
         </div>
      </section>

      {/* Showcase Section (Two column split) */}
      <section className="max-w-7xl mx-auto px-8 py-40">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
               <Badge className="bg-[#bff720] text-black border-none px-4 py-1 font-black italic">ULTRA MODERN</Badge>
               <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] uppercase italic">Real-time global operations.</h2>
               <p className="text-xl text-gray-500 font-medium leading-relaxed">
                  Our system allows you to manage multi-currency accounts with zero friction. Integrated IA helps you predict market flows and optimize every cent.
               </p>
               <ul className="space-y-6">
                  {['Instant Settlements', 'Global Compliance', 'AI Risk Analysis'].map((item, i) => (
                     <li key={i} className="flex items-center gap-4 text-zinc-800 font-black italic uppercase tracking-tighter text-xl">
                        <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center"><CheckCircle2 className="w-3 h-3 text-[#bff720]" /></div>
                        {item}
                     </li>
                  ))}
               </ul>
            </div>
            <div className="relative">
               <div className="aspect-square bg-emerald-50 rounded-[4rem] flex items-center justify-center relative shadow-inner overflow-hidden">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border-[40px] border-emerald-100/30 rounded-full scale-110 border-dashed"
                  />
                  <img src={LogoInova} alt="Mock" className="w-48 h-auto object-contain brightness-10" />
               </div>
            </div>
         </div>
      </section>

      {/* Statistics Section - FAITHFUL TO IMAGE */}
      <section className="py-32 bg-white">
         <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="p-10 rounded-[2.5rem] border border-gray-100 bg-gray-50/50 flex flex-col items-center justify-center text-center">
               <p className="text-5xl font-black tracking-tighter text-zinc-900 leading-none">324M+</p>
               <p className="text-[10px] font-black uppercase text-gray-400 tracking-[0.3em] mt-4">Transactions</p>
            </div>
            <div className="p-10 rounded-[2.5rem] bg-[#bff720] flex flex-col items-center justify-center text-center shadow-xl shadow-[#bff720]/20 scale-105">
               <p className="text-5xl font-black tracking-tighter text-black leading-none">7M+</p>
               <p className="text-[10px] font-black uppercase text-black/40 tracking-[0.3em] mt-4">Happy Clients</p>
            </div>
            <div className="p-10 rounded-[2.5rem] border border-gray-100 bg-gray-50/50 flex flex-col items-center justify-center text-center">
               <p className="text-5xl font-black tracking-tighter text-zinc-900 leading-none">4.9*</p>
               <p className="text-[10px] font-black uppercase text-gray-400 tracking-[0.3em] mt-4">App Store</p>
            </div>
            <div className="p-10 rounded-[2.5rem] border border-gray-100 bg-gray-50/50 flex flex-col items-center justify-center text-center">
               <p className="text-5xl font-black tracking-tighter text-zinc-900 leading-none">$8.8B</p>
               <p className="text-[10px] font-black uppercase text-gray-400 tracking-[0.3em] mt-4">Processing</p>
            </div>
         </div>
      </section>

      {/* Pricing - FAITHFUL TO IMAGE DARK SECTION */}
      <section id="precos" className="bg-[#000E08] text-white py-48 rounded-[6rem] mx-4 md:mx-10 my-32 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 blur-[150px] rounded-full -mr-48 -mt-48" />
         
         <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-32 space-y-6">
               <h2 className="text-7xl font-black tracking-tight italic uppercase">Pricing Plans</h2>
               <p className="text-white/40 text-lg">Choose a plan that fits your growth ambitions.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
               {config.plans.map((p: any, i: number) => (
                  <div key={i} className={`p-14 rounded-[4rem] border flex flex-col relative transition-all duration-500 hover:scale-[1.02] ${p.popular ? 'border-[#bff720]/40 bg-white/[0.04] shadow-2xl shadow-emerald-500/5' : 'border-white/5 bg-transparent'}`}>
                     {p.popular && (
                        <div className="absolute top-8 left-8 bg-[#bff720] text-black px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg shadow-[#bff720]/20">MOST CHOSEN</div>
                     )}
                     <div className="mb-14">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 block mb-6">{p.name}</span>
                        <div className="flex items-baseline gap-2">
                           <span className="text-7xl font-black tracking-tighter italic">R${p.price}</span>
                           <span className="text-white/20 text-sm font-black uppercase">/mo</span>
                        </div>
                     </div>

                     <div className="space-y-6 flex-1 mb-16">
                        {p.features.map((f: string, j: number) => (
                           <div key={j} className="flex items-center gap-4 text-sm font-black leading-none text-white/80 italic uppercase tracking-tighter">
                              <CheckCircle2 className="w-5 h-5 text-[#bff720]" /> {f}
                           </div>
                        ))}
                     </div>

                     <Button className={`w-full h-16 rounded-full font-black uppercase tracking-widest text-[10px] ${p.popular ? 'bg-[#bff720] text-black hover:bg-[#bff720]/90 shadow-xl shadow-[#bff720]/30' : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'}`}>
                        Order Now
                     </Button>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* Testimonials Simulation */}
      <section className="max-w-7xl mx-auto px-8 py-32 border-t border-gray-100">
         <h2 className="text-4xl font-black tracking-tighter italic uppercase text-center mb-20">Real feedback from clients</h2>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((t) => (
               <div key={t} className="p-10 bg-gray-50 border border-gray-100 rounded-[3rem] space-y-6">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-white rounded-full border border-gray-200" />
                     <div>
                        <p className="font-black text-sm">Lucas Soares</p>
                        <p className="text-[10px] font-bold text-gray-400 uppercase">Founder @ Inova</p>
                     </div>
                  </div>
                  <p className="text-gray-500 font-medium italic leading-relaxed">
                    "O suporte da Inova é o melhor que já experimentei. A tecnologia deles realmente escalou nosso faturamento em meses."
                  </p>
                  <div className="flex gap-1 text-[#bff720]">
                     {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-current" />)}
                  </div>
               </div>
            ))}
         </div>
      </section>

      <Footer whatsapp={config.whatsapp} isDark />
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
           <img src={LogoInova} alt="Inova Co." className="h-8 w-auto object-contain" />
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
    <section id="cta" className="max-w-7xl mx-auto px-6 py-40 text-center relative border-t border-gray-100/10">
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full -z-10 blur-[120px] ${isDark ? 'bg-[#015f57]/10' : 'bg-[#bff720]/5'}`} />
      <Sparkles className="w-12 h-12 text-[#bff720] mx-auto mb-10 animate-pulse" />
      <h2 className={`text-6xl md:text-9xl font-black mb-12 tracking-tighter uppercase italic ${isDark ? 'text-white' : 'text-zinc-900'}`}>Vamos Escalar?</h2>
      <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer">
        <Button className="bg-[#bff720] text-black hover:bg-[#bff720]/90 rounded-full h-20 px-16 text-2xl font-black uppercase italic shadow-2xl transition-all hover:scale-105 active:scale-95">Falar no WhatsApp</Button>
      </a>
      <div className="mt-40 pt-10 border-t border-gray-200/10 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-[0.4em] opacity-40">
        <span>© 2026 INOVA CO. LAB</span>
        <span>All Rights Reserved</span>
      </div>
    </section>
  );
}
