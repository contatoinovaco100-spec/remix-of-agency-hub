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
  Shield, Eye, Share2, Palette, Type
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
    heroTitleSize: "90",
    accentColor: "#bff720",
    fontFamily: "Inter",
    isItalic: true
  },
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
    toast.success('Projeto Publicado com Sucesso!');
  };

  return (
    <div className="flex h-screen bg-[#050505] text-white font-sans overflow-hidden selection:bg-[#bff720]/20">
      {/* Sidebar Ultra Professional Elementor Style */}
      <aside className="w-[420px] h-full bg-[#0a0a0a] border-r border-[#1a1a1a] flex flex-col z-50 shadow-[20px_0_50px_rgba(0,0,0,0.5)]">
         <div className="p-8 border-b border-[#1a1a1a] flex items-center justify-between bg-black/40 backdrop-blur-xl">
            <div className="flex items-center gap-3">
               <div className="w-2.5 h-2.5 bg-[#bff720] rounded-full animate-pulse shadow-[0_0_10px_#bff720]" />
               <span className="text-[10px] font-black uppercase tracking-[0.4em] italic text-[#bff720]">Inova Pro Studio</span>
            </div>
            <Button onClick={handleSave} size="sm" className="bg-[#bff720] text-black hover:bg-[#aef110] rounded-full px-6 h-10 font-extrabold uppercase text-[9px] gap-2 shadow-2xl shadow-[#bff720]/20 active:scale-95 transition-all">
               <Save size={16}/> Publicar
            </Button>
         </div>

         <div className="flex-1 overflow-y-auto p-8 custom-scrollbar space-y-10">
            <Tabs defaultValue="style" className="w-full">
               <TabsList className="grid w-full grid-cols-5 h-14 bg-black border border-[#1a1a1a] rounded-2xl p-1 mb-10 overflow-hidden shadow-inner">
                  <TabsTrigger value="style" className="rounded-xl data-[state=active]:bg-[#1a1a1a] data-[state=active]:text-[#bff720] font-black uppercase text-[7px] tracking-widest"><Palette size={16}/></TabsTrigger>
                  <TabsTrigger value="hero" className="rounded-xl data-[state=active]:bg-[#1a1a1a] data-[state=active]:text-[#bff720] font-black uppercase text-[7px] tracking-widest"><ImageIcon size={16}/></TabsTrigger>
                  <TabsTrigger value="copy" className="rounded-xl data-[state=active]:bg-[#1a1a1a] data-[state=active]:text-[#bff720] font-black uppercase text-[7px] tracking-widest"><MessageSquare size={16}/></TabsTrigger>
                  <TabsTrigger value="items" className="rounded-xl data-[state=active]:bg-[#1a1a1a] data-[state=active]:text-[#bff720] font-black uppercase text-[7px] tracking-widest"><ListChecks size={16}/></TabsTrigger>
                  <TabsTrigger value="business" className="rounded-xl data-[state=active]:bg-[#1a1a1a] data-[state=active]:text-[#bff720] font-black uppercase text-[7px] tracking-widest"><BarChart3 size={16}/></TabsTrigger>
               </TabsList>

               <TabsContent value="style" className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-300">
                  <SectionHeader title="Design & Personalidade" />
                  <SidebarField label="Tamanho da Headline (Hero)" val={config.styles?.heroTitleSize} set={(v: string) => setConfig({...config, styles: {...config.styles, heroTitleSize: v}})} placeholder="Ex: 90" />
                  <SidebarField label="Cor de Destaque (HEX)" val={config.styles?.accentColor} set={(v: string) => setConfig({...config, styles: {...config.styles, accentColor: v}})} />
                  <div className="space-y-2">
                     <Label className="text-[8px] font-black uppercase text-white/30 tracking-[0.2em]">Família Tipográfica</Label>
                     <select className="w-full h-12 bg-black/40 border border-[#1a1a1a] rounded-xl px-4 text-xs font-bold text-white outline-none focus:border-[#bff720] transition-colors appearance-none" value={config.styles?.fontFamily} onChange={(e) => setConfig({...config, styles: {...config.styles, fontFamily: e.target.value}})}>
                        <option value="Inter">Inter (Padrão Inova)</option>
                        <option value="Outfit">Outfit (Moderna)</option>
                        <option value="Michroma">Michroma (Tech)</option>
                        <option value="Syne">Syne (Agressiva)</option>
                        <option value="Italiana">Italiana (Luxo)</option>
                     </select>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-black/40 border border-[#1a1a1a] rounded-xl">
                      <Label className="text-[9px] font-black uppercase tracking-[0.1em]">Texto em Itálico</Label>
                      <input type="checkbox" checked={config.styles?.isItalic} onChange={(e) => setConfig({...config, styles: {...config.styles, isItalic: e.target.checked}})} className="accent-[#bff720] w-4 h-4" />
                  </div>
               </TabsContent>

               <TabsContent value="hero" className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-300">
                  <SectionHeader title="Capa & Visual" />
                  <SidebarField label="Título Principal" val={config.hero?.title} set={(v: string) => setConfig({...config, hero: {...config.hero, title: v}})} isArea />
                  <SidebarField label="Subheadline (Apoio)" val={config.hero?.tagline} set={(v: string) => setConfig({...config, hero: {...config.hero, tagline: v}})} isArea />
                  <SidebarField label="Texto do Botão (CTA)" val={config.hero?.cta} set={(v: string) => setConfig({...config, hero: {...config.hero, cta: v}})} />
                  <SidebarField label="Badge Identificador" val={config.hero?.badge} set={(v: string) => setConfig({...config, hero: {...config.hero, badge: v}})} />
               </TabsContent>

               <TabsContent value="copy" className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-300">
                  <SectionHeader title="Narrativa de Vendas" />
                  <SidebarField label="O Grande Problema" val={config.strategy?.problem} set={(v: string) => setConfig({...config, strategy: {...config.strategy, problem: v}})} isArea />
                  <SidebarField label="Sua Solução Única" val={config.strategy?.solution} set={(v: string) => setConfig({...config, strategy: {...config.strategy, solution: v}})} isArea />
                  <SidebarField label="Resultados (Vírgula)" val={config.strategy?.results} set={(v: string) => setConfig({...config, strategy: {...config.strategy, results: v}})} />
                  <SidebarField label="Fases do Funil (Vírgula)" val={config.strategy?.steps} set={(v: string) => setConfig({...config, strategy: {...config.strategy, steps: v}})} />
               </TabsContent>

               <TabsContent value="items" className="space-y-8 overflow-x-hidden">
                  <SectionHeader title="Arsenal Detalhado" />
                  {(config.services || []).map((s: any, i: number) => (
                    <div key={i} className="p-6 bg-[#0a0a0a] rounded-3xl border border-[#1a1a1a] group relative overflow-hidden transition-all hover:border-[#bff720]/30 shadow-xl">
                       <Button variant="ghost" className="absolute top-2 right-2 h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity text-destructive/60 hover:text-destructive" onClick={() => { const n = config.services.filter((_:any,idx:number)=>idx!==i); setConfig({...config, services: n}); }}><Trash2 size={16}/></Button>
                       <Input className="bg-transparent border-none p-0 font-black italic uppercase text-[11px] mb-3 text-[#bff720]" value={s.title} onChange={(e) => { const n = [...config.services]; n[i].title = e.target.value; setConfig({...config, services: n}); }} />
                       <Textarea className="bg-transparent border-none p-0 text-[10px] font-medium leading-relaxed h-20 min-h-[60px] text-white/60 focus-visible:ring-0" value={s.desc} onChange={(e) => { const n = [...config.services]; n[i].desc = e.target.value; setConfig({...config, services: n}); }} />
                    </div>
                  ))}
                  <Button variant="outline" className="w-full rounded-2xl border-[#1a1a1a] h-14 text-[9px] font-black uppercase tracking-[0.2em] gap-3 bg-black/40 hover:bg-[#bff720] hover:text-black transition-all" onClick={() => setConfig({...config, services: [...config.services, {title: "Nova Expertise", desc: "Descrição detalhada aqui...", icon: "Star"}]})}><Plus size={16}/> Adicionar Módulo</Button>
               </TabsContent>

               <TabsContent value="business" className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-300">
                  <SectionHeader title="Ofertas & Capital" />
                  <SidebarField label="WhatsApp de Fechamento" val={config.whatsapp} set={(v: string) => setConfig({...config, whatsapp: v})} />
                  <div className="grid grid-cols-1 gap-6 pt-6">
                     {(config.plans || []).map((p: any, i: number) => (
                        <div key={i} className="p-8 bg-black border border-[#1a1a1a] rounded-[2.5rem] relative group">
                           <Input className="bg-transparent border-none p-0 font-black uppercase text-[10px] mb-3 tracking-[0.2em] text-white/40" value={p.name} onChange={(e) => { const n = [...config.plans]; n[i].name = e.target.value; setConfig({...config, plans: n}); }} />
                           <div className="flex items-end gap-1">
                              <span className="text-xl font-black mb-2 opacity-20 italic">R$</span>
                              <Input className="bg-transparent border-none p-0 font-black text-4xl h-auto underline decoration-[#bff720]/10" value={p.price} onChange={(e) => { const n = [...config.plans]; n[i].price = e.target.value; setConfig({...config, plans: n}); }} />
                           </div>
                        </div>
                     ))}
                  </div>
               </TabsContent>
            </Tabs>

            <div className="pt-12 border-t border-[#1a1a1a]">
               <h3 className="text-[10px] font-black uppercase tracking-[0.4em] mb-8 opacity-20 italic">Mudar Template // Nicho</h3>
               <div className="grid grid-cols-2 gap-4 pb-24">
                  <VisualThemeBtnMini id="restaurant" label="Gastronomia" img={ASSETS.restaurant} active={config.theme} set={(id) => setConfig({...config, theme: id})} />
                  <VisualThemeBtnMini id="personal" label="Personal" img={ASSETS.personal} active={config.theme} set={(id) => setConfig({...config, theme: id})} />
                  <VisualThemeBtnMini id="clinica" label="Clínica" img={ASSETS.clinica} active={config.theme} set={(id) => setConfig({...config, theme: id})} />
                  <VisualThemeBtnMini id="lawyer" label="Jurídico" img={ASSETS.lawyer} active={config.theme} set={(id) => setConfig({...config, theme: id})} />
                  <VisualThemeBtnMini id="realestate" label="Imobiliária" img={ASSETS.realestate} active={config.theme} set={(id) => setConfig({...config, theme: id})} />
                  <VisualThemeBtnMini id="studio" label="Estúdio" img={ASSETS.studio} active={config.theme} set={(id) => setConfig({...config, theme: id})} />
               </div>
            </div>
         </div>
      </aside>

      {/* Preview Modern Dashboard */}
      <main className="flex-1 h-full overflow-y-auto p-16 bg-[#000] relative scroll-smooth custom-scrollbar">
         <div className="max-w-5xl mx-auto pb-40">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-10 border-b border-[#1a1a1a] pb-16">
               <div>
                  <h2 className="text-6xl font-black italic uppercase tracking-tighter leading-tight drop-shadow-2xl">ESTADO <br /> <span className="text-[#bff720]" style={{color: config.styles?.accentColor}}>DA ARTE.</span></h2>
                  <p className="text-white/30 text-xs font-bold mt-4 uppercase tracking-[0.4em] italic leading-relaxed">Cada pixel moldado para converter high-ticket.</p>
               </div>
               <div className="flex gap-4">
                  <a href="/proposta" target="_blank" className="relative group">
                     <div className="absolute inset-0 bg-[#bff720]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                     <Button variant="outline" className="rounded-full border-[#1a1a1a] bg-[#0a0a0a] h-14 px-10 gap-3 font-black uppercase text-[9px] tracking-[0.2em] relative transition-all active:scale-95"><Eye size={16}/> Previsualizar Live</Button>
                  </a>
               </div>
            </header>

            <div className="space-y-16">
               <PreviewCard label="Header // Headline" content={config.hero?.title} color={config.styles?.accentColor} />
               <PreviewCard label="Narrativa // Problema" content={config.strategy?.problem} />
               <PreviewCard label="Preço // Setup" content={`R$ ${config.plans?.[0]?.price || "---"}`} />
            </div>

            <div className="mt-40 p-20 rounded-[4rem] border border-[#1a1a1a] bg-[#050505] flex flex-col items-center text-center shadow-2xl relative overflow-hidden group">
               <div className="absolute inset-0 bg-gradient-to-tr from-[#bff720]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
               <div className="w-20 h-20 bg-[#0a0a0a] border border-[#1a1a1a] rounded-full flex items-center justify-center mb-10 text-[#bff720] shadow-[0_0_40px_rgba(191,247,32,0.1)]" style={{color: config.styles?.accentColor}}>
                  <Sparkles size={40}/>
               </div>
               <p className="text-3xl font-black italic uppercase tracking-tighter max-w-lg leading-tight">Você está moldando uma narrativa de milhões.</p>
               <p className="text-[10px] text-white/10 mt-8 uppercase font-black tracking-[1em] italic">Inova productions ecosystem v1.0</p>
            </div>
         </div>
      </main>
    </div>
  );
}

function SectionHeader({ title }: any) {
  return (
    <h3 className="text-[10px] font-black uppercase tracking-[0.4em] mb-10 text-[#bff720] italic flex items-center gap-3 decoration-[#bff720]/20 underline underline-offset-8">
       {title}
    </h3>
  );
}

function SidebarField({ label, val, set, isArea, placeholder }: any) {
  return (
    <div className="space-y-3 group">
      <Label className="text-[8px] font-black uppercase text-white/20 tracking-[0.2em] group-hover:text-white/40 transition-colors uppercase italic">{label}</Label>
      {isArea ? (
        <Textarea className="min-h-[100px] border-[#1a1a1a] border-2 rounded-2xl bg-[#080808] p-5 font-bold italic focus-visible:ring-1 focus-visible:ring-[#bff720] transition-all text-[12px] leading-relaxed text-white/80" value={val} onChange={(e) => set(e.target.value)} placeholder={placeholder} />
      ) : (
        <Input className="h-14 border-[#1a1a1a] border-2 rounded-2xl bg-[#080808] px-5 font-black focus-visible:ring-1 focus-visible:ring-[#bff720] transition-all text-xs text-white" value={val} onChange={(e) => set(e.target.value)} placeholder={placeholder} />
      )}
    </div>
  );
}

function VisualThemeBtnMini({ id, label, img, active, set }: any) {
  const isSelected = active === id;
  return (
    <button onClick={() => set(id)} className={`relative group w-full h-24 rounded-3xl overflow-hidden border-2 transition-all duration-500 ${isSelected ? 'border-[#bff720] ring-4 ring-[#bff720]/10 scale-[1.05]' : 'border-[#1a1a1a] grayscale hover:grayscale-0'}`}>
       <img src={img} alt={label} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-125" />
       <div className={`absolute inset-0 ${isSelected ? 'bg-[#bff720]/10' : 'bg-black/70 group-hover:bg-black/40'}`} />
       <div className="absolute bottom-3 left-4 text-left">
          <p className="text-[9px] font-black text-white italic uppercase drop-shadow-2xl tracking-tighter">{label}</p>
       </div>
    </button>
  );
}

function PreviewCard({ label, content, color }: any) {
  return (
    <div className="group border-l-2 border-[#1a1a1a] hover:border-[#bff720] pl-10 transition-all duration-500 py-4">
       <p className="text-[9px] font-black uppercase tracking-[0.6em] text-white/20 mb-6 group-hover:text-[#bff720] transition-colors">{label}</p>
       <p className="text-xl font-black italic uppercase leading-none opacity-40 group-hover:opacity-100 transition-opacity max-w-2xl" style={{color: color && '1' === '0' ? color : 'inherit'}}>{content}</p>
    </div>
  );
}
