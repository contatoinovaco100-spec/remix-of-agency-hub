import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Save, Plus, Trash2, Layout, Briefcase, DollarSign, Settings, Globe, Zap, CreditCard, Apple, Camera, Gavel, Utensils, Dumbbell } from 'lucide-react';
import { toast } from 'sonner';

const DEFAULT_CONFIG = {
  theme: 'mobbin',
  hero: {
    title: "BEYOND THE LENS. WE BUILD POWERFUL NARRATIVES.",
    tagline: "Being seen is easy. Being remembered is strategy. We build perception, authority, and market dominance through high-end cinematic execution.",
    badge: "THE STRATEGIST • 2026"
  },
  whatsapp: "5562999999999",
  services: [
    { title: "Narrative Architecture", desc: "Strategic positioning and differential mapping to define how the market perceives your brand.", icon: "Layers" },
    { title: "Cinematic Production", desc: "High-end video capture and strategic reels designed to build immediate authority.", icon: "Video" },
    { title: "Performance Funnels", desc: "Result-driven content and funnel structures focused on high-ticket sales conversion.", icon: "Activity" },
    { title: "Market Dominance", desc: "A complete strategic ecosystem to ensure your brand is not just seen, but remembered.", icon: "Crown" }
  ],
  plans: [
    {
      name: "Strategic Foundation",
      price: "1.200",
      description: "For brands seeking consistency and clear positioning in the market.",
      features: ["Social Media Management", "3 Strategic posts weekly", "High-performance design", "Monthly reports"],
      accent: "text-[#bff720]",
      popular: false
    },
    {
      name: "Authority Dominance",
      price: "2.500",
      description: "Full-service production and high-impact sales funnel integration.",
      features: ["Paid Traffic (Meta/Google)", "2 Monthly Filming Visits", "Sales Funnel Structure", "VIP Support"],
      accent: "text-[#bff720]",
      popular: true
    },
    {
      name: "Elite Ecosystem",
      price: "5.000",
      description: "The complete strategic arm for market leaders who want to control the narrative.",
      features: ["4 Production Days", "AI-Powered SDR Automation", "Branding Consulting", "Creative Direction"],
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
        console.error('Error loading config', e);
      }
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('agency_lp_config', JSON.stringify(config));
    toast.success('Proposal configuration saved successfully!');
  };

  const addService = () => {
    setConfig({
      ...config,
      services: [...config.services, { title: "New Expertise", desc: "Expertise description", icon: "Star" }]
    });
  };

  const removeService = (index: number) => {
    const newServices = config.services.filter((_, i) => i !== index);
    setConfig({ ...config, services: newServices });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 pt-24 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-black tracking-tight italic">PROPOSAL ENGINE</h1>
          <p className="text-gray-500 font-medium italic underline decoration-[#bff720] decoration-4 underline-offset-4">Building elite market narratives.</p>
        </div>
        <Button onClick={handleSave} className="bg-black text-white rounded-full h-12 px-10 gap-2 font-black uppercase tracking-widest text-[10px]">
          <Save size={16} /> Deploy Changes
        </Button>
      </div>

      <Tabs defaultValue="design" className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-12 h-14 bg-white border border-gray-100 rounded-full p-1 shadow-sm">
          <TabsTrigger value="design" className="rounded-full"><Layout className="mr-2 h-4 w-4" /> Design</TabsTrigger>
          <TabsTrigger value="hero" className="rounded-full"><Zap className="mr-2 h-4 w-4" /> Hero</TabsTrigger>
          <TabsTrigger value="services" className="rounded-full"><Briefcase className="mr-2 h-4 w-4" /> Solutions</TabsTrigger>
          <TabsTrigger value="plans" className="rounded-full"><DollarSign className="mr-2 h-4 w-4" /> Pricing</TabsTrigger>
          <TabsTrigger value="settings" className="rounded-full"><Globe className="mr-2 h-4 w-4" /> Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="design" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Card className="rounded-[3rem] border-none shadow-xl bg-white overflow-hidden">
            <CardHeader className="p-10 border-b border-gray-50">
              <CardTitle className="text-2xl font-black italic uppercase">Niche Ecosystem</CardTitle>
              <CardDescription className="italic font-medium">Select a thematic design carefully crafted for specific high-end markets.</CardDescription>
            </CardHeader>
            <CardContent className="p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
               {/* Original Themes */}
               <ThemeButton id="mobbin" label="Mobbin Discovery" sub="Clean • Catalog" icon={<Layout className="w-5 h-5"/>} current={config.theme} set={() => setConfig({...config, theme: 'mobbin'})} />
               <ThemeButton id="openclaw" label="OpenClaw Dark" sub="Cinema • Manifesto" icon={<Zap className="w-5 h-5"/>} current={config.theme} set={() => setConfig({...config, theme: 'openclaw'})} isDark />
               <ThemeButton id="fintech" label="Fintech Growth" sub="Logic • Revenue" icon={<CreditCard className="w-5 h-5"/>} current={config.theme} set={() => setConfig({...config, theme: 'fintech'})} className="bg-[#001D11] text-white" />
               
               {/* 5 New Thematic Themes */}
               <ThemeButton id="nutritionist" label="Health Protocol" sub="Clean • Vitality" icon={<Apple className="w-5 h-5"/>} current={config.theme} set={() => setConfig({...config, theme: 'nutritionist'})} className="bg-[#FDFCFB] border-emerald-100" />
               <ThemeButton id="studio" label="Studio Arsenal" sub="Gear • Scenery" icon={<Camera className="w-5 h-5"/>} current={config.theme} set={() => setConfig({...config, theme: 'studio'})} isDark />
               <ThemeButton id="lawyer" label="Legal Prestige" sub="Trust • Defense" icon={<Gavel className="w-5 h-5"/>} current={config.theme} set={() => setConfig({...config, theme: 'lawyer'})} className="bg-[#0A0D14] text-white" />
               <ThemeButton id="restaurant" label="Gastro Authority" sub="Taste • Story" icon={<Utensils className="w-5 h-5"/>} current={config.theme} set={() => setConfig({...config, theme: 'restaurant'})} className="bg-[#0F0A0A] text-[#F3EFE0]" />
               <ThemeButton id="personal" label="Physique Power" sub="Results • Energy" icon={<Dumbbell className="w-5 h-5"/>} current={config.theme} set={() => setConfig({...config, theme: 'personal'})} isDark />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hero">
          <Card className="rounded-[3rem] border-none shadow-xl bg-white">
            <CardHeader className="p-10"><CardTitle className="text-2xl font-black italic uppercase">Hero Narrative</CardTitle></CardHeader>
            <CardContent className="p-10 space-y-6">
              <div className="space-y-2"><Label className="text-[10px] font-black uppercase tracking-widest">Main Title</Label><Input className="h-14 rounded-2xl" value={config.hero.title} onChange={(e) => setConfig({...config, hero: {...config.hero, title: e.target.value.toUpperCase()}})} /></div>
              <div className="space-y-2"><Label className="text-[10px] font-black uppercase tracking-widest">Tagline Narrative</Label><Textarea className="min-h-[120px] rounded-2xl" value={config.hero.tagline} onChange={(e) => setConfig({...config, hero: {...config.hero, tagline: e.target.value}})} /></div>
              <div className="space-y-2"><Label className="text-[10px] font-black uppercase tracking-widest">Badge ID</Label><Input className="h-14 rounded-2xl bg-gray-50" value={config.hero.badge} onChange={(e) => setConfig({...config, hero: {...config.hero, badge: e.target.value.toUpperCase()}})} /></div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services">
          <Card className="rounded-[3rem] border-none shadow-xl bg-white">
            <CardHeader className="p-10 flex flex-row items-center justify-between"><CardTitle className="text-2xl font-black italic uppercase">Strategic Expertise</CardTitle><Button onClick={addService} size="sm" variant="outline" className="rounded-full gap-2 border-black/5">Add Power Item</Button></CardHeader>
            <CardContent className="p-10 space-y-8">
              {config.services.map((s: any, i: number) => (
                <div key={i} className="p-8 border border-gray-100 rounded-[2.5rem] relative group hover:border-[#bff720]/40 transition-all">
                  <Button onClick={() => removeService(i)} variant="ghost" size="icon" className="absolute top-6 right-6 text-red-100 hover:text-red-500 hover:bg-red-50"><Trash2 size={16} /></Button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2"><Label className="text-[10px] font-black uppercase">Expertise Title</Label><Input className="rounded-xl bg-gray-50" value={s.title} onChange={(e) => { const newServices = [...config.services]; newServices[i].title = e.target.value; setConfig({...config, services: newServices}); }} /></div>
                    <div className="space-y-2"><Label className="text-[10px] font-black uppercase">Icon Hook (Lucide)</Label><Input className="rounded-xl bg-gray-50" value={s.icon} onChange={(e) => { const newServices = [...config.services]; newServices[i].icon = e.target.value; setConfig({...config, services: newServices}); }} /></div>
                    <div className="space-y-2 md:col-span-2"><Label className="text-[10px] font-black uppercase">Narrative Description</Label><Textarea className="rounded-xl min-h-[80px]" value={s.desc} onChange={(e) => { const newServices = [...config.services]; newServices[i].desc = e.target.value; setConfig({...config, services: newServices}); }} /></div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="plans">
           <Card className="rounded-[3rem] border-none shadow-xl bg-white">
            <CardHeader className="p-10"><CardTitle className="text-2xl font-black italic uppercase">Investment Models</CardTitle></CardHeader>
            <CardContent className="p-10 space-y-12">
               {config.plans.map((p: any, i: number) => (
                 <div key={i} className={`p-10 rounded-[3rem] border-2 ${p.popular ? 'border-[#bff720] bg-[#bff720]/5' : 'border-gray-50'}`}>
                    <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-6"><h3 className="text-xl font-black italic uppercase">{p.name} Scale</h3><input type="checkbox" checked={p.popular} className="w-5 h-5 accent-zinc-900" onChange={(e) => { const newPlans = [...config.plans]; newPlans[i].popular = e.target.checked; setConfig({...config, plans: newPlans}); }} /></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6">
                      <div className="space-y-2"><Label className="text-[10px] font-black uppercase">Label</Label><Input className="rounded-xl" value={p.name} onChange={(e) => { const newPlans = [...config.plans]; newPlans[i].name = e.target.value; setConfig({...config, plans: newPlans}); }} /></div>
                      <div className="space-y-2"><Label className="text-[10px] font-black uppercase">Price</Label><Input className="rounded-xl" value={p.price} onChange={(e) => { const newPlans = [...config.plans]; newPlans[i].price = e.target.value; setConfig({...config, plans: newPlans}); }} /></div>
                    </div>
                    <div className="space-y-2"><Label className="text-[10px] font-black uppercase">Strategic Features (comma separated)</Label><Textarea className="rounded-xl" value={Array.isArray(p.features) ? p.features.join(', ') : ''} onChange={(e) => { const newPlans = [...config.plans]; newPlans[i].features = e.target.value.split(',').map(f => f.trim()); setConfig({...config, plans: newPlans}); }} /></div>
                 </div>
               ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card className="rounded-[3rem] border-none shadow-xl bg-white overflow-hidden">
             <CardContent className="p-12 space-y-6">
                <div className="space-y-2"><Label className="text-[10px] font-black uppercase tracking-widest text-[#bff720]">Direct Channel (WhatsApp)</Label><Input className="h-14 rounded-2xl bg-gray-50 border-none font-black text-xl" value={config.whatsapp} onChange={(e) => setConfig({...config, whatsapp: e.target.value})} /><p className="text-[9px] text-gray-300 font-bold uppercase tracking-widest">Example: 5562999999999</p></div>
             </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <div className="mt-20 text-center opacity-10 text-[9px] font-black uppercase tracking-[0.5em] italic">The Strategist • Building Narrative Equity</div>
    </div>
  );
}

function ThemeButton({ id, label, sub, icon, current, set, isDark, className = "" }: any) {
  const active = current === id;
  return (
    <button 
      onClick={set}
      className={`p-6 rounded-[2.5rem] border-2 text-left transition-all relative overflow-hidden group ${active ? 'border-[#bff720] scale-105 shadow-xl ring-4 ring-[#bff720]/5' : 'border-gray-100 bg-white hover:border-gray-200'} ${className}`}
    >
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-12 transition-transform ${isDark ? 'bg-zinc-800 text-[#bff720]' : 'bg-gray-50 text-black'}`}>
         {icon}
      </div>
      <h4 className="font-black text-sm italic uppercase tracking-tight">{label}</h4>
      <p className={`text-[9px] mt-1 uppercase font-bold tracking-widest opacity-40 ${isDark ? 'text-white' : 'text-gray-500'}`}>{sub}</p>
      {active && <div className="absolute top-4 right-4 text-[#bff720] text-[8px] font-black uppercase tracking-widest italic animate-bounce">Active</div>}
    </button>
  );
}
