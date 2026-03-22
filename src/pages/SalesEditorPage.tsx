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

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans p-8 pt-24 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-12 border-b border-zinc-100 pb-12">
        <div>
          <h1 className="text-5xl font-black tracking-tighter italic uppercase">EDITOR DE PROPOSTAS</h1>
          <p className="text-zinc-500 font-medium italic mt-2">Personalize sua narrativa de mercado em tempo real.</p>
        </div>
        <Button onClick={handleSave} className="bg-zinc-900 text-[#bff720] hover:bg-black rounded-full h-14 px-12 gap-3 font-black uppercase text-xs shadow-2xl">
          <Save size={18} /> APLICAR ALTERAÇÕES
        </Button>
      </div>

      <Tabs defaultValue="design" className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-12 h-16 bg-zinc-50 border border-zinc-100 rounded-2xl p-2 gap-2">
          <TabsTrigger value="design" className="rounded-xl data-[state=active]:bg-white shadow-none font-black uppercase text-[10px] tracking-widest text-zinc-500">Design</TabsTrigger>
          <TabsTrigger value="hero" className="rounded-xl data-[state=active]:bg-white shadow-none font-black uppercase text-[10px] tracking-widest text-zinc-500">Copy</TabsTrigger>
          <TabsTrigger value="services" className="rounded-xl data-[state=active]:bg-white shadow-none font-black uppercase text-[10px] tracking-widest text-zinc-500">Entregas</TabsTrigger>
          <TabsTrigger value="plans" className="rounded-xl data-[state=active]:bg-white shadow-none font-black uppercase text-[10px] tracking-widest text-zinc-500">Investimento</TabsTrigger>
          <TabsTrigger value="settings" className="rounded-xl data-[state=active]:bg-white shadow-none font-black uppercase text-[10px] tracking-widest text-zinc-500">Ajustes</TabsTrigger>
        </TabsList>

        <TabsContent value="design" className="animate-in fade-in duration-500">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <ThemeBtn id="restaurant" label="Gastronomia" sub="Sabor • Story" icon={<Utensils />} config={config} set={setConfig} color="bg-orange-600 text-white" />
              <ThemeBtn id="personal" label="Fitness" sub="Performance" icon={<Dumbbell />} config={config} set={setConfig} color="bg-zinc-900 text-[#bff720]" />
              <ThemeBtn id="clinica" label="Estética" sub="Referência" icon={<Stethoscope />} config={config} set={setConfig} color="bg-rose-500 text-white" />
              <ThemeBtn id="lawyer" label="Jurídico" sub="Autoridade" icon={<Gavel />} config={config} set={setConfig} color="bg-blue-900 text-white" />
              <ThemeBtn id="realestate" label="Imobiliária" sub="Desejo • Tour" icon={<Building2 />} config={config} set={setConfig} color="bg-amber-600 text-white" />
              
              <ThemeBtn id="mobbin" label="Mobbin Style" sub="Discovery" icon={<Layout />} config={config} set={setConfig} />
              <ThemeBtn id="openclaw" label="OpenClaw" sub="Manifesto" icon={<Zap />} config={config} set={setConfig} color="bg-zinc-800 text-orange-500" />
              <ThemeBtn id="fintech" label="Fintech" sub="Escala" icon={<CreditCard />} config={config} set={setConfig} color="bg-emerald-600 text-white" />
              <ThemeBtn id="studio" label="Arsenal" sub="Estúdio" icon={<Camera />} config={config} set={setConfig} color="bg-[#bff720] text-black" />
           </div>
        </TabsContent>

        <TabsContent value="hero" className="space-y-8 max-w-4xl">
           <CardField label="Título Principal (Headline)" val={config.hero.title} set={(v: string) => setConfig({...config, hero: {...config.hero, title: v}})} />
           <CardField label="Subheadline Estratégica" val={config.hero.tagline} set={(v: string) => setConfig({...config, hero: {...config.hero, tagline: v}})} isArea />
           <CardField label="Badge Identificador" val={config.hero.badge} set={(v: string) => setConfig({...config, hero: {...config.hero, badge: v.toUpperCase()}})} />
        </TabsContent>

        <TabsContent value="services" className="space-y-6">
           {config.services.map((s: any, i: number) => (
             <div key={i} className="p-8 bg-zinc-50 rounded-3xl border border-zinc-100 grid grid-cols-1 md:grid-cols-3 gap-6">
                <CardField label="Título" val={s.title} set={(v: string) => { const n = [...config.services]; n[i].title = v; setConfig({...config, services: n}); }} />
                <CardField label="Ícone" val={s.icon} set={(v: string) => { const n = [...config.services]; n[i].icon = v; setConfig({...config, services: n}); }} />
                <CardField label="Descrição" val={s.desc} set={(v: string) => { const n = [...config.services]; n[i].desc = v; setConfig({...config, services: n}); }} />
             </div>
           ))}
        </TabsContent>

        <TabsContent value="plans" className="space-y-8">
           {config.plans.map((p: any, i: number) => (
             <div key={i} className={`p-10 rounded-3xl border-2 ${p.popular ? 'border-[#bff720] bg-zinc-50' : 'border-zinc-100 bg-white'}`}>
                <div className="flex justify-between items-center mb-6">
                   <h3 className="text-xl font-black uppercase italic">{p.name}</h3>
                   <input type="checkbox" checked={p.popular} className="w-5 h-5" onChange={(e) => { const n = [...config.plans]; n[i].popular = e.target.checked; setConfig({...config, plans: n}); }} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <CardField label="Preço (R$)" val={p.price} set={(v: string) => { const n = [...config.plans]; n[i].price = v; setConfig({...config, plans: n}); }} />
                   <CardField label="Entregas (vírgula)" val={Array.isArray(p.features) ? p.features.join(', ') : ''} set={(v: string) => { const n = [...config.plans]; n[i].features = v.split(',').map(f => f.trim()); setConfig({...config, plans: n}); }} isArea />
                </div>
             </div>
           ))}
        </TabsContent>

        <TabsContent value="settings">
           <Card className="rounded-3xl border-zinc-100 shadow-sm">
              <CardContent className="p-12">
                 <Label className="text-[10px] font-black uppercase text-zinc-400">Canal Comercial (WhatsApp)</Label>
                 <Input className="h-16 rounded-2xl bg-zinc-50 border-none text-2xl font-black mt-2" value={config.whatsapp} onChange={(e) => setConfig({...config, whatsapp: e.target.value})} />
              </CardContent>
           </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ThemeBtn({ id, label, sub, icon, config, set, color = "bg-zinc-100 text-zinc-900" }: any) {
  const active = config.theme === id;
  return (
    <button onClick={() => set({...config, theme: id})} className={`p-6 rounded-3xl border-2 text-left transition-all ${active ? 'border-zinc-900 bg-zinc-50 scale-105 shadow-xl' : 'border-zinc-100 bg-white hover:border-zinc-200'}`}>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all ${active ? 'scale-110 shadow-lg' : ''} ${color}`}>{icon}</div>
      <h4 className="font-black text-xs uppercase italic truncate mb-1">{label}</h4>
      <p className="text-[8px] uppercase font-black text-zinc-300 tracking-widest">{sub}</p>
    </button>
  );
}

function CardField({ label, val, set, isArea }: any) {
  return (
    <div className="space-y-2">
      <Label className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">{label}</Label>
      {isArea ? (
        <Textarea className="min-h-[80px] border-zinc-100 rounded-xl bg-zinc-50/50 p-4 font-medium italic focus:bg-white transition-all shadow-sm" value={val} onChange={(e) => set(e.target.value)} />
      ) : (
        <Input className="h-12 border-zinc-100 rounded-xl bg-zinc-50/50 px-4 font-bold focus:bg-white transition-all shadow-sm" value={val} onChange={(e) => set(e.target.value)} />
      )}
    </div>
  );
}
