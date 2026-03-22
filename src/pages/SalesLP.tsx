import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Rocket, Target, Zap, CheckCircle2, ArrowRight, MessageCircle, ShieldCheck, 
  PieChart, Video, Monitor, Sparkles, Bot, Star, Settings, Search, ChevronRight, 
  Shield, CreditCard, Globe, Smartphone, BarChart3, Users, Activity, Layers, 
  Heart, Crown, Quote, Flame, MousePointer2, Trophy, Apple, Dumbbell, Gavel, 
  Scale, Utensils, Coffee, Home, HeartPulse, Leaf, Briefcase, MapPin, Clock, 
  Camera, Mic, Lightbulb, Stethoscope, Building2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import LogoInova from '@/assets/logo-inova.png';

const IconMap: Record<string, any> = {
  Video, Bot, PieChart, Monitor, Rocket, Target, Zap, Sparkles, Star, ShieldCheck, 
  Shield, CreditCard, Globe, Smartphone, BarChart3, Users, Activity, Layers, 
  Heart, Crown, Trophy, Apple, Dumbbell, Gavel, Scale, Utensils, Coffee, Home, 
  HeartPulse, Leaf, Briefcase, MapPin, Clock, Camera, Mic, Lightbulb, Stethoscope, Building2
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
  clinica: { bg: 'bg-slate-50', text: 'text-slate-900', accent: 'text-rose-500', button: 'bg-rose-600 text-white', card: 'bg-white', name: 'Estética de Elite' },
  realestate: { bg: 'bg-zinc-50', text: 'text-zinc-900', accent: 'text-amber-600', button: 'bg-amber-600 text-white', card: 'bg-white', name: 'Imobiliária High-End' },
};

const THEME_CONTENT: Record<string, any> = {
  restaurant: {
    heroTitle: "Seu restaurante pode estar cheio… mas invisível no digital.",
    heroTagline: "Transformamos restaurantes em marcas desejadas nas redes sociais.",
    problem: "Hoje a maioria das pessoas escolhe onde comer pelo Instagram. Se o seu restaurante não aparece com conteúdo profissional, ele simplesmente não entra na decisão do cliente.",
    solution: "A Inova é uma produtora estratégica que cria conteúdos profissionais e posiciona seu restaurante para atrair mais clientes.",
    deliverables: ["Planejamento estratégico de conteúdo", "Captação profissional no restaurante", "Vídeos de pratos e experiência gastronômica", "Conteúdo para Reels, Ads e Stories", "Copy estratégica para cada vídeo", "Edição profissional"],
    steps: ["1. Diagnóstico do posicionamento", "2. Planejamento do conteúdo mensal", "3. Captação profissional", "4. Edição estratégica", "5. Entrega e otimizações"],
    results: ["Mais visibilidade online", "Mais reservas e clientes", "Mais autoridade no Instagram"],
    cta: "Quero transformar o Instagram do meu restaurante."
  },
  personal: {
    heroTitle: "Ser bom no treino não basta. Você precisa ser visto.",
    heroTagline: "Transformamos personal trainers em autoridade no Instagram.",
    problem: "Muitos profissionais excelentes têm poucos alunos porque não sabem se posicionar no digital.",
    solution: "A Inova cria conteúdos estratégicos que mostram seu conhecimento, resultados e autoridade.",
    deliverables: ["Planejamento estratégico de conteúdo", "Vídeos educativos de treino", "Conteúdos de transformação de alunos", "Reels estratégicos para alcance", "Copy estratégica", "Edição profissional"],
    steps: ["1. Diagnóstico de posicionamento", "2. Planejamento mensal", "3. Captação profissional", "4. Edição estratégica", "5. Entrega e ajustes"],
    results: ["Mais seguidores qualificados", "Mais alunos", "Mais autoridade"],
    cta: "Quero crescer como personal trainer."
  },
  clinica: {
    heroTitle: "Procedimentos incríveis não bastam. Você precisa mostrar isso.",
    heroTagline: "Transformamos clínicas estéticas em referência nas redes sociais.",
    problem: "Muitas clínicas fazem excelentes procedimentos, mas não conseguem transmitir confiança online.",
    solution: "A Inova cria conteúdos que mostram resultados, bastidores e profissionalismo.",
    deliverables: ["Conteúdo de antes e depois", "Vídeos educativos", "Bastidores de procedimentos", "Planejamento estratégico de conteúdo", "Copy estratégica", "Edição profissional"],
    steps: ["1. Diagnóstico de marca", "2. Planejamento visual", "3. Captação na clínica", "4. Edição premium", "5. Publicação estratégica"],
    results: ["Mais pacientes", "Mais confiança", "Mais autoridade digital"],
    cta: "Quero posicionar minha clínica."
  },
  lawyer: {
    heroTitle: "Autoridade no direito começa com posicionamento.",
    heroTagline: "Conteúdo estratégico para advogados que querem crescer no digital.",
    problem: "Muitos escritórios dependem apenas de indicação e não utilizam o potencial das redes sociais.",
    solution: "A Inova cria conteúdos profissionais que transmitem credibilidade e autoridade jurídica.",
    deliverables: ["Conteúdo educativo jurídico", "Reels explicativos", "Conteúdo institucional", "Planejamento estratégico", "Copy estratégica", "Edição profissional"],
    steps: ["1. Análise de nicho", "2. Planejamento de temas", "3. Script & Captação", "4. Edição sóbria", "5. Estratégia de alcance"],
    results: ["Mais autoridade", "Mais visibilidade", "Mais oportunidades de clientes"],
    cta: "Quero posicionar meu escritório."
  },
  realestate: {
    heroTitle: "Imóveis incríveis precisam de conteúdo à altura.",
    heroTagline: "Transformamos imobiliárias em referência nas redes sociais.",
    problem: "Muitas imobiliárias anunciam imóveis de forma comum e acabam não se destacando.",
    solution: "A Inova cria conteúdos imobiliários que geram desejo e atraem compradores.",
    deliverables: ["Tour profissional de imóveis", "Reels estratégicos", "Conteúdo de mercado imobiliário", "Planejamento de conteúdo", "Copy estratégica", "Edição profissional"],
    steps: ["1. Scouting de imóveis", "2. Roteiro de tour", "3. Captação High-End", "4. Edição dinâmica", "5. Distribuição orgânica"],
    results: ["Mais leads interessados", "Mais autoridade no mercado", "Mais oportunidades de venda"],
    cta: "Quero posicionar minha imobiliária."
  }
};

export default function SalesLP() {
  const [config, setConfig] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem('agency_lp_config');
    const defaultConfig = {
      theme: 'mobbin',
      hero: { title: "ALÉM DA LENTE. CONSTRUÍMOS NARRATIVAS.", tagline: "Ser visto é fácil. Ser lembrado é estratégia.", badge: "O ESTRATEGISTA • 2026" },
      whatsapp: "5562999999999",
      services: [],
      plans: [
        { name: "Plano Start", price: "1500", features: ["6 vídeos estratégicos", "1 vídeo institucional", "2 captações mensais", "Planejamento mensal", "Copy estratégica", "Edição profissional"] },
        { name: "Plano Advanced", price: "2300", features: ["9 vídeos estratégicos", "Planejamento estratégico completo", "Estratégia de funil", "Relatório de performance"], popular: true }
      ]
    };

    if (saved) {
      try { 
        const parsed = JSON.parse(saved);
        setConfig({ ...defaultConfig, ...parsed }); 
      } catch (e) { setConfig(defaultConfig); }
    } else { setConfig(defaultConfig); }
  }, []);

  if (!config) return null;
  const theme = THEMES[config.theme] || THEMES.mobbin;
  const content = THEME_CONTENT[config.theme] || {
    heroTitle: config.hero.title,
    heroTagline: config.hero.tagline,
    problem: "Sua marca precisa de um posicionamento que venda.",
    solution: "A Inova transforma sua presença digital com estratégia cinematográfica.",
    deliverables: config.services.length > 0 ? config.services.map((s:any)=>s.title) : ["Vídeos High-End", "Estratégia Digital", "Gestão de Autoridade"],
    steps: ["1. Diagnóstico", "2. Planejamento", "3. Captação", "4. Edição", "5. Entrega"],
    results: ["Autoridade Máxima", "Domínio de Mercado", "Crescimento Exponencial"],
    cta: "Iniciar Minha Transformação"
  };

  return (
    <div className={`min-h-screen ${theme.bg} ${theme.text} font-sans selection:bg-[#bff720]/20 overflow-x-hidden`}>
      <Nav theme={theme} />

      <section className="pt-48 pb-32 px-6 text-center max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <Badge className={`${theme.isDark ? 'bg-white/5 text-white/40' : 'bg-white text-zinc-400'} border mb-10 px-6 py-2 uppercase font-black tracking-widest text-[9px]`}>{config.hero.badge}</Badge>
          <h1 className="text-5xl md:text-[100px] font-black tracking-tighter mb-12 uppercase italic leading-[0.85]">{content.heroTitle}</h1>
          <p className="text-xl md:text-2xl opacity-40 max-w-3xl mx-auto mb-16 font-medium italic">{content.heroTagline}</p>
          <Button className={`${theme.button} rounded-full h-20 px-16 text-xl font-black uppercase shadow-2xl transition-transform hover:scale-105`}>{content.cta}</Button>
        </motion.div>
      </section>

      <section className="py-20 border-y border-current/5 opacity-10 grayscale overflow-hidden whitespace-nowrap">
        <div className="flex animate-marquee gap-20 font-black text-4xl italic tracking-tighter uppercase">
          {[...Array(10)].map((_, i) => <span key={i}>AUTORIDADE • ESTRATÉGIA • NARRATIVA • DOMÍNIO • CINEMA</span>)}
        </div>
      </section>

      <section className="py-40 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-32 items-center">
          <div><h2 className="text-xs font-black uppercase tracking-[0.5em] mb-12 opacity-30">O Problema</h2><p className="text-4xl md:text-5xl font-black italic tracking-tighter leading-tight">{content.problem}</p></div>
          <div><h2 className="text-xs font-black uppercase tracking-[0.5em] mb-12 opacity-30">A Solução Inova</h2><p className="text-xl opacity-60 font-medium italic mb-10">{content.solution}</p><Button variant="outline" className="rounded-full border-current/20 px-10">Saber Mais</Button></div>
        </div>
      </section>

      <section id="services" className="py-40 bg-current/5 rounded-[6rem] mx-4 md:mx-10">
        <div className="max-w-7xl mx-auto px-10">
          <h2 className="text-6xl font-black italic uppercase tracking-tighter mb-24">O que Entregamos.</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.deliverables.map((d: any, i: number) => (
              <div key={i} className={`${theme.card} p-12 rounded-[4rem] group transition-all shadow-xl border border-current/5`}>
                <div className={`${theme.accent} mb-8`}><CheckCircle2 className="w-10 h-10" /></div>
                <h3 className="text-2xl font-black italic uppercase mb-4">{d}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-48 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-5 gap-10">
        {content.steps.map((step: string, i: number) => (
          <div key={i} className="text-center group">
            <div className={`w-20 h-20 rounded-full border border-current/10 flex items-center justify-center mx-auto mb-8 font-black text-2xl italic group-hover:${theme.accent} transition-colors opacity-20`}>{i+1}</div>
            <p className="text-xs font-black uppercase tracking-widest italic">{step.split('. ')[1]}</p>
          </div>
        ))}
      </section>

      <section className="py-40 bg-current/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Quote className={`w-20 h-20 ${theme.accent} mx-auto mb-16 opacity-30`} />
          <h2 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter leading-none mb-10">QUEM CONTROLA A NARRATIVA, CONTROLA O MERCADO.</h2>
        </div>
      </section>

      <section className="py-40 max-w-7xl mx-auto px-6 text-center">
         <h3 className="text-xs font-black uppercase tracking-[1em] mb-20 opacity-20 text-center">Resultados Esperados</h3>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
            {content.results.map((r: string, i: number) => (
               <div key={i}><p className="text-5xl font-black italic uppercase mb-4">{r}</p><div className={`h-1 w-20 mx-auto ${theme.accent} bg-current opacity-20`} /></div>
            ))}
         </div>
      </section>

      <section id="pricing" className="py-60 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {config.plans.map((p: any, i: number) => (
          <div key={i} className={`${theme.card} p-16 rounded-[4.5rem] flex flex-col border-2 ${p.popular ? 'border-current shadow-2xl relative scale-105' : 'border-transparent opacity-60'}`}>
            {p.popular && <div className="absolute top-8 right-8 bg-current text-current-inverse px-4 py-1 rounded-full text-[8px] font-black uppercase tracking-widest" style={{backgroundColor: theme.accent.replace('text-', ''), color: 'white'}}>Recomendado</div>}
            <h4 className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-12">{p.name}</h4>
            <div className="text-7xl font-black italic tracking-tighter mb-16 underline decoration-current/10 decoration-8 underline-offset-8">R${p.price}<span className="text-sm">/mês</span></div>
            <div className="space-y-6 flex-1 mb-20">
              {p.features.map((f: string, j: number) => (
                <div key={j} className="flex items-center gap-4 text-xs font-black uppercase italic tracking-widest opacity-40 border-b border-current/5 pb-4"><CheckCircle2 className={`w-4 h-4 ${theme.accent}`} /> {f}</div>
              ))}
            </div>
            <Button className={`${theme.button} w-full h-16 rounded-full font-black uppercase tracking-widest text-[10px]`}>SELECIONAR PLANO</Button>
          </div>
        ))}
      </section>

      <Footer whatsapp={config.whatsapp} theme={theme} cta={content.cta} />
    </div>
  );
}

function Nav({ theme }: any) {
  return (
    <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-[95%] md:w-auto h-20 bg-white/5 backdrop-blur-xl border border-current/5 rounded-full px-12 flex items-center justify-between gap-20 shadow-2xl">
      <img src={LogoInova} alt="Inova" className={`h-8 w-auto ${theme.isDark ? 'brightness-200' : ''}`} />
      <div className="hidden lg:flex gap-12 text-[9px] font-black uppercase tracking-widest opacity-40">
        <a href="#services" className="hover:opacity-100 transition-opacity">Entregas</a>
        <a href="#pricing" className="hover:opacity-100 transition-opacity">Planos</a>
      </div>
      <Button className={`${theme.button} rounded-full px-8 text-[9px] font-black uppercase tracking-widest`}>AGENDAR</Button>
    </nav>
  );
}

function Footer({ whatsapp, theme, cta }: any) {
  return (
    <section className="py-60 text-center relative overflow-hidden">
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full blur-[200px] -z-10 ${theme.isDark ? 'bg-zinc-800/20' : 'bg-[#bff720]/5'}`} />
      <h2 className="text-6xl md:text-[140px] font-black mb-16 tracking-tighter uppercase italic leading-[0.8]">VAMOS CRESCER?</h2>
      <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer">
        <Button className={`${theme.button} h-24 px-20 text-3xl font-black uppercase italic shadow-2xl hover:scale-105 transition-all`}>{cta}</Button>
      </a>
      <div className="mt-40 pt-10 border-t border-current/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-[0.5em] opacity-40 italic">
        <span>© 2026 INOVA PRODUÇÕES</span>
        <span>"Transformando visibilidade em faturamento."</span>
      </div>
    </section>
  );
}
