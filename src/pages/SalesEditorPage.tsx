import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Save, Plus, Trash2, Layout, Zap, CreditCard, Camera, Gavel, 
  Utensils, Dumbbell, Stethoscope, Building2, MousePointer2, 
  MessageSquare, BarChart3, ListChecks, Edit3, Image as ImageIcon
} from 'lucide-react';
import { toast } from 'sonner';

const ASSETS = {
  restaurant: "file:///Users/lucassoares/.gemini/antigravity/brain/70a0d96f-4a74-42d0-b5c4-b4af4b35c6d6/luxury_restaurant_hero_v1774133230214_1774147543501.png",
  personal: "file:///Users/lucassoares/.gemini/antigravity/brain/70a0d96f-4a74-42d0-b5c4-b4af4b35c6d6/futuristic_gym_hero_v1774133230214_1774147559627.png",
  clinica: "file:///Users/lucassoares/.gemini/antigravity/brain/70a0d96f-4a74-42d0-b5c4-b4af4b35c6d6/luxury_clinic_hero_v1774133230214_1774147578064.png",
  lawyer: "file:///Users/lucassoares/.gemini/antigravity/brain/70a0d96f-4a74-42d0-b5c4-b4af4b35c6d6/luxury_lawyer_hero_v1774133230214_1774147696964.png",
  realestate: "file:///Users/lucassoares/.gemini/antigravity/brain/70a0d96f-4a74-42d0-b5c4-b4af4b35c6d6/luxury_realestate_hero_v1774133230214_1774147714444.png",
  inova: "https://images.unsplash.com/photo-1635776062127-d379bfcbb9c8?auto=format&fit=crop&q=80&w=800"
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
  const [activeTheme, setActiveTheme] = useState('restaurant');
  const [config, setConfig] = useState(DEFAULT_CONFIG);

  useEffect(() => {
    const saved = localStorage.getItem('agency_lp_config');
    if (saved) {
      try { setConfig({ ...DEFAULT_CONFIG, ...JSON.parse(saved) }); } 
      catch (e) { console.error(e); }
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('agency_lp_config', JSON.stringify(config));
    toast.success('Landing Page atualizada com sucesso!');
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans p-6 pt-20 max-w-[1400px] mx-auto pb-40">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-border pb-12 gap-6">
        <div>
          <Badge className="bg-primary/10 text-primary border-none mb-4 px-4 py-1 uppercase font-black tracking-widest text-[8px]">PROPOSTA ELEMENTOR STYLE</Badge>
          <h1 className="text-5xl font-black tracking-tighter italic uppercase leading-none">CONSTRUTOR DE NARRATIVA</h1>
          <p className="text-muted-foreground font-medium italic mt-4 text-sm">Edição granular de todos os blocos da sua Landing Page.</p>
        </div>
        <Button onClick={handleSave} className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full h-16 px-14 gap-3 font-black uppercase text-xs shadow-[0_0_40px_rgba(191,247,32,0.2)] transition-all active:scale-95">
          <Save size={20} /> PUBLICAR ALTERAÇÕES
        </Button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Esquerda: Seletor de Temas Visual */}
        <div className="lg:col-span-4 space-y-6">
          <h3 className="text-[10px] font-black uppercase tracking-[0.4em] mb-6 opacity-30 flex items-center gap-2">
            <Layout size={14} /> Seleção Visual de Nicho
          </h3>
          <div className="grid grid-cols-1 gap-4 overflow-y-auto max-h-[80vh] pr-2 custom-scrollbar">
            <VisualThemeBtn id="restaurant" label="Gastronomia" img={ASSETS.restaurant} active={config.theme} set={(id) => setConfig({...config, theme: id})} />
            <VisualThemeBtn id="personal" label="Fitness / Personal" img={ASSETS.personal} active={config.theme} set={(id) => setConfig({...config, theme: id})} />
            <VisualThemeBtn id="clinica" label="Clínica Estética" img={ASSETS.clinica} active={config.theme} set={(id) => setConfig({...config, theme: id})} />
            <VisualThemeBtn id="lawyer" label="Direito / Advocacia" img={ASSETS.lawyer} active={config.theme} set={(id) => setConfig({...config, theme: id})} />
            <VisualThemeBtn id="realestate" label="Imobiliária High-End" img={ASSETS.realestate} active={config.theme} set={(id) => setConfig({...config, theme: id})} />
            <VisualThemeBtn id="studio" label="Arsenal (Estúdio)" img={ASSETS.inova} active={config.theme} set={(id) => setConfig({...config, theme: id})} />
          </div>
        </div>

        {/* Direita: Edição de Blocos (Elementor Style) */}
        <div className="lg:col-span-8">
          <Tabs defaultValue="hero" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8 h-14 bg-card border border-border rounded-xl p-1">
              <TabsTrigger value="hero" className="rounded-lg data-[state=active]:bg-background font-black uppercase text-[9px] tracking-widest gap-2"><Edit3 size={12}/> Hero</TabsTrigger>
              <TabsTrigger value="copy" className="rounded-lg data-[state=active]:bg-background font-black uppercase text-[9px] tracking-widest gap-2"><MessageSquare size={12}/> Estratégia</TabsTrigger>
              <TabsTrigger value="items" className="rounded-lg data-[state=active]:bg-background font-black uppercase text-[9px] tracking-widest gap-2"><ListChecks size={12}/> Blocos</TabsTrigger>
              <TabsTrigger value="business" className="rounded-lg data-[state=active]:bg-background font-black uppercase text-[9px] tracking-widest gap-2"><BarChart3 size={12}/> Faturamento</TabsTrigger>
            </TabsList>

            <TabsContent value="hero" className="space-y-6">
               <SectionCard title="Capa (Hero Section)" icon={<ImageIcon size={18}/>}>
                  <CardField label="Headline (Título Épico)" val={config.hero.title} set={(v: string) => setConfig({...config, hero: {...config.hero, title: v}})} isArea />
                  <CardField label="Subheadline (Promessa)" val={config.hero.tagline} set={(v: string) => setConfig({...config, hero: {...config.hero, tagline: v}})} isArea />
                  <div className="grid grid-cols-2 gap-6">
                    <CardField label="Texto Botão (CTA)" val={config.hero.cta} set={(v: string) => setConfig({...config, hero: {...config.hero, cta: v}})} />
                    <CardField label="Identificador de Versão" val={config.hero.badge} set={(v: string) => setConfig({...config, hero: {...config.hero, badge: v}})} />
                  </div>
               </SectionCard>
            </TabsContent>

            <TabsContent value="copy" className="space-y-6">
               <SectionCard title="A Jornada Estratégica" icon={<Target size={18}/>}>
                  <CardField label="O Problema (Dor do Cliente)" val={config.strategy.problem} set={(v: string) => setConfig({...config, strategy: {...config.strategy, problem: v}})} isArea />
                  <CardField label="A Solução (Seu Diferencial)" val={config.strategy.solution} set={(v: string) => setConfig({...config, strategy: {...config.strategy, solution: v}})} isArea />
                  <CardField label="Resultados Esperados (Separados por vírgula)" val={config.strategy.results} set={(v: string) => setConfig({...config, strategy: {...config.strategy, results: v}})} />
                  <CardField label="Etapas do Processo (Separadas por vírgula)" val={config.strategy.steps} set={(v: string) => setConfig({...config, strategy: {...config.strategy, steps: v}})} />
               </SectionCard>
            </TabsContent>

            <TabsContent value="items" className="space-y-6">
               <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xs font-black uppercase tracking-widest opacity-40">Expertises Integradas</h3>
                  <Button variant="outline" size="sm" className="rounded-full gap-2 border-border" onClick={() => setConfig({...config, services: [...config.services, {title: "Nova", desc: "Desc", icon: "Star"}]})}><Plus size={14}/> Adicionar</Button>
               </div>
               {config.services.map((s: any, i: number) => (
                 <SectionCard key={i} title={`Entrega #${i+1}`} icon={<Plus size={14}/>}>
                    <div className="flex justify-between gap-4 mb-4">
                       <Input className="font-black italic bg-background" value={s.title} onChange={(e) => { const n = [...config.services]; n[i].title = e.target.value; setConfig({...config, services: n}); }} />
                       <Button variant="ghost" className="text-destructive h-10 w-10 p-0" onClick={() => { const n = config.services.filter((_:any,idx:number)=>idx!==i); setConfig({...config, services: n}); }}><Trash2 size={16}/></Button>
                    </div>
                    <Textarea className="bg-background italic text-xs min-h-[60px]" value={s.desc} onChange={(e) => { const n = [...config.services]; n[i].desc = e.target.value; setConfig({...config, services: n}); }} />
                 </SectionCard>
               ))}
            </TabsContent>

            <TabsContent value="business" className="space-y-6">
               <SectionCard title="Planos de Escala" icon={<CreditCard size={18}/>}>
                  {config.plans.map((p: any, i: number) => (
                    <div key={i} className="mb-8 p-6 bg-background rounded-2xl border border-border">
                       <div className="flex justify-between items-center mb-4">
                          <Input className="font-black uppercase tracking-widest bg-transparent border-none w-1/2 p-0 h-auto text-lg" value={p.name} onChange={(e) => { const n = [...config.plans]; n[i].name = e.target.value; setConfig({...config, plans: n}); }} />
                          <div className="flex items-center gap-2"><Label className="text-[9px] font-black italic">Popular</Label><input type="checkbox" checked={p.popular} onChange={(e) => { const n = [...config.plans]; n[i].popular = e.target.checked; setConfig({...config, plans: n}); }} /></div>
                       </div>
                       <CardField label="Investimento Mensal (R$)" val={p.price} set={(v: string) => { const n = [...config.plans]; n[i].price = v; setConfig({...config, plans: n}); }} />
                    </div>
                  ))}
               </SectionCard>
               <SectionCard title="Configurações de Conversão" icon={<Settings size={18}/>}>
                  <CardField label="Número do WhatsApp (DDI + DDD + Número)" val={config.whatsapp} set={(v: string) => setConfig({...config, whatsapp: v})} />
               </SectionCard>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

function SectionCard({ title, icon, children }: any) {
  return (
    <Card className="bg-card border-border rounded-3xl p-8 mb-6 shadow-sm group">
      <div className="flex items-center gap-3 mb-8 opacity-40 group-hover:opacity-100 transition-opacity">
        <div className="text-primary">{icon}</div>
        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] italic">{title}</h3>
      </div>
      <div className="space-y-6">{children}</div>
    </Card>
  );
}

function CardField({ label, val, set, isArea }: any) {
  return (
    <div className="space-y-3">
      <Label className="text-[9px] font-black uppercase text-muted-foreground tracking-[0.2em]">{label}</Label>
      {isArea ? (
        <Textarea className="min-h-[100px] border-border rounded-2xl bg-background/50 p-5 font-medium italic focus:border-primary transition-all text-sm leading-relaxed" value={val} onChange={(e) => set(e.target.value)} />
      ) : (
        <Input className="h-14 border-border rounded-2xl bg-background/50 px-5 font-bold focus:border-primary transition-all text-sm" value={val} onChange={(e) => set(e.target.value)} />
      )}
    </div>
  );
}

function VisualThemeBtn({ id, label, img, active, set }: any) {
  const isSelected = active === id;
  return (
    <button onClick={() => set(id)} className={`relative group w-full h-32 rounded-3xl overflow-hidden border-2 transition-all duration-500 ${isSelected ? 'border-primary ring-4 ring-primary/20 scale-[1.02]' : 'border-border grayscale hover:grayscale-0 hover:scale-[1.01]'}`}>
       <img src={img} alt={label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
       <div className={`absolute inset-0 transition-opacity ${isSelected ? 'bg-primary/20' : 'bg-black/60 group-hover:bg-black/40'}`} />
       <div className="absolute bottom-4 left-6 text-left">
          <p className={`text-[8px] font-black uppercase tracking-[0.5em] mb-1 transition-colors ${isSelected ? 'text-white' : 'text-white/40'}`}>Nicho Estratégico</p>
          <p className="text-xl font-black text-white italic uppercase drop-shadow-lg">{label}</p>
       </div>
       {isSelected && <div className="absolute top-4 right-6 bg-primary text-black rounded-full p-1"><Zap size={14} fill="currentColor"/></div>}
    </button>
  );
}
