import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { Loader2 as Spinner, CheckCircle2 } from 'lucide-react';
import LogoInova from '@/assets/logo-inova.png';

/* ═══════ THEME COLORS ═══════ */
const THEMES: Record<string, { primary: string; primaryDark: string }> = {
  teal: { primary: '#0D6E5E', primaryDark: '#095045' },
  burgundy: { primary: '#3A0A1E', primaryDark: '#2A0616' },
  black: { primary: '#000000', primaryDark: '#111111' },
};

export default function DiagnosticLP() {
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [config, setConfig] = useState<any>(null);

  useEffect(() => {
    const fetchDiagnostic = async () => {
      try {
        if (slug) {
          const { data, error } = await supabase
            .from('diagnostics' as any)
            .select('*')
            .eq('slug', slug)
            .maybeSingle();
          
          if (data && (data as any).config) {
            setConfig((data as any).config);
            setLoading(false);
            return;
          }
        }
        const saved = localStorage.getItem('agency_diagnostic_config_v3');
        if (saved) { setConfig(JSON.parse(saved)); }
      } catch (err) {
        console.error('Erro ao buscar diagnóstico:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDiagnostic();
  }, [slug]);

  if (loading) return (
    <div className="flex h-screen w-full items-center justify-center bg-[#F5F3EE]">
      <Spinner className="h-8 w-8 animate-spin text-[#0D6E5E]" />
    </div>
  );
  if (!config) return (
    <div className="flex h-screen w-full items-center justify-center bg-[#F5F3EE] text-center p-6 text-gray-800">
      <div>
        <h1 className="text-2xl font-bold text-[#3A0A1E] mb-4">Diagnóstico não encontrado</h1>
        <p className="opacity-50">O link que você seguiu pode estar quebrado ou o diagnóstico foi removido.</p>
      </div>
    </div>
  );

  const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } };
  const theme = THEMES[config.cliente?.tema] || THEMES.teal;

  return (
    <div className="min-h-screen bg-[#F5F3EE] overflow-x-hidden selection:bg-[#bff720] selection:text-black text-left"
      style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>

      {/* PAGE 1 — HERO COVER */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-10 py-20 relative overflow-hidden" style={{ background: theme.primary }}>
        <motion.img initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} 
          src={LogoInova} className="h-12 mb-24 brightness-0 invert opacity-80" alt="Inova" />
        
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}
          className="relative w-full max-w-4xl mx-auto">
          <div className="absolute -left-10 -top-10 text-[#bff720] text-6xl font-black select-none" style={{ transform: 'rotate(-15deg)' }}>✳</div>
          
          <div className="bg-black px-12 py-10 inline-block w-full">
            <h1 className="text-white text-[clamp(5rem,12vw,10rem)] font-black tracking-[-3px] leading-none uppercase">
              DIAGNÓSTICO
            </h1>
          </div>
          
          <div className="absolute -right-6 -bottom-6 text-[#d4c9b0] text-5xl select-none" style={{ transform: 'rotate(15deg)' }}>✳</div>
        </motion.div>

        <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.5 }}
          className="mt-16 space-y-3">
          <p className="text-xs font-bold text-white/60 tracking-[0.5em] uppercase">
            Diagnóstico Estratégico de Marca
          </p>
          <p className="text-sm text-white/40 tracking-[0.2em]">
            Posicionamento • Presença Digital • Autoridade • Crescimento
          </p>
        </motion.div>
      </section>

      {/* PAGE 2 — INTRO */}
      <section className="min-h-[70vh] flex items-center px-8 lg:px-24 py-32 bg-[#F5F3EE]">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="max-w-3xl">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#1a1a1a] leading-tight mb-8">
            {config.intro?.titulo || 'Diagnóstico de Maturidade Estratégica'}
          </h2>
          <p className="text-lg text-[#555] leading-[1.8] whitespace-pre-line">
            {config.intro?.texto || 'Este diagnóstico foi desenvolvido para analisar a maturidade estratégica da marca.'}
          </p>
        </motion.div>
        <div className="hidden lg:flex items-end justify-end flex-1">
          <img src={LogoInova} className="h-16 opacity-10" alt="" />
        </div>
      </section>

      {/* PAGE 3 — ANÁLISE DA PRESENÇA DIGITAL */}
      <section className="min-h-screen flex items-center px-8 lg:px-16 py-24 relative overflow-hidden" style={{ background: theme.primary }}>
        <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-[#bff720] opacity-50 translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full opacity-50 translate-y-1/3 -translate-x-1/3" style={{ background: theme.primaryDark }} />
        <div className="absolute bottom-20 right-10 w-28 h-28 rounded-full bg-[#bff720] opacity-30" />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 w-full relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="flex items-center justify-center">
            <div className="bg-black rounded-[40px] p-4 w-[280px] shadow-2xl">
              <div className="bg-white rounded-[28px] h-[500px] flex items-center justify-center text-sm text-gray-400 font-medium">
                Preview do Perfil
              </div>
            </div>
          </motion.div>
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.2 }}
            className="text-white text-left">
            <h2 className="text-4xl lg:text-6xl font-black uppercase tracking-tight leading-none mb-12">
              Análise da<br />Presença Digital
            </h2>
            
            {config.negativos && config.negativos.length > 0 && (
              <div>
                <h3 className="text-sm font-black uppercase tracking-[3px] mb-6 text-white/90">Pontos Negativos</h3>
                <div className="space-y-6">
                  {config.negativos.map((n: any, i: number) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                      <p className="text-white/80 font-semibold mb-1 flex items-start gap-2">
                        <span className="text-[#bff720] mt-0.5">•</span> {n.titulo}
                      </p>
                      {n.correcao && (
                        <p className="text-[#bff720] text-sm italic ml-5">→ {n.correcao}</p>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
        
        <img src={LogoInova} className="absolute bottom-8 right-10 h-12 opacity-20 brightness-0 invert" alt="" />
      </section>

      {/* PAGE 6 — DIAGNÓSTICO FINAL */}
      <section className="min-h-[80vh] flex flex-col items-center justify-center text-center px-8 py-32" style={{ background: theme.primary }}>
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-5xl lg:text-7xl font-black uppercase text-white tracking-tight leading-none mb-6">
            Diagnóstico Final
          </h2>
          {config.final?.destaque && (
            <h3 className="text-3xl lg:text-4xl font-black uppercase text-[#bff720] mb-16">
              {config.final.destaque}
            </h3>
          )}
          
          <p className="max-w-3xl mx-auto text-xl text-white/80 leading-relaxed mb-16">
            {config.final?.texto}
          </p>
          
          <div className="max-w-[800px] mx-auto text-left grid gap-4">
            {[1,2,3,4,5].map(i => config.final?.[`acao${i}`] ? (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="group bg-white/5 border border-white/10 p-6 flex items-center gap-6 hover:bg-[#bff720] hover:text-black transition-all">
                <span className="font-black text-xs opacity-40 group-hover:text-black">{String(i).padStart(2, '0')}</span>
                <p className="font-bold uppercase tracking-widest text-sm text-white group-hover:text-black flex-1">{config.final[`acao${i}`]}</p>
                <CheckCircle2 size={18} className="text-[#bff720] group-hover:text-black" />
              </motion.div>
            ) : null)}
          </div>
        </motion.div>
      </section>

      {/* PAGE 7 — PLANO DE AÇÃO COVER */}
      <section className="min-h-[80vh] flex flex-col items-center justify-center text-center px-10 py-20 bg-[#3A0A1E] relative overflow-hidden">
        <motion.img initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          src={LogoInova} className="h-12 mb-20 brightness-0 invert opacity-80" alt="Inova" />
        
        <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="relative w-full max-w-4xl mx-auto">
          <div className="absolute -left-8 bottom-0 text-[#0D6E5E] text-6xl select-none" style={{ transform: 'rotate(-15deg)' }}>✳</div>
          
          <div className="bg-[#F5F3EE] px-12 py-10 inline-block w-full">
            <h1 className="text-black text-[clamp(4rem,10vw,8rem)] font-black tracking-[-3px] leading-none uppercase">
              Plano de Ação
            </h1>
          </div>
          
          <div className="absolute -right-4 -top-8 text-black text-5xl select-none" style={{ transform: 'rotate(15deg)' }}>✳</div>
        </motion.div>
      </section>

      {/* PAGE 8 — PILARES */}
      <section className="px-8 lg:px-16 py-32 bg-[#F5F3EE] text-center">
        <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="text-lg lg:text-xl text-[#333] leading-relaxed max-w-4xl mx-auto mb-20">
          A estratégia será conduzida através de um modelo estruturado em quatro pilares que sustentam o crescimento estratégico da marca.
        </motion.p>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {[
            { label: 'Posicionamento', color: '#3A0A1E' },
            { label: 'Autoridade', color: '#0D6E5E' },
            { label: 'Presença Digital', color: '#000000' },
            { label: 'Conversão', color: '#bff720', textColor: '#3A0A1E' },
          ].map((p, i) => (
            <div key={i} className="w-full aspect-[3/4] flex items-center justify-center rounded-t-2xl text-xs font-black uppercase tracking-[2px] shadow-lg" 
              style={{ background: p.color, color: p.textColor || '#fff' }}>
              {p.label}
            </div>
          ))}
        </motion.div>
        <img src={LogoInova} className="h-12 opacity-10 mx-auto mt-16" alt="" />
      </section>

      {/* PAGES 9-11 — WEEK PLANS */}
      {config.semanas && config.semanas.map((s: any, i: number) => (
        <section key={i} className="px-8 lg:px-16 py-24 bg-[#F5F3EE] border-t border-[#e0dcd4] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-40 h-40 rounded-full bg-black opacity-10 -translate-x-1/2 -translate-y-1/3" />
          <div className="absolute bottom-0 right-0 w-48 h-48 rounded-full bg-[#3A0A1E] opacity-10 translate-x-1/4 translate-y-1/4" />
          <div className="absolute top-12 right-12 w-24 h-24 rounded-full bg-[#F5E6C8] opacity-50" />
          
          <div className="relative z-10">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="text-center mb-16">
              <h2 className="text-4xl lg:text-6xl font-light text-[#3A0A1E] uppercase tracking-tight">
                {s.label} | <span className="font-black">{s.titulo || s.cards.map((c: any) => c.tipo).join(' – ')}</span>
              </h2>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl border-4 border-[#3A0A1E] shadow-2xl p-8 lg:p-12 max-w-5xl mx-auto">
              <h3 className="text-lg font-bold text-[#1a1a1a] mb-8 border-b border-gray-100 pb-4">
                {s.cards.map((c: any) => c.tipo).join(' + ')}
              </h3>

              <div className="space-y-10">
                {s.cards.map((c: any, ci: number) => (
                  <motion.div key={ci} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: ci * 0.15 }}>
                    <div className="flex items-center gap-4 mb-5">
                      <span className="text-xs font-bold px-4 py-1.5 rounded-full" style={{ 
                        background: ci === 0 ? '#E8F4E8' : '#FFF3E0', 
                        color: ci === 0 ? '#2E7D32' : '#E65100' 
                      }}>
                        {c.tipo}
                      </span>
                      <span className="text-base font-semibold text-[#1a1a1a]">{c.titulo}</span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-4">
                      <div>
                        <h4 className="text-xs font-black uppercase tracking-widest text-[#333] mb-3">Gancho</h4>
                        <p className="text-sm text-[#555] leading-relaxed">{c.gancho}</p>
                      </div>
                      <div>
                        <h4 className="text-xs font-black uppercase tracking-widest text-[#333] mb-3">Estrutura</h4>
                        <p className="text-sm text-[#555] leading-relaxed">{c.estrutura}</p>
                      </div>
                    </div>

                    <div className="bg-[#F5F3EE] rounded-lg px-6 py-4 border border-[#e8e4dc]">
                      <h4 className="text-xs font-black uppercase tracking-widest text-[#333] mb-1">CTA</h4>
                      <p className="text-sm text-[#555]">{c.cta}</p>
                    </div>

                    {ci < s.cards.length - 1 && <div className="h-px bg-gray-100 my-8" />}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <img src={LogoInova} className="h-12 opacity-10 mx-auto mt-12" alt="" />
          </div>
        </section>
      ))}

      {/* CLOSING PAGE */}
      <section className="min-h-[70vh] flex flex-col items-center justify-center bg-[#3A0A1E]">
        <motion.img initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}
          src={LogoInova} className="h-32 lg:h-48 brightness-0 invert opacity-50" alt="Inova" />
      </section>
    </div>
  );
}
