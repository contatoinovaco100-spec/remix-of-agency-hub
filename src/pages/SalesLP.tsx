import { motion } from 'framer-motion';
import { 
  Rocket, 
  Target, 
  Zap, 
  CheckCircle2, 
  ArrowRight, 
  MessageCircle, 
  ShieldCheck, 
  PieChart, 
  Video, 
  Monitor,
  Sparkles,
  Bot
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function SalesLP() {
  const plans = [
    {
      name: "Essential",
      price: "2.900",
      description: "Ideal para marcas que querem consistência e posicionamento nas redes sociais.",
      features: [
        "Gestão de Instagram & TikTok",
        "3 Postagens semanais (Reels/Feed)",
        "Design de alta performance",
        "Estratégia de Linhas Editoriais",
        "Relatório mensal de métricas"
      ],
      color: "from-blue-500/20 to-cyan-500/20",
      accent: "text-blue-400"
    },
    {
      name: "Growth",
      price: "5.500",
      description: "Foco em escala, tráfego e produção de material visual de cinema.",
      features: [
        "Tudo do plano Essential",
        "Gestão de Tráfego Pago (Meta/Google)",
        "2 Visitas mensais para Filmagens",
        "Edição Premium com Storytelling",
        "Configuração de Funil de Vendas",
        "Suporte Prioritário via WhatsApp"
      ],
      color: "from-[#f43f5e]/20 to-orange-500/20",
      accent: "text-[#f43f5e]",
      popular: true
    },
    {
      name: "Elite",
      price: "12.000",
      description: "O braço direito completo para dominar o mercado com IA e Audiovisual.",
      features: [
        "Tudo do plano Growth",
        "Production Day: 4 Filmagens mensais",
        "Automação Inteligente (SDR & IA)",
        "Criação de Website / Landing Page",
        "Brand Consulting & Branding",
        "Diretoria de Criação Dedicada"
      ],
      color: "from-purple-500/20 to-pink-500/20",
      accent: "text-purple-400"
    }
  ];

  const services = [
    { icon: <Video className="w-6 h-6" />, title: "Produção Audiovisual", desc: "Equipamentos de cinema e edições que prendem a atenção nos primeiros segundos." },
    { icon: <Bot className="w-6 h-6" />, title: "Inteligência Artificial", desc: "Processos de prospecção e planejamento tunados por IAs de última geração." },
    { icon: <PieChart className="w-6 h-6" />, title: "Growth Marketing", desc: "Estratégias baseadas em dados para escalar faturamento e reconhecimento." },
    { icon: <Monitor className="w-6 h-6" />, title: "Digital Solutions", desc: "De Landing Pages a CRM, construímos a infraestrutura que sua empresa precisa." }
  ];

  return (
    <div className="min-h-screen bg-[#030712] text-white selection:bg-[#f43f5e]/30 font-sans selection:text-white overflow-x-hidden">
      
      {/* Glow Effects */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-[#f43f5e]/10 rounded-full blur-[120px] -z-10 pointer-events-none" />

      {/* Nav */}
      <nav className="max-w-7xl mx-auto px-6 py-8 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-[#f43f5e] p-1.5 rounded-lg">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-black tracking-tighter italic">INOVA CO.</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-widest text-zinc-400">
          <a href="#servicos" className="hover:text-white transition-colors">Serviços</a>
          <a href="#precos" className="hover:text-white transition-colors">Preços</a>
          <a href="#cta" className="bg-white/5 px-4 py-2 rounded-full border border-white/10 hover:bg-white/10 transition-colors">Agendar Reunião</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Badge className="mb-6 bg-[#f43f5e]/10 text-[#f43f5e] border-[#f43f5e]/20 px-4 py-1 text-xs uppercase tracking-[0.2em] font-black">
            Proposta Digital 2026
          </Badge>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
            A AGÊNCIA QUE <span className="text-zinc-500">REALMENTE</span> <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-zinc-600">FAZ AS COISAS.</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 font-medium italic">
            Não entregamos apenas posts. Entregamos a infraestrutura de vendas e a estética de cinema que colocam sua marca no topo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-[#f43f5e] hover:bg-[#f43f5e]/90 text-white rounded-full h-14 px-10 text-lg font-bold shadow-2xl shadow-[#f43f5e]/30 group">
              Aceitar Proposta <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" className="rounded-full h-14 px-10 border-white/10 bg-white/5 hover:bg-white/10 text-lg font-bold">
              Falar com Strategist
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Services Grid */}
      <section id="servicos" className="max-w-7xl mx-auto px-6 py-32 border-t border-white/5">
        <div className="mb-16">
          <h2 className="text-xs font-black text-[#f43f5e] tracking-[0.3em] uppercase mb-4">Core Capabilities</h2>
          <p className="text-3xl font-bold tracking-tight">O que fazemos por você.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-[#f43f5e]/30 transition-all group"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#f43f5e]/10 flex items-center justify-center text-[#f43f5e] mb-6 group-hover:scale-110 transition-transform">
                {s.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{s.title}</h3>
              <p className="text-zinc-500 leading-relaxed text-sm">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing / Proposal Section */}
      <section id="precos" className="max-w-7xl mx-auto px-6 py-32 bg-gradient-to-b from-transparent to-[#050505] rounded-[50px]">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-black tracking-tight mb-4 italic">PLANOS E INVESTIMENTO</h2>
          <p className="text-zinc-500 font-medium">Estruturas modulares pensadas para o seu momento de escala.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {plans.map((p, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className={`relative p-10 rounded-[40px] border ${p.popular ? 'border-[#f43f5e]/40 bg-white/[0.03]' : 'border-white/10 bg-black/40'} flex flex-col`}
            >
              {p.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#f43f5e] text-white text-[10px] font-black uppercase px-4 py-1.5 rounded-full tracking-widest shadow-lg shadow-[#f43f5e]/40">
                  Mais Escolhido
                </div>
              )}
              <div className="mb-8">
                <span className={`text-sm font-black uppercase tracking-widest ${p.accent}`}>{p.name}</span>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-black leading-none">R$ {p.price}</span>
                  <span className="text-zinc-500 font-bold">/mês</span>
                </div>
                <p className="mt-4 text-zinc-400 text-sm leading-relaxed">{p.description}</p>
              </div>

              <div className="space-y-4 mb-10 flex-1">
                {p.features.map((f, j) => (
                  <div key={j} className="flex items-start gap-3">
                    <CheckCircle2 className={`w-5 h-5 mt-0.5 shrink-0 ${p.accent}`} />
                    <span className="text-zinc-300 text-sm font-medium">{f}</span>
                  </div>
                ))}
              </div>

              <Button className={`w-full h-14 rounded-2xl text-md font-bold transition-all ${p.popular ? 'bg-[#f43f5e] text-white hover:bg-[#f43f5e]/90 shadow-xl shadow-[#f43f5e]/20' : 'bg-white/10 text-white hover:bg-white/20 border border-white/5'}`}>
                {p.popular ? 'Começar Agora' : 'Selecionar Plano'}
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Demand Section */}
        <div className="mt-16 p-8 md:p-12 rounded-[40px] bg-gradient-to-r from-zinc-900/40 to-black/40 border border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="space-y-2 text-center md:text-left">
             <h4 className="text-2xl font-bold flex items-center justify-center md:justify-start gap-2">
               <Zap className="w-6 h-6 text-amber-400 fill-amber-400" /> Projetos Sob Demanda
             </h4>
             <p className="text-zinc-500 max-w-md">Precisa de algo específico como Rebrand, Lançamento ou um Shooting avulso? Nós temos a solução.</p>
           </div>
           <div className="flex gap-4">
              <div className="text-center px-6">
                 <p className="text-zinc-600 uppercase text-[10px] font-black tracking-widest mb-1">Início em</p>
                 <p className="text-2xl font-bold">R$ 1.500</p>
              </div>
              <Button variant="outline" className="rounded-2xl h-14 px-8 border-white/10 hover:bg-zinc-800">
                Consultar Tabela
              </Button>
           </div>
        </div>
      </section>

      {/* Social Proof Placeholder with Glow */}
      <section className="max-w-4xl mx-auto px-6 py-32 text-center">
        <h2 className="text-4xl md:text-6xl font-black mb-12 italic">QUEM CONFIA NA INOVA</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
           <div className="flex items-center justify-center font-black text-2xl tracking-tighter">CLIENTE_01</div>
           <div className="flex items-center justify-center font-black text-2xl tracking-tighter">CLIENTE_02</div>
           <div className="flex items-center justify-center font-black text-2xl tracking-tighter">CLIENTE_03</div>
           <div className="flex items-center justify-center font-black text-2xl tracking-tighter">CLIENTE_04</div>
        </div>
      </section>

      {/* Footer / Final CTA */}
      <section id="cta" className="max-w-7xl mx-auto px-6 py-40 text-center relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#f43f5e]/5 blur-[120px] rounded-full -z-10" />
        
        <Sparkles className="w-12 h-12 text-[#f43f5e] mx-auto mb-8 animate-pulse" />
        <h2 className="text-5xl md:text-8xl font-black mb-10 tracking-tighter uppercase italic">VAMOS ESCALAR?</h2>
        <p className="text-xl text-zinc-400 mb-12 max-w-xl mx-auto">Sua marca merece a estética do futuro. Clique no botão abaixo e fale diretamente com nosso time de atendimento.</p>
        
        <a 
          href="https://wa.me/5562999999999" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <Button className="bg-white text-black hover:bg-zinc-200 rounded-full h-16 px-12 text-xl font-black uppercase tracking-widest shadow-2xl shadow-white/10">
            <MessageCircle className="w-6 h-6 mr-3 fill-black" /> Falar no WhatsApp
          </Button>
        </a>

        <div className="mt-40 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-zinc-600 text-[10px] font-black uppercase tracking-[0.4em]">
           <span>© 2026 INOVA CO. LAB</span>
           <div className="flex gap-10">
             <a href="#" className="hover:text-[#f43f5e] transition-colors">Privacy</a>
             <a href="#" className="hover:text-[#f43f5e] transition-colors">Terms</a>
             <a href="#" className="hover:text-[#f43f5e] transition-colors">Contact</a>
           </div>
        </div>
      </section>
    </div>
  );
}
