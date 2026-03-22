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
  restaurant: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800",
  personal: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800",
  clinica: "https://images.unsplash.com/photo-1512290923902-8a9f81dc2069?auto=format&fit=crop&q=80&w=800",
  lawyer: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=800",
  realestate: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800",
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

// Helper para Deep Merge Seguro
const deepMerge = (target: any, source: any) => {
  for (const key in source) {
    if (source[key] instanceof Object && key in target) {
      Object.assign(source[key], deepMerge(target[key], source[key]));
    }
  }
  return { ...target, ...source };
};

export default function SalesEditorPage() {
  const [config, setConfig] = useState(DEFAULT_CONFIG);

  useEffect(() => {
    const saved = localStorage.getItem('agency_lp_config');
    if (saved) {
      try { 
        const parsed = JSON.parse(saved);
        // Deep merge para garantir que campos novos (strategy, badge, cta) existam se o usuário tinha config antiga
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
      catch (e) { 
        console.error("Erro ao carregar do storage:", e);
        setConfig(DEFAULT_CONFIG);
      }
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
          <div className="flex items-center gap-3 mb-4">
             <div className="w-3 h-3 bg-[#bff720] rounded-full animate-pulse" />
             <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 italic">Inova Narrative Engine</span>
          </div>
          <h1 className="text-5xl font-black tracking-tighter italic uppercase leading-none">BUILDER DE PROPOSTA</h1>
          <p className="text-muted-foreground font-medium italic mt-4 text-sm">Personalização total de cada pixel da sua oferta comercial.</p>
        </div>
        <Button onClick={handleSave} className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full h-16 px-14 gap-3 font-black uppercase text-xs shadow-[0_0_40px_rgba(191,247,32,0.2)] active:scale-95 transition-all">
          <Save size={20} /> PUBLICAR E ATUALIZAR
        </Button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4 space-y-6">
          <h3 className="text-[10px] font-black uppercase tracking-[0.4em] mb-6 opacity-30 flex items-center gap-2">
            <Layout size={14} /> Seletor Estratégico de Nicho
          </h3>
          <div className="grid grid-cols-1 gap-4 overflow-y-auto max-h-[85vh] pr-4 custom-scrollbar">
            <VisualThemeBtn id="restaurant" label="Gastronomia" img={ASSETS.restaurant} active={config.theme} set={(id) => setConfig({...config, theme: id})} />
            <VisualThemeBtn id="personal" label="Fitness / Performance" img={ASSETS.personal} active={config.theme} set={(id) => setConfig({...config, theme: id})} />
            <VisualThemeBtn id="clinica" label="Clínica / Estética" img={ASSETS.clinica} active={config.theme} set={(id) => setConfig({...config, theme: id})} />
            <VisualThemeBtn id="lawyer" label="Direito / Autoridade" img={ASSETS.lawyer} active={config.theme} set={(id) => setConfig({...config, theme: id})} />
            <VisualThemeBtn id="realestate" label="Imobiliária / Desejo" img={ASSETS.realestate} active={config.theme} set={(id) => setConfig({...config, theme: id})} />
            <VisualThemeBtn id="studio" label="Arsenal de Estúdio" img={ASSETS.inova} active={config.theme} set={(id) => setConfig({...config, theme: id})} />
          </div>
        </div>

        <div className="lg:col-span-8">
          <Tabs defaultValue="hero" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8 h-14 bg-card border border-border rounded-xl p-1 shadow-inner">
              <TabsTrigger value="hero" className="rounded-lg data-[state=active]:bg-background font-black uppercase text-[9px] tracking-widest gap-2"><ImageIcon size={12}/> Capa</TabsTrigger>
              <TabsTrigger value="copy" className="rounded-lg data-[state=active]:bg-background font-black uppercase text-[9px] tracking-widest gap-2"><MessageSquare size={12}/> Narrativa</TabsTrigger>
              <TabsTrigger value="items" className="rounded-lg data-[state=active]:bg-background font-black uppercase text-[9px] tracking-widest gap-2"><ListChecks size={12}/> Blocos</TabsTrigger>
              <TabsTrigger value="business" className="rounded-lg data-[state=active]:bg-background font-black uppercase text-[9px] tracking-widest gap-2"><BarChart3 size={12}/> Capital</TabsTrigger>
            </TabsList>

            <TabsContent value="hero" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
               <SectionCard title="Sua Headline de Impacto" icon={<Zap size={18}/>}>
                  <CardField label="Headline Principal" val={config.hero?.title || ""} set={(v: string) => setConfig({...config, hero: {...config.hero, title: v}})} isArea />
                  <CardField label="Subheadline (Promessa de Valor)" val={config.hero?.tagline || ""} set={(v: string) => setConfig({...config, hero: {...config.hero, tagline: v}})} isArea />
                  <div className="grid grid-cols-2 gap-6">
                    <CardField label="Call to Action (Botão)" val={config.hero?.cta || ""} set={(v: string) => setConfig({...config, hero: {...config.hero, cta: v}})} />
                    <CardField label="Badge Identificador" val={config.hero?.badge || ""} set={(v: string) => setConfig({...config, hero: {...config.hero, badge: v}})} />
                  </div>
               </SectionCard>
            </TabsContent>

            <TabsContent value="copy" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
               <SectionCard title="Estratégia do Problema vs Solução" icon={<Target size={18}/>}>
                  <CardField label="O Problema / Dor" val={config.strategy?.problem || ""} set={(v: string) => setConfig({...config, strategy: {...config.strategy, problem: v}})} isArea />
                  <CardField label="A Solução / Sua Narrativa" val={config.strategy?.solution || ""} set={(v: string) => setConfig({...config, strategy: {...config.strategy, solution: v}})} isArea />
                  <CardField label="Diferenciais (Separados por vírgula)" val={config.strategy?.results || ""} set={(v: string) => setConfig({...config, strategy: {...config.strategy, results: v}})} />
                  <CardField label="Etapas do Processo (Vírgula)" val={config.strategy?.steps || ""} set={(v: string) => setConfig({...config, strategy: {...config.strategy, steps: v}})} />
               </SectionCard>
            </TabsContent>

            <TabsContent value="items">
               <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xs font-black uppercase tracking-widest opacity-40">Arsenal de Expertises</h3>
                  <Button variant="outline" size="sm" className="rounded-full gap-2 border-border" onClick={() => setConfig({...config, services: [...config.services, {title: "Nova Expertise", desc: "Descrição...", icon: "Star"}]})}><Plus size={14}/> Adicionar Bloco</Button>
               </div>
               <div className="space-y-4">
                 {(config.services || []).map((s: any, i: number) => (
                   <SectionCard key={i} title={`Expertise #${i+1}`} icon={<Sparkles size={14}/>}>
                      <div className="flex justify-between gap-4 mb-4">
                         <Input className="font-black italic bg-background border-none p-0 text-xl" value={s.title || ""} onChange={(e) => { const n = [...config.services]; n[i].title = e.target.value; setConfig({...config, services: n}); }} />
                         <Button variant="ghost" className="text-destructive h-8 w-8 p-0" onClick={() => { const n = config.services.filter((_:any,idx:number)=>idx!==i); setConfig({...config, services: n}); }}><Trash2 size={14}/></Button>
                      </div>
                      <Textarea className="bg-background italic text-xs min-h-[60px] border-border/50" value={s.desc || ""} onChange={(e) => { const n = [...config.services]; n[i].desc = e.target.value; setConfig({...config, services: n}); }} />
                   </SectionCard>
                 ))}
               </div>
            </TabsContent>

            <TabsContent value="business">
               <SectionCard title="Planos de Assinatura Inova" icon={<CreditCard size={18}/>}>
                  {(config.plans || []).map((p: any, i: number) => (
                    <div key={i} className="mb-6 p-8 bg-background rounded-3xl border border-border">
                       <div className="flex justify-between items-center mb-6">
                          <Input className="font-black uppercase tracking-widest bg-transparent border-none w-1/2 p-0 h-auto text-xl" value={p.name || ""} onChange={(e) => { const n = [...config.plans]; n[i].name = e.target.value; setConfig({...config, plans: n}); }} />
                          <div className="flex items-center gap-2 bg-card px-3 py-1 rounded-full"><Label className="text-[8px] font-black italic">Destaque</Label><input type="checkbox" checked={p.popular || false} onChange={(e) => { const n = [...config.plans]; n[i].popular = e.target.checked; setConfig({...config, plans: n}); }} className="accent-primary" /></div>
                       </div>
                       <CardField label="Valor Mensal (R$)" val={p.price || ""} set={(v: string) => { const n = [...config.plans]; n[i].price = v; setConfig({...config, plans: n}); }} />
                    </div>
                  ))}
               </SectionCard>
               <SectionCard title="Canal de Fechamento" icon={<MessageCircle size={18}/>}>
                  <CardField label="WhatsApp de Atendimento" val={config.whatsapp || ""} set={(v: string) => setConfig({...config, whatsapp: v})} />
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
    <Card className="bg-card border-border rounded-3xl p-8 mb-6 shadow-sm group hover:ring-1 hover:ring-primary/10 transition-all">
      <div className="flex items-center gap-3 mb-8 opacity-40 group-hover:opacity-100 transition-opacity">
        <div className="text-primary">{icon}</div>
        <h3 className="text-[9px] font-black uppercase tracking-[0.4em] italic leading-none">{title}</h3>
      </div>
      <div className="space-y-6">{children}</div>
    </Card>
  );
}

function CardField({ label, val, set, isArea }: any) {
  return (
    <div className="space-y-3">
      <Label className="text-[8px] font-black uppercase text-muted-foreground tracking-[0.2em]">{label}</Label>
      {isArea ? (
        <Textarea className="min-h-[100px] border-border rounded-2xl bg-background/50 p-6 font-medium italic focus:ring-1 focus:ring-primary transition-all text-sm leading-relaxed" value={val} onChange={(e) => set(e.target.value)} />
      ) : (
        <Input className="h-14 border-border rounded-2xl bg-background/50 px-6 font-bold focus:ring-1 focus:ring-primary transition-all text-sm" value={val} onChange={(e) => set(e.target.value)} />
      )}
    </div>
  );
}

function VisualThemeBtn({ id, label, img, active, set }: any) {
  const isSelected = active === id;
  return (
    <button onClick={() => set(id)} className={`relative group w-full h-28 rounded-3xl overflow-hidden border-2 transition-all duration-500 ${isSelected ? 'border-primary ring-4 ring-primary/20 scale-[1.02] shadow-2xl shadow-primary/10' : 'border-border/60 grayscale hover:grayscale-0 hover:scale-[1.01]'}`}>
       <img src={img} alt={label} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
       <div className={`absolute inset-0 transition-opacity ${isSelected ? 'bg-primary/20' : 'bg-black/60 group-hover:bg-black/40'}`} />
       <div className="absolute inset-0 p-6 flex flex-col justify-end">
          <p className={`text-[8px] font-black uppercase tracking-[0.4em] mb-1 transition-colors ${isSelected ? 'text-white' : 'text-white/40'}`}>Nicho // Premium</p>
          <p className="text-lg font-black text-white italic uppercase leading-none drop-shadow-xl">{label}</p>
       </div>
       {isSelected && <div className="absolute top-4 right-6 bg-primary text-background rounded-full p-2 shadow-xl"><Zap size={14} fill="currentColor"/></div>}
    </button>
  );
}

import { MessageCircle, Sparkles } from 'lucide-react';
