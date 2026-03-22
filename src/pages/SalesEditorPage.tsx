import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Save, Plus, Trash2, Layout, Briefcase, DollarSign, Settings, Globe, 
  Zap, CreditCard, Apple, Camera, Gavel, Utensils, Dumbbell, Star, Layers, Video, Activity
} from 'lucide-react';
import { toast } from 'sonner';

const DEFAULT_CONFIG = {
  theme: 'mobbin',
  hero: {
    title: "ALÉM DA LENTE. CONSTRUÍMOS NARRATIVAS PODEROSAS.",
    tagline: "Ser visto é fácil. Ser lembrado é estratégia. Construímos percepção, autoridade e domínio de mercado através de execução cinematográfica de alto nível.",
    badge: "O ESTRATEGISTA • 2026"
  },
  whatsapp: "5562999999999",
  services: [
    { title: "Arquitetura de Narrativa", desc: "Posicionamento estratégico e mapeamento de diferenciais para definir como o mercado percebe sua marca.", icon: "Layers" },
    { title: "Produção Cinematográfica", desc: "Captação de vídeo de alto padrão e reels estratégicos desenhados para construir autoridade imediata.", icon: "Video" },
    { title: "Funis de Performance", desc: "Conteúdo focado em resultados e estruturas de funil voltadas para conversão de vendas de alto ticket.", icon: "Activity" },
    { title: "Domínio de Mercado", desc: "Um ecossistema estratégico completo para garantir que sua marca não seja apenas vista, mas lembrada.", icon: "Crown" }
  ],
  plans: [
    {
      name: "Fundação Estratégica",
      price: "1.200",
      description: "Para marcas que buscam consistência e posicionamento claro no mercado.",
      features: ["Gestão de Redes Sociais", "3 Posts estratégicos semanais", "Design de alta performance", "Relatórios mensais"],
      accent: "text-[#bff720]",
      popular: false
    },
    {
      name: "Domínio de Autoridade",
      price: "2.500",
      description: "Produção full-service e integração de funis de vendas de alto impacto.",
      features: ["Tráfego Pago (Meta/Google)", "2 Visitas de filmagem mensais", "Estrutura de Funil de Vendas", "Suporte VIP"],
      accent: "text-[#bff720]",
      popular: true
    },
    {
      name: "Ecossistema Elite",
      price: "5.000",
      description: "O braço estratégico completo para líderes de mercado que querem controlar a narrativa.",
      features: ["4 Dias de produção", "Automação de SDR com IA", "Consultoria de Branding", "Direção Criativa"],
      accent: "text-[#bff720]",
      popular: false
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
        <TabsList className="flex w-full mb-12 h-16 bg-zinc-50 border border-zinc-100 rounded-2xl p-2">
          <TabsTrigger value="design" className="flex-1 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm font-black uppercase text-[10px] tracking-widest text-zinc-500 data-[state=active]:text-zinc-900">Design</TabsTrigger>
          <TabsTrigger value="hero" className="flex-1 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm font-black uppercase text-[10px] tracking-widest text-zinc-500 data-[state=active]:text-zinc-900">Hero</TabsTrigger>
          <TabsTrigger value="services" className="flex-1 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm font-black uppercase text-[10px] tracking-widest text-zinc-500 data-[state=active]:text-zinc-900">Expertises</TabsTrigger>
          <TabsTrigger value="plans" className="flex-1 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm font-black uppercase text-[10px] tracking-widest text-zinc-500 data-[state=active]:text-zinc-900">Planos</TabsTrigger>
          <TabsTrigger value="settings" className="flex-1 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm font-black uppercase text-[10px] tracking-widest text-zinc-500 data-[state=active]:text-zinc-900">Vendas</TabsTrigger>
        </TabsList>

        <TabsContent value="design">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             <ThemeBtn id="mobbin" label="Mobbin Style" sub="Clean • Catálogo" icon={<Layout />} config={config} set={setConfig} />
             <ThemeBtn id="openclaw" label="OpenClaw Dark" sub="Cinema • Manifesto" icon={<Zap />} config={config} set={setConfig} color="bg-orange-500 text-white" />
             <ThemeBtn id="fintech" label="Fintech Growth" sub="Lógica • Escala" icon={<CreditCard />} config={config} set={setConfig} color="bg-emerald-500 text-white" />
             <ThemeBtn id="nutritionist" label="Nutrição Bio" sub="Limpo • Vital" icon={<Apple />} config={config} set={setConfig} color="bg-emerald-900 text-white" />
             <ThemeBtn id="studio" label="Arsenal Studio" sub="Gear • Sets" icon={<Camera />} config={config} set={setConfig} color="bg-[#bff720] text-black" />
             <ThemeBtn id="lawyer" label="Prestígio Juris" sub="Formal • Elite" icon={<Gavel />} config={config} set={setConfig} color="bg-blue-900 text-white" />
             <ThemeBtn id="restaurant" label="Gastro Story" sub="Sabor • Design" icon={<Utensils />} config={config} set={setConfig} color="bg-orange-900 text-white" />
             <ThemeBtn id="personal" label="Physique Power" sub="Força • Energia" icon={<Dumbbell />} config={config} set={setConfig} color="bg-zinc-900 text-[#bff720]" />
          </div>
        </TabsContent>

        <TabsContent value="hero" className="space-y-8 max-w-4xl">
          <CardField label="Título do Hero" val={config.hero.title} set={(v: string) => setConfig({...config, hero: {...config.hero, title: v.toUpperCase()}})} />
          <CardField label="Tagline Estratégica" val={config.hero.tagline} set={(v: string) => setConfig({...config, hero: {...config.hero, tagline: v}})} isArea />
          <CardField label="Badge Identificador" val={config.hero.badge} set={(v: string) => setConfig({...config, hero: {...config.hero, badge: v.toUpperCase()}})} />
        </TabsContent>

        <TabsContent value="services" className="space-y-8">
           <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-black italic uppercase">Estrutura de Especialidade</h3>
              <Button onClick={addService} size="sm" variant="outline" className="rounded-full gap-2 border-zinc-200 text-zinc-500"><Plus size={16} /> Adicionar Expertise</Button>
           </div>
           {config.services.map((s: any, i: number) => (
             <div key={i} className="p-8 bg-zinc-50 rounded-3xl border border-zinc-100 relative group transition-all hover:bg-zinc-100/50">
                <Button onClick={() => removeService(i)} variant="ghost" className="absolute top-6 right-6 text-zinc-300 hover:text-red-500"><Trash2 size={16} /></Button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <CardField label="Nome da Especialidade" val={s.title} set={(v: string) => { const n = [...config.services]; n[i].title = v; setConfig({...config, services: n}); }} />
                   <CardField label="Ícone Lucide" val={s.icon} set={(v: string) => { const n = [...config.services]; n[i].icon = v; setConfig({...config, services: n}); }} />
                   <CardField label="Descrição" val={s.desc} set={(v: string) => { const n = [...config.services]; n[i].desc = v; setConfig({...config, services: n}); }} isArea />
                </div>
             </div>
           ))}
        </TabsContent>

        <TabsContent value="plans" className="space-y-12">
           {config.plans.map((p: any, i: number) => (
             <div key={i} className={`p-10 rounded-[3rem] border-2 ${p.popular ? 'border-[#bff720] bg-[#bff720]/5' : 'border-zinc-100'}`}>
                <div className="flex justify-between items-center mb-8 border-b border-zinc-100 pb-8">
                   <h3 className="text-2xl font-black italic uppercase tracking-tighter">{p.name}</h3>
                   <div className="flex items-center gap-3">
                      <Label className="text-[10px] font-black uppercase text-zinc-400">Plano Recomendado</Label>
                      <input type="checkbox" checked={p.popular} className="w-5 h-5 accent-zinc-900" onChange={(e) => { const n = [...config.plans]; n[i].popular = e.target.checked; setConfig({...config, plans: n}); }} />
                   </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <CardField label="Investimento (R$)" val={p.price} set={(v: string) => { const n = [...config.plans]; n[i].price = v; setConfig({...config, plans: n}); }} />
                   <CardField label="Recursos (separados por vírgula)" val={Array.isArray(p.features) ? p.features.join(', ') : ''} set={(v: string) => { const n = [...config.plans]; n[i].features = v.split(',').map(f => f.trim()); setConfig({...config, plans: n}); }} isArea />
                </div>
             </div>
           ))}
        </TabsContent>

        <TabsContent value="settings">
           <Card className="rounded-[3rem] border-zinc-100 shadow-sm">
              <CardContent className="p-12 space-y-8">
                 <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase text-zinc-400">Canal Comercial (WhatsApp)</Label>
                    <Input className="h-16 rounded-2xl bg-zinc-50 border-none text-2xl font-black" value={config.whatsapp} onChange={(e) => setConfig({...config, whatsapp: e.target.value})} />
                    <p className="text-[10px] text-zinc-300 font-bold uppercase italic tracking-widest">Exemplo: 5562999999999</p>
                 </div>
              </CardContent>
           </Card>
        </TabsContent>
      </Tabs>
      
      <div className="mt-40 text-center opacity-10 text-[9px] font-black uppercase tracking-[0.6em] italic">O Estrategista • 2026</div>
    </div>
  );
}

function ThemeBtn({ id, label, sub, icon, config, set, color = "bg-zinc-100 text-zinc-900" }: any) {
  const active = config.theme === id;
  return (
    <button onClick={() => set({...config, theme: id})} className={`p-8 rounded-[2.5rem] border-2 text-left transition-all ${active ? 'border-zinc-900 bg-zinc-50 scale-105 shadow-xl' : 'border-zinc-100 bg-white hover:border-zinc-200'}`}>
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all ${active ? 'scale-110 shadow-lg' : ''} ${color}`}>{icon}</div>
      <h4 className="font-black text-sm uppercase italic tracking-tighter mb-1">{label}</h4>
      <p className="text-[9px] uppercase font-black text-zinc-300 tracking-[0.2em]">{sub}</p>
    </button>
  );
}

function CardField({ label, val, set, isArea }: any) {
  return (
    <div className="space-y-2">
      <Label className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">{label}</Label>
      {isArea ? (
        <Textarea className="min-h-[100px] border-zinc-100 rounded-2xl bg-zinc-50/50 p-6 font-medium italic focus:bg-white transition-all shadow-sm" value={val} onChange={(e) => set(e.target.value)} />
      ) : (
        <Input className="h-14 border-zinc-100 rounded-2xl bg-zinc-50/50 px-6 font-bold uppercase focus:bg-white transition-all shadow-sm" value={val} onChange={(e) => set(e.target.value)} />
      )}
    </div>
  );
}
