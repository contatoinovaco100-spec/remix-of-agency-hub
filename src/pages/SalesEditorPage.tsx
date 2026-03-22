import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Save, Plus, Trash2, Eye, Sparkles, MessageSquare, ListChecks, 
  BarChart3, Image as ImageIcon, Settings
} from 'lucide-react';
import { toast } from 'sonner';

/* ═══════════ TEMPLATES COMPLETOS POR NICHO ═══════════ */
const NICHE_TEMPLATES: Record<string, any> = {
  restaurant: {
    theme: 'restaurant',
    hero: {
      title: "Seu restaurante pode estar cheio… mas invisível no digital.",
      tagline: "Transformamos restaurantes em marcas desejadas nas redes sociais.",
      badge: "INOVA PRODUÇÕES • 2026",
      cta: "BORÁ DIGITALIZAR 🚀"
    },
    strategy: {
      problem: "Hoje a maioria das pessoas escolhe onde comer pelo Instagram. Se o seu restaurante não aparece com conteúdo profissional, ele simplesmente não entra na decisão do cliente.",
      solution: "A Inova é uma produtora estratégica que cria conteúdos profissionais e posiciona seu restaurante para atrair mais clientes.",
      results: "Visibilidade Máxima, Mais Reservas, Autoridade Gastro",
      steps: "Diagnóstico, Planejamento, Captação, Edição, Entrega"
    },
    services: [
      { title: "Captação Gourmet", desc: "Filmagem 4K com foco em textura e experiência gastronômica." },
      { title: "Reels & Stories", desc: "Conteúdo otimizado para engajamento no Instagram." },
      { title: "Copy Estratégica", desc: "Textos que despertam o desejo e levam à ação." },
      { title: "Tráfego Pago", desc: "Anúncios segmentados para atrair clientes locais." },
      { title: "Planejamento Mensal", desc: "Calendário editorial completo do mês." },
      { title: "Edição Profissional", desc: "Pós-produção cinematográfica de cada peça." }
    ],
    plans: [
      { name: "Plano Start", price: "1500", features: ["6 vídeos/mês", "2 captações", "Copy estratégica", "Edição profissional"], popular: false },
      { name: "Plano Growth", price: "3500", features: ["12 vídeos/mês", "4 captações", "Funil de vendas", "Tráfego pago incluso", "Suporte VIP"], popular: true }
    ],
    whatsapp: "5562999999999"
  },
  personal: {
    theme: 'personal',
    hero: {
      title: "Seu treino transforma corpos. Nosso conteúdo transforma carreiras.",
      tagline: "Posicionamos personais como autoridade digital com vídeos que vendem.",
      badge: "INOVA PRODUÇÕES • 2026",
      cta: "ESCALAR MINHA MARCA 💪"
    },
    strategy: {
      problem: "Você é um ótimo profissional, mas sem presença digital estratégica, continua dependendo de indicação e cobrando barato.",
      solution: "A Inova cria conteúdo cinematográfico que posiciona você como referência e atrai alunos dispostos a pagar mais.",
      results: "Autoridade Digital, Mais Alunos, Ticket Maior",
      steps: "Diagnóstico, Planejamento, Set de Filmagem, Edição, Entrega"
    },
    services: [
      { title: "Vídeos de Treino", desc: "Captação profissional de exercícios e dicas." },
      { title: "Conteúdo Educativo", desc: "Reels com dicas de treino e nutrição." },
      { title: "Branding Pessoal", desc: "Fotos e vídeos de posicionamento." },
      { title: "Funil de Captação", desc: "Estratégia para converter seguidores em alunos." },
      { title: "Stories Diários", desc: "Templates e roteiros para stories que engajam." },
      { title: "Gestão de Tráfego", desc: "Anúncios para atrair alunos da sua região." }
    ],
    plans: [
      { name: "Plano Start", price: "1800", features: ["8 vídeos/mês", "2 captações", "Copy estratégica", "Edição profissional"], popular: false },
      { name: "Plano Elite", price: "4000", features: ["15 vídeos/mês", "4 captações", "Funil completo", "Tráfego pago", "Mentoria de marca"], popular: true }
    ],
    whatsapp: "5562999999999"
  },
  clinica: {
    theme: 'clinica',
    hero: {
      title: "Sua clínica oferece o melhor. Mas o digital não mostra isso.",
      tagline: "Posicionamos clínicas de estética como referência premium no digital.",
      badge: "INOVA PRODUÇÕES • 2026",
      cta: "POSICIONAR MINHA CLÍNICA ✨"
    },
    strategy: {
      problem: "Pacientes escolhem clínicas pelo Instagram antes de ligar. Se sua presença digital não transmite confiança e sofisticação, você perde para quem comunica melhor.",
      solution: "A Inova cria conteúdos de luxo que transmitem a sofisticação da sua clínica e atraem pacientes de alto padrão.",
      results: "Posicionamento Premium, Mais Agendamentos, Ticket Elevado",
      steps: "Diagnóstico, Planejamento, Captação, Edição, Entrega"
    },
    services: [
      { title: "Vídeos de Procedimento", desc: "Captação elegante de antes e depois." },
      { title: "Branding da Clínica", desc: "Imagens que transmitem sofisticação." },
      { title: "Depoimentos em Vídeo", desc: "Prova social cinematográfica." },
      { title: "Reels Educativos", desc: "Conteúdos sobre tratamentos e resultados." },
      { title: "Copy Médica", desc: "Textos que respeitam o CFM e vendem." },
      { title: "Tráfego Premium", desc: "Anúncios para atrair pacientes qualificados." }
    ],
    plans: [
      { name: "Plano Essencial", price: "2500", features: ["8 vídeos/mês", "2 captações", "Copy estratégica", "Edição premium"], popular: false },
      { name: "Plano VIP", price: "5500", features: ["16 vídeos/mês", "4 captações", "Funil de agendamento", "Tráfego pago", "Gestão de reputação"], popular: true }
    ],
    whatsapp: "5562999999999"
  },
  lawyer: {
    theme: 'lawyer',
    hero: {
      title: "Advocacia de excelência merece posicionamento de excelência.",
      tagline: "Construímos autoridade digital para escritórios que querem dominar seu mercado.",
      badge: "INOVA PRODUÇÕES • 2026",
      cta: "CONSTRUIR AUTORIDADE ⚖️"
    },
    strategy: {
      problem: "O mercado jurídico está saturado. Sem uma presença digital estratégica, seu escritório se torna apenas mais um na multidão.",
      solution: "A Inova posiciona advogados como referência com conteúdo que educa, engaja e converte clientes de alto valor.",
      results: "Prestígio Digital, Mais Clientes, Casos de Alto Valor",
      steps: "Diagnóstico, Planejamento, Captação, Edição, Entrega"
    },
    services: [
      { title: "Vídeos Educativos", desc: "Conteúdo sobre temas jurídicos relevantes." },
      { title: "Posicionamento", desc: "Branding do advogado como autoridade." },
      { title: "Conteúdo para LinkedIn", desc: "Artigos e vídeos para rede profissional." },
      { title: "Reels Informativos", desc: "Dicas jurídicas que viralizam." },
      { title: "Copy Jurídica", desc: "Textos que respeitam a OAB e convertem." },
      { title: "Tráfego Qualificado", desc: "Anúncios para atrair clientes ideais." }
    ],
    plans: [
      { name: "Plano Essencial", price: "2000", features: ["6 vídeos/mês", "2 captações", "Copy estratégica", "Edição profissional"], popular: false },
      { name: "Plano Autoridade", price: "4500", features: ["12 vídeos/mês", "4 captações", "Funil completo", "LinkedIn premium", "Consultoria de marca"], popular: true }
    ],
    whatsapp: "5562999999999"
  },
  realestate: {
    theme: 'realestate',
    hero: {
      title: "Imóveis extraordinários merecem uma apresentação à altura.",
      tagline: "Vídeos e fotos que vendem antes mesmo da visita presencial.",
      badge: "INOVA PRODUÇÕES • 2026",
      cta: "VALORIZAR MEUS IMÓVEIS 🏠"
    },
    strategy: {
      problem: "Fotos amadoras e vídeos de celular desvalorizam seus imóveis e afastam compradores qualificados.",
      solution: "A Inova cria apresentações cinematográficas que valorizam cada imóvel e aceleram suas vendas.",
      results: "Imóveis Valorizados, Vendas Aceleradas, Clientes Premium",
      steps: "Diagnóstico, Planejamento, Captação, Edição, Entrega"
    },
    services: [
      { title: "Tour Virtual", desc: "Vídeos imersivos de cada imóvel." },
      { title: "Fotos Profissionais", desc: "Imagens que valorizam cada ambiente." },
      { title: "Drone Aéreo", desc: "Captação aérea da propriedade e região." },
      { title: "Vídeos para Ads", desc: "Conteúdo otimizado para anúncios." },
      { title: "Copy Imobiliária", desc: "Descrições que vendem o sonho." },
      { title: "Tráfego Segmentado", desc: "Anúncios para compradores qualificados." }
    ],
    plans: [
      { name: "Plano Start", price: "2000", features: ["6 vídeos/mês", "Fotos profissionais", "Copy estratégica", "Edição premium"], popular: false },
      { name: "Plano Destaque", price: "5000", features: ["12 vídeos/mês", "Drone incluso", "Tour virtual", "Tráfego pago", "Gestão de portfólio"], popular: true }
    ],
    whatsapp: "5562999999999"
  },
  studio: {
    theme: 'studio',
    hero: {
      title: "Produção audiovisual de alto impacto para marcas ambiciosas.",
      tagline: "Do conceito à entrega: narrativas que posicionam e vendem.",
      badge: "INOVA PRODUÇÕES • 2026",
      cta: "INICIAR PRODUÇÃO 🎬"
    },
    strategy: {
      problem: "Sua marca precisa de conteúdo profissional, mas contratar freelancers gera inconsistência e perda de tempo.",
      solution: "A Inova é seu departamento criativo completo: planejamento, captação, edição e distribuição em um só lugar.",
      results: "Consistência, Qualidade Cinema, Escala de Marca",
      steps: "Briefing, Planejamento, Produção, Pós-produção, Entrega"
    },
    services: [
      { title: "Captação 4K", desc: "Filmagem profissional com equipamento cinema." },
      { title: "Edição Cinematográfica", desc: "Color grading e pós-produção de elite." },
      { title: "Motion Graphics", desc: "Animações e elementos gráficos." },
      { title: "Roteirização", desc: "Roteiros estratégicos para cada peça." },
      { title: "Direção de Arte", desc: "Conceito visual completo." },
      { title: "Distribuição", desc: "Estratégia de publicação multi-plataforma." }
    ],
    plans: [
      { name: "Plano Produção", price: "3000", features: ["8 vídeos/mês", "2 diárias de captação", "Edição cinema", "Roteirização"], popular: false },
      { name: "Plano Full Service", price: "6500", features: ["16 vídeos/mês", "4 diárias", "Motion graphics", "Drone", "Direção de arte", "Distribuição"], popular: true }
    ],
    whatsapp: "5562999999999"
  }
};

const NICHE_IMAGES: Record<string, string> = {
  restaurant: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=400",
  personal: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=400",
  clinica: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=400",
  lawyer: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=400",
  realestate: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=400",
  studio: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=400",
};

const NICHE_LABELS: Record<string, string> = {
  restaurant: "Gastro",
  personal: "Fitness",
  clinica: "Clínica",
  lawyer: "Jurídico",
  realestate: "Imobiliária",
  studio: "Estúdio",
};

/* ═══════════ COMPONENTE PRINCIPAL ═══════════ */
export default function SalesEditorPage() {
  const [config, setConfig] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem('agency_lp_config');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Garante que todos os campos existem
        const template = NICHE_TEMPLATES[parsed.theme] || NICHE_TEMPLATES.restaurant;
        setConfig({
          ...template,
          ...parsed,
          styles: { heroTitleSize: "64", accentColor: "#bff720", ...(parsed.styles || {}) },
          hero: { ...template.hero, ...(parsed.hero || {}) },
          strategy: { ...template.strategy, ...(parsed.strategy || {}) },
          services: parsed.services?.length ? parsed.services : template.services,
          plans: parsed.plans?.length ? parsed.plans : template.plans,
        });
      } catch { loadTemplate('restaurant'); }
    } else { loadTemplate('restaurant'); }
  }, []);

  const loadTemplate = (niche: string) => {
    const t = NICHE_TEMPLATES[niche];
    setConfig({ ...t, styles: { heroTitleSize: "64", accentColor: "#bff720" } });
  };

  const switchNiche = (niche: string) => {
    const t = NICHE_TEMPLATES[niche];
    setConfig({ ...t, styles: config?.styles || { heroTitleSize: "64", accentColor: "#bff720" } });
    toast.success(`Template "${NICHE_LABELS[niche]}" carregado!`);
  };

  const handleSave = () => {
    localStorage.setItem('agency_lp_config', JSON.stringify(config));
    toast.success('Landing Page Atualizada! 🚀');
  };

  if (!config) return null;
  const accent = config.styles?.accentColor || "#bff720";

  return (
    <div className="flex h-screen bg-[#050508] text-white font-sans overflow-hidden">
      {/* ═══════════ SIDEBAR ═══════════ */}
      <aside className="w-[420px] h-full bg-[#0a0a0c] border-r border-white/[0.06] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-white/[0.06] flex items-center justify-between bg-black/40 backdrop-blur-xl shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ backgroundColor: accent, boxShadow: `0 0 12px ${accent}` }} />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] italic" style={{ color: accent }}>Estúdio Inova</span>
          </div>
          <Button onClick={handleSave} size="sm" className="h-10 rounded-full px-6 font-black uppercase text-[9px] gap-2 transition-all shadow-xl active:scale-95" style={{ backgroundColor: accent, color: '#000' }}>
            <Save size={14}/> Publicar
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8" style={{ scrollbarWidth: 'thin', scrollbarColor: '#222 transparent' }}>
          <Tabs defaultValue="template" className="w-full">
            <TabsList className="grid w-full grid-cols-4 h-12 bg-black/60 border border-white/[0.06] rounded-xl p-1 mb-8">
              <TabsTrigger value="template" className="rounded-lg data-[state=active]:bg-white/10 font-black uppercase text-[7px] tracking-widest">Nicho</TabsTrigger>
              <TabsTrigger value="capa" className="rounded-lg data-[state=active]:bg-white/10 font-black uppercase text-[7px] tracking-widest">Capa</TabsTrigger>
              <TabsTrigger value="copy" className="rounded-lg data-[state=active]:bg-white/10 font-black uppercase text-[7px] tracking-widest">Copy</TabsTrigger>
              <TabsTrigger value="ofertas" className="rounded-lg data-[state=active]:bg-white/10 font-black uppercase text-[7px] tracking-widest">Ofertas</TabsTrigger>
            </TabsList>

            {/* ── ABA NICHO (Templates) ── */}
            <TabsContent value="template" className="space-y-6 animate-in fade-in duration-300">
              <SectionTitle title="Selecione o Nicho" accent={accent} />
              <p className="text-[10px] text-white/20 font-medium leading-relaxed">Ao selecionar um nicho, todo o conteúdo da página será preenchido automaticamente com a copy profissional daquele segmento.</p>
              <div className="grid grid-cols-2 gap-3">
                {Object.keys(NICHE_TEMPLATES).map((niche) => (
                  <button key={niche} onClick={() => switchNiche(niche)}
                    className={`relative group w-full h-28 rounded-2xl overflow-hidden border-2 transition-all duration-300 ${config.theme === niche ? 'border-current ring-4 ring-current/10 scale-[1.03]' : 'border-white/[0.06] grayscale hover:grayscale-0 hover:scale-[1.02]'}`}
                    style={{ borderColor: config.theme === niche ? accent : undefined, ringColor: config.theme === niche ? `${accent}20` : undefined }}>
                    <img src={NICHE_IMAGES[niche]} alt={NICHE_LABELS[niche]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125" />
                    <div className={`absolute inset-0 ${config.theme === niche ? 'bg-black/30' : 'bg-black/70 group-hover:bg-black/40'} transition-all`} />
                    <div className="absolute bottom-3 left-4">
                      <p className="text-[10px] font-black text-white italic uppercase drop-shadow-lg tracking-wide">{NICHE_LABELS[niche]}</p>
                    </div>
                    {config.theme === niche && (
                      <div className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: accent }}>
                        <span className="text-black text-[8px] font-black">✓</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </TabsContent>

            {/* ── ABA CAPA ── */}
            <TabsContent value="capa" className="space-y-6 animate-in fade-in duration-300">
              <SectionTitle title="Abertura & Impacto" accent={accent} />
              <Field label="Título Principal" val={config.hero?.title} set={(v: string) => setConfig({...config, hero: {...config.hero, title: v}})} isArea />
              <Field label="Subtítulo (Promessa)" val={config.hero?.tagline} set={(v: string) => setConfig({...config, hero: {...config.hero, tagline: v}})} isArea />
              <Field label="Texto do Botão" val={config.hero?.cta} set={(v: string) => setConfig({...config, hero: {...config.hero, cta: v}})} />
              <Field label="Identificador Superior" val={config.hero?.badge} set={(v: string) => setConfig({...config, hero: {...config.hero, badge: v}})} />
            </TabsContent>

            {/* ── ABA COPY ── */}
            <TabsContent value="copy" className="space-y-6 animate-in fade-in duration-300">
              <SectionTitle title="Narrativa de Vendas" accent={accent} />
              <Field label="O Problema / Dor" val={config.strategy?.problem} set={(v: string) => setConfig({...config, strategy: {...config.strategy, problem: v}})} isArea />
              <Field label="A Solução Inova" val={config.strategy?.solution} set={(v: string) => setConfig({...config, strategy: {...config.strategy, solution: v}})} isArea />
              <Field label="Resultados (separar por vírgula)" val={config.strategy?.results} set={(v: string) => setConfig({...config, strategy: {...config.strategy, results: v}})} />
              <Field label="Etapas do Processo (separar por vírgula)" val={config.strategy?.steps} set={(v: string) => setConfig({...config, strategy: {...config.strategy, steps: v}})} />
              <Field label="WhatsApp" val={config.whatsapp} set={(v: string) => setConfig({...config, whatsapp: v})} />

              <div className="pt-6 border-t border-white/[0.06]">
                <SectionTitle title="Serviços / Arsenal" accent={accent} />
                {(config.services || []).map((s: any, i: number) => (
                  <div key={i} className="p-4 bg-white/[0.03] rounded-2xl border border-white/[0.06] mb-3 group relative">
                    <Button variant="ghost" size="sm" className="absolute top-2 right-2 h-7 w-7 p-0 opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 transition-all"
                      onClick={() => setConfig({...config, services: config.services.filter((_: any, idx: number) => idx !== i)})}>
                      <Trash2 size={14} />
                    </Button>
                    <Input className="bg-transparent border-none p-0 font-black uppercase text-[11px] mb-2 h-8 focus-visible:ring-0" style={{ color: accent }}
                      value={s.title} onChange={(e) => { const n = [...config.services]; n[i] = {...n[i], title: e.target.value}; setConfig({...config, services: n}); }} />
                    <Textarea className="bg-transparent border-none p-0 text-[11px] font-medium text-white/40 min-h-[50px] focus-visible:ring-0"
                      value={s.desc} onChange={(e) => { const n = [...config.services]; n[i] = {...n[i], desc: e.target.value}; setConfig({...config, services: n}); }} />
                  </div>
                ))}
                <Button variant="outline" className="w-full rounded-xl border-white/[0.06] h-10 text-[9px] font-black uppercase tracking-widest gap-2 bg-white/[0.02] hover:bg-white/[0.06] transition-all"
                  onClick={() => setConfig({...config, services: [...(config.services || []), {title: "Novo Serviço", desc: "Descrição aqui..."}]})}>
                  <Plus size={14}/> Adicionar Serviço
                </Button>
              </div>
            </TabsContent>

            {/* ── ABA OFERTAS (2 planos fixos) ── */}
            <TabsContent value="ofertas" className="space-y-6 animate-in fade-in duration-300">
              <SectionTitle title="Planos & Investimento" accent={accent} />
              <p className="text-[10px] text-white/20 font-medium leading-relaxed">Configure os 2 planos que aparecerão na sua proposta.</p>
              {[0, 1].map((i) => {
                const plan = config.plans?.[i] || { name: i === 0 ? "Plano Start" : "Plano Pro", price: "0", features: [], popular: i === 1 };
                return (
                  <div key={i} className="p-6 bg-white/[0.03] rounded-2xl border-2 space-y-4 transition-all" style={{ borderColor: plan.popular ? accent : 'rgba(255,255,255,0.06)' }}>
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-black uppercase tracking-widest text-white/30 italic">Plano {i + 1}</span>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <span className="text-[8px] font-black uppercase text-white/20">Destaque</span>
                        <input type="checkbox" checked={plan.popular || false} className="accent-[#bff720] w-4 h-4"
                          onChange={(e) => { const n = [...(config.plans || [])]; n[i] = {...plan, popular: e.target.checked}; setConfig({...config, plans: n}); }} />
                      </label>
                    </div>
                    <Field label="Nome do Plano" val={plan.name} set={(v: string) => { const n = [...(config.plans || [])]; n[i] = {...plan, name: v}; setConfig({...config, plans: n}); }} />
                    <Field label="Preço (R$)" val={plan.price} set={(v: string) => { const n = [...(config.plans || [])]; n[i] = {...plan, price: v}; setConfig({...config, plans: n}); }} />
                    <Field label="Itens inclusos (um por linha)" val={(plan.features || []).join('\n')} isArea
                      set={(v: string) => { const n = [...(config.plans || [])]; n[i] = {...plan, features: v.split('\n').filter((f: string) => f.trim())}; setConfig({...config, plans: n}); }} />
                  </div>
                );
              })}

              <div className="pt-6 border-t border-white/[0.06] space-y-4">
                <SectionTitle title="Ajustes Visuais" accent={accent} />
                <Field label="Tamanho da Headline (Padrão: 64)" val={config.styles?.heroTitleSize} set={(v: string) => setConfig({...config, styles: {...config.styles, heroTitleSize: v}})} />
                <Field label="Cor de Destaque (HEX)" val={config.styles?.accentColor} set={(v: string) => setConfig({...config, styles: {...config.styles, accentColor: v}})} />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </aside>

      {/* ═══════════ PREVIEW AREA ═══════════ */}
      <main className="flex-1 h-full bg-[#000] overflow-y-auto p-12" style={{ scrollbarWidth: 'thin', scrollbarColor: '#222 transparent' }}>
        <div className="max-w-5xl mx-auto pb-40">
          {/* Header */}
          <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 border-b border-white/[0.06] pb-12 gap-8">
            <div>
              <h2 className="text-4xl font-black italic uppercase tracking-tighter leading-tight">Prévia do <span style={{ color: accent }}>Projeto</span></h2>
              <p className="text-white/15 text-[10px] font-bold uppercase tracking-[0.4em] mt-3">Nicho: {NICHE_LABELS[config.theme] || 'Personalizado'}</p>
            </div>
            <a href="/proposta" target="_blank">
              <Button variant="outline" className="rounded-full border-white/[0.06] bg-white/[0.03] h-12 px-10 gap-2 font-black uppercase text-[9px] tracking-widest transition-all hover:bg-white hover:text-black active:scale-95">
                <Eye size={16}/> Ver Página Pública
              </Button>
            </a>
          </header>

          {/* Preview Blocks */}
          <div className="space-y-4">
            {/* Hero Preview */}
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-[2rem] overflow-hidden relative min-h-[320px] group">
              <img src={NICHE_IMAGES[config.theme] || NICHE_IMAGES.restaurant} alt="Nicho" className="w-full h-full object-cover opacity-20 absolute inset-0 group-hover:opacity-30 transition-opacity" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/60 to-transparent" />
              <div className="relative z-10 p-12 flex flex-col justify-end h-full min-h-[320px]">
                <p className="text-[8px] font-black uppercase tracking-[0.6em] text-white/20 mb-4 italic">CAPA // HEADLINE</p>
                <h3 className="text-3xl font-black italic uppercase tracking-tighter leading-[1.1] mb-4">{config.hero?.title}</h3>
                <p className="text-sm text-white/25 font-medium italic max-w-lg">{config.hero?.tagline}</p>
              </div>
            </div>

            {/* Strategy Preview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-[2rem] p-10">
                <p className="text-[8px] font-black uppercase tracking-[0.6em] text-white/15 mb-6 italic">DIAGNÓSTICO // PROBLEMA</p>
                <p className="text-xl font-black italic uppercase tracking-tighter leading-[1.15]">{config.strategy?.problem}</p>
              </div>
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-[2rem] p-10">
                <p className="text-[8px] font-black uppercase tracking-[0.6em] text-white/15 mb-6 italic">SOLUÇÃO // ESTRATÉGIA</p>
                <p className="text-lg font-medium italic text-white/50 leading-relaxed">{config.strategy?.solution}</p>
              </div>
            </div>

            {/* Services Grid Preview */}
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-[2rem] p-10">
              <p className="text-[8px] font-black uppercase tracking-[0.6em] text-white/15 mb-8 italic">ARSENAL // {(config.services || []).length} ENTREGAS</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {(config.services || []).map((s: any, i: number) => (
                  <div key={i} className="p-6 bg-white/[0.03] border border-white/[0.04] rounded-2xl">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: `${accent}15`, color: accent }}><Sparkles size={16} /></div>
                    <p className="text-sm font-black italic uppercase tracking-tight">{s.title}</p>
                    <p className="text-[10px] text-white/20 mt-1 font-medium">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Plans Preview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(config.plans || []).slice(0, 2).map((p: any, i: number) => (
                <div key={i} className="bg-white/[0.03] border-2 rounded-[2rem] p-10 flex flex-col justify-between"
                  style={{ borderColor: p.popular ? accent : 'rgba(255,255,255,0.06)' }}>
                  <div>
                    <p className="text-[8px] font-black uppercase tracking-[0.5em] text-white/20 italic mb-4">{p.name}</p>
                    <p className="text-5xl font-black italic tracking-tighter">R${p.price}<span className="text-lg text-white/15">/mês</span></p>
                  </div>
                  <div className="mt-8 space-y-3">
                    {(p.features || []).map((f: string, j: number) => (
                      <p key={j} className="text-[11px] font-bold text-white/30 uppercase tracking-widest border-b border-white/[0.04] pb-2">+ {f}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Inspirational */}
          <div className="mt-24 p-16 rounded-[3rem] border border-white/[0.06] bg-white/[0.02] flex flex-col items-center text-center relative overflow-hidden group">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: `radial-gradient(circle at center, ${accent}08, transparent)` }} />
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8" style={{ backgroundColor: `${accent}15`, color: accent }}>
              <Sparkles size={32}/>
            </div>
            <p className="text-2xl font-black italic uppercase tracking-tighter max-w-md leading-none">Esta proposta está sendo moldada pela Inova.</p>
            <p className="text-[10px] text-white/[0.06] mt-8 uppercase font-black tracking-[1em] italic">Inova Productions Ecosystem v2.0</p>
          </div>
        </div>
      </main>
    </div>
  );
}

/* ═══════════ COMPONENTES AUXILIARES ═══════════ */
function SectionTitle({ title, accent }: { title: string; accent: string }) {
  return (
    <h3 className="text-[10px] font-black uppercase tracking-[0.4em] italic flex items-center gap-3" style={{ color: accent }}>
      <div className="h-[2px] w-5" style={{ backgroundColor: accent }} /> {title}
    </h3>
  );
}

function Field({ label, val, set, isArea }: { label: string; val: string; set: (v: string) => void; isArea?: boolean }) {
  return (
    <div className="space-y-2 group">
      <Label className="text-[8px] font-black uppercase text-white/20 tracking-[0.15em] group-hover:text-white/40 transition-colors italic">{label}</Label>
      {isArea ? (
        <Textarea className="min-h-[100px] bg-black/60 border-white/[0.06] border rounded-xl p-4 font-medium text-[12px] leading-relaxed text-white/80 focus-visible:ring-1 focus-visible:ring-[#bff720] transition-all"
          value={val || ''} onChange={(e) => set(e.target.value)} />
      ) : (
        <Input className="h-11 bg-black/60 border-white/[0.06] border rounded-xl px-4 font-bold text-[12px] text-white focus-visible:ring-1 focus-visible:ring-[#bff720] transition-all"
          value={val || ''} onChange={(e) => set(e.target.value)} />
      )}
    </div>
  );
}
