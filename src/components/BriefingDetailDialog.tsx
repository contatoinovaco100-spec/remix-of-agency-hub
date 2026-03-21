import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Building2, User, Phone, AtSign, Target, Users, Heart, ShieldAlert, Eye, Star, Swords, MessageCircle, Ban, DollarSign, Layers } from 'lucide-react';

export interface BriefingRow {
  id: string;
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
  status: string;
  created_at: string;
}

interface Props {
  briefing: BriefingRow | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function Section({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  if (!value) return null;
  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-2">
        <Icon className="h-3.5 w-3.5 text-primary" />
        <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</span>
      </div>
      <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed pl-5.5">{value}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    novo: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    'em análise': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    concluído: 'bg-green-500/10 text-green-400 border-green-500/20',
  };
  return (
    <Badge variant="outline" className={map[status] || 'bg-secondary text-muted-foreground'}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
}

export default function BriefingDetailDialog({ briefing, open, onOpenChange }: Props) {
  if (!briefing) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <DialogTitle className="text-xl">{briefing.company_name || 'Sem nome'}</DialogTitle>
            <StatusBadge status={briefing.status} />
          </div>
          <p className="text-xs text-muted-foreground">
            Enviado em {new Date(briefing.created_at).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
          </p>
        </DialogHeader>

        <div className="space-y-6 pt-2">
          {/* Info Básicas */}
          <div>
            <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              Informações Básicas
            </h3>
            <div className="grid grid-cols-2 gap-3 pl-3">
              <Section icon={Building2} label="Empresa" value={briefing.company_name} />
              <Section icon={User} label="Responsável" value={briefing.responsible_name} />
              <Section icon={Phone} label="Telefone" value={briefing.phone} />
              <Section icon={Layers} label="Segmento" value={briefing.segment} />
              <Section icon={AtSign} label="Instagram" value={briefing.instagram} />
            </div>
          </div>

          <hr className="border-border" />

          {/* Objetivos */}
          <div>
            <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              Objetivos Estratégicos
            </h3>
            <div className="pl-3">
              <Section icon={Target} label="Metas para 3 meses" value={briefing.goals_3_months} />
            </div>
          </div>

          <hr className="border-border" />

          {/* Público-Alvo */}
          <div>
            <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Público-Alvo
            </h3>
            <div className="space-y-3 pl-3">
              <div className="flex gap-4">
                <Section icon={Users} label="Faixa Etária" value={briefing.target_age_range} />
                <Section icon={Users} label="Gênero" value={briefing.target_gender} />
              </div>
              <Section icon={ShieldAlert} label="Dores do público" value={briefing.audience_pain_points} />
              <Section icon={Heart} label="Desejos do público" value={briefing.audience_desires} />
              <Section icon={Target} label="Gatilhos de compra" value={briefing.purchase_triggers} />
              <Section icon={Ban} label="Bloqueios de compra" value={briefing.purchase_blockers} />
            </div>
          </div>

          <hr className="border-border" />

          {/* Posicionamento */}
          <div>
            <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-pink-500" />
              Posicionamento de Marca
            </h3>
            <div className="space-y-3 pl-3">
              <Section icon={Eye} label="Percepção atual" value={briefing.current_perception} />
              <Section icon={Star} label="Percepção desejada" value={briefing.desired_perception} />
              <Section icon={Star} label="Diferenciais" value={briefing.differentials} />
            </div>
          </div>

          <hr className="border-border" />

          {/* Referências */}
          <div>
            <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              Referências e Estilo
            </h3>
            <div className="space-y-3 pl-3">
              <Section icon={Swords} label="Concorrentes/Referências" value={briefing.competitors} />
              <Section icon={MessageCircle} label="Estilo de Comunicação" value={briefing.communication_style} />
              <Section icon={Ban} label="O que evitar" value={briefing.things_to_avoid} />
            </div>
          </div>

          <hr className="border-border" />

          {/* Faturamento */}
          <div>
            <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
              Financeiro
            </h3>
            <div className="pl-3">
              <Section icon={DollarSign} label="Faturamento Mensal" value={briefing.monthly_revenue} />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
