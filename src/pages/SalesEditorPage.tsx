import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Save, Plus, Trash2, Eye, Sparkles, Settings, Check, 
  ArrowRight, BarChart3, Target, Star, Video, Camera, Zap, 
  Lightbulb, Globe, Shield, Play, ArrowUpRight, ChevronRight,
  Edit3, X, MousePointer2, Pencil, GripVertical, Type, Image as ImageIcon,
  Palette, Layout, Monitor
} from 'lucide-react';
import { toast } from 'sonner';
import LogoInova from '@/assets/logo-inova.png';

/* ═══════════ TEMPLATES POR NICHO ═══════════ */
const NICHE_TEMPLATES: Record<string, any> = {
  restaurant: {
    theme: 'restaurant',
    hero: { title: "Seu restaurante pode estar cheio… mas invisível no digital.", tagline: "Transformamos restaurantes em marcas desejadas nas redes sociais.", badge: "INOVA PRODUÇÕES • 2026", cta: "BORÁ DIGITALIZAR 🚀" },
    strategy: { problem: "Hoje a maioria das pessoas escolhe onde comer pelo Instagram. Se o seu restaurante não aparece com conteúdo profissional, ele simplesmente não entra na decisão do cliente.", solution: "A Inova é uma produtora estratégica que cria conteúdos profissionais e posiciona seu restaurante para atrair mais clientes.", results: "Visibilidade Máxima, Mais Reservas, Autoridade Gastro", steps: "Diagnóstico, Planejamento, Captação, Edição, Entrega" },
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
    hero: { title: "Seu treino transforma corpos. Nosso conteúdo transforma carreiras.", tagline: "Posicionamos personais como autoridade digital com vídeos que vendem.", badge: "INOVA PRODUÇÕES • 2026", cta: "ESCALAR MINHA MARCA 💪" },
    strategy: { problem: "Você é um ótimo profissional, mas sem presença digital estratégica, continua dependendo de indicação e cobrando barato.", solution: "A Inova cria conteúdo cinematográfico que posiciona você como referência e atrai alunos dispostos a pagar mais.", results: "Autoridade Digital, Mais Alunos, Ticket Maior", steps: "Diagnóstico, Planejamento, Set de Filmagem, Edição, Entrega" },
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
    hero: { title: "Sua clínica oferece o melhor. Mas o digital não mostra isso.", tagline: "Posicionamos clínicas de estética como referência premium no digital.", badge: "INOVA PRODUÇÕES • 2026", cta: "POSICIONAR MINHA CLÍNICA ✨" },
    strategy: { problem: "Pacientes escolhem clínicas pelo Instagram antes de ligar. Se sua presença digital não transmite confiança e sofisticação, você perde para quem comunica melhor.", solution: "A Inova cria conteúdos de luxo que transmitem a sofisticação da sua clínica e atraem pacientes de alto padrão.", results: "Posicionamento Premium, Mais Agendamentos, Ticket Elevado", steps: "Diagnóstico, Planejamento, Captação, Edição, Entrega" },
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
    hero: { title: "Advocacia de excelência merece posicionamento de excelência.", tagline: "Construímos autoridade digital para escritórios que querem dominar seu mercado.", badge: "INOVA PRODUÇÕES • 2026", cta: "CONSTRUIR AUTORIDADE ⚖️" },
    strategy: { problem: "O mercado jurídico está saturado. Sem uma presença digital estratégica, seu escritório se torna apenas mais um na multidão.", solution: "A Inova posiciona advogados como referência com conteúdo que educa, engaja e converte clientes de alto valor.", results: "Prestígio Digital, Mais Clientes, Casos de Alto Valor", steps: "Diagnóstico, Planejamento, Captação, Edição, Entrega" },
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
    hero: { title: "Imóveis extraordinários merecem uma apresentação à altura.", tagline: "Vídeos e fotos que vendem antes mesmo da visita presencial.", badge: "INOVA PRODUÇÕES • 2026", cta: "VALORIZAR MEUS IMÓVEIS 🏠" },
    strategy: { problem: "Fotos amadoras e vídeos de celular desvalorizam seus imóveis e afastam compradores qualificados.", solution: "A Inova cria apresentações cinematográficas que valorizam cada imóvel e aceleram suas vendas.", results: "Imóveis Valorizados, Vendas Aceleradas, Clientes Premium", steps: "Diagnóstico, Planejamento, Captação, Edição, Entrega" },
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
    hero: { title: "Produção audiovisual de alto impacto para marcas ambiciosas.", tagline: "Do conceito à entrega: narrativas que posicionam e vendem.", badge: "INOVA PRODUÇÕES • 2026", cta: "INICIAR PRODUÇÃO 🎬" },
    strategy: { problem: "Sua marca precisa de conteúdo profissional, mas contratar freelancers gera inconsistência e perda de tempo.", solution: "A Inova é seu departamento criativo completo: planejamento, captação, edição e distribuição em um só lugar.", results: "Consistência, Qualidade Cinema, Escala de Marca", steps: "Briefing, Planejamento, Produção, Pós-produção, Entrega" },
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
const NICHE_LABELS: Record<string, string> = { restaurant: "Gastro", personal: "Fitness", clinica: "Clínica", lawyer: "Jurídico", realestate: "Imobiliária", studio: "Estúdio" };

const ASSETS = {
  hero: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=1200",
  restaurant: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1200",
  personal: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1200",
  clinica: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1200",
  lawyer: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=1200",
  realestate: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200",
  studio: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=1200",
  team: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800",
  editing: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80&w=800",
  testimonial: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
};

/* ═══════════ COMPONENTE EDITÁVEL INLINE ═══════════ */
function Editable({ value, onChange, tag = 'p', className = '', style = {}, multiline = false }: {
  value: string; onChange: (v: string) => void; tag?: string;
  className?: string; style?: React.CSSProperties; multiline?: boolean;
}) {
  const [editing, setEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);
  const inputRef = useRef<HTMLTextAreaElement | HTMLInputElement>(null);

  useEffect(() => { setTempValue(value); }, [value]);
  useEffect(() => { if (editing && inputRef.current) inputRef.current.focus(); }, [editing]);

  if (editing) {
    return (
      <div className="relative inline-block w-full">
        {multiline ? (
          <textarea ref={inputRef as any} value={tempValue} onChange={(e) => setTempValue(e.target.value)}
            onBlur={() => { onChange(tempValue); setEditing(false); }}
            onKeyDown={(e) => { if (e.key === 'Escape') { setTempValue(value); setEditing(false); } }}
            className={`${className} bg-blue-50 border-2 border-blue-400 rounded-lg p-3 outline-none w-full resize-none min-h-[80px]`} style={style} />
        ) : (
          <input ref={inputRef as any} value={tempValue} onChange={(e) => setTempValue(e.target.value)}
            onBlur={() => { onChange(tempValue); setEditing(false); }}
            onKeyDown={(e) => { if (e.key === 'Enter') { onChange(tempValue); setEditing(false); } if (e.key === 'Escape') { setTempValue(value); setEditing(false); } }}
            className={`${className} bg-blue-50 border-2 border-blue-400 rounded-lg p-2 outline-none w-full`} style={style} />
        )}
        <div className="absolute -top-8 left-0 bg-blue-500 text-white text-[9px] font-bold px-3 py-1 rounded-t-lg uppercase tracking-wider flex items-center gap-1">
          <Pencil size={10} /> Editando • Enter/Clique fora para salvar
        </div>
      </div>
    );
  }

  const Tag = tag as any;
  return (
    <Tag className={`${className} cursor-pointer relative group/editable transition-all`} style={style}
      onClick={() => setEditing(true)}>
      {value}
      <span className="absolute -top-2 -right-2 opacity-0 group-hover/editable:opacity-100 transition-all bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center shadow-lg z-20 pointer-events-none">
        <Pencil size={10} />
      </span>
      <span className="absolute inset-0 border-2 border-transparent group-hover/editable:border-blue-400 group-hover/editable:border-dashed rounded-lg pointer-events-none transition-all" />
    </Tag>
  );
}

/* ═══════════ EDITOR PRINCIPAL ═══════════ */
export default function SalesEditorPage() {
  const [config, setConfig] = useState<any>(null);
  const [panelOpen, setPanelOpen] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('agency_lp_config');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const template = NICHE_TEMPLATES[parsed.theme] || NICHE_TEMPLATES.restaurant;
        setConfig({
          ...template, ...parsed,
          styles: { heroTitleSize: "56", accentColor: "#2563eb", ...(parsed.styles || {}) },
          hero: { ...template.hero, ...(parsed.hero || {}) },
          strategy: { ...template.strategy, ...(parsed.strategy || {}) },
          services: parsed.services?.length ? parsed.services : template.services,
          plans: parsed.plans?.length ? parsed.plans : template.plans,
        });
      } catch { loadTemplate('restaurant'); }
    } else { loadTemplate('restaurant'); }
  }, []);

  const loadTemplate = (niche: string) => {
    setConfig({ ...NICHE_TEMPLATES[niche], styles: { heroTitleSize: "56", accentColor: "#2563eb" } });
  };

  const switchNiche = (niche: string) => {
    setConfig({ ...NICHE_TEMPLATES[niche], styles: config?.styles || { heroTitleSize: "56", accentColor: "#2563eb" } });
    toast.success(`Template "${NICHE_LABELS[niche]}" aplicado!`);
  };

  const handleSave = () => {
    localStorage.setItem('agency_lp_config', JSON.stringify(config));
    toast.success('Página Publicada com Sucesso! 🚀');
  };

  if (!config) return null;
  const accent = config.styles?.accentColor || "#2563eb";
  const heroSize = config.styles?.heroTitleSize || "56";
  const themeImage = ASSETS[config.theme as keyof typeof ASSETS] || ASSETS.hero;
  const h = config.hero || {};
  const s = config.strategy || {};
  const services = config.services || [];
  const plans = (config.plans || []).slice(0, 2);
  const results = (s.results || '').split(',').map((r: string) => r.trim());
  const steps = (s.steps || '').split(',').map((r: string) => r.trim());
  const whatsapp = config.whatsapp || "5562999999999";

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* ═══════════ FLOATING TOOLBAR ═══════════ */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm">
        <div className="flex items-center gap-4">
          <img src={LogoInova} alt="Inova" className="h-6" />
          <div className="h-6 w-px bg-gray-200" />
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Editor Visual</span>
          <Badge className="bg-green-50 text-green-600 border-green-200 text-[9px] font-bold">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5 inline-block animate-pulse" />
            Ao vivo
          </Badge>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="h-9 rounded-lg text-[11px] font-bold gap-2 border-gray-200"
            onClick={() => setPanelOpen(!panelOpen)}>
            <Settings size={14} /> {panelOpen ? 'Fechar Painel' : 'Abrir Painel'}
          </Button>
          <a href="/proposta" target="_blank">
            <Button variant="outline" size="sm" className="h-9 rounded-lg text-[11px] font-bold gap-2 border-gray-200">
              <Eye size={14} /> Visualizar
            </Button>
          </a>
          <Button size="sm" className="h-9 rounded-lg text-[11px] font-bold gap-2 shadow-lg active:scale-95 transition-all" style={{ backgroundColor: accent, color: '#fff' }}
            onClick={handleSave}>
            <Save size={14} /> Publicar
          </Button>
        </div>
      </div>

      {/* ═══════════ SIDE PANEL (Colapsável) ═══════════ */}
      {panelOpen && (
        <aside className="w-[300px] h-full pt-14 bg-white border-r border-gray-200 flex flex-col z-40 shrink-0 shadow-lg">
          <div className="flex-1 overflow-y-auto p-5 space-y-6" style={{ scrollbarWidth: 'thin' }}>
            {/* Nicho Selector */}
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Template do Nicho</p>
              <div className="grid grid-cols-3 gap-2">
                {Object.keys(NICHE_TEMPLATES).map((niche) => (
                  <button key={niche} onClick={() => switchNiche(niche)}
                    className={`relative group w-full h-16 rounded-xl overflow-hidden border-2 transition-all ${config.theme === niche ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-gray-100 hover:border-gray-300'}`}>
                    <img src={NICHE_IMAGES[niche]} alt={NICHE_LABELS[niche]} className="w-full h-full object-cover" />
                    <div className={`absolute inset-0 ${config.theme === niche ? 'bg-blue-500/20' : 'bg-black/50'}`} />
                    <p className="absolute bottom-1.5 inset-x-0 text-center text-[7px] font-bold text-white uppercase">{NICHE_LABELS[niche]}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="h-px bg-gray-100" />

            {/* Ajustes Rápidos */}
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Ajustes Rápidos</p>
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <Label className="text-[9px] font-bold text-gray-400 uppercase">WhatsApp</Label>
                  <Input className="h-9 text-[12px] rounded-lg border-gray-200" value={config.whatsapp || ''} onChange={(e) => setConfig({...config, whatsapp: e.target.value})} />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[9px] font-bold text-gray-400 uppercase">Tamanho Título (px)</Label>
                  <Input className="h-9 text-[12px] rounded-lg border-gray-200" value={heroSize} onChange={(e) => setConfig({...config, styles: {...config.styles, heroTitleSize: e.target.value}})} />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[9px] font-bold text-gray-400 uppercase">Cor Principal (HEX)</Label>
                  <div className="flex gap-2">
                    <div className="w-9 h-9 rounded-lg border border-gray-200 shrink-0" style={{ backgroundColor: accent }} />
                    <Input className="h-9 text-[12px] rounded-lg border-gray-200" value={accent} onChange={(e) => setConfig({...config, styles: {...config.styles, accentColor: e.target.value}})} />
                  </div>
                </div>
              </div>
            </div>

            <div className="h-px bg-gray-100" />

            {/* Serviços */}
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Serviços ({services.length})</p>
              <div className="space-y-2">
                {services.map((svc: any, i: number) => (
                  <div key={i} className="flex items-center gap-2 p-2.5 bg-gray-50 rounded-lg group text-[11px]">
                    <GripVertical size={12} className="text-gray-300" />
                    <span className="font-bold text-gray-700 flex-1 truncate">{svc.title}</span>
                    <button onClick={() => setConfig({...config, services: services.filter((_: any, idx: number) => idx !== i)})} className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 transition-all"><Trash2 size={12} /></button>
                  </div>
                ))}
                <button onClick={() => setConfig({...config, services: [...services, {title: "Novo Serviço", desc: "Descrição aqui..."}]})}
                  className="flex items-center gap-2 p-2.5 w-full rounded-lg border border-dashed border-gray-200 text-[11px] font-bold text-gray-400 hover:text-blue-500 hover:border-blue-300 transition-all">
                  <Plus size={12} /> Adicionar
                </button>
              </div>
            </div>

            <div className="h-px bg-gray-100" />

            {/* Planos */}
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Planos (2)</p>
              {plans.map((p: any, i: number) => (
                <div key={i} className="p-3 bg-gray-50 rounded-lg mb-2 space-y-2">
                  <Input className="h-8 text-[11px] rounded-md border-gray-200 font-bold" value={p.name} onChange={(e) => { const n = [...(config.plans || [])]; n[i] = {...p, name: e.target.value}; setConfig({...config, plans: n}); }} />
                  <div className="flex gap-2">
                    <Input className="h-8 text-[11px] rounded-md border-gray-200 font-bold flex-1" value={p.price} placeholder="Preço" onChange={(e) => { const n = [...(config.plans || [])]; n[i] = {...p, price: e.target.value}; setConfig({...config, plans: n}); }} />
                    <label className="flex items-center gap-1.5 text-[9px] font-bold text-gray-400 shrink-0">
                      <input type="checkbox" checked={p.popular} className="accent-blue-500" onChange={(e) => { const n = [...(config.plans || [])]; n[i] = {...p, popular: e.target.checked}; setConfig({...config, plans: n}); }} /> Destaque
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dica */}
          <div className="p-4 border-t border-gray-100 bg-blue-50/50">
            <p className="text-[10px] text-blue-600 font-semibold flex items-center gap-2"><MousePointer2 size={12} /> Clique em qualquer texto para editar diretamente na página</p>
          </div>
        </aside>
      )}

      {/* ═══════════ CANVAS: LP RENDERIZADA COM EDIÇÃO INLINE ═══════════ */}
      <main className="flex-1 h-full pt-14 overflow-y-auto bg-gray-100" style={{ scrollbarWidth: 'thin' }}>
        <div className="max-w-[1400px] mx-auto py-8 px-8">
          <div className="bg-white rounded-2xl shadow-2xl shadow-gray-200/50 overflow-hidden border border-gray-100">

            {/* Nav Preview */}
            <div className="bg-white border-b border-gray-100 px-8 h-14 flex items-center justify-between">
              <img src={LogoInova} alt="Inova" className="h-6" />
              <div className="flex items-center gap-8 text-[12px] font-semibold text-gray-400">
                <span>Serviços</span><span>Processo</span><span>Investimento</span>
              </div>
              <Button size="sm" className="rounded-full h-9 px-6 text-[11px] font-bold" style={{ backgroundColor: accent, color: '#fff' }}>Falar Conosco</Button>
            </div>

            {/* HERO INLINE */}
            <section className="px-12 py-20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[160px] opacity-[0.06]" style={{ backgroundColor: accent }} />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                <div>
                  <Editable value={h.badge || ''} onChange={(v) => setConfig({...config, hero: {...h, badge: v}})}
                    className="inline-block bg-gray-50 text-gray-500 border border-gray-200 px-4 py-1.5 text-[11px] font-semibold rounded-full mb-8" />
                  <Editable value={h.title || ''} onChange={(v) => setConfig({...config, hero: {...h, title: v}})} tag="h1" multiline
                    className="text-gray-900 font-black tracking-tight leading-[1.1] mb-8" style={{ fontSize: `${heroSize}px` }} />
                  <Editable value={h.tagline || ''} onChange={(v) => setConfig({...config, hero: {...h, tagline: v}})} multiline
                    className="text-lg text-gray-500 leading-relaxed mb-10 max-w-lg" />
                  <Editable value={h.cta || ''} onChange={(v) => setConfig({...config, hero: {...h, cta: v}})}
                    className="inline-block rounded-full px-8 py-4 text-[15px] font-bold text-white" style={{ backgroundColor: accent }} />
                </div>
                <div className="relative">
                  <div className="rounded-[2rem] overflow-hidden shadow-2xl border border-gray-100">
                    <img src={themeImage} alt="Produção" className="w-full h-[400px] object-cover" />
                  </div>
                  <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${accent}15`, color: accent }}><BarChart3 size={20} /></div>
                    <div><p className="text-xl font-black" style={{ color: accent }}>+340%</p><p className="text-[10px] text-gray-400 font-semibold">Engajamento</p></div>
                  </div>
                </div>
              </div>
            </section>

            {/* STRATEGY INLINE */}
            <section className="px-12 py-20">
              <div className="text-center mb-16">
                <p className="text-[12px] font-semibold uppercase tracking-[0.3em] mb-4" style={{ color: accent }}>Por que nos escolher</p>
                <h2 className="text-4xl font-black tracking-tight">Potencialize sua <span className="italic" style={{ fontFamily: "'Georgia', serif", color: accent }}>jornada digital</span></h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gray-50 rounded-[1.5rem] p-10 border border-gray-100">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-300 mb-4">O Desafio</p>
                  <Editable value={s.problem || ''} onChange={(v) => setConfig({...config, strategy: {...s, problem: v}})} multiline
                    className="text-xl font-bold text-gray-800 leading-relaxed" />
                </div>
                <div className="rounded-[1.5rem] p-10 border border-gray-100 text-white" style={{ backgroundColor: accent }}>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-4">A Solução</p>
                  <Editable value={s.solution || ''} onChange={(v) => setConfig({...config, strategy: {...s, solution: v}})} multiline
                    className="text-xl font-bold text-white leading-relaxed" />
                </div>
              </div>
            </section>

            {/* SERVICES INLINE */}
            <section className="px-12 py-20 bg-gray-50/50">
              <div className="text-center mb-16">
                <p className="text-[12px] font-semibold uppercase tracking-[0.3em] mb-4" style={{ color: accent }}>Arsenal Completo</p>
                <h2 className="text-4xl font-black tracking-tight">Tudo que você precisa em <span className="italic" style={{ fontFamily: "'Georgia', serif", color: accent }}>um só lugar</span></h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {services.map((svc: any, i: number) => {
                  const icons = [Video, Camera, Zap, Lightbulb, Globe, Shield];
                  const Icon = icons[i % icons.length];
                  return (
                    <div key={i} className="flex items-start gap-5 p-6 rounded-2xl hover:bg-white hover:shadow-md transition-all group/svc border border-transparent hover:border-gray-100">
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${accent}10`, color: accent }}><Icon size={20} /></div>
                      <div className="flex-1">
                        <Editable value={svc.title} onChange={(v) => { const n = [...services]; n[i] = {...n[i], title: v}; setConfig({...config, services: n}); }}
                          className="text-[14px] font-bold text-gray-900 mb-1" />
                        <Editable value={svc.desc} onChange={(v) => { const n = [...services]; n[i] = {...n[i], desc: v}; setConfig({...config, services: n}); }}
                          className="text-[12px] text-gray-400 leading-relaxed" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* PROCESS INLINE */}
            <section className="px-12 py-20">
              <div className="text-center mb-16">
                <p className="text-[12px] font-semibold uppercase tracking-[0.3em] mb-4" style={{ color: accent }}>Como Funciona</p>
                <h2 className="text-4xl font-black tracking-tight">Processo <span className="italic" style={{ fontFamily: "'Georgia', serif", color: accent }}>simples e eficiente</span></h2>
              </div>
              <div className="grid grid-cols-5 gap-4">
                {steps.map((step: string, i: number) => (
                  <div key={i} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 text-center relative">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-black text-sm" style={{ backgroundColor: accent }}>{i + 1}</div>
                    <p className="text-[13px] font-bold text-gray-800">{step}</p>
                    {i < steps.length - 1 && <ChevronRight className="absolute top-1/2 -right-3 text-gray-200 hidden md:block" size={16} />}
                  </div>
                ))}
              </div>
            </section>

            {/* PRICING INLINE */}
            <section className="px-12 py-20 bg-gray-50/50">
              <div className="text-center mb-16">
                <p className="text-[12px] font-semibold uppercase tracking-[0.3em] mb-4" style={{ color: accent }}>Investimento</p>
                <h2 className="text-4xl font-black tracking-tight">Investimento <span className="italic" style={{ fontFamily: "'Georgia', serif", color: accent }}>transparente</span></h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                {plans.map((p: any, i: number) => (
                  <div key={i} className={`rounded-[2rem] p-10 flex flex-col min-h-[420px] border-2 ${p.popular ? 'bg-gray-900 text-white' : 'bg-white border-gray-100'}`} style={{ borderColor: p.popular ? 'transparent' : undefined }}>
                    <div className="flex justify-between items-start mb-6">
                      <Editable value={p.name} onChange={(v) => { const n = [...(config.plans || [])]; n[i] = {...p, name: v}; setConfig({...config, plans: n}); }}
                        className={`text-[12px] font-bold uppercase tracking-widest ${p.popular ? 'text-white/40' : 'text-gray-300'}`} />
                      {p.popular && <Badge className="text-[9px] font-bold px-3 py-1 rounded-full" style={{ backgroundColor: accent, color: '#fff' }}>Popular</Badge>}
                    </div>
                    <div className="mb-8">
                      <span className={`text-sm font-bold ${p.popular ? 'text-white/30' : 'text-gray-300'}`}>R$</span>
                      <Editable value={p.price} onChange={(v) => { const n = [...(config.plans || [])]; n[i] = {...p, price: v}; setConfig({...config, plans: n}); }}
                        tag="span" className="text-5xl font-black tracking-tighter" />
                      <span className={`text-sm font-semibold ${p.popular ? 'text-white/30' : 'text-gray-300'}`}>/mês</span>
                    </div>
                    <div className="space-y-3 flex-1">
                      {(p.features || []).map((f: string, j: number) => (
                        <div key={j} className={`flex items-center gap-3 text-[13px] font-medium ${p.popular ? 'text-white/60' : 'text-gray-500'}`}>
                          <Check className="w-4 h-4 shrink-0" style={{ color: accent }} /> {f}
                        </div>
                      ))}
                    </div>
                    <Button className={`w-full h-12 rounded-full font-bold text-[14px] mt-8 ${p.popular ? '' : 'border-2 border-gray-200 bg-white text-gray-900 hover:bg-gray-50'}`}
                      style={p.popular ? { backgroundColor: accent, color: '#fff' } : {}}>Iniciar Projeto</Button>
                  </div>
                ))}
              </div>
            </section>

            {/* CTA FINAL */}
            <section className="px-12 py-24 text-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.03]" style={{ background: `linear-gradient(135deg, ${accent}, #f59e0b)` }} />
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-10" style={{ backgroundColor: `${accent}15`, color: accent }}><Sparkles size={32} /></div>
              <h2 className="text-5xl font-black tracking-tight mb-6">Pronto para <span className="italic" style={{ fontFamily: "'Georgia', serif", color: accent }}>escalar?</span></h2>
              <p className="text-gray-400 text-lg max-w-xl mx-auto mb-10">Entre em contato e descubra como podemos transformar a presença digital da sua marca.</p>
              <Editable value={h.cta || 'Agendar Consultoria'} onChange={(v) => setConfig({...config, hero: {...h, cta: v}})}
                className="inline-block rounded-full px-10 py-4 text-[16px] font-bold text-white" style={{ backgroundColor: accent }} />
            </section>

            {/* Footer */}
            <div className="px-12 py-8 border-t border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={LogoInova} alt="Inova" className="h-5" />
                <span className="text-[11px] text-gray-300 font-semibold">© 2026 Inova Produções</span>
              </div>
              <div className="flex items-center gap-6 text-[12px] font-semibold text-gray-400">
                <span>Serviços</span><span>Investimento</span><span>Contato</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
