import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Save, Plus, Trash2, Layout, Zap, CreditCard, Camera, Gavel, 
  Utensils, Dumbbell, Stethoscope, Building2, MousePointer2, 
  MessageSquare, BarChart3, ListChecks, Edit3, Image as ImageIcon,
  MessageCircle, Sparkles, Settings, Target, ChevronRight, Globe,
  Shield, Eye, Share2, Palette, Type, Sliders
} from 'lucide-react';
import { toast } from 'sonner';

const ASSETS = {
  restaurant: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800",
  personal: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800",
  clinica: "file:///Users/lucassoares/.gemini/antigravity/brain/70a0d96f-4a74-42d0-b5c4-b4af4b35c6d6/luxury_aesthetic_clinic_v1774133230214_1774149064393.png",
  lawyer: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=800",
  realestate: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800",
  studio: "file:///Users/lucassoares/.gemini/antigravity/brain/70a0d96f-4a74-42d0-b5c4-b4af4b35c6d6/inova_studio_arsenal_v1774133230214_1774149048384.png",
};

const DEFAULT_CONFIG = {
  theme: 'restaurant',
  styles: {
    heroTitleSize: "72",
    accentColor: "#bff720",
    fontFamily: "Inter",
    isItalic: true
  },
  hero: {
    title: "Seu restaurante pode estar cheio… mas invisível no digital.",
    tagline: "Transformamos restaurantes em marcas desejadas nas redes sociais.",
    badge: "INOVA PRODUÇÕES • 2026",
    cta: "BORÁ DIGITALIZAR 🚀"
  },
  strategy: {
    problem: "Hoje a maioria das pessoas escolhe onde comer pelo Instagram. Se você não aparece, você simplesmente não existe.",
    solution: "A Inova cria conteúdos de elite que despertam o desejo imediato e te posicionam no topo.",
    results: "Visibilidade, Autoridade, Faturamento",
    steps: "Planejamento, Captação, Edição, Entrega"
  },
  whatsapp: "5562999999999",
  services: [
    { title: "Vídeos de Elite", desc: "Filmagem cinematográfica em 4k.", icon: "Camera" },
    { title: "Estratégia de Tráfego", desc: "Anúncios para atrair clientes locais.", icon: "Zap" }
  ],
  plans: [
    { name: "Plano Start", price: "2300", features: ["6 vídeos", "2 captações"], popular: false },
    { name: "Plano Advanced", price: "4500", features: ["9 vídeos", "Funil VIP"], popular: true }
  ]
};

export default function SalesEditorPage() {
  const [config, setConfig] = useState(DEFAULT_CONFIG);

  useEffect(() => {
    const saved = localStorage.getItem('agency_lp_config');
    if (saved) {
      try { 
        const parsed = JSON.parse(saved);
        const merged = {
          ...DEFAULT_CONFIG,
          ...parsed,
          styles: { ...DEFAULT_CONFIG.styles, ...(parsed.styles || {}) },
          hero: { ...DEFAULT_CONFIG.hero, ...(parsed.hero || {}) },
          strategy: { ...DEFAULT_CONFIG.strategy, ...(parsed.strategy || {}) },
          services: parsed.services || DEFAULT_CONFIG.services,
          plans: parsed.plans || DEFAULT_CONFIG.plans
        };
        setConfig(merged); 
      } 
      catch (e) { setConfig(DEFAULT_CONFIG); }
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('agency_lp_config', JSON.stringify(config));
    toast.success('Landing Page Atualizada! 🚀');
  };

  return (
    <div className="flex h-screen bg-[#050505] text-white font-sans overflow-hidden">
      {/* Sidebar Localizada & Prática */}
      <aside className="w-[400px] h-full bg-[#0a0a0a] border-r border-white/5 flex flex-col z-50 overflow-hidden shadow-2xl">
         <div className="p-8 border-b border-white/5 flex items-center justify-between bg-black/40 backdrop-blur-xl">
            <div className="flex items-center gap-3">
               <div className="w-2 h-2 bg-[#bff720] rounded-full animate-pulse shadow-[0_0_10px_#bff720]" />
               <span className="text-[10px] font-black uppercase tracking-[0.4em] italic text-[#bff720]">Estúdio Inova Pro</span>
            </div>
            <Button onClick={handleSave} size="sm" className="bg-[#bff720] text-black hover:bg-white h-10 rounded-full px-6 font-black uppercase text-[9px] gap-2 transition-all shadow-xl active:scale-95">
               <Save size={16}/> Salvar
            </Button>
         </div>

         <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
            <Tabs defaultValue="copy" className="w-full">
               <TabsList className="grid w-full grid-cols-3 h-14 bg-black/50 border border-white/5 rounded-2xl p-1 mb-10 shadow-inner">
                  <TabsTrigger value="hero" className="rounded-xl data-[state=active]:bg-[#222] font-black uppercase text-[8px] tracking-widest">Capa</TabsTrigger>
                  <TabsTrigger value="copy" className="rounded-xl data-[state=active]:bg-[#222] font-black uppercase text-[8px] tracking-widest">Narrativa</TabsTrigger>
                  <TabsTrigger value="config" className="rounded-xl data-[state=active]:bg-[#222] font-black uppercase text-[8px] tracking-widest">Ajustes</TabsTrigger>
               </TabsList>

               <TabsContent value="hero" className="space-y-8 animate-in fade-in duration-300">
                  <SectionTitle title="Abertura do Impacto" />
                  <SidebarField label="Título (Headline)" val={config.hero?.title} set={(v: string) => setConfig({...config, hero: {...config.hero, title: v}})} isArea />
                  <SidebarField label="Subtítulo (Promessa)" val={config.hero?.tagline} set={(v: string) => setConfig({...config, hero: {...config.hero, tagline: v}})} isArea />
                  <SidebarField label="Texto do Botão" val={config.hero?.cta} set={(v: string) => setConfig({...config, hero: {...config.hero, cta: v}})} />
                  <SidebarField label="Identificador Superior" val={config.hero?.badge} set={(v: string) => setConfig({...config, hero: {...config.hero, badge: v}})} />
               </TabsContent>

               <TabsContent value="copy" className="space-y-8 animate-in fade-in duration-300">
                  <SectionTitle title="Argumento de Venda" />
                  <SidebarField label="O Problema / Dor" val={config.strategy?.problem} set={(v: string) => setConfig({...config, strategy: {...config.strategy, problem: v}})} isArea />
                  <SidebarField label="A Solução Inova" val={config.strategy?.solution} set={(v: string) => setConfig({...config, strategy: {...config.strategy, solution: v}})} isArea />
                  <SidebarField label="Diferenciais (Vírgula)" val={config.strategy?.results} set={(v: string) => setConfig({...config, strategy: {...config.strategy, results: v}})} />
                  <SidebarField label="WhatsApp de Contato" val={config.whatsapp} set={(v: string) => setConfig({...config, whatsapp: v})} />
               </TabsContent>

               <TabsContent value="config" className="space-y-8 animate-in fade-in duration-300">
                  <div className="p-6 bg-white/5 rounded-2xl space-y-6">
                     <SidebarField label="Tamanho da Headline (Padrão: 72)" val={config.styles?.heroTitleSize} set={(v: string) => setConfig({...config, styles: {...config.styles, heroTitleSize: v}})} />
                     <SidebarField label="Cor de Destaque (HEX)" val={config.styles?.accentColor} set={(v: string) => setConfig({...config, styles: {...config.styles, accentColor: v}})} />
                  </div>
                  <div className="pt-6 space-y-6">
                     <h3 className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30 italic">Nicho & Estilo Visual</h3>
                     <div className="grid grid-cols-2 gap-3 pb-24">
                        <VisualThemeBtnMini id="restaurant" label="Gastro" img={ASSETS.restaurant} active={config.theme} set={(id) => setConfig({...config, theme: id})} />
                        <VisualThemeBtnMini id="personal" label="Fitness" img={ASSETS.personal} active={config.theme} set={(id) => setConfig({...config, theme: id})} />
                        <VisualThemeBtnMini id="clinica" label="Clínica" img={ASSETS.clinica} active={config.theme} set={(id) => setConfig({...config, theme: id})} />
                        <VisualThemeBtnMini id="lawyer" label="Jurídico" img={ASSETS.lawyer} active={config.theme} set={(id) => setConfig({...config, theme: id})} />
                        <VisualThemeBtnMini id="realestate" label="Imobi" img={ASSETS.realestate} active={config.theme} set={(id) => setConfig({...config, theme: id})} />
                        <VisualThemeBtnMini id="studio" label="Estúdio" img={ASSETS.studio} active={config.theme} set={(id) => setConfig({...config, theme: id})} />
                     </div>
                  </div>
               </TabsContent>
            </Tabs>
         </div>
      </aside>

      {/* Preview Area Modern & Minimalist */}
      <main className="flex-1 h-full bg-[#000] overflow-y-auto p-16 scroll-smooth custom-scrollbar relative">
         <div className="max-w-5xl mx-auto pb-48">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 px-6 border-b border-white/5 pb-16 gap-10">
               <div className="space-y-4">
                  <h2 className="text-5xl font-black italic uppercase tracking-tighter leading-tight drop-shadow-2xl">PRÉVIA DO <br /> <span className="text-[#bff720]" style={{color: config.styles?.accentColor}}>PROJETO.</span></h2>
                  <p className="text-white/20 text-[10px] font-bold uppercase tracking-[0.5em] italic">Visualize as alterações da sua proposta aqui.</p>
               </div>
               <a href="/proposta" target="_blank" className="relative group">
                  <div className="absolute inset-0 bg-[#bff720]/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" style={{backgroundColor: `${config.styles?.accentColor}20`}} />
                  <Button variant="outline" className="rounded-full border-white/10 bg-white/5 h-14 px-12 gap-3 font-black uppercase text-[10px] tracking-widest relative transition-all active:scale-95 hover:bg-white hover:text-black">
                     <Eye size={18}/> Ver Versão Pública
                  </Button>
               </a>
            </header>

            <div className="space-y-16">
               <PreviewBox label="Capa // Título Principal" content={config.hero?.title} color={config.styles?.accentColor} />
               <PreviewBox label="Estratégia // Dor do Cliente" content={config.strategy?.problem} />
               <PreviewBox label="Investimento // Setup" content={`R$ ${config.plans?.[0]?.price || "---"}`} />
            </div>

            <div className="mt-40 p-24 rounded-[4rem] border border-white/5 bg-[#080808] flex flex-col items-center text-center shadow-3xl group relative overflow-hidden transition-all hover:border-[#bff720]/20">
               <div className="absolute inset-0 bg-gradient-to-tr from-[#bff720]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" style={{backgroundImage: `linear-gradient(to top right, ${config.styles?.accentColor}10, transparent)`}} />
               <div className="w-24 h-24 bg-black border border-white/5 rounded-full flex items-center justify-center mb-10 text-[#bff720] shadow-[0_0_50px_rgba(191,247,32,0.1)]" style={{color: config.styles?.accentColor}}>
                  <Sparkles size={48}/>
               </div>
               <p className="text-4xl font-black italic uppercase tracking-tighter max-w-xl leading-none px-4">Esta proposta está sendo moldada pela Inova.</p>
               <p className="text-[11px] text-white/5 mt-10 uppercase font-black tracking-[1.2em] italic">Inova productions ecosystem v1.0</p>
            </div>
         </div>
      </main>
    </div>
  );
}

function SectionTitle({ title }: any) {
  return (
    <h3 className="text-[10px] font-black uppercase tracking-[0.4em] mb-10 text-[#bff720] italic flex items-center gap-3">
       <div className="h-[2px] w-6 bg-[#bff720]" /> {title}
    </h3>
  );
}

function SidebarField({ label, val, set, isArea, placeholder }: any) {
  return (
    <div className="space-y-3 group">
      <Label className="text-[8px] font-black uppercase text-white/20 tracking-[0.2em] group-hover:text-white/50 transition-colors uppercase italic">{label}</Label>
      {isArea ? (
        <Textarea className="min-h-[120px] bg-black border-white/10 border-2 rounded-2xl p-5 font-bold italic text-[13px] leading-relaxed text-white focus-visible:ring-1 focus-visible:ring-[#bff720] transition-all scrollbar-hide" value={val} onChange={(e) => set(e.target.value)} placeholder={placeholder} />
      ) : (
        <Input className="h-14 bg-black border-white/10 border-2 rounded-2xl px-5 font-bold text-[13px] text-white focus-visible:ring-1 focus-visible:ring-[#bff720] transition-all" value={val} onChange={(e) => set(e.target.value)} placeholder={placeholder} />
      )}
    </div>
  );
}

function VisualThemeBtnMini({ id, label, img, active, set }: any) {
  const isSelected = active === id;
  return (
    <button onClick={() => set(id)} className={`relative group w-full h-20 rounded-2xl overflow-hidden border-2 transition-all duration-500 ${isSelected ? 'border-[#bff720] ring-4 ring-[#bff720]/10 scale-[1.05]' : 'border-white/5 grayscale hover:grayscale-0 hover:scale-[1.02]'}`}>
       <img src={img} alt={label} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-125" />
       <div className={`absolute inset-0 ${isSelected ? 'bg-[#bff720]/10' : 'bg-black/70 group-hover:bg-black/40'}`} />
       <div className="absolute bottom-3 left-4 text-left">
          <p className="text-[9px] font-black text-white italic uppercase drop-shadow-2xl">{label}</p>
       </div>
    </button>
  );
}

function PreviewBox({ label, content, color }: any) {
  return (
    <div className="group border-l-4 border-white/5 hover:border-[#bff720] pl-12 transition-all duration-700 py-6 bg-gradient-to-r from-transparent to-transparent hover:from-white/[0.02]">
       <p className="text-[10px] font-black uppercase tracking-[0.6em] text-white/10 mb-6 group-hover:text-[#bff720] transition-colors italic">{label}</p>
       <p className="text-3xl font-black italic uppercase leading-none opacity-20 group-hover:opacity-100 transition-opacity max-w-3xl drop-shadow-lg" style={{color: color && '1' === '0' ? color : 'inherit'}}>{content}</p>
    </div>
  );
}
