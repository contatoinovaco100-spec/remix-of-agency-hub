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
    toast.success('Alterações Salvas com Sucesso! 🚀');
  };

  return (
    <div className="flex h-screen bg-black text-white font-sans overflow-hidden">
      {/* Sidebar Simplificada & Focada no Conteúdo */}
      <aside className="w-[380px] h-full bg-[#111] border-r border-white/5 flex flex-col z-50 overflow-hidden">
         <div className="p-6 border-b border-white/5 flex items-center justify-between bg-black/50">
            <div className="flex items-center gap-2">
               <div className="w-2 h-2 bg-[#bff720] rounded-full" />
               <span className="text-[10px] font-black uppercase tracking-widest italic text-[#bff720]">Editor Inova</span>
            </div>
            <Button onClick={handleSave} size="sm" className="bg-[#bff720] text-black hover:bg-white h-9 rounded-full px-4 font-black uppercase text-[8px] gap-2 transition-all">
               <Save size={14}/> Salvar
            </Button>
         </div>

         <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
            <Tabs defaultValue="copy" className="w-full">
               <TabsList className="grid w-full grid-cols-3 h-12 bg-black/50 border border-white/5 rounded-xl p-1 mb-8">
                  <TabsTrigger value="hero" className="rounded-lg data-[state=active]:bg-[#222] font-black uppercase text-[7px] tracking-widest">Capa</TabsTrigger>
                  <TabsTrigger value="copy" className="rounded-lg data-[state=active]:bg-[#222] font-black uppercase text-[7px] tracking-widest">Conteúdo</TabsTrigger>
                  <TabsTrigger value="config" className="rounded-lg data-[state=active]:bg-[#222] font-black uppercase text-[7px] tracking-widest">Ajustes</TabsTrigger>
               </TabsList>

               <TabsContent value="hero" className="space-y-6 animate-in fade-in duration-300">
                  <SidebarField label="Título Principal" val={config.hero?.title} set={(v: string) => setConfig({...config, hero: {...config.hero, title: v}})} isArea />
                  <SidebarField label="Promessa de Valor" val={config.hero?.tagline} set={(v: string) => setConfig({...config, hero: {...config.hero, tagline: v}})} isArea />
                  <SidebarField label="Chamada do Botão (CTA)" val={config.hero?.cta} set={(v: string) => setConfig({...config, hero: {...config.hero, cta: v}})} />
                  <SidebarField label="Badge (Topo)" val={config.hero?.badge} set={(v: string) => setConfig({...config, hero: {...config.hero, badge: v}})} />
               </TabsContent>

               <TabsContent value="copy" className="space-y-6 animate-in fade-in duration-300">
                  <SidebarField label="O Problema / Dor" val={config.strategy?.problem} set={(v: string) => setConfig({...config, strategy: {...config.strategy, problem: v}})} isArea />
                  <SidebarField label="A Solução Digital" val={config.strategy?.solution} set={(v: string) => setConfig({...config, strategy: {...config.strategy, solution: v}})} isArea />
                  <SidebarField label="Destaques (Vírgula)" val={config.strategy?.results} set={(v: string) => setConfig({...config, strategy: {...config.strategy, results: v}})} />
                  <SidebarField label="WhatsApp de Vendas" val={config.whatsapp} set={(v: string) => setConfig({...config, whatsapp: v})} />
               </TabsContent>

               <TabsContent value="config" className="space-y-6 animate-in fade-in duration-300">
                  <div className="p-4 bg-white/5 rounded-xl space-y-4">
                     <SidebarField label="Tamanho da Headline (Standard: 72)" val={config.styles?.heroTitleSize} set={(v: string) => setConfig({...config, styles: {...config.styles, heroTitleSize: v}})} />
                     <SidebarField label="Cor Principal (HEX)" val={config.styles?.accentColor} set={(v: string) => setConfig({...config, styles: {...config.styles, accentColor: v}})} />
                  </div>
                  <div className="pt-4 space-y-4">
                     <h3 className="text-[10px] font-black uppercase tracking-widest opacity-20">Modelo Visual</h3>
                     <div className="grid grid-cols-2 gap-2">
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

      {/* Main Canvas Area */}
      <main className="flex-1 h-full bg-black overflow-y-auto p-12 scroll-smooth">
         <div className="max-w-4xl mx-auto pb-40">
            <header className="flex justify-between items-center mb-16 px-4">
               <div>
                  <h2 className="text-3xl font-black italic uppercase tracking-tighter">Painel de <span className="text-[#bff720]" style={{color: config.styles?.accentColor}}>Previa</span></h2>
                  <p className="text-white/20 text-[9px] font-bold mt-2 uppercase tracking-[0.3em]">Configure sua narrativa premium abaixo.</p>
               </div>
               <a href="/proposta" target="_blank">
                  <Button variant="outline" className="rounded-full border-white/5 bg-white/5 h-10 px-8 gap-2 font-black uppercase text-[8px] transition-all hover:bg-[#bff720] hover:text-black">
                     <Eye size={12}/> Ver Site Público
                  </Button>
               </a>
            </header>

            <div className="space-y-12">
               <div className="p-10 border border-white/5 rounded-[2.5rem] bg-[#0a0a0a] group hover:border-[#bff720]/20 transition-all">
                  <p className="text-[8px] font-black uppercase tracking-[0.5em] text-white/20 mb-6 italic">Título do Projeto</p>
                  <p className="text-4xl font-black italic uppercase leading-none">{config.hero?.title}</p>
               </div>
               <div className="p-10 border border-white/5 rounded-[2.5rem] bg-[#0a0a0a] group hover:border-[#bff720]/20 transition-all">
                  <p className="text-[8px] font-black uppercase tracking-[0.5em] text-white/20 mb-6 italic">Problema // Foco</p>
                  <p className="text-xl font-medium italic uppercase leading-relaxed text-white/40">{config.strategy?.problem}</p>
               </div>
            </div>
         </div>
      </main>
    </div>
  );
}

function SidebarField({ label, val, set, isArea, placeholder }: any) {
  return (
    <div className="space-y-2 group">
      <Label className="text-[7px] font-black uppercase text-white/30 tracking-widest group-hover:text-white/60 transition-colors uppercase italic">{label}</Label>
      {isArea ? (
        <Textarea className="min-h-[100px] bg-black border-white/5 rounded-xl p-4 font-bold text-[12px] leading-relaxed text-white focus-visible:ring-1 focus-visible:ring-[#bff720] transition-all" value={val} onChange={(e) => set(e.target.value)} placeholder={placeholder} />
      ) : (
        <Input className="h-11 bg-black border-white/5 rounded-xl px-4 font-bold text-[12px] text-white focus-visible:ring-1 focus-visible:ring-[#bff720] transition-all" value={val} onChange={(e) => set(e.target.value)} placeholder={placeholder} />
      )}
    </div>
  );
}

function VisualThemeBtnMini({ id, label, img, active, set }: any) {
  const isSelected = active === id;
  return (
    <button onClick={() => set(id)} className={`relative group w-full h-16 rounded-xl overflow-hidden border transition-all ${isSelected ? 'border-[#bff720] ring-2 ring-[#bff720]/20' : 'border-white/5 grayscale hover:grayscale-0'}`}>
       <img src={img} alt={label} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-125" />
       <div className={`absolute inset-0 ${isSelected ? 'bg-[#bff720]/10' : 'bg-black/70 group-hover:bg-black/30'}`} />
       <div className="absolute inset-x-0 bottom-2 text-center">
          <p className="text-[7px] font-black text-white italic uppercase">{label}</p>
       </div>
    </button>
  );
}
