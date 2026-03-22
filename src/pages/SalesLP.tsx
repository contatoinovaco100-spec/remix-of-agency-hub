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

// Seleção de Ícones
const IconMap: Record<string, any> = {
  Video, Bot, PieChart, Monitor, Rocket, Target, Zap, Sparkles, Star, ShieldCheck, Shield, CreditCard, Globe, Smartphone, BarChart3, Users, Activity, Layers, Heart, Crown, Trophy, Apple, Dumbbell, Gavel, Scale, Utensils, Coffee, Home, HeartPulse, Leaf, Briefcase, MapPin, Clock, Camera, Mic, Lightbulb
};

const DEFAULT_CONFIG = {
  theme: 'mobbin',
  hero: {
    title: "ALÉM DA LENTE. CONSTRUÍMOS NARRATIVAS PODEROSAS.",
    tagline: "Ser visto é fácil. Ser lembrado é estratégia. Construímos percepção, autoridade e domínio de mercado através de execução cinematográfica de alto nível.",
    badge: "O ESTRATEGISTA • 2026"
  },
  whatsapp: "5562999999999",
  services: [
    { title: "Arquitetura de Narrativa", desc: "Posicionamento estratégico e mapeamento de diferenciais para definir como o mercado percebe sua marca.", icon: "Layers" },
    { title: "Produção Cinematográfica", desc: "Captação de vídeo de alto padrão e reels estratégicos desenhados para construir autoridade imediata.", icon: "Video" },
    { title: "Funis de Performance", desc: "Conteúdo focado em resultados e estruturas de funil voltadas para conversão de vendas de alto ticket.", icon: "Activity" },
    { title: "Domínio de Mercado", desc: "Um ecossistema estratégico completo para garantir que sua marca não seja apenas vista, mas lembrada.", icon: "Crown" }
  ],
  plans: [
    {
      name: "Fundação Estratégica",
      price: "1.200",
      description: "Para marcas que buscam consistência e posicionamento claro no mercado.",
      features: ["Gestão de Redes Sociais", "3 Posts estratégicos semanais", "Design de alta performance", "Relatórios mensais"],
      accent: "text-[#bff720]",
      popular: false
    },
    {
      name: "Domínio de Autoridade",
      price: "2.500",
      description: "Produção full-service e integração de funis de vendas de alto impacto.",
      features: ["Tráfego Pago (Meta/Google)", "2 Visitas de filmagem mensais", "Estrutura de Funil de Vendas", "Suporte VIP"],
      accent: "text-[#bff720]",
      popular: true
    },
    {
      name: "Ecossistema Elite",
      price: "5.000",
      description: "O braço estratégico completo para líderes de mercado que querem controlar a narrativa.",
      features: ["4 Dias de produção", "Automação de SDR com IA", "Consultoria de Branding", "Direção Criativa"],
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
        console.error('Erro ao carregar config', e);
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

// --- COMPONENTES COMPARTILHADOS ---
function Footer({ whatsapp, isDark, brand = "INOVA CO. LAB" }: { whatsapp: string, isDark?: boolean, brand?: string }) {
  return (
    <section id="cta" className="max-w-7xl mx-auto px-6 py-40 text-center relative">
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full -z-10 blur-[150px] ${isDark ? 'bg-zinc-800/20' : 'bg-[#bff720]/5'}`} />
      <h2 className={`text-6xl md:text-[140px] font-black mb-12 tracking-tighter uppercase italic ${isDark ? 'text-white' : 'text-zinc-900'} leading-[0.8]`}>DOMINE AGORA.</h2>
      <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer">
        <Button className="bg-[#bff720] text-black hover:bg-[#bff720]/90 rounded-full h-24 px-20 text-3xl font-black uppercase italic shadow-2xl transition-all hover:scale-105 active:scale-95 group">
           INICIAR IMPLANTAÇÃO <ChevronRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
        </Button>
      </a>
      <div className="mt-40 pt-10 border-t border-gray-200/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-[0.5em] opacity-40 italic">
        <span>© 2026 {brand}</span>
        <span>"Quem controla a narrativa, controla o mercado."</span>
      </div>
    </section>
  );
}

// --- 1. MOBBIN DISCOVERY --- 
function renderMobbinDiscovery(config: any, getIcon: any) {
  return (
    <div className="min-h-screen bg-[#F9FAFB] text-black font-sans selection:bg-[#bff720]/30 overflow-x-hidden">
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] md:w-auto">
        <nav className="bg-white/70 backdrop-blur-xl border border-gray-200/50 rounded-full py-2.5 px-3 md:px-8 flex items-center justify-between gap-8 shadow-lg">
          <img src={LogoInova} alt="Inova" className="h-6 w-auto pl-2" />
          <div className="hidden lg:flex items-center gap-10 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
            <a href="#services">Soluções</a>
            <a href="#pricing">Preços</a>
          </div>
          <Button size="sm" className="bg-black text-white rounded-full px-6 text-[10px] font-black uppercase tracking-widest">Começar</Button>
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
        <h2 className="text-4xl font-black tracking-tighter mb-20 italic uppercase">Catálogo de Expertises</h2>
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

      <section id="pricing" className="max-w-7xl mx-auto px-6 py-40 grid grid-cols-1 md:grid-cols-3 gap-12">
        {config.plans.map((p: any, i: number) => (
          <div key={i} className={`p-12 rounded-[4rem] border ${p.popular ? 'border-zinc-900 bg-white shadow-2xl scale-105' : 'border-gray-100 bg-white/40'} flex flex-col`}>
            <p className="text-[10px] font-black uppercase text-[#bff720] mb-8">{p.name}</p>
            <div className="text-7xl font-black italic tracking-tighter mb-14 underline decoration-gray-100 decoration-4 underline-offset-8">R${p.price}</div>
            <div className="space-y-6 flex-1 mb-16">
              {p.features.map((f: string, j: number) => (
                <div key={j} className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-zinc-500 italic"><CheckCircle2 className="w-4 h-4 text-[#bff720]" /> {f}</div>
              ))}
            </div>
            <Button className="w-full h-16 rounded-full font-black uppercase text-[10px] tracking-widest bg-black text-white">Selecionar</Button>
          </div>
        ))}
      </section>
      <Footer whatsapp={config.whatsapp} />
    </div>
  );
}

// --- 2. OPENCLAW MANIFESTO ---
function renderOpenClawManifesto(config: any, getIcon: any) {
  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-orange-500/30 overflow-x-hidden">
      <nav className="max-w-7xl mx-auto px-6 py-12 flex justify-between items-center relative z-10">
        <img src={LogoInova} alt="Inova" className="h-8 brightness-200" />
        <Button className="bg-white text-black rounded-full px-8 text-[10px] font-black uppercase tracking-widest">COMEÇAR</Button>
      </nav>
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-48 text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}>
          <Badge className="mb-10 bg-white/5 text-orange-500 border-white/10 px-6 py-2 text-[10px] uppercase font-black rounded-full tracking-widest text-[#bff720]">POSICIONAMENTO É GUERRA</Badge>
          <h1 className="text-7xl md:text-[140px] font-black tracking-tighter mb-14 leading-[0.8] uppercase italic underline decoration-orange-600/40">
             {config.hero.title}
          </h1>
          <p className="text-xl md:text-3xl text-white/40 max-w-4xl mx-auto mb-20 font-medium italic">
             {config.hero.tagline}
          </p>
          <Button className="bg-orange-600 hover:bg-orange-700 text-white rounded-full h-20 px-20 text-xl font-black shadow-2xl">ACEITAR PODER</Button>
        </motion.div>
      </section>
       <section id="services" className="bg-white text-black py-48 px-10 rounded-[6rem] mx-4 md:mx-10 my-20">
         <div className="max-w-7xl mx-auto">
            <h2 className="text-6xl md:text-9xl font-black tracking-tighter italic uppercase mb-32">Expertises</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
               {config.services.map((s: any, i: number) => (
                  <div key={i} className="flex gap-10 items-start pb-20 border-b border-black/10">
                     <span className="text-6xl font-black italic opacity-5 leading-none">0{i+1}</span>
                     <div>
                        <h3 className="text-4xl font-black uppercase italic underline underline-offset-8 decoration-orange-500">{s.title}</h3>
                        <p className="text-black/60 text-lg font-bold italic leading-relaxed uppercase mt-4">{s.desc}</p>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>
      <Footer whatsapp={config.whatsapp} isDark />
    </div>
  );
}

// --- 3. FINTECH ECOSYSTEM ---
function renderFintechEcosystem(config: any, getIcon: any) {
  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-[#bff720]/30 overflow-x-hidden">
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
         <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
            <img src={LogoInova} alt="Inova" className="h-8" />
            <Button className="bg-zinc-900 text-white rounded-full px-8 h-10 text-[10px] font-black uppercase tracking-widest">Login</Button>
         </div>
      </nav>
      <section className="bg-gradient-to-b from-gray-50 to-white pt-48 pb-32 border-b border-gray-100">
         <div className="max-w-6xl mx-auto px-6 text-center">
            <h1 className="text-6xl md:text-[100px] font-black tracking-tight mb-8 leading-[0.9]">
               {config.hero.title}
            </h1>
            <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto mb-16 font-medium italic">
               {config.hero.tagline}
            </p>
            <Button className="bg-[#001D11] text-[#bff720] hover:bg-black rounded-full h-16 px-14 text-xs font-black uppercase tracking-widest shadow-2xl">Integrar Proposta</Button>
         </div>
      </section>
      <Footer whatsapp={config.whatsapp} />
    </div>
  );
}

// --- 4. NUTRITIONIST --- 
function renderNutritionist(config: any, getIcon: any) {
  return (
    <div className="min-h-screen bg-[#FDFCFB] text-zinc-800 font-sans selection:bg-emerald-500/20 overflow-x-hidden">
      <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-[90%] md:w-auto bg-white/40 backdrop-blur-xl border border-emerald-900/5 rounded-full px-10 py-4 flex items-center justify-between gap-20 shadow-sm">
        <h4 className="font-black italic text-emerald-900 tracking-tighter uppercase">PROTOCOLO BEM-ESTAR</h4>
        <Button className="bg-emerald-600 text-white rounded-full px-6 text-[10px] font-black uppercase tracking-widest">Começar Agora</Button>
      </nav>
      <section className="max-w-5xl mx-auto px-6 pt-48 pb-32 text-center text-emerald-950">
         <h1 className="text-6xl md:text-[100px] font-black tracking-tighter mb-8 leading-[0.9] italic">ALIMENTE SUA NARRATIVA.</h1>
         <p className="text-lg md:text-xl text-emerald-900/40 max-w-2xl mx-auto mb-16 font-medium italic">Construímos autoridade através de precisão metabólica e planos estratégicos de alta performance.</p>
         <Button className="bg-emerald-950 text-white rounded-full h-20 px-16 text-xl font-black uppercase shadow-2xl">DECODIFICAR MEU PLANO</Button>
      </section>
      <Footer whatsapp={config.whatsapp} brand="WELLNESS CO. LAB" />
    </div>
  );
}

// --- 5. STUDIO RENTAL ---
function renderStudioRental(config: any, getIcon: any) {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#bff720]/20 overflow-x-hidden">
      <nav className="fixed top-0 left-0 w-full px-12 h-24 flex items-center justify-between z-50 border-b border-white/5 bg-black/50 backdrop-blur-md">
         <img src={LogoInova} alt="Inova" className="h-8 brightness-200" />
         <Button className="bg-[#bff720] text-black rounded-none px-8 font-black uppercase italic tracking-widest">Reservar Estúdio</Button>
      </nav>
      <section className="h-screen relative flex items-center justify-center text-center">
         <div className="relative z-20 space-y-12">
            <h1 className="text-7xl md:text-[140px] font-black tracking-tighter uppercase italic leading-[0.8] text-white">
               NÃO É SÓ UM ESTÚDIO. <br /> <span className="text-[#bff720]">UMA ARMA NARRATIVA.</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/30 max-w-3xl mx-auto italic font-medium uppercase tracking-widest">Aluguel de estúdio profissional com equipamentos de elite <br /> e cenários customizados para criadores.</p>
            <Button className="bg-white text-black h-24 px-16 text-3xl font-black uppercase italic shadow-2xl hover:bg-[#bff720]">INICIAR ALUGUEL</Button>
         </div>
      </section>
      <Footer whatsapp={config.whatsapp} isDark brand="INOVA STUDIO LAB" />
    </div>
  );
}

// --- 6. LAWYER ---
function renderLawyer(config: any, getIcon: any) {
  return (
    <div className="min-h-screen bg-[#0A0D14] text-white font-sans selection:bg-blue-500/20 overflow-x-hidden">
      <nav className="max-w-7xl mx-auto px-10 py-12 flex justify-between items-center relative z-10 border-b border-white/5">
         <img src={LogoInova} alt="Inova" className="h-10 brightness-200" />
         <Button variant="outline" className="rounded-none border-white/20 text-white hover:bg-white hover:text-black transition-all px-10 h-12 text-[10px] font-black uppercase tracking-widest">Consulta Jurídica</Button>
      </nav>
      <section className="max-w-6xl mx-auto px-10 pt-48 pb-60 text-center">
         <h1 className="text-6xl md:text-[120px] font-black tracking-tighter mb-12 uppercase italic leading-[0.85]">QUEM CONTROLA OS FATOS, VENCE.</h1>
         <p className="text-xl md:text-2xl text-white/30 max-w-3xl mx-auto mb-20 italic font-medium">Arquitetura Estratégica para Casos de Grande Escala.</p>
         <Button className="bg-blue-950 text-white rounded-none h-20 px-20 text-xl font-black uppercase border border-blue-800/50">PROTOCOLAR DEFESA</Button>
      </section>
      <Footer whatsapp={config.whatsapp} isDark brand="LEGAL ARCHITECT CO." />
    </div>
  );
}

// --- 7. RESTAURANT ---
function renderRestaurant(config: any, getIcon: any) {
  return (
    <div className="min-h-screen bg-[#0F0A0A] text-[#F3EFE0] font-sans selection:bg-orange-500/20 overflow-x-hidden">
      <section className="h-screen relative flex items-center justify-center">
         <nav className="absolute top-12 left-0 w-full px-12 flex justify-between items-center z-50">
            <img src={LogoInova} alt="Inova" className="h-8 brightness-200" />
            <span className="text-[10px] font-black uppercase tracking-[0.6em] text-white/20">RESERVAS ABERTAS</span>
         </nav>
         <div className="relative z-20 text-center space-y-12">
            <h1 className="text-7xl md:text-[180px] font-black italic tracking-tighter uppercase leading-[0.7] text-white">AUTORIDADE <br /> <span className="text-orange-600">GASTRONÔMICA.</span></h1>
            <p className="text-2xl text-white/30 max-w-2xl mx-auto font-medium italic uppercase tracking-widest">Onde cada textura é uma escolha estratégica.</p>
         </div>
         <div className="absolute inset-x-0 bottom-20 flex justify-center z-20">
            <Button className="bg-orange-600 text-white rounded-full h-24 px-16 text-3xl font-black uppercase italic shadow-2xl">SENTIR O POSICIONAMENTO</Button>
         </div>
      </section>
      <Footer whatsapp={config.whatsapp} isDark brand="GASTRO LAB CO." />
    </div>
  );
}

// --- 8. PERSONAL TRAINER ---
function renderPersonal(config: any, getIcon: any) {
  return (
    <div className="min-h-screen bg-[#050505] text-[#FAFAFA] font-sans selection:bg-[#bff720]/20 overflow-x-hidden">
      <section className="h-screen relative flex items-center justify-center overflow-hidden text-center">
         <div className="relative z-20 px-6">
            <Badge className="bg-[#bff720] text-black font-black uppercase tracking-[0.4em] text-[10px] px-8 py-2 rounded-none mb-10">O ARQUITETO DO CORPO</Badge>
            <h1 className="text-8xl md:text-[180px] font-black italic tracking-tighter uppercase leading-[0.75] mb-12">ALÉM DOS <br /> <span className="text-[#bff720]">LIMITES.</span></h1>
            <Button className="bg-[#bff720] text-black rounded-none h-24 px-20 text-3xl font-black uppercase italic">REESCREVER MEU DNA</Button>
         </div>
      </section>
      <Footer whatsapp={config.whatsapp} isDark brand="PHYS’X ARCHITECTS" />
    </div>
  );
}
