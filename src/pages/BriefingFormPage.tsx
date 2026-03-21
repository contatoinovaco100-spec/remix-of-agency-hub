import { useState, useRef, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import logoInova from '@/assets/logo-inova.png';
import { CheckCircle2, ChevronRight, Loader2, Send, Sparkles } from 'lucide-react';

/* ── Types ──────────────────────────────────────────── */
interface BriefingData {
  company_name: string;
  responsible_name: string;
  phone: string;
  segment: string;
  instagram: string;
  goals_3_months: string;
  target_age_range: string;
  target_gender: string;
  audience_pain_points: string;
  audience_desires: string;
  purchase_triggers: string;
  purchase_blockers: string;
  current_perception: string;
  desired_perception: string;
  differentials: string;
  competitors: string;
  communication_style: string;
  things_to_avoid: string;
  monthly_revenue: string;
}

const INITIAL: BriefingData = {
  company_name: '',
  responsible_name: '',
  phone: '',
  segment: '',
  instagram: '',
  goals_3_months: '',
  target_age_range: '',
  target_gender: '',
  audience_pain_points: '',
  audience_desires: '',
  purchase_triggers: '',
  purchase_blockers: '',
  current_perception: '',
  desired_perception: '',
  differentials: '',
  competitors: '',
  communication_style: '',
  things_to_avoid: '',
  monthly_revenue: '',
};

/* ── Step definitions ───────────────────────────────── */
interface Step {
  id: string;
  section: string;
  botMessage: string;
  type: 'welcome' | 'text' | 'textarea' | 'choice';
  field?: keyof BriefingData;
  options?: string[];
  placeholder?: string;
}

const STEPS: Step[] = [
  {
    id: 'welcome',
    section: 'Boas-vindas',
    botMessage: 'Olá! 👋 Que bom te ver por aqui. Vamos juntos construir a base estratégica da sua marca.\n\nEsse briefing é o primeiro passo pra eu entender quem é você, o que sua empresa representa e como podemos posicionar ela com força no digital.\n\nVamos nessa?',
    type: 'welcome',
  },
  {
    id: 'company_name',
    section: 'Informações Básicas',
    botMessage: 'Qual nome da empresa/marca que vamos estruturar?',
    type: 'text',
    field: 'company_name',
    placeholder: 'Ex: Inova Co.',
  },
  {
    id: 'responsible_name',
    section: 'Informações Básicas',
    botMessage: 'Quem é o responsável pelo projeto?',
    type: 'text',
    field: 'responsible_name',
    placeholder: 'Seu nome completo',
  },
  {
    id: 'phone',
    section: 'Informações Básicas',
    botMessage: 'Qual seu telefone / WhatsApp?',
    type: 'text',
    field: 'phone',
    placeholder: '(00) 00000-0000',
  },
  {
    id: 'segment',
    section: 'Informações Básicas',
    botMessage: 'Qual é o seu segmento?',
    type: 'text',
    field: 'segment',
    placeholder: 'Ex: Moda, Gastronomia, Educação...',
  },
  {
    id: 'instagram',
    section: 'Informações Básicas',
    botMessage: 'Qual o @ do seu Instagram?',
    type: 'text',
    field: 'instagram',
    placeholder: '@suamarca',
  },
  {
    id: 'goals_3_months',
    section: 'Objetivos Estratégicos',
    botMessage: 'Agora vamos para a parte estratégica! 🎯\n\nO que você gostaria de conquistar nos próximos 3 meses?',
    type: 'textarea',
    field: 'goals_3_months',
    placeholder: 'Descreva seus principais objetivos...',
  },
  {
    id: 'target_age_range',
    section: 'Público-Alvo',
    botMessage: 'Vamos entender seu público! 👥\n\nQual a faixa etária principal do seu público?',
    type: 'choice',
    field: 'target_age_range',
    options: ['18–24', '25–34', '35–44', '45+'],
  },
  {
    id: 'target_gender',
    section: 'Público-Alvo',
    botMessage: 'Qual o gênero predominante?',
    type: 'choice',
    field: 'target_gender',
    options: ['Masculino', 'Feminino', 'Ambos'],
  },
  {
    id: 'audience_pain_points',
    section: 'Público-Alvo',
    botMessage: 'Quais são as maiores dores desse cliente hoje?',
    type: 'textarea',
    field: 'audience_pain_points',
    placeholder: 'O que mais incomoda seu público-alvo...',
  },
  {
    id: 'audience_desires',
    section: 'Público-Alvo',
    botMessage: 'Quais são os maiores desejos dele?',
    type: 'textarea',
    field: 'audience_desires',
    placeholder: 'O que seu público mais deseja alcançar...',
  },
  {
    id: 'purchase_triggers',
    section: 'Público-Alvo',
    botMessage: 'O que normalmente faz ele decidir comprar?',
    type: 'textarea',
    field: 'purchase_triggers',
    placeholder: 'Gatilhos de decisão de compra...',
  },
  {
    id: 'purchase_blockers',
    section: 'Público-Alvo',
    botMessage: 'O que costuma impedir a compra?',
    type: 'textarea',
    field: 'purchase_blockers',
    placeholder: 'Objeções e barreiras comuns...',
  },
  {
    id: 'current_perception',
    section: 'Posicionamento de Marca',
    botMessage: 'Agora, sobre sua marca! ✨\n\nHoje, como você acredita que sua marca é percebida?',
    type: 'textarea',
    field: 'current_perception',
    placeholder: 'Como as pessoas enxergam sua marca hoje...',
  },
  {
    id: 'desired_perception',
    section: 'Posicionamento de Marca',
    botMessage: 'Como gostaria de ser reconhecido?',
    type: 'textarea',
    field: 'desired_perception',
    placeholder: 'A imagem ideal da sua marca...',
  },
  {
    id: 'differentials',
    section: 'Posicionamento de Marca',
    botMessage: 'O que torna sua empresa diferente, qual é seu diferencial?',
    type: 'textarea',
    field: 'differentials',
    placeholder: 'Seus diferenciais competitivos...',
  },
  {
    id: 'competitors',
    section: 'Referências e Estilo',
    botMessage: 'Quase lá! 🚀\n\nQuem são seus principais concorrentes ou referências?',
    type: 'textarea',
    field: 'competitors',
    placeholder: 'Marcas que você admira ou compete...',
  },
  {
    id: 'communication_style',
    section: 'Referências e Estilo',
    botMessage: 'Qual estilo de comunicação combina mais com sua marca?',
    type: 'choice',
    field: 'communication_style',
    options: ['Profissional', 'Próximo', 'Educativo', 'Inspirador', 'Descontraído'],
  },
  {
    id: 'things_to_avoid',
    section: 'Referências e Estilo',
    botMessage: 'Existe algo que devemos evitar na comunicação?',
    type: 'textarea',
    field: 'things_to_avoid',
    placeholder: 'Coisas que NÃO representam sua marca...',
  },
  {
    id: 'monthly_revenue',
    section: 'Finalização',
    botMessage: 'Por fim, qual o faturamento médio mensal?',
    type: 'choice',
    field: 'monthly_revenue',
    options: ['R$20.000 +', 'R$40.000 +', 'R$60.000 +', 'R$100.000 +'],
  },
];

const TOTAL_STEPS = STEPS.length;

/* ── Helpers ────────────────────────────────────────── */
function getSectionColor(section: string) {
  const map: Record<string, string> = {
    'Boas-vindas': 'from-purple-500 to-violet-600',
    'Informações Básicas': 'from-blue-500 to-cyan-500',
    'Objetivos Estratégicos': 'from-amber-500 to-orange-500',
    'Público-Alvo': 'from-emerald-500 to-teal-500',
    'Posicionamento de Marca': 'from-pink-500 to-rose-500',
    'Referências e Estilo': 'from-indigo-500 to-purple-500',
    'Finalização': 'from-green-500 to-emerald-500',
  };
  return map[section] || 'from-primary to-primary/80';
}

/* ── Chat Bubble Components ─────────────────────────── */
function BotBubble({ text, animate }: { text: string; animate: boolean }) {
  return (
    <div className={`flex gap-3 items-start transition-all duration-500 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center shadow-lg shadow-violet-500/20">
        <Sparkles className="w-4 h-4 text-white" />
      </div>
      <div className="bg-white/[0.07] backdrop-blur-sm border border-white/10 rounded-2xl rounded-tl-md px-5 py-4 max-w-lg shadow-xl">
        <p className="text-sm text-white/90 whitespace-pre-line leading-relaxed">{text}</p>
      </div>
    </div>
  );
}

function UserBubble({ text, animate }: { text: string; animate: boolean }) {
  return (
    <div className={`flex justify-end transition-all duration-500 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div className="bg-gradient-to-br from-violet-600 to-purple-700 rounded-2xl rounded-tr-md px-5 py-3 max-w-md shadow-lg shadow-violet-600/20">
        <p className="text-sm text-white leading-relaxed">{text}</p>
      </div>
    </div>
  );
}

/* ── Main Component ─────────────────────────────────── */
export default function BriefingFormPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<BriefingData>(INITIAL);
  const [inputValue, setInputValue] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [animateBot, setAnimateBot] = useState(false);
  const [history, setHistory] = useState<{ type: 'bot' | 'user'; text: string }[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const step = STEPS[currentStep];
  const progress = ((currentStep) / TOTAL_STEPS) * 100;

  // Animate bot message on step change
  useEffect(() => {
    setAnimateBot(false);
    const t = setTimeout(() => setAnimateBot(true), 100);
    return () => clearTimeout(t);
  }, [currentStep]);

  // Scroll to bottom
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [history, currentStep]);

  // Focus input
  useEffect(() => {
    if (step?.type === 'text') inputRef.current?.focus();
    if (step?.type === 'textarea') textareaRef.current?.focus();
  }, [currentStep, step?.type]);

  const advance = (answer: string) => {
    // Save the bot message and user answer to history
    setHistory(prev => [
      ...prev,
      { type: 'bot', text: step.botMessage },
      { type: 'user', text: answer },
    ]);

    // Update data
    if (step.field) {
      setData(prev => ({ ...prev, [step.field!]: answer }));
    }

    setInputValue('');

    // Move to next step or submit
    if (currentStep < TOTAL_STEPS - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleSubmit({ ...data, [step.field!]: answer });
    }
  };

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    advance(inputValue.trim());
  };

  const handleChoiceClick = (option: string) => {
    advance(option);
  };

  const handleWelcome = () => {
    setHistory(prev => [
      ...prev,
      { type: 'bot', text: step.botMessage },
      { type: 'user', text: 'Bora! 🚀' },
    ]);
    setCurrentStep(1);
  };

  const handleSubmit = async (finalData: BriefingData) => {
    setSubmitting(true);
    setHistory(prev => [
      ...prev,
      { type: 'bot', text: 'Perfeito! Salvando suas respostas...' },
    ]);

    const { error } = await supabase.from('client_briefings').insert({
      company_name: finalData.company_name,
      responsible_name: finalData.responsible_name,
      phone: finalData.phone,
      segment: finalData.segment,
      instagram: finalData.instagram,
      goals_3_months: finalData.goals_3_months,
      target_age_range: finalData.target_age_range,
      target_gender: finalData.target_gender,
      audience_pain_points: finalData.audience_pain_points,
      audience_desires: finalData.audience_desires,
      purchase_triggers: finalData.purchase_triggers,
      purchase_blockers: finalData.purchase_blockers,
      current_perception: finalData.current_perception,
      desired_perception: finalData.desired_perception,
      differentials: finalData.differentials,
      competitors: finalData.competitors,
      communication_style: finalData.communication_style,
      things_to_avoid: finalData.things_to_avoid,
      monthly_revenue: finalData.monthly_revenue,
    });

    setSubmitting(false);

    if (error) {
      console.error('Error submitting briefing:', error);
      setHistory(prev => [
        ...prev,
        { type: 'bot', text: 'Ops! Houve um erro ao salvar. Tente novamente.' },
      ]);
    } else {
      setSubmitted(true);
    }
  };

  /* ── Success State ────────────────────────────────── */
  if (submitted) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
        </div>
        <div className="relative text-center space-y-6 max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-2xl shadow-green-500/30">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">Briefing Enviado! 🎉</h1>
          <p className="text-white/60 text-base leading-relaxed">
            Obrigado, <span className="text-white font-medium">{data.responsible_name}</span>!<br />
            Recebemos todas as informações sobre a <span className="text-violet-400 font-medium">{data.company_name}</span>.<br />
            Nossa equipe vai analisar e entrar em contato em breve.
          </p>
          <div className="pt-4">
            <img src={logoInova} alt="Inova" className="h-8 mx-auto opacity-40" />
          </div>
        </div>
      </div>
    );
  }

  /* ── Form UI ──────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-[#0a0a0f] flex flex-col relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-violet-600/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[300px] bg-purple-600/5 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/5 bg-black/40 backdrop-blur-xl">
        <div className="mx-auto max-w-2xl px-4 py-3 flex items-center justify-between">
          <img src={logoInova} alt="Inova" className="h-8" />
          <div className="flex items-center gap-3">
            <span className={`text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full bg-gradient-to-r ${getSectionColor(step.section)} text-white`}>
              {step.section}
            </span>
          </div>
        </div>
        {/* Progress bar */}
        <div className="h-0.5 bg-white/5">
          <div
            className="h-full bg-gradient-to-r from-violet-500 to-purple-500 transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      {/* Chat history + current step */}
      <div ref={scrollRef} className="relative z-10 flex-1 overflow-y-auto">
        <div className="mx-auto max-w-2xl px-4 py-6 space-y-4">
          {/* Previous messages */}
          {history.map((msg, i) => (
            msg.type === 'bot'
              ? <BotBubble key={i} text={msg.text} animate={true} />
              : <UserBubble key={i} text={msg.text} animate={true} />
          ))}

          {/* Current bot message */}
          {!submitting && (
            <BotBubble text={step.botMessage} animate={animateBot} />
          )}

          {submitting && (
            <div className="flex gap-3 items-start">
              <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center shadow-lg">
                <Loader2 className="w-4 h-4 text-white animate-spin" />
              </div>
              <div className="bg-white/[0.07] backdrop-blur-sm border border-white/10 rounded-2xl rounded-tl-md px-5 py-4">
                <p className="text-sm text-white/60">Salvando seu briefing...</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input area */}
      {!submitting && (
        <div className="relative z-10 border-t border-white/5 bg-black/60 backdrop-blur-xl">
          <div className="mx-auto max-w-2xl px-4 py-4">
            {step.type === 'welcome' && (
              <button
                onClick={handleWelcome}
                className={`w-full py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 transition-all duration-300 shadow-lg shadow-violet-600/25 hover:shadow-violet-500/40 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 ${animateBot ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} transition-all duration-500 delay-300`}
              >
                Bora! 🚀
                <ChevronRight className="w-4 h-4" />
              </button>
            )}

            {step.type === 'text' && (
              <form onSubmit={handleTextSubmit} className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  placeholder={step.placeholder}
                  className="flex-1 bg-white/[0.07] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/25 transition-all"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 disabled:opacity-30 disabled:hover:from-violet-600 disabled:hover:to-purple-600 text-white rounded-xl px-4 py-3 transition-all duration-300 shadow-lg shadow-violet-600/20"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}

            {step.type === 'textarea' && (
              <form onSubmit={handleTextSubmit} className="space-y-2">
                <textarea
                  ref={textareaRef}
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  placeholder={step.placeholder}
                  rows={3}
                  className="w-full bg-white/[0.07] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/25 transition-all resize-none"
                  onKeyDown={e => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleTextSubmit(e);
                    }
                  }}
                />
                <div className="flex justify-between items-center">
                  <span className="text-[11px] text-white/20">Shift+Enter para nova linha</span>
                  <button
                    type="submit"
                    disabled={!inputValue.trim()}
                    className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 disabled:opacity-30 text-white rounded-xl px-5 py-2.5 text-sm font-medium transition-all duration-300 shadow-lg shadow-violet-600/20 flex items-center gap-2"
                  >
                    Enviar
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}

            {step.type === 'choice' && (
              <div className={`grid gap-2 ${step.options!.length <= 3 ? 'grid-cols-' + step.options!.length : 'grid-cols-2'}`}>
                {step.options!.map(option => (
                  <button
                    key={option}
                    onClick={() => handleChoiceClick(option)}
                    className="bg-white/[0.07] hover:bg-violet-600/30 border border-white/10 hover:border-violet-500/50 rounded-xl px-4 py-3 text-sm text-white/80 hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-violet-600/10 transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
