import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Save, Plus, Trash2, Layout, Briefcase, DollarSign, Settings, Globe, 
  Zap, CreditCard, Apple, Camera, Gavel, Utensils, Dumbbell, Star, Layers, Video, Activity, Stethoscope, Building2
} from 'lucide-react';
import { toast } from 'sonner';

const DEFAULT_CONFIG = {
  theme: 'restaurant',
  hero: {
    title: "Seu restaurante pode estar cheio… mas invisível no digital.",
    tagline: "Transformamos restaurantes em marcas desejadas nas redes sociais.",
    badge: "INOVA PRODUÇÕES • 2026"
  },
  whatsapp: "5562999999999",
  services: [
    { title: "Planejamento Estratégico", desc: "Mapeamento de diferenciais e posicionamento.", icon: "Layers" },
    { title: "Vídeos High-End", desc: "Produção cinematográfica para redes sociais.", icon: "Video" },
    { title: "Conteúdo Diário", desc: "Reels, Ads e Stories com intenção de venda.", icon: "Activity" }
  ],
  plans: [
    {
      name: "Plano Start",
      price: "1500",
      features: ["6 vídeos estratégicos", "1 vídeo institucional", "2 captações mensais", "Planejamento mensal", "Copy estratégica", "Edição profissional"],
      popular: false
    },
    {
      name: "Plano Advanced",
      price: "2300",
      features: ["9 vídeos estratégicos", "1 vídeo institucional", "Planejamento completo", "Estratégia de funil", "Relatório de performance"],
      popular: true
    }
  ]
};

export default function SalesEditorPage() {
  const [config, setConfig] = useState(DEFAULT_CONFIG);

  useEffect(() => {
    const saved = localStorage.getItem('agency_lp_config');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setConfig({
          ...DEFAULT_CONFIG,
          ...parsed,
          hero: { ...DEFAULT_CONFIG.hero, ...parsed.hero },
          services: parsed.services || DEFAULT_CONFIG.services,
          plans: (parsed.plans || DEFAULT_CONFIG.plans).map((p: any, i: number) => ({
            ...DEFAULT_CONFIG.plans[i],
            ...p,
            features: p.features || DEFAULT_CONFIG.plans[i]?.features || []
          }))
        });
      } catch (e) {
        console.error('Erro ao carregar config', e);
      }
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('agency_lp_config', JSON.stringify(config));
    toast.success('Configuração da proposta salva com sucesso!');
  };

  const addService = () => {
    setConfig({
      ...config,
      services: [...config.services, { title: "Nova Expertise", desc: "Descrição...", icon: "Star" }]
    });
  };

  const removeService = (index: number) => {
    const newServices = config.services.filter((_, i) => i !== index);
    setConfig({ ...config, services: newServices });
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans p-8 pt-24 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-12 border-b border-border pb-12">
        <div>
          <h1 className="text-5xl font-black tracking-tighter italic uppercase">EDITOR DE PROPOSTAS</h1>
          <p className="text-muted-foreground font-medium italic mt-2">Personalize sua narrativa de mercado em tempo real.</p>
        </div>
        <Button onClick={handleSave} className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full h-14 px-12 gap-3 font-black uppercase text-xs shadow-2xl">
          <Save size={18} /> APLICAR ALTERAÇÕES
        </Button>
      </div>

      <Tabs defaultValue="design" className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-12 h-16 bg-card border border-border rounded-2xl p-2 gap-2">
          <TabsTrigger value="design" className="rounded-xl data-[state=active]:bg-background shadow-none font-black uppercase text-[10px] tracking-widest text-muted-foreground data-[state=active]:text-foreground">Design</TabsTrigger>
          <TabsTrigger value="hero" className="rounded-xl data-[state=active]:bg-background shadow-none font-black uppercase text-[10px] tracking-widest text-muted-foreground data-[state=active]:text-foreground">Copy</TabsTrigger>
          <TabsTrigger value="services" className="rounded-xl data-[state=active]:bg-background shadow-none font-black uppercase text-[10px] tracking-widest text-muted-foreground data-[state=active]:text-foreground">Entregas</TabsTrigger>
          <TabsTrigger value="plans" className="rounded-xl data-[state=active]:bg-background shadow-none font-black uppercase text-[10px] tracking-widest text-muted-foreground data-[state=active]:text-foreground">Investimento</TabsTrigger>
          <TabsTrigger value="settings" className="rounded-xl data-[state=active]:bg-background shadow-none font-black uppercase text-[10px] tracking-widest text-muted-foreground data-[state=active]:text-foreground">Ajustes</TabsTrigger>
        </TabsList>

        <TabsContent value="design" className="animate-in fade-in duration-500">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <ThemeBtn id="restaurant" label="Gastronomia" sub="Sabor • Story" icon={<Utensils />} config={config} set={setConfig} color="bg-orange-600/20 text-orange-500 border-orange-500/30" />
              <ThemeBtn id="personal" label="Fitness" sub="Performance" icon={<Dumbbell />} config={config} set={setConfig} color="bg-primary/10 text-primary border-primary/30" />
              <ThemeBtn id="clinica" label="Estética" sub="Referência" icon={<Stethoscope />} config={config} set={setConfig} color="bg-rose-500/20 text-rose-500 border-rose-500/30" />
              <ThemeBtn id="lawyer" label="Jurídico" sub="Autoridade" icon={<Gavel />} config={config} set={setConfig} color="bg-blue-500/20 text-blue-500 border-blue-500/30" />
              <ThemeBtn id="realestate" label="Imobiliária" sub="Desejo • Tour" icon={<Building2 />} config={config} set={setConfig} color="bg-amber-500/20 text-amber-500 border-amber-500/30" />
              
              <ThemeBtn id="mobbin" label="Mobbin Style" sub="Discovery" icon={<Layout />} config={config} set={setConfig} />
              <ThemeBtn id="openclaw" label="OpenClaw" sub="Manifesto" icon={<Zap />} config={config} set={setConfig} color="bg-orange-600/20 text-orange-500 border-orange-500/30" />
              <ThemeBtn id="fintech" label="Fintech" sub="Escala" icon={<CreditCard />} config={config} set={setConfig} color="bg-emerald-600/20 text-emerald-500 border-emerald-500/30" />
              <ThemeBtn id="studio" label="Arsenal" sub="Estúdio" icon={<Camera />} config={config} set={setConfig} color="bg-primary/10 text-primary border-primary/30" />
           </div>
        </TabsContent>

        <TabsContent value="hero" className="space-y-8 max-w-4xl">
           <Card className="bg-card border-border rounded-3xl p-8 space-y-8">
              <CardField label="Título Principal (Headline)" val={config.hero.title} set={(v: string) => setConfig({...config, hero: {...config.hero, title: v}})} />
              <CardField label="Subheadline Estratégica" val={config.hero.tagline} set={(v: string) => setConfig({...config, hero: {...config.hero, tagline: v}})} isArea />
              <CardField label="Badge Identificador" val={config.hero.badge} set={(v: string) => setConfig({...config, hero: {...config.hero, badge: v.toUpperCase()}})} />
           </Card>
        </TabsContent>

        <TabsContent value="services" className="space-y-6">
           <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-black italic uppercase">Estrutura de Especialidade</h3>
              <Button onClick={addService} size="sm" variant="outline" className="rounded-full gap-2 border-border text-muted-foreground"><Plus size={16} /> Adicionar Expertise</Button>
           </div>
           {config.services.map((s: any, i: number) => (
             <div key={i} className="p-8 bg-card rounded-3xl border border-border relative group transition-all hover:border-primary/30">
                <Button onClick={() => removeService(i)} variant="ghost" className="absolute top-6 right-6 text-muted-foreground hover:text-destructive"><Trash2 size={16} /></Button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <CardField label="Título" val={s.title} set={(v: string) => { const n = [...config.services]; n[i].title = v; setConfig({...config, services: n}); }} />
                   <CardField label="Ícone" val={s.icon} set={(v: string) => { const n = [...config.services]; n[i].icon = v; setConfig({...config, services: n}); }} />
                   <CardField label="Descrição" val={s.desc} set={(v: string) => { const n = [...config.services]; n[i].desc = v; setConfig({...config, services: n}); }} isArea />
                </div>
             </div>
           ))}
        </TabsContent>

        <TabsContent value="plans" className="space-y-8">
           {config.plans.map((p: any, i: number) => (
             <div key={i} className={`p-10 rounded-3xl border-2 ${p.popular ? 'border-primary bg-primary/5' : 'border-border bg-card'}`}>
                <div className="flex justify-between items-center mb-6">
                   <h3 className="text-xl font-black uppercase italic">{p.name}</h3>
                   <div className="flex items-center gap-3">
                      <Label className="text-[10px] font-black uppercase text-muted-foreground">Recomendado</Label>
                      <input type="checkbox" checked={p.popular} className="w-5 h-5 accent-primary" onChange={(e) => { const n = [...config.plans]; n[i].popular = e.target.checked; setConfig({...config, plans: n}); }} />
                   </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <CardField label="Preço (R$)" val={p.price} set={(v: string) => { const n = [...config.plans]; n[i].price = v; setConfig({...config, plans: n}); }} />
                   <CardField label="Entregas (vírgula)" val={Array.isArray(p.features) ? p.features.join(', ') : ''} set={(v: string) => { const n = [...config.plans]; n[i].features = v.split(',').map(f => f.trim()); setConfig({...config, plans: n}); }} isArea />
                </div>
             </div>
           ))}
        </TabsContent>

        <TabsContent value="settings">
           <Card className="rounded-3xl border-border bg-card shadow-sm">
              <CardContent className="p-12">
                 <Label className="text-[10px] font-black uppercase text-muted-foreground">Canal Comercial (WhatsApp)</Label>
                 <Input className="h-16 rounded-2xl bg-background border-border text-2xl font-black mt-2 text-primary" value={config.whatsapp} onChange={(e) => setConfig({...config, whatsapp: e.target.value})} />
              </CardContent>
           </Card>
        </TabsContent>
      </Tabs>
      
      <div className="mt-40 text-center opacity-10 text-[9px] font-black uppercase tracking-[0.6em] italic">O Estrategista • 2026</div>
    </div>
  );
}

function ThemeBtn({ id, label, sub, icon, config, set, color = "bg-muted/50 text-muted-foreground border-border/50" }: any) {
  const active = config.theme === id;
  return (
    <button onClick={() => set({...config, theme: id})} className={`p-6 rounded-3xl border-2 text-left transition-all ${active ? 'border-primary bg-primary/10 shadow-lg scale-105' : 'border-border bg-card hover:border-muted-foreground/30'}`}>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all border ${active ? 'scale-110 shadow-lg' : ''} ${color}`}>{icon}</div>
      <h4 className="font-black text-xs uppercase italic truncate mb-1">{label}</h4>
      <p className="text-[8px] uppercase font-black text-muted-foreground tracking-widest">{sub}</p>
    </button>
  );
}

function CardField({ label, val, set, isArea }: any) {
  return (
    <div className="space-y-2">
      <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">{label}</Label>
      {isArea ? (
        <Textarea className="min-h-[80px] border-border rounded-xl bg-background/50 p-4 font-medium italic focus:border-primary transition-all shadow-sm" value={val} onChange={(e) => set(e.target.value)} />
      ) : (
        <Input className="h-12 border-border rounded-xl bg-background/50 px-4 font-bold focus:border-primary transition-all shadow-sm" value={val} onChange={(e) => set(e.target.value)} />
      )}
    </div>
  );
}
