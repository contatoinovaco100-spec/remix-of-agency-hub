import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Save, Eye, Trash2, Plus, 
  Download, Loader2 as Spinner, ChevronDown, ChevronRight, X
} from 'lucide-react';
import { toast } from 'sonner';
import LogoInova from '@/assets/logo-inova.png';
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from '@/contexts/AuthContext';

/* ═══════ DEFAULT DATA ═══════ */
const DEFAULT_DIAGNOSTIC = {
  cliente: { nome: '', nicho: '', subtitulo: '', tema: 'teal' },
  intro: { titulo: '', texto: '' },
  positivos: [],
  negativos: [],
  bio: { pos1: '', pos2: '', neg1: '', neg2: '', neg3: '' },
  final: { destaque: '', texto: '', acao1: '', acao2: '', acao3: '', acao4: '', acao5: '' },
  semanas: [
    { label: 'Semana 1', titulo: '', destaque: '', cards: [{tipo:'Alcance', titulo:'', gancho:'', estrutura:'', cta:''}, {tipo:'Conversão', titulo:'', gancho:'', estrutura:'', cta:''}] },
    { label: 'Semana 2', titulo: '', destaque: '', cards: [{tipo:'Autoridade', titulo:'', gancho:'', estrutura:'', cta:''}, {tipo:'Engajamento', titulo:'', gancho:'', estrutura:'', cta:''}] },
    { label: 'Semana 3', titulo: '', destaque: '', cards: [{tipo:'Vendas', titulo:'', gancho:'', estrutura:'', cta:''}, {tipo:'Alcance', titulo:'', gancho:'', estrutura:'', cta:''}] }
  ],
  cta: { linha1: '', linha2: '', texto: '', btnTexto: '', btnLink: '' }
};

/* ═══════ THEME COLORS ═══════ */
const THEMES: Record<string, { primary: string; primaryDark: string }> = {
  teal: { primary: '#0D6E5E', primaryDark: '#095045' },
  burgundy: { primary: '#3A0A1E', primaryDark: '#2A0616' },
  black: { primary: '#000000', primaryDark: '#111111' },
};

/* ═══════ HELPER COMPONENTS ═══════ */
const Section = ({ title, active, onClick, children }: any) => (
  <div className={`border-b border-[#2a2a2a] ${active ? 'border-l-4 border-[#bff720]' : ''}`}>
    <div onClick={onClick} className="flex items-center justify-between p-4 cursor-pointer hover:bg-[#222] transition-colors text-left">
      <h3 className={`text-[0.7rem] font-black tracking-[3px] uppercase ${active ? 'text-[#bff720]' : 'text-white/80'}`}>{title}</h3>
      {active ? <ChevronDown size={14} className="text-[#bff720]" /> : <ChevronRight size={14} className="text-white/50" />}
    </div>
    {active && <div className="p-6 bg-[#151515] space-y-4">{children}</div>}
  </div>
);

const Field = ({ label, children }: any) => (
  <div className="space-y-2">
    <label className="text-[0.6rem] font-black tracking-[2px] uppercase text-white/40 block">{label}</label>
    {children}
  </div>
);

/* ═══════ MAIN EDITOR ═══════ */
export default function DiagnosticEditorPage() {
  const { user } = useAuth();
  const [config, setConfig] = useState<any>(null);
  const [slug, setSlug] = useState('diagnostico-exemplo');
  const [isSaving, setIsSaving] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');

  useEffect(() => {
    const fetchExisting = async () => {
        const stored = localStorage.getItem('agency_diagnostic_config_v3');
        if (stored) {
            try { setConfig(JSON.parse(stored)); return; } catch (e) { console.error(e); }
        }
        setConfig(DEFAULT_DIAGNOSTIC);
    };
    fetchExisting();
  }, []);

  const handleSave = async () => {
    if (!user) { toast.error('Você precisa estar logado para salvar.'); return; }
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('diagnostics' as any)
        .upsert({
          user_id: user.id,
          slug: slug.trim().toLowerCase().replace(/\s+/g, '-'),
          title: config.cliente?.nome || 'Diagnóstico',
          config: config,
          updated_at: new Date().toISOString()
        }, { onConflict: 'slug' });

      if (error) throw error;
      localStorage.setItem('agency_diagnostic_config_v3', JSON.stringify(config));
      toast.success('Diagnóstico Publicado! 🚀');
    } catch (err: any) {
      toast.error('Erro ao salvar: ' + err.message);
    } finally { setIsSaving(false); }
  };

  const updateField = (section: string, key: string, value: any) => {
    setConfig({ ...config, [section]: { ...config[section], [key]: value } });
  };

  if (!config) return null;

  const t = (val: string, placeholder: string) => val ? val : <span className="opacity-20 italic">{placeholder}</span>;
  const theme = THEMES[config.cliente.tema] || THEMES.teal;

  return (
    <div className="flex h-screen bg-[#111] overflow-hidden w-full">
      {/* SIDEBAR EDITOR */}
      <aside className="w-[35%] h-full flex flex-col border-r border-[#2a2a2a] bg-[#111] no-print z-20">
        <header className="bg-[#0D6E5E] p-4 flex justify-between items-center shrink-0">
          <h1 className="text-[#bff720] text-xl tracking-[4px] font-black">iNØVA Co.</h1>
          <span className="text-[10px] text-white/50 font-bold uppercase tracking-widest">Editor Premium</span>
        </header>

        <div className="p-4 bg-[#1a1a1a] border-b border-[#2a2a2a] flex items-center gap-3 shrink-0 flex-wrap">
          <Button variant="outline" size="sm" className="bg-transparent border-[#333] text-white text-[10px] font-bold h-9 uppercase tracking-widest hover:bg-[#222]" onClick={() => setViewMode(viewMode === 'desktop' ? 'mobile' : 'desktop')}>
            <Eye size={14} className="mr-2" /> {viewMode === 'desktop' ? 'Mobile' : 'Desktop'}
          </Button>
          <Button variant="outline" size="sm" className="bg-transparent border-[#333] text-white text-[10px] font-bold h-9 uppercase tracking-widest hover:bg-[#222]" onClick={() => window.print()}>
            <Download size={14} className="mr-2" /> Export
          </Button>
          <Button className="ml-auto bg-[#0D6E5E] hover:bg-[#095045] text-white text-[10px] font-bold h-9 uppercase tracking-widest" onClick={handleSave} disabled={isSaving}>
            {isSaving ? <Spinner size={14} className="animate-spin" /> : <Save size={14} className="mr-2" />} Save
          </Button>
          <div className="w-full mt-2 flex items-center gap-2">
            <Label className="text-[10px] uppercase text-white/40">Slug:</Label>
            <Input className="h-7 bg-[#1e1e1e] border-[#333] text-white text-[10px]" value={slug} onChange={e => setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))} />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar">
          <Section title="Dados do Cliente" active={activeSection === 0} onClick={() => setActiveSection(0)}>
            <Field label="Nome do Perfil (@)">
              <Input className="bg-[#1e1e1e] border-[#333] text-white h-10" value={config.cliente.nome} onChange={e => updateField('cliente', 'nome', e.target.value)} placeholder="@tulumlounge" />
            </Field>
            <Field label="Segmento/Nicho">
              <Input className="bg-[#1e1e1e] border-[#333] text-white h-10" value={config.cliente.nicho} onChange={e => updateField('cliente', 'nicho', e.target.value)} placeholder="Restaurante" />
            </Field>
            <Field label="Subtítulo Hero">
              <Input className="bg-[#1e1e1e] border-[#333] text-white h-10" value={config.cliente.subtitulo} onChange={e => updateField('cliente', 'subtitulo', e.target.value)} />
            </Field>
            <Field label="Tema">
              <select className="flex h-10 w-full rounded-md border border-[#333] bg-[#1e1e1e] px-3 py-2 text-white outline-none" value={config.cliente.tema} onChange={e => updateField('cliente', 'tema', e.target.value)}>
                <option value="teal">Verde Teal</option>
                <option value="burgundy">Bordô</option>
                <option value="black">Preto</option>
              </select>
            </Field>
          </Section>

          <Section title="Introdução" active={activeSection === 1} onClick={() => setActiveSection(1)}>
            <Field label="Título">
              <Input className="bg-[#1e1e1e] border-[#333] text-white" value={config.intro.titulo} onChange={e => updateField('intro', 'titulo', e.target.value)} />
            </Field>
            <Field label="Texto">
              <textarea className="w-full bg-[#1e1e1e] border border-[#333] p-3 text-white text-sm rounded-md min-h-[100px]" value={config.intro.texto} onChange={e => updateField('intro', 'texto', e.target.value)} />
            </Field>
          </Section>

          <Section title="Pontos Negativos" active={activeSection === 2} onClick={() => setActiveSection(2)}>
             {config.negativos.map((neg: any, i: number) => (
               <div key={i} className="p-4 bg-[#1e1e1e] rounded-lg border border-[#333] relative mb-4 text-left">
                 <button onClick={() => setConfig({...config, negativos: config.negativos.filter((_:any,idx:number)=>idx!==i)})} className="absolute top-2 right-2 text-red-500/50 hover:text-red-500"><Trash2 size={12} /></button>
                 <Field label="Título">
                   <Input value={neg.titulo} onChange={e => {
                     const n = [...config.negativos]; n[i].titulo = e.target.value; setConfig({...config, negativos: n});
                   }} className="bg-[#111] border-[#2a2a2a]" />
                 </Field>
                 <div className="mt-3">
                    <Field label="Correção">
                    <textarea className="w-full bg-[#111] border border-[#2a2a2a] p-2 text-white text-xs rounded-md" value={neg.correcao} onChange={e => {
                        const n = [...config.negativos]; n[i].correcao = e.target.value; setConfig({...config, negativos: n});
                    }} />
                    </Field>
                 </div>
               </div>
             ))}
             <Button variant="ghost" className="w-full border border-dashed border-[#333] text-white/30 text-[10px] hover:text-[#bff720]" onClick={() => setConfig({...config, negativos: [...config.negativos, {titulo:'', correcao:''}]})}>
               <Plus size={14} className="mr-2" /> Add Ponto Negativo
             </Button>
          </Section>

          <Section title="Diagnóstico Final" active={activeSection === 3} onClick={() => setActiveSection(3)}>
             <Field label="Destaque">
               <Input value={config.final.destaque} onChange={e => updateField('final', 'destaque', e.target.value)} />
             </Field>
             <Field label="Resumo">
               <textarea className="w-full bg-[#1e1e1e] border border-[#333] p-3 text-white text-sm rounded-md min-h-[100px]" value={config.final.texto} onChange={e => updateField('final', 'texto', e.target.value)} />
             </Field>
             {[1,2,3,4,5].map(i => (
               <div key={i} className="mt-2">
                 <Field label={`Ação ${i}`}>
                   <Input value={config.final[`acao${i}`]} onChange={e => updateField('final', `acao${i}`, e.target.value)} />
                 </Field>
               </div>
             ))}
          </Section>

          <Section title="Plano de Ação (Semanas)" active={activeSection === 4} onClick={() => setActiveSection(4)}>
             {config.semanas.map((s: any, i: number) => (
                <div key={i} className="mb-8 border-b border-white/5 pb-8 last:border-0 text-left">
                  <h4 className="text-[10px] text-[#bff720] font-black tracking-widest mb-4">{s.label}</h4>
                   <Field label="Título Semana">
                    <Input value={s.titulo} onChange={e => {
                      const n = [...config.semanas]; n[i].titulo = e.target.value; setConfig({...config, semanas: n});
                    }} className="bg-[#1e1e1e] border-[#333]" />
                  </Field>
                  <div className="space-y-4 mt-6">
                    {s.cards.map((c: any, ci: number) => (
                      <div key={ci} className="p-4 bg-white/5 rounded-lg border border-[#333]">
                        <Label className="text-[9px] uppercase tracking-widest opacity-50 mb-2 block">Card {ci+1} ({c.tipo})</Label>
                        <Field label="Título">
                          <Input value={c.titulo} onChange={e => {
                            const n = [...config.semanas]; n[i].cards[ci].titulo = e.target.value; setConfig({...config, semanas: n});
                          }} className="bg-[#111] border-[#2a2a2a]" />
                        </Field>
                        <div className="mt-3">
                          <Field label="Gancho">
                            <textarea className="w-full bg-[#111] border border-[#2a2a2a] p-2 text-white text-xs rounded-md" value={c.gancho} onChange={e => {
                              const n = [...config.semanas]; n[i].cards[ci].gancho = e.target.value; setConfig({...config, semanas: n});
                            }} />
                          </Field>
                        </div>
                        <div className="mt-3">
                          <Field label="Estrutura">
                            <textarea className="w-full bg-[#111] border border-[#2a2a2a] p-2 text-white text-xs rounded-md" value={c.estrutura} onChange={e => {
                              const n = [...config.semanas]; n[i].cards[ci].estrutura = e.target.value; setConfig({...config, semanas: n});
                            }} />
                          </Field>
                        </div>
                        <div className="mt-3">
                          <Field label="CTA">
                            <Input value={c.cta} onChange={e => {
                              const n = [...config.semanas]; n[i].cards[ci].cta = e.target.value; setConfig({...config, semanas: n});
                            }} className="bg-[#111] border-[#2a2a2a]" />
                          </Field>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
             ))}
          </Section>
        </div>
      </aside>

      {/* PREVIEW PANEL */}
      <main className="flex-1 h-full overflow-y-auto bg-[#F5F3EE] relative">
        <div className={`mx-auto transition-all duration-500 overflow-x-hidden ${viewMode === 'mobile' ? 'max-w-[375px] my-10 border-[12px] border-black rounded-[40px] h-[812px] overflow-y-auto shadow-2xl' : 'w-full'}`}
          style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
          
          {/* PAGE 1 — HERO COVER */}
          <section className="min-h-[90vh] flex flex-col items-center justify-center text-center px-10 py-20 relative overflow-hidden" style={{ background: theme.primary }}>
            <img src={LogoInova} className="h-12 mb-20 brightness-0 invert opacity-80" alt="Inova" />
            
            {/* Black banner with DIAGNOSTICO */}
            <div className="relative w-full max-w-3xl mx-auto">
              {/* Lime star decoration */}
              <div className="absolute -left-8 -top-8 text-[#bff720] text-5xl font-black select-none" style={{ transform: 'rotate(-15deg)' }}>✳</div>
              
              <div className="bg-black px-12 py-8 inline-block w-full">
                <h1 className="text-white text-[clamp(4rem,10vw,8rem)] font-black tracking-[-2px] leading-none uppercase">
                  DIAGNÓSTICO
                </h1>
              </div>
              
              {/* Cream star decoration */}
              <div className="absolute -right-4 -bottom-4 text-[#d4c9b0] text-4xl select-none" style={{ transform: 'rotate(15deg)' }}>✳</div>
            </div>

            <div className="mt-12 space-y-2">
              <p className="text-xs font-bold text-white/60 tracking-[0.4em] uppercase">
                Diagnóstico Estratégico de Marca
              </p>
              <p className="text-sm text-white/50 tracking-[0.2em]">
                Posicionamento • Presença Digital • Autoridade • Crescimento
              </p>
            </div>
          </section>

          {/* PAGE 2 — INTRO */}
          <section className="min-h-[60vh] flex items-center px-12 lg:px-24 py-24 bg-[#F5F3EE]">
            <div className="max-w-3xl">
              <h2 className="text-3xl lg:text-4xl font-bold text-[#1a1a1a] leading-tight mb-8">
                {t(config.intro.titulo, 'Diagnóstico de Maturidade Estratégica')}
              </h2>
              <p className="text-lg text-[#555] leading-relaxed whitespace-pre-line">
                {t(config.intro.texto, 'Este diagnóstico foi desenvolvido para analisar a maturidade estratégica da marca em relação ao posicionamento, comunicação e percepção de valor no mercado.')}
              </p>
            </div>
            <div className="hidden lg:flex items-end justify-end flex-1">
              <img src={LogoInova} className="h-16 opacity-10" alt="" />
            </div>
          </section>

          {/* PAGE 3 — ANÁLISE (Pontos Positivos & Negativos) */}
          <section className="min-h-[80vh] flex items-center px-10 lg:px-16 py-20 relative overflow-hidden" style={{ background: theme.primary }}>
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-[#bff720] opacity-60 translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full opacity-60 translate-y-1/2 -translate-x-1/2" style={{ background: theme.primaryDark }} />
            <div className="absolute bottom-20 right-10 w-24 h-24 rounded-full bg-[#bff720] opacity-40" />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full relative z-10">
              {/* Left side — could show phone mockup placeholder */}
              <div className="flex items-center justify-center">
                <div className="bg-black rounded-[32px] p-3 w-[260px] shadow-2xl">
                  <div className="bg-white rounded-[24px] h-[460px] flex items-center justify-center text-sm text-gray-400 font-medium">
                    Preview do Perfil
                  </div>
                </div>
              </div>
              
              {/* Right side — analysis */}
              <div className="text-white text-left">
                <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tight leading-none mb-10">
                  Análise da<br />Presença Digital
                </h2>
                
                {config.positivos && config.positivos.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-sm font-black uppercase tracking-[3px] mb-4 text-white/90">Pontos Positivos</h3>
                    <ul className="space-y-2">
                      {config.positivos.map((p: string, i: number) => (
                        <li key={i} className="text-white/80 flex items-start gap-2">
                          <span className="text-[#bff720] mt-1">•</span> {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div>
                  <h3 className="text-sm font-black uppercase tracking-[3px] mb-4 text-white/90">Pontos Negativos</h3>
                  {config.negativos.length > 0 ? (
                    <ul className="space-y-2">
                      {config.negativos.map((n: any, i: number) => (
                        <li key={i} className="text-white/80 flex items-start gap-2">
                          <span className="text-[#bff720] mt-1">•</span> 
                          <div>
                            <span className="font-semibold">{n.titulo}</span>
                            {n.correcao && <p className="text-[#bff720] text-sm mt-1 italic">→ {n.correcao}</p>}
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-white/30 italic">Nenhum ponto negativo adicionado.</p>
                  )}
                </div>
              </div>
            </div>
            
            <img src={LogoInova} className="absolute bottom-6 right-8 h-10 opacity-20 brightness-0 invert" alt="" />
          </section>

          {/* PAGE 6 — DIAGNÓSTICO FINAL */}
          <section className="min-h-[70vh] flex flex-col items-center justify-center text-center px-8 py-24" style={{ background: theme.primary }}>
            <h2 className="text-5xl lg:text-7xl font-black uppercase text-white tracking-tight leading-none mb-4">
              Diagnóstico Final
            </h2>
            {config.final.destaque && (
              <h3 className="text-3xl lg:text-4xl font-black uppercase text-[#bff720] mb-12">
                {config.final.destaque}
              </h3>
            )}
            <p className="max-w-3xl text-xl text-white/80 leading-relaxed">
              {t(config.final.texto, '[Resumo estratégico final]')}
            </p>
            
            {/* Action items */}
            <div className="max-w-2xl w-full mt-16 space-y-3 text-left">
              {[1,2,3,4,5].map(i => config.final[`acao${i}`] ? (
                <div key={i} className="bg-white/5 border border-white/10 px-6 py-4 flex items-center gap-4">
                  <span className="text-xs font-black text-white/30">{String(i).padStart(2, '0')}</span>
                  <p className="font-bold uppercase tracking-wider text-sm text-white flex-1">{config.final[`acao${i}`]}</p>
                </div>
              ) : null)}
            </div>
          </section>

          {/* PAGE 7 — PLANO DE AÇÃO COVER */}
          <section className="min-h-[70vh] flex flex-col items-center justify-center text-center px-10 py-20 bg-[#3A0A1E] relative overflow-hidden">
            <img src={LogoInova} className="h-12 mb-16 brightness-0 invert opacity-80" alt="Inova" />
            
            <div className="relative w-full max-w-3xl mx-auto">
              <div className="absolute -left-6 bottom-0 text-[#0D6E5E] text-5xl select-none" style={{ transform: 'rotate(-15deg)' }}>✳</div>
              
              <div className="bg-[#F5F3EE] px-12 py-8 inline-block w-full">
                <h1 className="text-black text-[clamp(3rem,8vw,6rem)] font-black tracking-[-2px] leading-none uppercase">
                  Plano de Ação
                </h1>
              </div>
              
              <div className="absolute -right-4 -top-6 text-black text-4xl select-none" style={{ transform: 'rotate(15deg)' }}>✳</div>
            </div>
          </section>

          {/* PAGE 8 — 4 PILARES */}
          <section className="px-8 lg:px-16 py-24 bg-[#F5F3EE] text-center">
            <p className="text-lg lg:text-xl text-[#333] leading-relaxed max-w-4xl mx-auto mb-16">
              A estratégia será conduzida através de um modelo estruturado em quatro pilares que sustentam o crescimento estratégico da marca.
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Posicionamento', color: '#3A0A1E' },
                { label: 'Autoridade', color: '#0D6E5E' },
                { label: 'Presença Digital', color: '#000000' },
                { label: 'Conversão', color: '#bff720', textColor: '#3A0A1E' },
              ].map((p, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-full aspect-[3/4] flex items-center justify-center rounded-t-2xl text-white text-xs font-black uppercase tracking-[2px]" 
                    style={{ background: p.color, color: p.textColor || '#fff' }}>
                    {p.label}
                  </div>
                </div>
              ))}
            </div>
            <img src={LogoInova} className="h-10 opacity-10 mx-auto mt-12" alt="" />
          </section>

          {/* PAGES 9-11 — SEMANAS */}
          {config.semanas.map((s: any, i: number) => (
            <section key={i} className="px-8 lg:px-16 py-20 bg-[#F5F3EE] border-t border-[#e0dcd4] relative overflow-hidden">
              {/* Decorative circles */}
              <div className="absolute top-0 left-0 w-32 h-32 rounded-full bg-black opacity-10 -translate-x-1/2 -translate-y-1/3" />
              <div className="absolute bottom-0 right-0 w-40 h-40 rounded-full bg-[#3A0A1E] opacity-10 translate-x-1/4 translate-y-1/4" />
              <div className="absolute top-10 right-10 w-20 h-20 rounded-full bg-[#F5E6C8] opacity-40" />
              
              <div className="relative z-10">
                {/* Week header */}
                <div className="text-center mb-12">
                  <h2 className="text-4xl lg:text-5xl font-light text-[#3A0A1E] uppercase tracking-tight">
                    {s.label} | <span className="font-black">{t(s.titulo, s.cards.map((c: any) => c.tipo).join(' – '))}</span>
                  </h2>
                </div>

                {/* Content cards inside a "tablet" frame */}
                <div className="bg-white rounded-2xl border-4 border-[#3A0A1E] shadow-2xl p-6 lg:p-10 max-w-4xl mx-auto">
                  <h3 className="text-lg font-bold text-[#1a1a1a] mb-6 border-b border-gray-100 pb-4">
                    {s.cards.map((c: any) => c.tipo).join(' + ')}
                  </h3>

                  <div className="space-y-8">
                    {s.cards.map((c: any, ci: number) => (
                      <div key={ci}>
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ 
                            background: ci === 0 ? '#E8F4E8' : '#FFF3E0', 
                            color: ci === 0 ? '#2E7D32' : '#E65100' 
                          }}>
                            {c.tipo}
                          </span>
                          <span className="text-sm font-semibold text-[#1a1a1a]">{t(c.titulo, '[Título do conteúdo]')}</span>
                        </div>

                        <div className="grid grid-cols-2 gap-6 mb-3">
                          <div>
                            <h4 className="text-xs font-black uppercase tracking-widest text-[#333] mb-2">Gancho</h4>
                            <p className="text-sm text-[#555] leading-relaxed">{t(c.gancho, '[Gancho do vídeo]')}</p>
                          </div>
                          <div>
                            <h4 className="text-xs font-black uppercase tracking-widest text-[#333] mb-2">Estrutura</h4>
                            <p className="text-sm text-[#555] leading-relaxed">{t(c.estrutura, '[Estrutura do conteúdo]')}</p>
                          </div>
                        </div>

                        <div className="bg-[#F5F3EE] rounded-lg px-5 py-3 border border-[#e8e4dc]">
                          <h4 className="text-xs font-black uppercase tracking-widest text-[#333] mb-1">CTA</h4>
                          <p className="text-sm text-[#555]">{t(c.cta, '[Call to action]')}</p>
                        </div>

                        {ci < s.cards.length - 1 && <div className="h-px bg-gray-100 my-6" />}
                      </div>
                    ))}
                  </div>
                </div>

                <img src={LogoInova} className="h-10 opacity-10 mx-auto mt-10" alt="" />
              </div>
            </section>
          ))}

          {/* FOOTER / CLOSING */}
          <section className="min-h-[60vh] flex flex-col items-center justify-center bg-[#3A0A1E]">
            <img src={LogoInova} className="h-32 lg:h-48 brightness-0 invert opacity-40" alt="Inova" />
          </section>
        </div>
      </main>

      {/* Floating Status */}
      <div className="fixed bottom-6 left-6 z-50 bg-black/80 backdrop-blur-md text-white px-4 py-3 rounded-xl border border-white/10 flex items-center gap-3 shadow-2xl print:hidden">
        <div className="w-8 h-8 rounded-full bg-[#bff720] flex items-center justify-center text-black shadow-lg"><Eye size={16} /></div>
        <div className="text-[10px] uppercase font-bold tracking-wider text-left">
           <p className="text-[#bff720] mb-0.5">Modo Edição Ativo</p>
           <p className="opacity-60">Preview em tempo real</p>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          .no-print { display: none !important; }
          section { page-break-after: always; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
}
