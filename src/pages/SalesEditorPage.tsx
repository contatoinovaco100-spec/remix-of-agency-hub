import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Save, Plus, Trash2, Layout, Briefcase, DollarSign, Settings, Globe, Zap } from 'lucide-react';
import { toast } from 'sonner';

const DEFAULT_CONFIG = {
  theme: 'mobbin',
  hero: {
    title: "A AGÊNCIA QUE REALMENTE FAZ AS COISAS.",
    tagline: "Não entregamos apenas posts. Entregamos a infraestrutura de vendas e a estética de cinema que colocam sua marca no topo.",
    badge: "Proposta Digital 2026"
  },
  whatsapp: "5562999999999",
  services: [
    { title: "Produção Audiovisual", desc: "Equipamentos de cinema e edições que prendem a atenção nos primeiros segundos.", icon: "Video" },
    { title: "Inteligência Artificial", desc: "Processos de prospecção e planejamento tunados por IAs de última geração.", icon: "Bot" },
    { title: "Growth Marketing", desc: "Estratégias baseadas em dados para escalar faturamento e reconhecimento.", icon: "PieChart" },
    { title: "Digital Solutions", desc: "De Landing Pages a CRM, construímos a infraestrutura que sua empresa precisa.", icon: "Monitor" }
  ],
  plans: [
    {
      name: "Essential",
      price: "2.900",
      description: "Ideal para marcas que querem consistência e posicionamento nas redes sociais.",
      features: ["Gestão de Instagram & TikTok", "3 Postagens semanais (Reels/Feed)", "Design de alta performance", "Estratégia de Linhas Editoriais", "Relatório mensal de métricas"],
      accent: "text-[#bff720]",
      popular: false
    },
    {
      name: "Growth",
      price: "5.500",
      description: "Foco em escala, tráfego e produção de material visual de cinema.",
      features: ["Tudo do plano Essential", "Gestão de Tráfego Pago (Meta/Google)", "2 Visitas mensais para Filmagens", "Edição Premium com Storytelling", "Configuração de Funil de Vendas", "Suporte Prioritário via WhatsApp"],
      accent: "text-[#bff720]",
      popular: true
    },
    {
      name: "Elite",
      price: "12.000",
      description: "O braço direito completo para dominar o mercado com IA e Audiovisual.",
      features: ["Tudo do plano Growth", "Production Day: 4 Filmagens mensais", "Automação Inteligente (SDR & IA)", "Criação de Website / Landing Page", "Brand Consulting & Branding", "Diretoria de Criação Dedicada"],
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
        setConfig(JSON.parse(saved));
      } catch (e) {
        console.error('Error loading config', e);
      }
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('agency_lp_config', JSON.stringify(config));
    toast.success('Configurações da Landing Page salvas!');
  };

  const updateHero = (field: string, value: string) => {
    setConfig({ ...config, hero: { ...config.hero, [field]: value } });
  };

  const updateService = (index: number, field: string, value: string) => {
    const newServices = [...config.services];
    newServices[index] = { ...newServices[index], [field]: value };
    setConfig({ ...config, services: newServices });
  };

  const addService = () => {
    setConfig({
      ...config,
      services: [...config.services, { title: 'Novo Serviço', desc: 'Descrição do serviço', icon: 'Star' }]
    });
  };

  const removeService = (index: number) => {
    setConfig({ ...config, services: config.services.filter((_, i) => i !== index) });
  };

  const updatePlan = (index: number, field: string, value: any) => {
    const newPlans = [...config.plans];
    newPlans[index] = { ...newPlans[index], [field]: value };
    setConfig({ ...config, plans: newPlans });
  };

  const updateFeature = (planIndex: number, featureIndex: number, value: string) => {
    const newPlans = [...config.plans];
    newPlans[planIndex].features[featureIndex] = value;
    setConfig({ ...config, plans: newPlans });
  };

  const addFeature = (planIndex: number) => {
    const newPlans = [...config.plans];
    newPlans[planIndex].features.push('Nova funcionalidade');
    setConfig({ ...config, plans: newPlans });
  };

  const removeFeature = (planIndex: number, featureIndex: number) => {
    const newPlans = [...config.plans];
    newPlans[planIndex].features = newPlans[planIndex].features.filter((_, i) => i !== featureIndex);
    setConfig({ ...config, plans: newPlans });
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Editor da Landing Page</h1>
          <p className="text-muted-foreground">Personalize o conteúdo da sua proposta comercial digital.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" asChild>
            <a href="/proposta" target="_blank"><Globe className="mr-2 h-4 w-4" /> Ver Página</a>
          </Button>
          <Button onClick={handleSave} className="bg-[#bff720] hover:bg-[#bff720]/90 text-black font-bold">
            <Save className="mr-2 h-4 w-4" /> Salvar Edições
          </Button>
        </div>
      </div>

      <Tabs defaultValue="hero" className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-8">
          <TabsTrigger value="design"><Settings className="mr-2 h-4 w-4" /> Design</TabsTrigger>
          <TabsTrigger value="hero"><Layout className="mr-2 h-4 w-4" /> Hero</TabsTrigger>
          <TabsTrigger value="services"><Briefcase className="mr-2 h-4 w-4" /> Serviços</TabsTrigger>
          <TabsTrigger value="plans"><DollarSign className="mr-2 h-4 w-4" /> Planos</TabsTrigger>
          <TabsTrigger value="settings"><Globe className="mr-2 h-4 w-4" /> Geral</TabsTrigger>
        </TabsList>

        <TabsContent value="design">
          <Card>
            <CardHeader>
              <CardTitle>Template da Proposta</CardTitle>
              <CardDescription>Escolha o estilo visual da sua landing page.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8">
               <button 
                 onClick={() => setConfig({ ...config, theme: 'mobbin' })}
                 className={`p-6 rounded-3xl border-2 text-left transition-all ${config.theme === 'mobbin' ? 'border-[#bff720] bg-[#bff720]/5' : 'border-gray-100 bg-white hover:border-gray-200'}`}
               >
                 <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center mb-4"><Layout className="w-6 h-6 text-black" /></div>
                 <h4 className="font-black text-lg">Mobbin Style</h4>
                 <p className="text-xs text-gray-400 mt-1 uppercase font-bold tracking-widest">Clean • Grid • Discovery</p>
               </button>

               <button 
                 onClick={() => setConfig({ ...config, theme: 'openclaw' })}
                 className={`p-6 rounded-3xl border-2 text-left transition-all ${config.theme === 'openclaw' ? 'border-[#bff720] bg-black text-white' : 'border-gray-100 bg-white hover:border-gray-200'}`}
               >
                 <div className="w-12 h-12 rounded-2xl bg-zinc-800 flex items-center justify-center mb-4"><Zap className="w-6 h-6 text-[#bff720]" /></div>
                 <h4 className="font-black text-lg">OpenClaw Style</h4>
                 <p className="text-xs text-zinc-500 mt-1 uppercase font-bold tracking-widest text-[#bff720]">Dark • Premium • Cinematic</p>
               </button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hero">
          <Card>
            <CardHeader>
              <CardTitle>Seção Principal (Hero)</CardTitle>
              <CardDescription>O primeiro impacto que o cliente terá ao abrir sua proposta.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Título de Impacto (H1)</Label>
                <Input value={config.hero.title} onChange={e => updateHero('title', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Tagline / Subtítulo</Label>
                <Textarea value={config.hero.tagline} onChange={e => updateHero('tagline', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Badge de Topo</Label>
                <Input value={config.hero.badge} onChange={e => updateHero('badge', e.target.value)} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Nossos Serviços</h3>
              <Button size="sm" onClick={addService}><Plus className="h-4 w-4 mr-1" /> Add Serviço</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {config.services.map((s, i) => (
                <Card key={i}>
                  <CardHeader className="py-4 flex flex-row items-center justify-between">
                    <CardTitle className="text-sm">Serviço #{i + 1}</CardTitle>
                    <Button variant="ghost" size="sm" onClick={() => removeService(i)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Input placeholder="Título" value={s.title} onChange={e => updateService(i, 'title', e.target.value)} />
                    <Textarea placeholder="Descrição curta" value={s.desc} onChange={e => updateService(i, 'desc', e.target.value)} />
                    <Input placeholder="Ícone (Lucide name)" value={s.icon} onChange={e => updateService(i, 'icon', e.target.value)} />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="plans">
          <div className="space-y-8">
            {config.plans.map((p, i) => (
              <Card key={i} className={p.popular ? 'border-[#bff720]/50 shadow-md' : ''}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>Plano {p.name}</CardTitle>
                      <CardDescription>Configure o preço e as entregas deste nível.</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                       <Label className="text-xs">Popular?</Label>
                       <input 
                         type="checkbox" 
                         checked={p.popular} 
                         onChange={e => updatePlan(i, 'popular', e.target.checked)}
                         className="h-4 w-4 accent-[#bff720]"
                       />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                       <Label>Nome do Plano</Label>
                       <Input value={p.name} onChange={e => updatePlan(i, 'name', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                       <Label>Preço (R$)</Label>
                       <Input value={p.price} onChange={e => updatePlan(i, 'price', e.target.value)} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Descrição Curta</Label>
                    <Input value={p.description} onChange={e => updatePlan(i, 'description', e.target.value)} />
                  </div>
                  <div className="space-y-3">
                    <Label>Funcionalidades (Checklist)</Label>
                    {p.features.map((f, featureIdx) => (
                      <div key={featureIdx} className="flex gap-2">
                        <Input value={f} onChange={e => updateFeature(i, featureIdx, e.target.value)} />
                        <Button variant="ghost" size="sm" onClick={() => removeFeature(i, featureIdx)}><Trash2 className="h-4 w-4" /></Button>
                      </div>
                    ))}
                    <Button variant="outline" size="sm" className="w-full" onClick={() => addFeature(i)}><Plus className="h-4 w-4 mr-1" /> Add Funcionalidade</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Configurações Gerais</CardTitle>
              <CardDescription>Links e contatos da proposta.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>WhatsApp para Contato (DDI + DDD + Número)</Label>
                <Input value={config.whatsapp} onChange={e => setConfig({ ...config, whatsapp: e.target.value })} placeholder="Ex: 5562999999999" />
                <p className="text-[10px] text-muted-foreground">Este número será usado no botão de fechamento da Landing Page.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
