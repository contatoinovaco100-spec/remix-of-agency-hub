import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, Target, Sparkles, Plus, Video, Camera, BarChart3, 
  Zap, Shield, Users, Monitor, Mic, Lightbulb, Play, Share2,
  CheckCircle2, Star, Globe, Smartphone, Layers, Heart, Crown,
  Trophy, Flame, Activity, Clock, MapPin
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import LogoInova from '@/assets/logo-inova.png';

const ASSETS = {
  restaurant: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1200",
  personal: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1200",
  clinica: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1200",
  lawyer: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=1200",
  realestate: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200",
  studio: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=1200",
  team: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200",
  editing: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80&w=1200",
  analytics: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200",
  social: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=1200",
};

const THEMES: Record<string, any> = {
  openclaw: { isDark: true, image: ASSETS.restaurant },
  restaurant: { isDark: true, image: ASSETS.restaurant },
  personal: { isDark: true, image: ASSETS.personal },
  clinica: { isDark: false, image: ASSETS.clinica },
  lawyer: { isDark: true, image: ASSETS.lawyer },
  realestate: { isDark: false, image: ASSETS.realestate },
  studio: { isDark: true, image: ASSETS.studio },
};

const DEFAULTS = {
  hero: { title: "ALÉM DA LENTE. CONSTRUÍMOS NARRATIVAS.", tagline: "Ser visto é fácil. Ser lembrado é estratégia.", badge: "INOVA PRODUÇÕES • 2026", cta: "INICIAR POSICIONAMENTO" },
  strategy: { problem: "Sua marca é invisível no digital.", solution: "A Inova reconstrói sua autoridade com narrativa cinematográfica.", results: "Autoridade, Escala, Faturamento", steps: "Diagnóstico, Planejamento, Captação, Edição, Entrega" },
  styles: { heroTitleSize: "64", accentColor: "#bff720" }
};

export default function SalesLP() {
  const [config, setConfig] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem('agency_lp_config');
    if (saved) { try { setConfig(JSON.parse(saved)); } catch { setConfig({}); } }
    else { setConfig({}); }
  }, []);

  if (!config) return null;
  const themeKey = config.theme || 'openclaw';
  const theme = THEMES[themeKey] || THEMES.openclaw;
  const accent = config.styles?.accentColor || DEFAULTS.styles.accentColor;
  const heroSize = config.styles?.heroTitleSize || DEFAULTS.styles.heroTitleSize;

  const h = { ...DEFAULTS.hero, ...config.hero };
  const s = { ...DEFAULTS.strategy, ...config.strategy };
  const results = s.results.split(',').map((r: string) => r.trim());
  const steps = s.steps.split(',').map((r: string) => r.trim());
  const services = config.services?.length ? config.services : [
    { title: "Captação Profissional", desc: "Filmagem 4K cinematográfica no seu espaço." },
    { title: "Edição de Elite", desc: "Pós-produção de altíssima qualidade." },
    { title: "Estratégia de Funil", desc: "Distribuição otimizada para conversão." },
    { title: "Copy Estratégica", desc: "Textos que vendem e posicionam." },
    { title: "Tráfego Pago", desc: "Campanhas que atraem clientes reais." },
    { title: "Consultoria", desc: "Direcionamento estratégico de marca." },
  ];
  const plans = config.plans?.length ? config.plans : [
    { name: "Plano Start", price: "2300", features: ["6 vídeos/mês", "2 captações", "Copy estratégica"], popular: false },
    { name: "Plano Pro", price: "4500", features: ["12 vídeos/mês", "4 captações", "Funil VIP", "Tráfego incluso"], popular: true },
  ];
  const whatsapp = config.whatsapp || "5562999999999";

  const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } };

  return (
    <div className="min-h-screen bg-[#050508] text-white overflow-x-hidden selection:bg-[#bff720]/20" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Navbar */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] md:w-auto">
        <div className="bg-black/60 backdrop-blur-2xl border border-white/[0.06] h-14 rounded-full px-10 flex items-center gap-12 shadow-2xl">
          <img src={LogoInova} alt="Inova" className="h-5 w-auto brightness-200" />
          <Button className="rounded-full px-8 h-9 text-[9px] font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all" style={{ backgroundColor: accent, color: '#000' }}>REUNIÃO</Button>
        </div>
      </nav>

      {/* ═══════════ HERO ═══════════ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 pb-32 overflow-hidden">
        {/* Glow Effect Top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[180px] opacity-20" style={{ backgroundColor: accent }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-[300px] opacity-30" style={{ background: `linear-gradient(to bottom, ${accent}, transparent)` }} />

        <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.8, delay: 0.2 }} className="relative z-10 max-w-5xl">
          <Badge className="bg-white/5 text-white/40 border-white/[0.06] mb-10 px-8 py-2 uppercase font-black tracking-[0.5em] text-[8px] rounded-full">{h.badge}</Badge>
          <h1 className="font-black tracking-tighter leading-[1.05] uppercase italic mb-10" style={{ fontSize: `${heroSize}px` }}>{h.title}</h1>
          <p className="text-lg md:text-xl text-white/30 max-w-2xl mx-auto mb-16 font-medium leading-relaxed">{h.tagline}</p>
          <Button className="rounded-full h-16 px-14 text-base font-black uppercase italic shadow-2xl transition-all hover:scale-105 active:scale-95 group" style={{ backgroundColor: accent, color: '#000' }}>
            {h.cta} <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </Button>
        </motion.div>

        {/* Bento Preview Block */}
        <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.6 }} className="relative z-10 mt-20 w-full max-w-5xl">
          <div className="rounded-[2rem] border border-white/[0.08] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.6)] relative">
            <img src={theme.image} alt="Preview" className="w-full h-[400px] object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30 mb-2">VISUALIZAÇÃO DO PROJETO</p>
                <p className="text-2xl font-black italic uppercase tracking-tight">Moldado pela Inova.</p>
              </div>
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-white/10" />
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: accent }} />
                <div className="w-3 h-3 rounded-full bg-white/10" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Trust Bar */}
        <div className="mt-16 flex items-center gap-8 text-white/15 text-[10px] font-black uppercase tracking-[0.4em]">
          <span>CONFIADO POR +50 MARCAS</span>
          <div className="w-1 h-1 rounded-full bg-white/20" />
          <span>GOIÂNIA</span>
          <div className="w-1 h-1 rounded-full bg-white/20" />
          <span>SÃO PAULO</span>
          <div className="w-1 h-1 rounded-full bg-white/20" />
          <span>BRASÍLIA</span>
        </div>
      </section>

      {/* ═══════════ BENTO GRID 1: PROBLEMA + CONTEXTO ═══════════ */}
      <section className="max-w-7xl mx-auto px-6 pb-12">
        <motion.p initial="hidden" whileInView="visible" variants={fadeUp} className="text-[11px] font-black uppercase tracking-[0.8em] text-white/15 mb-12 italic">CONTEXTO // POR QUE VOCÊ PRECISA DISSO</motion.p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Large Left Block */}
          <motion.div initial="hidden" whileInView="visible" variants={fadeUp} className="md:col-span-2 bg-white/[0.03] border border-white/[0.06] rounded-[2rem] p-12 relative overflow-hidden group min-h-[420px] flex flex-col justify-end">
            <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity">
              <img src={ASSETS.social} alt="Redes" className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/80 to-transparent" />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter leading-[1.05] mb-6">{s.problem}</h2>
              <p className="text-white/30 text-sm font-medium leading-relaxed max-w-lg">Se o seu negócio não aparece com conteúdo profissional, ele simplesmente não entra na decisão do cliente.</p>
            </div>
          </motion.div>

          {/* Right Column: 2 stacked blocks */}
          <div className="flex flex-col gap-4">
            <motion.div initial="hidden" whileInView="visible" variants={fadeUp} transition={{ delay: 0.1 }} className="bg-white/[0.03] border border-white/[0.06] rounded-[2rem] p-8 flex-1 flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-[80px] opacity-20" style={{ backgroundColor: accent }} />
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-8" style={{ backgroundColor: `${accent}15`, color: accent }}><BarChart3 size={24} /></div>
              <div>
                <p className="text-3xl font-black italic mb-2" style={{ color: accent }}>+340%</p>
                <p className="text-white/30 text-[11px] font-bold uppercase tracking-widest">Aumento médio de engajamento</p>
              </div>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" variants={fadeUp} transition={{ delay: 0.2 }} className="bg-white/[0.03] border border-white/[0.06] rounded-[2rem] p-8 flex-1 flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full blur-[80px] opacity-20" style={{ backgroundColor: accent }} />
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-8" style={{ backgroundColor: `${accent}15`, color: accent }}><Users size={24} /></div>
              <div>
                <p className="text-3xl font-black italic mb-2" style={{ color: accent }}>+50</p>
                <p className="text-white/30 text-[11px] font-bold uppercase tracking-widest">Marcas aceleradas</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════ BENTO GRID 2: SOLUÇÃO + FOTOS ═══════════ */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <motion.p initial="hidden" whileInView="visible" variants={fadeUp} className="text-[11px] font-black uppercase tracking-[0.8em] text-white/15 mb-12 italic">SOLUÇÃO // A ESTRATÉGIA INOVA</motion.p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Left Small Block */}
          <motion.div initial="hidden" whileInView="visible" variants={fadeUp} className="bg-white/[0.03] border border-white/[0.06] rounded-[2rem] overflow-hidden relative group min-h-[380px]">
            <img src={ASSETS.editing} alt="Edição" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
            <div className="absolute bottom-8 left-8">
              <p className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-2">PÓS-PRODUÇÃO</p>
              <p className="text-xl font-black italic uppercase">Edição de Elite</p>
            </div>
          </motion.div>

          {/* Center Large Block */}
          <motion.div initial="hidden" whileInView="visible" variants={fadeUp} transition={{ delay: 0.1 }} className="bg-white/[0.03] border border-white/[0.06] rounded-[2rem] p-12 flex flex-col justify-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full blur-[100px]" style={{ backgroundColor: accent }} />
            </div>
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-10" style={{ backgroundColor: `${accent}15`, color: accent }}><Target size={28} /></div>
              <h3 className="text-3xl font-black italic uppercase tracking-tighter leading-[1.1] mb-6">{s.solution}</h3>
              <p className="text-white/25 text-sm font-medium leading-relaxed">Combinamos narrativa cinematográfica, estratégia de funil e distribuição inteligente.</p>
            </div>
          </motion.div>

          {/* Right Small Block */}
          <motion.div initial="hidden" whileInView="visible" variants={fadeUp} transition={{ delay: 0.2 }} className="bg-white/[0.03] border border-white/[0.06] rounded-[2rem] overflow-hidden relative group min-h-[380px]">
            <img src={ASSETS.team} alt="Time" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
            <div className="absolute bottom-8 left-8">
              <p className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-2">EQUIPE</p>
              <p className="text-xl font-black italic uppercase">Time Especialista</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ BENTO GRID 3: ARSENAL (6 cards) ═══════════ */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <motion.div initial="hidden" whileInView="visible" variants={fadeUp} className="text-center mb-20">
          <p className="text-[11px] font-black uppercase tracking-[0.8em] text-white/15 mb-6 italic">O QUE ENTREGAMOS // PRODUÇÃO COMPLETA</p>
          <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter">Arsenal de <span style={{ color: accent }}>Entregas</span></h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((svc: any, i: number) => {
            const icons = [Video, Camera, Zap, Lightbulb, Globe, Shield];
            const Icon = icons[i % icons.length];
            return (
              <motion.div initial="hidden" whileInView="visible" variants={fadeUp} transition={{ delay: i * 0.08 }} key={i}
                className="bg-white/[0.03] border border-white/[0.06] rounded-[2rem] p-10 group hover:border-white/[0.12] transition-all duration-500 relative overflow-hidden min-h-[260px] flex flex-col justify-between">
                <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-[100px] opacity-0 group-hover:opacity-10 transition-opacity" style={{ backgroundColor: accent }} />
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-auto" style={{ backgroundColor: `${accent}12`, color: accent }}><Icon size={24} /></div>
                <div className="mt-8">
                  <h4 className="text-xl font-black italic uppercase tracking-tight mb-3">{svc.title}</h4>
                  <p className="text-white/25 text-[12px] font-medium leading-relaxed">{svc.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ═══════════ BENTO GRID 4: RESULTADOS ═══════════ */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <motion.div initial="hidden" whileInView="visible" variants={fadeUp} className="text-center mb-20">
          <p className="text-[11px] font-black uppercase tracking-[0.8em] text-white/15 mb-6 italic">RESULTADOS // O QUE VOCÊ GANHA</p>
          <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter">Mais que <span style={{ color: accent }}>Vídeos.</span></h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Large Feature Block */}
          <motion.div initial="hidden" whileInView="visible" variants={fadeUp} className="lg:col-span-2 bg-white/[0.03] border border-white/[0.06] rounded-[2rem] overflow-hidden relative group min-h-[400px]">
            <img src={ASSETS.analytics} alt="Analytics" className="w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity group-hover:scale-105 transition-transform duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#0a0a0c] via-[#0a0a0c]/70 to-transparent" />
            <div className="absolute bottom-12 left-12 right-12 z-10">
              <p className="text-white/30 text-[10px] font-black uppercase tracking-[0.5em] mb-4">DASHBOARD DE PERFORMANCE</p>
              <h3 className="text-4xl font-black italic uppercase tracking-tighter mb-4">Métricas que importam. Não vaidade.</h3>
              <p className="text-white/25 text-sm max-w-lg">Acompanhe em tempo real o desempenho do seu conteúdo, engajamento e conversão.</p>
            </div>
          </motion.div>

          {/* Right Result Blocks */}
          <div className="flex flex-col gap-4">
            {results.slice(0, 3).map((r: string, i: number) => {
              const resultIcons = [Crown, Trophy, Flame];
              const RIcon = resultIcons[i % resultIcons.length];
              return (
                <motion.div initial="hidden" whileInView="visible" variants={fadeUp} transition={{ delay: i * 0.1 }} key={i}
                  className="bg-white/[0.03] border border-white/[0.06] rounded-[2rem] p-8 flex items-center gap-6 group hover:border-white/[0.12] transition-all flex-1">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${accent}15`, color: accent }}><RIcon size={22} /></div>
                  <div>
                    <p className="text-lg font-black italic uppercase tracking-tight">{r}</p>
                    <p className="text-white/20 text-[10px] font-bold uppercase tracking-widest mt-1">Garantido</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════ FLUXO OPERACIONAL ═══════════ */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <motion.p initial="hidden" whileInView="visible" variants={fadeUp} className="text-[11px] font-black uppercase tracking-[0.8em] text-white/15 mb-16 italic">FLUXO OPERACIONAL // COMO FUNCIONA</motion.p>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {steps.map((step: string, i: number) => (
            <motion.div initial="hidden" whileInView="visible" variants={fadeUp} transition={{ delay: i * 0.1 }} key={i}
              className="bg-white/[0.03] border border-white/[0.06] rounded-[2rem] p-8 group hover:border-white/[0.12] transition-all text-center relative overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-8 opacity-20" style={{ backgroundColor: accent }} />
              <p className="text-[48px] font-black italic opacity-10 group-hover:opacity-100 transition-opacity mb-4" style={{ color: accent }}>0{i + 1}</p>
              <p className="text-sm font-black uppercase tracking-tight italic">{step}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════════ INVESTIMENTO ═══════════ */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <motion.div initial="hidden" whileInView="visible" variants={fadeUp} className="text-center mb-20">
          <p className="text-[11px] font-black uppercase tracking-[0.8em] text-white/15 mb-6 italic">INVESTIMENTO // ESCOLHA SEU PLANO</p>
          <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter">Alocação de <span style={{ color: accent }}>Capital.</span></h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
          {plans.map((p: any, i: number) => (
            <motion.div initial="hidden" whileInView="visible" variants={fadeUp} transition={{ delay: i * 0.15 }} key={i}
              className={`bg-white/[0.03] border-2 rounded-[2.5rem] p-14 flex flex-col justify-between min-h-[600px] relative overflow-hidden group transition-all`}
              style={{ borderColor: p.popular ? accent : 'rgba(255,255,255,0.06)' }}>
              {p.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-[200px] rounded-full blur-[120px] opacity-10" style={{ backgroundColor: accent }} />
              )}
              <div className="relative z-10 space-y-10">
                <div className="flex justify-between items-start">
                  <h4 className="text-[11px] font-black uppercase tracking-[0.5em] text-white/25 italic">{p.name}</h4>
                  {p.popular && <Badge className="text-black text-[8px] font-black px-5 py-1.5 uppercase tracking-widest rounded-full" style={{ backgroundColor: accent }}>MAIS VENDIDO</Badge>}
                </div>
                <div>
                  <span className="text-white/20 text-2xl font-black italic">R$</span>
                  <span className="text-7xl md:text-8xl font-black italic tracking-tighter">{p.price}</span>
                  <span className="text-white/15 text-sm font-bold italic">/mês</span>
                </div>
                <div className="space-y-4 pt-4">
                  {(p.features || []).map((f: string, j: number) => (
                    <div key={j} className="flex items-center gap-4 text-[12px] font-bold uppercase tracking-widest text-white/35 border-b border-white/[0.04] pb-4">
                      <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: accent }} /> {f}
                    </div>
                  ))}
                </div>
              </div>
              <Button className="w-full h-16 rounded-full font-black uppercase text-base italic tracking-tight transition-all shadow-2xl mt-10 relative z-10" style={{ backgroundColor: accent, color: '#000' }}>
                INICIAR PROJETO
              </Button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════════ RODAPÉ / CTA FINAL ═══════════ */}
      <section className="py-48 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full blur-[150px] opacity-15" style={{ backgroundColor: accent }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-[120px] opacity-20" style={{ background: `linear-gradient(to bottom, transparent, ${accent})` }} />
        <motion.div initial="hidden" whileInView="visible" variants={fadeUp} className="relative z-10 space-y-16">
          <h2 className="text-7xl md:text-[120px] font-black tracking-tighter uppercase italic leading-[0.8]">VAMOS <br /><span style={{ color: accent }}>ESCALAR?</span></h2>
          <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer">
            <Button className="h-20 px-16 text-2xl font-black uppercase italic shadow-[0_0_60px_rgba(191,247,32,0.2)] transition-all hover:scale-105 rounded-full" style={{ backgroundColor: accent, color: '#000' }}>{h.cta}</Button>
          </a>
          <p className="text-[10px] font-black uppercase tracking-[1em] text-white/10 pt-20 italic">© 2026 INOVA PRODUÇÕES. MOLDANDO O FUTURO DAS MARCAS.</p>
        </motion.div>
      </section>
    </div>
  );
}
