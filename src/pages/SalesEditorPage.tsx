import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Save, Plus, Trash2, Layout, Briefcase, DollarSign, Settings, Globe, Zap, CreditCard } from 'lucide-react';
import { toast } from 'sonner';

const DEFAULT_CONFIG = {
  theme: 'mobbin',
  hero: {
    title: "BRANDING AS A WEAPON. NARRATIVE AS POWER.",
    tagline: "Being seen is easy. Being remembered is strategy. We build perception, authority, and market dominance through high-end cinematic execution.",
    badge: "STRATEGIC POSITIONING 2026"
  },
  whatsapp: "5562999999999",
  services: [
    { title: "Narrative Architecture", desc: "Strategic positioning and differential mapping to dominate your market.", icon: "Layers" },
    { title: "Cinematic Production", desc: "Professional video capture and high-impact reels designed for authority.", icon: "Video" },
    { title: "Conversion Funnels", desc: "Strategic scripts and funnel structures focused on high-ticket sales.", icon: "Activity" },
    { title: "Authority Growth", desc: "Building a structured ecosystem for your brand to dominate the industry.", icon: "Crown" }
  ],
  plans: [
    {
      name: "Essential",
      price: "1.200",
      description: "For brands seeking consistency and clear positioning in the market.",
      features: ["Social Media Management", "3 Strategic posts weekly", "High-performance design", "Monthly reports"],
      accent: "text-[#bff720]",
      popular: false
    },
    {
      name: "Authority",
      price: "2.500",
      description: "Full-service production and high-impact sales funnel integration.",
      features: ["Paid Traffic (Meta/Google)", "2 Monthly Filming Visits", "Sales Funnel Structure", "VIP Support"],
      accent: "text-[#bff720]",
      popular: true
    },
    {
      name: "Elite",
      price: "5.000",
      description: "The complete strategic arm to control the narrative of your industry.",
      features: ["4 Production Days", "AI Automation (SDR)", "Branding Consulting", "Creative Direction"],
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
        if (!parsed.theme) parsed.theme = 'mobbin';
        setConfig(parsed);
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
      services: [...config.services, { title: "New Service", desc: "Service description", icon: "Star" }]
    });
  };

  const removeService = (index: number) => {
    const newServices = config.services.filter((_, i) => i !== index);
    setConfig({ ...config, services: newServices });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 pt-24 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black tracking-tight">PROPOSAL EDITOR</h1>
          <p className="text-gray-500 font-medium">Customize your strategic landing page in real-time.</p>
        </div>
        <Button onClick={handleSave} className="bg-black text-white rounded-full px-8 gap-2">
          <Save size={18} /> Save Changes
        </Button>
      </div>

      <Tabs defaultValue="design" className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-8">
          <TabsTrigger value="design"><Settings className="mr-2 h-4 w-4" /> Design</TabsTrigger>
          <TabsTrigger value="hero"><Layout className="mr-2 h-4 w-4" /> Hero</TabsTrigger>
          <TabsTrigger value="services"><Briefcase className="mr-2 h-4 w-4" /> Solutions</TabsTrigger>
          <TabsTrigger value="plans"><DollarSign className="mr-2 h-4 w-4" /> Pricing</TabsTrigger>
          <TabsTrigger value="settings"><Globe className="mr-2 h-4 w-4" /> Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="design">
          <Card>
            <CardHeader>
              <CardTitle>Template Selection</CardTitle>
              <CardDescription>Choose the visual style that fits your brand narrative.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-8">
               <button 
                 onClick={() => setConfig({ ...config, theme: 'mobbin' })}
                 className={`p-6 rounded-3xl border-2 text-left transition-all ${config.theme === 'mobbin' ? 'border-[#bff720] bg-[#bff720]/5' : 'border-gray-100 bg-white hover:border-gray-200'}`}
               >
                 <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center mb-4"><Layout className="w-6 h-6 text-black" /></div>
                 <h4 className="font-black text-lg">Mobbin Style</h4>
                 <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-widest">Clean • Grid • Elite</p>
               </button>

               <button 
                 onClick={() => setConfig({ ...config, theme: 'openclaw' })}
                 className={`p-6 rounded-3xl border-2 text-left transition-all ${config.theme === 'openclaw' ? 'border-[#bff720] bg-black text-white' : 'border-gray-100 bg-white hover:border-gray-200'}`}
               >
                 <div className="w-12 h-12 rounded-2xl bg-zinc-800 flex items-center justify-center mb-4"><Zap className="w-6 h-6 text-[#bff720]" /></div>
                 <h4 className="font-black text-lg">OpenClaw Style</h4>
                 <p className="text-[10px] text-zinc-500 mt-1 uppercase font-bold tracking-widest text-[#bff720]">Dark • Premium • Lux</p>
               </button>

               <button 
                 onClick={() => setConfig({ ...config, theme: 'fintech' })}
                 className={`p-6 rounded-3xl border-2 text-left transition-all ${config.theme === 'fintech' ? 'border-[#bff720] bg-[#001D11] text-white' : 'border-gray-100 bg-white hover:border-gray-200'}`}
               >
                 <div className="w-12 h-12 rounded-2xl bg-[#bff720]/10 flex items-center justify-center mb-4"><CreditCard className="w-6 h-6 text-[#bff720]" /></div>
                 <h4 className="font-black text-lg">Fintech Style</h4>
                 <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-widest text-[#bff720]">SaaS • Bank • Scale</p>
               </button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hero">
          <Card>
            <CardHeader>
              <CardTitle>Hero Section</CardTitle>
              <CardDescription>First impression is the positioning battlefield.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Title (Main Heading)</Label>
                <Input value={config.hero.title} onChange={(e) => setConfig({...config, hero: {...config.hero, title: e.target.value.toUpperCase()}})} />
              </div>
              <div className="space-y-2">
                <Label>Tagline (Subheading)</Label>
                <Textarea value={config.hero.tagline} onChange={(e) => setConfig({...config, hero: {...config.hero, tagline: e.target.value}})} />
              </div>
              <div className="space-y-2">
                <Label>Badge Text</Label>
                <Input value={config.hero.badge} onChange={(e) => setConfig({...config, hero: {...config.hero, badge: e.target.value.toUpperCase()}})} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Solutions & Expertises</CardTitle>
                <CardDescription>Managing how the market perceives your service.</CardDescription>
              </div>
              <Button onClick={addService} size="sm" variant="outline" className="rounded-full gap-2">
                <Plus size={16} /> Add Solution
              </Button>
            </CardHeader>
            <CardContent className="space-y-8">
              {config.services.map((s: any, i: number) => (
                <div key={i} className="p-6 border border-gray-100 rounded-3xl relative animate-in fade-in slide-in-from-top-4">
                  <Button onClick={() => removeService(i)} variant="ghost" size="icon" className="absolute top-4 right-4 text-red-500 hover:bg-red-50">
                    <Trash2 size={16} />
                  </Button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Solution Title</Label>
                      <Input value={s.title} onChange={(e) => {
                        const newServices = [...config.services];
                        newServices[i].title = e.target.value;
                        setConfig({...config, services: newServices});
                      }} />
                    </div>
                    <div className="space-y-2">
                      <Label>Icon Name (Lucide)</Label>
                      <Input value={s.icon} onChange={(e) => {
                        const newServices = [...config.services];
                        newServices[i].icon = e.target.value;
                        setConfig({...config, services: newServices});
                      }} />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label>Brief Description</Label>
                      <Textarea value={s.desc} onChange={(e) => {
                        const newServices = [...config.services];
                        newServices[i].desc = e.target.value;
                        setConfig({...config, services: newServices});
                      }} />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="plans">
          <Card>
            <CardHeader>
              <CardTitle>Investment Plans</CardTitle>
              <CardDescription>Control the value perception of your offers.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-12 pb-12">
               {config.plans.map((p: any, i: number) => (
                 <div key={i} className={`p-8 rounded-[2rem] border-2 ${p.popular ? 'border-[#bff720] bg-[#bff720]/5' : 'border-gray-100'} space-y-6`}>
                    <div className="flex justify-between items-center">
                       <h3 className="text-xl font-black">{p.name} Plan</h3>
                       <div className="flex items-center gap-2">
                          <Label className="text-[10px] font-black uppercase text-gray-400">Popular</Label>
                          <input type="checkbox" checked={p.popular} className="accent-[#bff720]" onChange={(e) => {
                             const newPlans = [...config.plans];
                             newPlans[i].popular = e.target.checked;
                             setConfig({...config, plans: newPlans});
                          }} />
                       </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>Plan Name</Label>
                        <Input value={p.name} onChange={(e) => {
                          const newPlans = [...config.plans];
                          newPlans[i].name = e.target.value;
                          setConfig({...config, plans: newPlans});
                        }} />
                      </div>
                      <div className="space-y-2">
                        <Label>Price (Monthly)</Label>
                        <Input value={p.price} onChange={(e) => {
                          const newPlans = [...config.plans];
                          newPlans[i].price = e.target.value;
                          setConfig({...config, plans: newPlans});
                        }} />
                      </div>
                    </div>
                    <div className="space-y-2">
                       <Label>Key Features (comma separated)</Label>
                       <Textarea value={p.features.join(', ')} onChange={(e) => {
                          const newPlans = [...config.plans];
                          newPlans[i].features = e.target.value.split(',').map(f => f.trim());
                          setConfig({...config, plans: newPlans});
                       }} />
                    </div>
                 </div>
               ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Global Settings</CardTitle>
              <CardDescription>Contact info and platform parameters.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>WhatsApp Number (With DDD)</Label>
                <Input value={config.whatsapp} onChange={(e) => setConfig({...config, whatsapp: e.target.value})} />
                <p className="text-[10px] text-gray-400">Format: 5562999999999</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="mt-20 text-center opacity-20 text-[10px] font-black uppercase tracking-widest italic">
        The Strategist • Narratives that Profit
      </div>
    </div>
  );
}
