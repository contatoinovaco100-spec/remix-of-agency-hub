import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { BriefingRow } from '@/components/BriefingDetailDialog';
import { Loader2, Target, Users, Heart, ShieldAlert, Star, Swords, MessageCircle, DollarSign, FileText } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface Props {
  clientId: string;
}

export function ClientDiagnosisTab({ clientId }: Props) {
  const [briefing, setBriefing] = useState<BriefingRow | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBriefing() {
      setLoading(true);
      const { data, error } = await supabase
        .from('client_briefings')
        .select('*')
        .eq('client_id', clientId)
        .maybeSingle();

      if (error) {
        console.error('Error fetching briefing:', error);
      } else {
        setBriefing(data as BriefingRow);
      }
      setLoading(false);
    }

    if (clientId) {
      fetchBriefing();
    }
  }, [clientId]);

  if (loading) {
    return (
      <div className="flex h-40 items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!briefing) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center border-2 border-dashed border-border rounded-xl bg-secondary/10">
        <FileText className="h-10 w-10 text-muted-foreground mb-3 opacity-20" />
        <p className="text-sm font-medium text-foreground">Nenhum diagnóstico encontrado</p>
        <p className="text-xs text-muted-foreground max-w-[200px] mt-1">
          O cliente ainda não preencheu o formulário de briefing estratégico.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-black uppercase tracking-widest text-primary flex items-center gap-2">
          <Star className="h-4 w-4 fill-primary" /> Diagnóstico Estratégico
        </h3>
        <span className="text-[10px] font-bold text-muted-foreground bg-secondary/50 px-2 py-1 rounded">
          Enviado em {new Date(briefing.created_at).toLocaleDateString('pt-BR')}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DiagnosisSection icon={Target} label="Objetivos para 3 meses" value={briefing.goals_3_months} accent="amber" />
        <DiagnosisSection icon={Users} label="Público-Alvo" value={`${briefing.target_age_range} · ${briefing.target_gender}`} accent="blue" />
        <DiagnosisSection icon={ShieldAlert} label="Dores do Público" value={briefing.audience_pain_points} accent="red" />
        <DiagnosisSection icon={Heart} label="Desejos do Público" value={briefing.audience_desires} accent="emerald" />
        <DiagnosisSection icon={Star} label="Diferenciais" value={briefing.differentials} accent="pink" />
        <DiagnosisSection icon={Swords} label="Concorrência" value={briefing.competitors} accent="indigo" />
        <DiagnosisSection icon={MessageCircle} label="Estilo de Comunicação" value={briefing.communication_style} accent="violet" />
        <DiagnosisSection icon={DollarSign} label="Expectativa de Faturamento" value={briefing.monthly_revenue} accent="green" />
      </div>

      <div className="rounded-xl bg-primary/5 border border-primary/20 p-4">
        <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Percepção Desejada</p>
        <p className="text-sm text-foreground leading-relaxed italic">"{briefing.desired_perception}"</p>
      </div>
    </div>
  );
}

function DiagnosisSection({ icon: Icon, label, value, accent }: { icon: any, label: string, value: string, accent: string }) {
  const colors: Record<string, string> = {
    amber: 'bg-amber-500',
    blue: 'bg-blue-500',
    red: 'bg-red-500',
    emerald: 'bg-emerald-500',
    pink: 'bg-pink-500',
    indigo: 'bg-indigo-500',
    violet: 'bg-violet-500',
    green: 'bg-green-500',
  };

  return (
    <Card className="border-border/40 bg-card/50 overflow-hidden group hover:border-primary/30 transition-all duration-300">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className={`w-1.5 h-1.5 rounded-full ${colors[accent] || 'bg-primary'}`} />
          <Icon className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{label}</span>
        </div>
        <p className="text-sm text-foreground leading-relaxed pl-3.5">{value || '—'}</p>
      </CardContent>
    </Card>
  );
}
