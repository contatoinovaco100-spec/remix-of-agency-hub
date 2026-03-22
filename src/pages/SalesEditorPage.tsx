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
  Shield, Eye, Share2
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
  hero: {
    title: "Seu restaurante pode estar cheio… mas invisível no digital.",
    tagline: "Transformamos restaurantes em marcas desejadas nas redes sociais.",
    badge: "INOVA PRODUÇÕES • 2026",
    cta: "DIGITALIZAR MEU SABOR"
  },
  strategy: {
    problem: "Hoje a maioria das pessoas escolhe onde comer pelo Instagram. Se o seu restaurante não aparece com conteúdo profissional, ele simplesmente não entra na decisão.",
    solution: "A Inova cria conteúdos cinematográficos que despertam o desejo imediato e posicionam seu restaurante como autoridade.",
    results: "Visibilidade Máxima, Mais Reservas, Autoridade Absoluta",
    steps: "Diagnóstico, Planejamento, Set de Filmagem, Edição Elite, Faturamento"
  },
  whatsapp: "5562999999999",
  services: [
    { title: "Captação Gourmet", desc: "Filmagem 4k com foco em textura e experiência.", icon: "Camera" },
    { title: "Estratégia de Funil", desc: "Distribuição paga para atrair clientes locais.", icon: "Zap" }
  ],
  plans: [
    { name: "Plano Start", price: "1500", features: ["6 vídeos", "2 captações"], popular: false },
    { name: "Plano Advanced", price: "2300", features: ["9 vídeos", "Funil VIP"], popular: true }
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
    toast.success('Landing Page atualizada com sucesso!');
  };

  return (
    <div className="flex h-screen bg-[#050505] text-white font-sans overflow-hidden">
      {/* Sidebar de Edição - Estilo Elementor */}
      <aside className="w-[400px] h-full bg-[#111] border-r border-[#222] flex flex-col z-50">
         <div className="p-6 border-b border-[#222] flex items-center justify-between bg-black/40 backdrop-blur-xl">
            <div className="flex items-center gap-2">
               <div className="w-2 h-2 bg-[#bff720] rounded-full" />
               <span className="text-[9px] font-black uppercase tracking-[0.3em] italic text-[#bff720]">Inova Builder</span>
            </div>
            <Button onClick={handleSave} size="sm" className="bg-[#bff720] text-black hover:bg-[#aef110] rounded-full px-4 h-9 font-black uppercase text-[8px] gap-2">
               <Save size={14}/> Salvar
            </Button>
         </div>

         <div className="flex-1 overflow-y-auto p-6 custom-scrollbar space-y-8">
            <Tabs defaultValue="hero" className="w-full">
               <TabsList className="grid w-full grid-cols-4 h-12 bg-black border border-[#222] rounded-xl p-1 mb-8">
                  <TabsTrigger value="hero" className="rounded-lg data-[state=active]:bg-[#222] font-black uppercase text-[7px] tracking-widest"><ImageIcon size={14}/></TabsTrigger>
                  <TabsTrigger value="copy" className="rounded-lg data-[state=active]:bg-[#222] font-black uppercase text-[7px] tracking-widest"><MessageSquare size={14}/></TabsTrigger>
                  <TabsTrigger value="items" className="rounded-lg data-[state=active]:bg-[#222] font-black uppercase text-[7px] tracking-widest"><ListChecks size={14}/></TabsTrigger>
                  <TabsTrigger value="business" className="rounded-lg data-[state=active]:bg-[#222] font-black uppercase text-[7px] tracking-widest"><BarChart3 size={14}/></TabsTrigger>
               </TabsList>

               <TabsContent value="hero" className="space-y-6">
                  <SectionHeader title="Sessão de Capa" />
                  <SidebarField label="Título Épico" val={config.hero?.title} set={(v: string) => setConfig({...config, hero: {...config.hero, title: v}})} isArea />
                  <SidebarField label="Subheadline" val={config.hero?.tagline} set={(v: string) => setConfig({...config, hero: {...config.hero, tagline: v}})} isArea />
                  <SidebarField label="Chamada do Botão" val={config.hero?.cta} set={(v: string) => setConfig({...config, hero: {...config.hero, cta: v}})} />
                  <SidebarField label="Badge Superior" val={config.hero?.badge} set={(v: string) => setConfig({...config, hero: {...config.hero, badge: v}})} />
               </TabsContent>

               <TabsContent value="copy" className="space-y-6">
                  <SectionHeader title="Narrativa Estratégica" />
                  <SidebarField label="A Dor (Problema)" val={config.strategy?.problem} set={(v: string) => setConfig({...config, strategy: {...config.strategy, problem: v}})} isArea />
                  <SidebarField label="A Transformação (Solução)" val={config.strategy?.solution} set={(v: string) => setConfig({...config, strategy: {...config.strategy, solution: v}})} isArea />
                  <SidebarField label="Principais Resultados (Vírgula)" val={config.strategy?.results} set={(v: string) => setConfig({...config, strategy: {...config.strategy, results: v}})} />
                  <SidebarField label="Fases do Processo (Vírgula)" val={config.strategy?.steps} set={(v: string) => setConfig({...config, strategy: {...config.strategy, steps: v}})} />
               </TabsContent>

               <TabsContent value="items" className="space-y-6">
                  <SectionHeader title="Blocos de Entrega" />
                  {(config.services || []).map((s: any, i: number) => (
                    <div key={i} className="p-4 bg-black/60 rounded-2xl border border-[#222] mb-4 group relative">
                       <Button variant="ghost" className="absolute top-2 right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity text-destructive" onClick={() => { const n = config.services.filter((_:any,idx:number)=>idx!==i); setConfig({...config, services: n}); }}><Trash2 size={12}/></Button>
                       <Input className="bg-transparent border-none p-0 font-black italic uppercase text-xs mb-2" value={s.title} onChange={(e) => { const n = [...config.services]; n[i].title = e.target.value; setConfig({...config, services: n}); }} />
                       <Textarea className="bg-transparent border-none p-0 text-[10px] italic h-16 min-h-[60px]" value={s.desc} onChange={(e) => { const n = [...config.services]; n[i].desc = e.target.value; setConfig({...config, services: n}); }} />
                    </div>
                  ))}
                  <Button variant="outline" className="w-full rounded-xl border-[#222] text-[8px] font-black uppercase tracking-widest gap-2" onClick={() => setConfig({...config, services: [...config.services, {title: "Nova", desc: "...", icon: "Star"}]})}><Plus size={12}/> Novo Bloco</Button>
               </TabsContent>

               <TabsContent value="business" className="space-y-6">
                  <SectionHeader title="Ofertas & Capital" />
                  <SidebarField label="WhatsApp de Vendas" val={config.whatsapp} set={(v: string) => setConfig({...config, whatsapp: v})} />
                  <div className="space-y-4 pt-4">
                     {(config.plans || []).map((p: any, i: number) => (
                        <div key={i} className="p-4 bg-black border border-[#222] rounded-2xl">
                           <Input className="bg-transparent border-none p-0 font-black uppercase text-[10px] mb-2" value={p.name} onChange={(e) => { const n = [...config.plans]; n[i].name = e.target.value; setConfig({...config, plans: n}); }} />
                           <Input className="bg-transparent border-none p-0 font-black text-lg mb-2" value={p.price} onChange={(e) => { const n = [...config.plans]; n[i].price = e.target.value; setConfig({...config, plans: n}); }} />
                        </div>
                     ))}
                  </div>
               </TabsContent>
            </Tabs>

            <div className="pt-8 border-t border-[#222]">
               <h3 className="text-[8px] font-black uppercase tracking-[0.4em] mb-6 opacity-30">Seletor de Nicho Visual</h3>
               <div className="grid grid-cols-2 gap-3 pb-20">
                  <VisualThemeBtnMini id="restaurant" label="Gastro" img={ASSETS.restaurant} active={config.theme} set={(id) => setConfig({...config, theme: id})} />
                  <VisualThemeBtnMini id="personal" label="Fitness" img={ASSETS.personal} active={config.theme} set={(id) => setConfig({...config, theme: id})} />
                  <VisualThemeBtnMini id="clinica" label="Clínica" img={ASSETS.clinica} active={config.theme} set={(id) => setConfig({...config, theme: id})} />
                  <VisualThemeBtnMini id="lawyer" label="Jurídico" img={ASSETS.lawyer} active={config.theme} set={(id) => setConfig({...config, theme: id})} />
                  <VisualThemeBtnMini id="realestate" label="Imobi" img={ASSETS.realestate} active={config.theme} set={(id) => setConfig({...config, theme: id})} />
                  <VisualThemeBtnMini id="studio" label="Estúdio" img={ASSETS.studio} active={config.theme} set={(id) => setConfig({...config, theme: id})} />
               </div>
            </div>
         </div>
      </aside>

      {/* Area de Preview - Dashboard Visual */}
      <main className="flex-1 h-full overflow-y-auto p-12 bg-black relative">
         <div className="max-w-4xl mx-auto">
            <header className="flex justify-between items-center mb-16 px-4">
               <div>
                  <h2 className="text-4xl font-black italic uppercase tracking-tighter">PREVIEW <br /> <span className="text-[#bff720]">ESTRUTURAL</span></h2>
                  <p className="text-white/40 text-[10px] font-medium italic mt-2 uppercase tracking-widest">A visualização final segue o layout OpenClaw 0.1</p>
               </div>
               <div className="flex gap-4">
                  <a href="/proposta" target="_blank">
                     <Button variant="outline" className="rounded-full border-[#222] bg-[#111] gap-2 font-black uppercase text-[8px] tracking-widest"><Eye size={12}/> Visualizar LP Pública</Button>
                  </a>
                  <Button variant="outline" className="rounded-full border-[#222] bg-[#111] gap-2 font-black uppercase text-[8px] tracking-widest"><Share2 size={12}/> Link do Cliente</Button>
               </div>
            </header>

            <div className="space-y-12">
               <PreviewSection number="01" name="Hero" content={config.hero?.title} />
               <PreviewSection number="02" name="Estratégia" content={config.strategy?.problem} />
               <PreviewSection number="03" name="Oferta" content={`R$ ${config.plans?.[0]?.price || "---"}`} />
            </div>

            <div className="mt-24 p-12 rounded-[3rem] border border-[#222] bg-[#0A0A0A] flex flex-col items-center text-center">
               <div className="w-16 h-16 bg-[#111] border border-[#222] rounded-full flex items-center justify-center mb-8 text-[#bff720]"><Sparkles size={32}/></div>
               <p className="text-xl font-black italic uppercase tracking-tighter max-w-sm">Este builder foi otimizado para o layout OpenClaw da agência Inova.</p>
               <p className="text-[10px] text-white/20 mt-4 uppercase font-bold tracking-widest">© 2026 Inova Productions — v0.8</p>
            </div>
         </div>
      </main>
    </div>
  );
}

function SectionHeader({ title }: any) {
  return (
    <h3 className="text-[9px] font-black uppercase tracking-[0.4em] mb-6 text-[#bff720] italic flex items-center gap-2">
       <div className="h-[2px] w-4 bg-[#bff720]" /> {title}
    </h3>
  );
}

function SidebarField({ label, val, set, isArea }: any) {
  return (
    <div className="space-y-2">
      <Label className="text-[7px] font-black uppercase text-white/40 tracking-[0.2em]">{label}</Label>
      {isArea ? (
        <Textarea className="min-h-[80px] border-[#222] rounded-xl bg-black/40 p-4 font-bold italic focus-visible:ring-1 focus-visible:ring-[#bff720] transition-all text-[11px] leading-relaxed" value={val} onChange={(e) => set(e.target.value)} />
      ) : (
        <Input className="h-11 border-[#222] rounded-xl bg-black/40 px-4 font-black focus-visible:ring-1 focus-visible:ring-[#bff720] transition-all text-xs" value={val} onChange={(e) => set(e.target.value)} />
      )}
    </div>
  );
}

function VisualThemeBtnMini({ id, label, img, active, set }: any) {
  const isSelected = active === id;
  return (
    <button onClick={() => set(id)} className={`relative group w-full h-20 rounded-2xl overflow-hidden border transition-all ${isSelected ? 'border-[#bff720] ring-2 ring-[#bff720]/20' : 'border-[#222] grayscale hover:grayscale-0'}`}>
       <img src={img} alt={label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
       <div className={`absolute inset-0 ${isSelected ? 'bg-[#bff720]/10' : 'bg-black/60 group-hover:bg-black/30'}`} />
       <div className="absolute bottom-2 left-3 text-left">
          <p className="text-[8px] font-black text-white italic uppercase drop-shadow-md">{label}</p>
       </div>
    </button>
  );
}

function PreviewSection({ number, name, content }: any) {
  return (
    <div className="flex gap-8 group">
       <span className="text-4xl font-black italic opacity-5 group-hover:opacity-100 transition-opacity text-[#bff720]">{number}</span>
       <div className="pt-4 border-t border-[#222] flex-1">
          <p className="text-[8px] font-black uppercase tracking-[0.5em] text-white/20 mb-3">{name}</p>
          <p className="text-sm font-black italic uppercase leading-none opacity-40 group-hover:opacity-100 transition-opacity">{content?.substring(0, 100)}...</p>
       </div>
    </div>
  );
}
