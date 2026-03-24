import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Save, Eye, Trash2, Plus, 
  Download, Loader2 as Spinner, ChevronDown, ChevronRight, X, Link as LinkIcon,
  CheckCircle2, AlertCircle, ArrowRight, ArrowLeft, Sparkles, Target, Zap, TrendingUp
} from 'lucide-react';
import { toast } from 'sonner';
import LogoInova from '@/assets/logo-inova.png';
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from '@/contexts/AuthContext';
import { DIAGNOSTIC_RULES, DiagnosticRule } from '@/data/diagnosticRules';

/* ═══════ THEME COLORS ═══════ */
const THEMES: Record<string, { primary: string; primaryDark: string }> = {
  teal: { primary: '#0D6E5E', primaryDark: '#095045' },
  burgundy: { primary: '#3A0A1E', primaryDark: '#2A0616' },
  black: { primary: '#000000', primaryDark: '#111111' },
};

/* ═══════ HELPER COMPONENTS ═══════ */
const ScoreBar = ({ label, percentage, color }: any) => (
  <div className="space-y-1">
    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-white/60">
      <span>{label}</span>
      <span>{Math.round(percentage)}%</span>
    </div>
    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
      <div 
        className="h-full transition-all duration-1000" 
        style={{ width: `${percentage}%`, backgroundColor: color }} 
      />
    </div>
  </div>
);

/* ═══════ MAIN EDITOR ═══════ */
export default function DiagnosticEditorPage() {
  const { user } = useAuth();
  const [step, setStep] = useState<'setup' | 'wizard' | 'preview'>('setup');
  const [wizardStep, setWizardStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [clientInfo, setClientInfo] = useState({ nome: '', nicho: '', subtitulo: 'Diagnóstico de Maturidade Estratégica', tema: 'teal' });
  const [slug, setSlug] = useState('');
  const [config, setConfig] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');

  useEffect(() => {
    const fetchExisting = async () => {
        const stored = localStorage.getItem('agency_diagnostic_config_v4');
        if (stored) {
            try { 
              const data = JSON.parse(stored);
              setConfig(data); 
              setClientInfo(data.cliente);
              setStep('preview');
              return; 
            } catch (e) { console.error(e); }
        }
    };
    fetchExisting();
  }, []);

  const generateReport = (currentAnswers: Record<string, string> = answers) => {
    let positivos: string[] = [];
    let negativos: string[] = [];
    let actions: string[] = [];
    let catScores: Record<string, number> = { posicionamento: 0, presenca: 0, autoridade: 0, conversao: 0 };
    
    DIAGNOSTIC_RULES.forEach(rule => {
      const answer = currentAnswers[rule.id];
      const l = rule.logic[answer];
      if (l) {
        catScores[rule.category] += l.score;
        if (l.insight) {
          if (l.isPositive) positivos.push(l.insight);
          else negativos.push(l.insight);
        }
        if (l.action) actions.push(l.action);
      }
    });

    const newConfig = {
      cliente: clientInfo,
      intro: { 
        titulo: 'Diagnóstico de Maturidade Estratégica', 
        texto: `Este diagnóstico detalha a maturidade atual da marca @${clientInfo.nome.replace('@','')} no ecossistema digital, identificando gargalos e oportunidades de escala imediata.` 
      },
      positivos,
      negativos,
      scores: catScores,
      final: {
        destaque: generateDestaque(catScores),
        texto: generateFinalSummary(catScores, currentAnswers),
        acao1: actions[0] || 'Estruturar posicionamento único.',
        acao2: actions[1] || 'Otimizar linha editorial para conversão.',
        acao3: actions[2] || 'Implementar prova social constante.',
        acao4: actions[3] || 'Aumentar frequência estratégica.',
        acao5: actions[4] || 'Refinar CTA e Oferta única.'
      },
      semanas: [
        { label: 'Semana 1', titulo: 'Autoridade e Alcance', cards: [{tipo:'Autoridade', titulo:'Prova Social Extraordinária', gancho:'Resultados REAIS', estrutura:'Storytelling + Print do Resultado', cta:'Mande "EU QUERO" no direct'}, {tipo:'Alcance', titulo:'Topo de Funil Viral', gancho:'Desejo Instantâneo', estrutura:'Vídeo Curto + Música Trend', cta:'Curta e segue para mais'}] },
        { label: 'Semana 2', titulo: 'Engajamento e Conexão', cards: [{tipo:'Engajamento', titulo:'Bastidores e Narrativa', gancho:'Vulnerabilidade Controlada', estrutura:'Relato Pessoal + Aprendizado', cta:'Qual sua opinião?'}, {tipo:'Conversão', titulo:'Exposição da Oferta', gancho:'Problema vs Solução', estrutura:'Apresentação do Produto + Garantia', cta:'Link na Bio'}] },
        { label: 'Semana 3', titulo: 'Conversão e Vendas', cards: [{tipo:'Vendas', titulo:'Chamada Direta', gancho:'Últimas Vagas', estrutura:'Checklist de Benefícios', cta:'Clique agora'}, {tipo:'Alcance', titulo:'Transbordagem', gancho:'Collab ou Mídia Paga', estrutura:'Anúncio de Convite', cta:'Saiba Mais'}] }
      ]
    };

    setConfig(newConfig);
    setStep('preview');
    localStorage.setItem('agency_diagnostic_config_v4', JSON.stringify(newConfig));
    if (!slug) setSlug(clientInfo.nome.toLowerCase().replace(/\s+/g, '-').replace('@',''));
  };

  const generateDestaque = (s: Record<string, number>) => {
    const avg = (s.posicionamento + s.presenca + s.autoridade + s.conversao) / 4;
    if (avg > 85) return "Maturidade Nível Escala";
    if (avg > 60) return "Crescimento Acelerado";
    if (avg > 40) return "Potencial de Ajuste";
    return "Reestruturação Urgente";
  };

  const generateFinalSummary = (s: Record<string, number>, a: any) => {
    if (s.posicionamento < 50) return "Atualmente o perfil apresenta falhas graves de posicionamento, o que impede a comunicação de atrair o público correto e cobrar o valor justo.";
    if (s.conversao < 50) return "O perfil tem um bom conteúdo e autoridade, mas falha no momento crucial da conversão, perdendo muitas vendas acumuladas no direct.";
    return "Marca com excelente maturidade estratégica, pronta para investir em tráfego pago e escalar o faturamento através de otimização de funil.";
  };

  const handleSave = async () => {
    if (!user) { toast.error('Você precisa estar logado para salvar.'); return; }
    setIsSaving(true);
    try {
      const currentSlug = slug || clientInfo.nome.toLowerCase().replace(/\s+/g, '-').replace('@','');
      const { error } = await supabase
        .from('diagnostics' as any)
        .upsert({
          user_id: user.id,
          slug: currentSlug.trim().toLowerCase(),
          title: config.cliente?.nome || 'Diagnóstico',
          config: config,
          updated_at: new Date().toISOString()
        }, { onConflict: 'slug' });

      if (error) throw error;
      toast.success('Diagnóstico Publicado! 🚀');
    } catch (err: any) {
      toast.error('Erro ao salvar: ' + err.message);
    } finally { setIsSaving(false); }
  };

  const renderSetup = () => (
    <div className="flex-1 flex flex-col items-center justify-center p-8 bg-[#0a0a0a] animate-in fade-in zoom-in duration-500">
        <div className="max-w-md w-full space-y-10 text-center">
            <div className="relative inline-block">
                <div className="absolute -inset-4 bg-[#bff720]/20 blur-xl rounded-full" />
                <div className="relative p-6 rounded-3xl bg-white/5 border border-white/10 text-[#bff720]">
                    <Target size={48} />
                </div>
            </div>

            <div className="space-y-2">
                <h1 className="text-3xl font-black uppercase tracking-tighter text-white">Novo Diagnóstico</h1>
                <p className="text-white/40 text-sm">A IA da Inova vai gerar uma estratégia personalizada em minutos.</p>
            </div>

            <div className="space-y-4 text-left">
                <div className="space-y-1.5">
                    <Label className="text-[10px] font-black uppercase tracking-[3px] text-white/40 ml-1">Nome do Cliente (@)</Label>
                    <Input className="h-14 bg-white/5 border-white/10 text-white rounded-2xl focus:border-[#bff720]/50 transition-all text-lg" placeholder="@perfil.exemplo" value={clientInfo.nome} onChange={e => setClientInfo({...clientInfo, nome: e.target.value})} />
                </div>
                <div className="space-y-1.5">
                    <Label className="text-[10px] font-black uppercase tracking-[3px] text-white/40 ml-1">Nicho / Especialidade</Label>
                    <Input className="h-14 bg-white/5 border-white/10 text-white rounded-2xl focus:border-[#bff720]/50 transition-all text-lg" placeholder="Ex: Estética Avançada" value={clientInfo.nicho} onChange={e => setClientInfo({...clientInfo, nicho: e.target.value})} />
                </div>
            </div>

            <Button 
                disabled={!clientInfo.nome || !clientInfo.nicho}
                onClick={() => setStep('wizard')}
                className="w-full h-16 bg-[#bff720] hover:bg-[#aee61d] text-black font-black uppercase tracking-[3px] rounded-2xl shadow-2xl shadow-[#bff720]/10 text-md"
            >
                Começar Análise <ArrowRight size={20} className="ml-2" />
            </Button>
        </div>
    </div>
  );

  const renderWizard = () => {
    const currentRule = DIAGNOSTIC_RULES[wizardStep];
    const progress = ((wizardStep + 1) / DIAGNOSTIC_RULES.length) * 100;

    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-[#0a0a0a] animate-in slide-in-from-right duration-500">
        <div className="max-w-xl w-full space-y-12">
          {/* Progress Header */}
          <div className="space-y-4">
            <div className="flex justify-between items-end">
                <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-[4px] text-[#bff720]">Fase de Coleta</span>
                    <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest">{currentRule.category}</h3>
                </div>
                <span className="text-2xl font-black text-white/80">{Math.round(progress)}%</span>
            </div>
            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-[#bff720] transition-all duration-700 shadow-[0_0_20px_rgba(191,247,32,0.3)]" style={{ width: `${progress}%` }} />
            </div>
          </div>

          {/* Question card */}
          <div className="space-y-8 bg-white/5 p-10 rounded-[40px] border border-white/5 shadow-2xl">
            <h2 className="text-2xl lg:text-3xl font-bold text-white leading-tight tracking-tight">
              {currentRule.question}
            </h2>

            <div className="grid gap-4">
              {currentRule.options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    const newAnswers = { ...answers, [currentRule.id]: opt };
                    setAnswers(newAnswers);
                    if (wizardStep < DIAGNOSTIC_RULES.length - 1) {
                        setWizardStep(wizardStep + 1);
                    } else {
                        generateReport(newAnswers);
                    }
                  }}
                  className={`flex items-center justify-between p-6 rounded-2xl border-2 transition-all duration-300 text-left group ${
                    answers[currentRule.id] === opt 
                      ? 'border-[#bff720] bg-[#bff720]/10 text-white' 
                      : 'border-white/5 bg-white/5 text-white/40 hover:border-white/20 hover:text-white'
                  }`}
                >
                  <span className="font-bold text-lg">{opt}</span>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                      answers[currentRule.id] === opt ? 'bg-[#bff720] border-[#bff720]' : 'border-white/10 group-hover:border-white/30'
                  }`}>
                      {answers[currentRule.id] === opt && <CheckCircle2 size={14} className="text-black" />}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center px-4">
            <Button 
                variant="ghost" 
                className="text-white/20 hover:text-white transition-colors uppercase font-black tracking-[2px] text-[10px]" 
                disabled={wizardStep === 0}
                onClick={() => setWizardStep(wizardStep - 1)}
            >
              <ArrowLeft size={14} className="mr-2" /> Anterior
            </Button>
            {answers[currentRule.id] && (
               <Button 
                variant="ghost" 
                className="text-[#bff720] hover:text-[#bff720]/80 uppercase font-black tracking-[2px] text-[10px]"
                onClick={() => {
                    if (wizardStep < DIAGNOSTIC_RULES.length - 1) setWizardStep(wizardStep + 1);
                    else generateReport();
                }}
               >
                 Próximo <ArrowRight size={14} className="ml-2" />
               </Button>
            )}
          </div>
        </div>
      </div>
    );
  };

  if (step === 'setup') return renderSetup();
  if (step === 'wizard') return renderWizard();

  // PREVIEW MODE
  const theme = THEMES[clientInfo.tema] || THEMES.teal;
  const t = (val: string, placeholder: string) => val ? val : <span className="opacity-20 italic">{placeholder}</span>;

  return (
    <div className="flex h-screen bg-[#111] overflow-hidden w-full">
      {/* SIDEBAR EDITOR */}
      <aside className="w-[350px] h-full flex flex-col border-r border-[#2a2a2a] bg-[#111] no-print z-20 shrink-0">
        <header className="bg-[#0D6E5E] p-6 flex justify-between items-center shrink-0">
          <img src={LogoInova} className="h-6" alt="Inova" />
          <span className="text-[9px] text-[#bff720] font-black uppercase tracking-[3px]">Estratégico</span>
        </header>

        <div className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar">
          {config && (
            <div className="space-y-8 animate-in slide-in-from-left duration-700">
               <div className="space-y-4">
                  <h3 className="text-[10px] font-black uppercase tracking-[4px] text-[#bff720]">Radar Estratégico</h3>
                  <div className="grid gap-5 bg-white/5 p-6 rounded-[32px] border border-white/5">
                    <ScoreBar label="Posicionamento" percentage={config.scores.posicionamento} color="#bff720" />
                    <ScoreBar label="Presença Digital" percentage={config.scores.presenca} color="#0D6E5E" />
                    <ScoreBar label="Autoridade" percentage={config.scores.autoridade} color="#d4c9b0" />
                    <ScoreBar label="Conversão" percentage={config.scores.conversao} color="#3A0A1E" />
                  </div>
               </div>

               <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[10px] font-black uppercase tracking-[4px] text-white/40">Controle</h3>
                    <Button variant="ghost" size="sm" className="h-6 text-[9px] uppercase font-bold text-[#bff720]" onClick={() => setStep('wizard')}>Reiniciar</Button>
                  </div>
                  <div className="grid gap-2">
                    <Button className="bg-[#bff720] hover:bg-[#aee61d] text-black text-[10px] font-black h-12 uppercase tracking-widest rounded-xl transition-all active:scale-95" onClick={handleSave} disabled={isSaving}>
                        {isSaving ? <Spinner size={14} className="mr-3 animate-spin" /> : <Save size={16} className="mr-3" />} Publicar Link
                    </Button>
                    <div className="grid grid-cols-2 gap-2">
                        <Button variant="outline" className="bg-transparent border-white/10 text-white text-[9px] font-black h-10 uppercase tracking-widest rounded-xl hover:bg-white/5" onClick={() => window.print()}>
                            <Download size={14} className="mr-2" /> PDF
                        </Button>
                        <Button variant="outline" className="bg-transparent border-white/10 text-white text-[9px] font-black h-10 uppercase tracking-widest rounded-xl hover:bg-white/5" onClick={() => setViewMode(viewMode === 'desktop' ? 'mobile' : 'desktop')}>
                            <Eye size={14} className="mr-2" /> {viewMode === 'desktop' ? 'Mobi' : 'Desk'}
                        </Button>
                    </div>
                  </div>
               </div>

               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase tracking-[4px] text-white/40 ml-1">Configurações</h3>
                  <div className="space-y-4 bg-white/5 p-5 rounded-2xl border border-white/5">
                      <div className="space-y-1.5">
                          <Label className="text-[8px] font-black uppercase tracking-widest text-white/30">URL Personalizada</Label>
                          <Input className="h-9 bg-black/40 border-white/10 text-white text-[10px] font-bold rounded-lg" value={slug} onChange={e => setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))} />
                      </div>
                      <div className="space-y-1.5">
                          <Label className="text-[8px] font-black uppercase tracking-widest text-white/30">Tema Visual</Label>
                          <select className="flex h-9 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-1 text-[10px] font-bold text-white outline-none" value={clientInfo.tema} onChange={e => setClientInfo({...clientInfo, tema: e.target.value})}>
                            <option value="teal">Verde Teal</option>
                            <option value="burgundy">Bordô</option>
                            <option value="black">Preto</option>
                          </select>
                      </div>
                  </div>
               </div>

               {slug && (
                  <div className="p-4 rounded-xl bg-[#bff720]/10 border border-[#bff720]/20 space-y-2">
                    <Label className="text-[9px] font-black uppercase tracking-widest text-[#bff720]">Live Link:</Label>
                    <a href={`/diagnostico/${slug}`} target="_blank" rel="noreferrer" className="text-[10px] text-white hover:underline flex items-center justify-between font-bold break-all bg-black/20 p-2 rounded">
                      /diagnostico/{slug} <LinkIcon size={12} className="shrink-0 ml-2" />
                    </a>
                  </div>
               )}
            </div>
          )}
        </div>
      </aside>

      {/* PREVIEW MAIN VIEW */}
      <main className="flex-1 h-full overflow-y-auto bg-[#F5F3EE] relative">
        <div className={`mx-auto transition-all duration-700 overflow-x-hidden ${viewMode === 'mobile' ? 'max-w-[375px] my-10 border-[12px] border-black rounded-[50px] h-[812px] overflow-y-auto shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] bg-[#F5F3EE]' : 'w-full'}`}
          style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
          
          {/* PAGE 1 — HERO COVER */}
          <section className="min-h-[90vh] flex flex-col items-center justify-center text-center px-10 py-20 relative overflow-hidden" style={{ background: theme.primary }}>
            <img src={LogoInova} className="h-12 mb-24 brightness-0 invert opacity-80" alt="Inova" />
            
            <div className="relative w-full max-w-3xl mx-auto">
              {/* Lime star decoration */}
              <div className="absolute -left-12 -top-12 text-[#bff720] text-7xl font-black select-none opacity-80 animate-pulse" style={{ transform: 'rotate(-15deg)' }}>✳</div>
              
              <div className="bg-black px-12 py-10 inline-block w-full shadow-2xl">
                <h1 className="text-white text-[clamp(3.5rem,10vw,8rem)] font-black tracking-[-3px] leading-none uppercase">
                  DIAGNÓSTICO
                </h1>
              </div>
              
              {/* Cream star decoration */}
              <div className="absolute -right-8 -bottom-8 text-white/20 text-5xl select-none" style={{ transform: 'rotate(15deg)' }}>✳</div>
            </div>

            <div className="mt-16 space-y-4">
              <div className="inline-block px-6 py-2 bg-white/10 rounded-full backdrop-blur-md">
                  <p className="text-xs font-black text-[#bff720] tracking-[0.5em] uppercase">
                    @{clientInfo.nome.replace('@','')}
                  </p>
              </div>
              <p className="text-sm text-white/50 tracking-[0.3em] font-medium uppercase">
                Maturidade Estratégica de Marca
              </p>
            </div>

             {/* Background Effects */}
             <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-[100px]" />
             <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#bff720]/5 rounded-full translate-y-1/3 -translate-x-1/3 blur-[100px]" />
          </section>

          {/* PAGE 2 — OVERVIEW & RADAR */}
          <section className="min-h-[80vh] flex flex-col justify-center px-8 lg:px-24 py-24 bg-[#F5F3EE]">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <div className="space-y-10">
                    <div className="space-y-4">
                        <span className="text-[10px] font-black uppercase tracking-[5px] text-[#0D6E5E]">Introdução</span>
                        <h2 className="text-5xl lg:text-6xl font-black text-black leading-none uppercase tracking-tighter">
                            Panorama<br />Digital
                        </h2>
                    </div>
                    <p className="text-xl text-black/70 leading-relaxed font-medium">
                        {config.intro.texto}
                    </p>
                    <div className="flex gap-4">
                        <div className="flex -space-x-4">
                            {[1,2,3].map(i => <div key={i} className="w-12 h-12 rounded-full border-4 border-[#F5F3EE] bg-gray-200" />)}
                        </div>
                        <div className="flex flex-col justify-center">
                            <p className="text-[10px] font-black uppercase tracking-widest text-black/30 leading-none">Analisado por</p>
                            <p className="text-sm font-bold text-black">Especialistas Inova Co.</p>
                        </div>
                    </div>
                </div>

                <div className="relative">
                    <div className="absolute -inset-10 bg-black/5 blur-3xl rounded-full" />
                    <div className="relative bg-white p-12 rounded-[50px] shadow-2xl border border-[#e8e4dc] space-y-10">
                        <div className="grid grid-cols-2 gap-10">
                            {[
                                { label: 'Posicionamento', val: config.scores.posicionamento, icon: Target, color: '#bff720' },
                                { label: 'Autoridade', val: config.scores.autoridade, icon: Sparkles, color: '#d4c9b0' },
                                { label: 'Presença Digital', val: config.scores.presenca, icon: Zap, color: '#0D6E5E' },
                                { label: 'Conversão', val: config.scores.conversao, icon: TrendingUp, color: '#3A0A1E' },
                            ].map(s => (
                                <div key={s.label} className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-xl bg-gray-50 text-gray-400"><s.icon size={16} /></div>
                                        <span className="text-[9px] font-black uppercase tracking-widest text-black/30 leading-tight">{s.label}</span>
                                    </div>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-4xl font-black text-black">{s.val}</span>
                                        <span className="text-sm font-bold text-black/20">%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-gray-50 rounded-full overflow-hidden">
                                        <div className="h-full transition-all duration-1000" style={{ width: `${s.val}%`, backgroundColor: s.color }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="pt-10 border-t border-gray-100 flex items-center justify-between">
                            <div>
                                <p className="text-[9px] font-black uppercase tracking-[4px] text-black/30">Maturidade Geral</p>
                                <p className="text-2xl font-black text-black uppercase">
                                    {Math.round((config.scores.posicionamento + config.scores.presenca + config.scores.autoridade + config.scores.conversao) / 4)}%
                                </p>
                            </div>
                            <div className="bg-[#bff720] text-black text-[9px] font-black uppercase tracking-widest px-4 py-2 rounded-full shadow-lg shadow-[#bff720]/20">
                                Verificado
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </section>

          {/* PAGE 3 — INSIGHTS (POSITIVOS / NEGATIVOS) */}
          <section className="min-h-[90vh] flex items-center px-8 lg:px-24 py-24 relative overflow-hidden" style={{ background: theme.primary }}>
            <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-20 relative z-10">
                
                <div className="lg:col-span-12 mb-10 text-center">
                     <h2 className="text-[clamp(3.5rem,10vw,8rem)] font-black text-white/10 uppercase tracking-tighter leading-none absolute -top-10 left-1/2 -translate-x-1/2 w-full select-none">ANALYSIS</h2>
                     <h3 className="text-5xl lg:text-7xl font-black text-white uppercase tracking-tighter relative z-10">Diagnóstico Estratégico</h3>
                </div>

                {/* Positivos column */}
                <div className="lg:col-span-6 space-y-10">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-[2px] bg-[#bff720]" />
                        <h4 className="text-[10px] font-black uppercase tracking-[5px] text-[#bff720]">Pontos de Força</h4>
                    </div>
                    <div className="grid gap-4">
                        {config.positivos.map((p: string, i: number) => (
                            <div key={i} className="bg-white/5 border border-white/5 p-8 rounded-[32px] group hover:bg-white/10 transition-all duration-500">
                                <div className="flex gap-6">
                                    <div className="w-10 h-10 rounded-2xl bg-[#bff720]/10 flex items-center justify-center text-[#bff720] shrink-0"><CheckCircle2 size={20} /></div>
                                    <p className="text-lg font-bold text-white/90 leading-tight pt-1">{p}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Negativos column */}
                <div className="lg:col-span-6 space-y-10">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-[2px] bg-white/20" />
                        <h4 className="text-[10px] font-black uppercase tracking-[5px] text-white/40">Gargalos de Conversão</h4>
                    </div>
                    <div className="grid gap-4">
                        {config.negativos.map((n: string, i: number) => (
                            <div key={i} className="bg-black/20 border border-white/5 p-8 rounded-[32px] group hover:bg-black/40 transition-all duration-500">
                                <div className="flex gap-6">
                                    <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center text-white/20 shrink-0"><AlertCircle size={20} /></div>
                                    <p className="text-lg font-bold text-white/60 leading-tight pt-1">{n}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Background artifacts */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-black/10 rounded-full blur-[120px]" />
          </section>

          {/* PAGE 4 — VEREDITO & PLANO DE AÇÃO */}
          <section className="min-h-screen px-8 lg:px-24 py-32 bg-black flex flex-col items-center justify-center text-center overflow-hidden relative">
                <div className="max-w-4xl space-y-16 relative z-10">
                    <div className="space-y-6">
                        <div className="inline-block px-8 py-3 bg-[#bff720]/10 border border-[#bff720]/20 rounded-full">
                            <span className="text-sm font-black text-[#bff720] uppercase tracking-[8px]">O Veredito Final</span>
                        </div>
                        <h2 className="text-6xl lg:text-8xl font-black text-white uppercase tracking-tighter leading-[0.85]">
                            {config.final.destaque}
                        </h2>
                        <p className="text-2xl lg:text-3xl font-light text-white/40 max-w-3xl mx-auto italic">
                            "{config.final.texto}"
                        </p>
                    </div>

                    <div className="grid gap-4 text-left">
                        {[1,2,3,4,5].map(i => config.final[`acao${i}`] ? (
                            <div key={i} className="group flex items-center bg-white/5 border border-white/10 p-8 rounded-[32px] transition-all hover:bg-white/10 hover:border-[#bff720]/50 duration-500">
                                <span className="text-4xl font-black text-white/5 group-hover:text-[#bff720]/20 transition-colors mr-10">{String(i).padStart(2, '0')}</span>
                                <p className="text-xl font-bold text-white tracking-tight">{config.final[`acao${i}`]}</p>
                                <ArrowRight className="ml-auto text-white/10 group-hover:text-[#bff720] transition-all translate-x-4 group-hover:translate-x-0" />
                            </div>
                        ) : null)}
                    </div>
                </div>

                {/* Decorative Grid */}
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          </section>

          {/* PAGE 5-7 — DETALHAMENTO DO CRONOGRAMA */}
          <div className="bg-[#F5F3EE]">
                {config.semanas.map((s: any, i: number) => (
                    <section key={i} className="min-h-[80vh] px-8 lg:px-24 py-32 border-t border-[#e8e4dc]">
                        <div className="max-w-6xl mx-auto space-y-20">
                            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-[2px] bg-[#0D6E5E]" />
                                        <span className="text-[10px] font-black uppercase tracking-[5px] text-[#0D6E5E]">{s.label}</span>
                                    </div>
                                    <h2 className="text-5xl lg:text-6xl font-black text-black uppercase tracking-tighter leading-none">{s.titulo}</h2>
                                </div>
                                <div className="p-6 bg-white border border-[#e8e4dc] rounded-2xl flex items-center gap-6">
                                    <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center text-[#bff720]"><TrendingUp size={24} /></div>
                                    <div className="text-left">
                                        <p className="text-[9px] font-black uppercase tracking-widest text-black/30">Objetivo da Fase</p>
                                        <p className="text-sm font-black text-black">Aceleração de Resultados</p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                                {s.cards.map((c: any, ci: number) => (
                                    <div key={ci} className="group bg-white rounded-[50px] p-12 shadow-2xl border border-[#e8e4dc] space-y-10 hover:border-[#bff720] transition-colors duration-500 flex flex-col justify-between">
                                        <div className="space-y-8">
                                            <div className="flex justify-between items-start">
                                                <div className="inline-block px-5 py-2 bg-black rounded-full">
                                                    <span className="text-[10px] font-black text-white uppercase tracking-widest">{c.tipo}</span>
                                                </div>
                                                <Sparkles className="text-black/10 group-hover:text-[#bff720] transition-colors" size={32} />
                                            </div>
                                            <h3 className="text-3xl font-black text-black leading-tight tracking-tight">{c.titulo}</h3>
                                            
                                            <div className="grid grid-cols-1 gap-8">
                                                <div className="space-y-2">
                                                    <p className="text-[10px] font-black uppercase tracking-widest text-[#0D6E5E]">Base Estratégica</p>
                                                    <p className="text-lg font-medium text-black/70 leading-snug">{c.gancho}</p>
                                                </div>
                                                <div className="p-6 bg-[#f8f6f0] rounded-3xl space-y-2">
                                                    <p className="text-[10px] font-black uppercase tracking-widest text-black/30">Estrutura do Conteúdo</p>
                                                    <p className="text-sm font-bold text-black/80 leading-relaxed">{c.estrutura}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pt-8 border-t border-gray-100 flex items-center justify-between group-hover:border-[#bff720]/20 transition-colors">
                                            <div className="flex items-center gap-3">
                                                <div className="w-2 h-2 rounded-full bg-[#bff720] animate-pulse" />
                                                <span className="text-xs font-black uppercase tracking-widest text-black/40">Call to action:</span>
                                            </div>
                                            <span className="text-xs font-black text-black uppercase tracking-widest bg-[#bff720]/10 px-4 py-2 rounded-lg">{c.cta}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                ))}
          </div>

          <footer className="bg-black py-40 border-t border-white/5 flex flex-col items-center justify-center text-center px-10">
               <div className="relative mb-20">
                    <div className="absolute -inset-10 bg-[#bff720]/10 blur-3xl rounded-full" />
                    <img src={LogoInova} className="h-24 lg:h-32 brightness-0 invert opacity-40 relative z-10" alt="Inova" />
               </div>
               <div className="space-y-4 max-w-lg">
                    <h4 className="text-xl font-bold text-white uppercase tracking-[10px]">Estratégia & ROI</h4>
                    <p className="text-white/20 text-[10px] font-medium leading-relaxed uppercase tracking-[3px]">
                        Este documento é confidencial e exclusivo para @{clientInfo.nome.replace('@','')}.<br />
                        © 2026 INOVA Co. High Performance Marketing.
                    </p>
               </div>
          </footer>
        </div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          .no-print { display: none !important; }
          section { page-break-after: always; min-height: 100vh; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
}
