import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import {
  FileText, Plus, Send, CheckCircle2, Edit2, Copy, Loader2, ExternalLink,
  Trash2, Hash, MessageCircle,
} from 'lucide-react';
import { toast } from 'sonner';

interface Deliverable {
  label: string;
  quantity: string;
}

interface Contract {
  id: string;
  client_id: string | null;
  title: string;
  contractor_name: string;
  contractor_cpf_cnpj: string;
  contractor_address: string;
  client_name: string;
  client_cpf_cnpj: string;
  client_email: string;
  client_address: string;
  services: string;
  scope_description: string;
  monthly_value: number;
  duration_months: number;
  payment_due_day: number;
  additional_clauses: string;
  plan_name: string;
  deliverables: Deliverable[];
  status: string;
  sent_at: string | null;
  created_at: string;
}

interface Signature {
  id: string;
  contract_id: string;
  signer_name: string;
  signer_cpf: string;
  signer_email: string;
  ip_address: string;
  signed_at: string;
  accepted: boolean;
  signature_hash: string;
}

const statusConfig: Record<string, { label: string; color: string; icon: any }> = {
  rascunho: { label: 'Rascunho', color: 'bg-muted text-muted-foreground', icon: Edit2 },
  enviado: { label: 'Enviado', color: 'bg-[hsl(var(--info))]/10 text-[hsl(var(--info))]', icon: Send },
  assinado: { label: 'Assinado', color: 'bg-[hsl(var(--success))]/10 text-[hsl(var(--success))]', icon: CheckCircle2 },
};

const DEFAULT_DELIVERABLES: Deliverable[] = [
  { label: 'Vídeos mensais', quantity: '8' },
  { label: 'Captações por mês', quantity: '2' },
  { label: 'Vídeo institucional', quantity: '1' },
  { label: 'Conteúdo para Reels, Ads e Stories', quantity: '✔' },
  { label: 'Planejamento mensal', quantity: '✔' },
  { label: 'Reunião mensal de alinhamento', quantity: '✔' },
  { label: 'Suporte direto', quantity: '✔' },
];

const emptyContract = {
  title: '',
  contractor_name: 'INOVA Co.',
  contractor_cpf_cnpj: '',
  contractor_address: '',
  client_name: '',
  client_cpf_cnpj: '',
  client_email: '',
  client_address: '',
  services: '',
  scope_description: '',
  monthly_value: 0,
  duration_months: 12,
  payment_due_day: 10,
  additional_clauses: '',
  plan_name: 'Plano Profissional',
  deliverables: DEFAULT_DELIVERABLES,
};

export default function ContractsPage() {
  const { user } = useAuth();
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [signatures, setSignatures] = useState<Signature[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState(emptyContract);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    setLoading(true);
    const [{ data: c }, { data: s }] = await Promise.all([
      supabase.from('contracts').select('*').order('created_at', { ascending: false }),
      supabase.from('contract_signatures').select('*'),
    ]);
    if (c) setContracts(c.map((contract: any) => ({
      ...contract,
      deliverables: Array.isArray(contract.deliverables) ? contract.deliverables : [],
    })) as Contract[]);
    if (s) setSignatures(s as Signature[]);
    setLoading(false);
  };

  const handleSave = async () => {
    if (!form.title.trim()) { toast.error('Informe o título do contrato'); return; }
    setSaving(true);
    const payload = {
      ...form,
      deliverables: form.deliverables as any,
      client_id: null,
      created_by: user?.id,
    };

    if (editingId) {
      const { status, ...updatePayload } = payload as any;
      await supabase.from('contracts').update(updatePayload).eq('id', editingId);
      toast.success('Contrato atualizado');
    } else {
      await supabase.from('contracts').insert({ ...payload, status: 'rascunho' });
      toast.success('Contrato criado');
    }
    setSaving(false);
    setDialogOpen(false);
    setEditingId(null);
    setForm(emptyContract);
    await loadData();
  };

  const shareWhatsApp = (c: Contract) => {
    const signingUrl = `${window.location.origin}/contrato/${c.id}`;
    const phone = '55';
    const message = `Olá ${c.client_name || ''}, tudo bem? Aqui é da INOVA Co. Segue o link do seu contrato para assinatura digital:\n\n${signingUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleSend = async (contract: Contract) => {
    await supabase.from('contracts').update({ status: 'enviado', sent_at: new Date().toISOString() }).eq('id', contract.id);
    const signingUrl = `${window.location.origin}/contrato/${contract.id}`;
    await navigator.clipboard.writeText(signingUrl);
    toast.success('Contrato marcado como enviado! Link copiado.');
    await loadData();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este contrato?')) return;
    await supabase.from('contract_signatures').delete().eq('contract_id', id);
    await supabase.from('contracts').delete().eq('id', id);
    toast.success('Contrato excluído');
    await loadData();
  };

  const copyLink = (id: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/contrato/${id}`);
    toast.success('Link copiado!');
  };

  const openEdit = (c: Contract) => {
    setForm({
      title: c.title,
      contractor_name: c.contractor_name,
      contractor_cpf_cnpj: c.contractor_cpf_cnpj,
      contractor_address: c.contractor_address,
      client_name: c.client_name,
      client_cpf_cnpj: c.client_cpf_cnpj,
      client_email: c.client_email,
      client_address: c.client_address,
      services: c.services,
      scope_description: c.scope_description,
      monthly_value: c.monthly_value,
      duration_months: c.duration_months,
      payment_due_day: c.payment_due_day,
      additional_clauses: c.additional_clauses,
      plan_name: c.plan_name || 'Plano Profissional',
      deliverables: c.deliverables?.length > 0 ? c.deliverables : DEFAULT_DELIVERABLES,
    });
    setEditingId(c.id);
    setDialogOpen(true);
  };

  const getSignature = (contractId: string) => signatures.find(s => s.contract_id === contractId && s.accepted);

  // Deliverables helpers
  const addDeliverable = () => {
    setForm(p => ({ ...p, deliverables: [...p.deliverables, { label: '', quantity: '' }] }));
  };
  const removeDeliverable = (idx: number) => {
    setForm(p => ({ ...p, deliverables: p.deliverables.filter((_, i) => i !== idx) }));
  };
  const updateDeliverable = (idx: number, field: keyof Deliverable, value: string) => {
    setForm(p => ({
      ...p,
      deliverables: p.deliverables.map((d, i) => i === idx ? { ...d, [field]: value } : d),
    }));
  };

  if (loading) {
    return <div className="flex items-center justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FileText className="h-6 w-6 text-primary" />
          <div>
            <h1 className="text-2xl font-bold text-foreground">Contratos</h1>
            <p className="text-sm text-muted-foreground">Crie, envie e gerencie contratos de prestação de serviço</p>
          </div>
        </div>
        <Dialog open={dialogOpen} onOpenChange={(o) => { setDialogOpen(o); if (!o) { setEditingId(null); setForm(emptyContract); } }}>
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4 mr-1" /> Novo Contrato</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingId ? 'Editar Contrato' : 'Novo Contrato'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div><Label>Título do contrato</Label><Input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} /></div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <p className="text-sm font-semibold text-foreground">Contratante (Prestador)</p>
                  <div><Label>Nome / Razão Social</Label><Input value={form.contractor_name} onChange={e => setForm(p => ({ ...p, contractor_name: e.target.value }))} /></div>
                  <div><Label>CPF / CNPJ</Label><Input value={form.contractor_cpf_cnpj} onChange={e => setForm(p => ({ ...p, contractor_cpf_cnpj: e.target.value }))} /></div>
                  <div><Label>Endereço</Label><Input value={form.contractor_address} onChange={e => setForm(p => ({ ...p, contractor_address: e.target.value }))} /></div>
                </div>
                <div className="space-y-3">
                  <p className="text-sm font-semibold text-foreground">Contratado (Cliente)</p>
                  <div><Label>Nome / Razão Social</Label><Input value={form.client_name} onChange={e => setForm(p => ({ ...p, client_name: e.target.value }))} /></div>
                  <div><Label>CPF / CNPJ</Label><Input value={form.client_cpf_cnpj} onChange={e => setForm(p => ({ ...p, client_cpf_cnpj: e.target.value }))} /></div>
                  <div><Label>Email</Label><Input type="email" value={form.client_email} onChange={e => setForm(p => ({ ...p, client_email: e.target.value }))} /></div>
                  <div><Label>Endereço</Label><Input value={form.client_address} onChange={e => setForm(p => ({ ...p, client_address: e.target.value }))} /></div>
                </div>
              </div>

              <div><Label>Serviços contratados</Label><Input value={form.services} onChange={e => setForm(p => ({ ...p, services: e.target.value }))} placeholder="Ex: Social Media, Tráfego Pago, Design" /></div>
              <div><Label>Descrição do escopo</Label><Textarea value={form.scope_description} onChange={e => setForm(p => ({ ...p, scope_description: e.target.value }))} rows={3} /></div>

              <div className="grid grid-cols-3 gap-4">
                <div><Label>Valor mensal (R$)</Label><Input type="number" value={form.monthly_value} onChange={e => setForm(p => ({ ...p, monthly_value: Number(e.target.value) }))} /></div>
                <div><Label>Duração (meses)</Label><Input type="number" value={form.duration_months} onChange={e => setForm(p => ({ ...p, duration_months: Number(e.target.value) }))} /></div>
                <div><Label>Dia de vencimento</Label><Input type="number" min={1} max={31} value={form.payment_due_day} onChange={e => setForm(p => ({ ...p, payment_due_day: Number(e.target.value) }))} /></div>
              </div>

              {/* Plan Deliverables */}
              <div className="space-y-3 rounded-lg border border-border p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-foreground">Entregas do Plano</p>
                </div>
                <div>
                  <Label>Nome do plano</Label>
                  <Input value={form.plan_name} onChange={e => setForm(p => ({ ...p, plan_name: e.target.value }))} placeholder="Ex: Plano Profissional" />
                </div>
                <div className="space-y-2">
                  {form.deliverables.map((d, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Input
                        value={d.quantity}
                        onChange={e => updateDeliverable(i, 'quantity', e.target.value)}
                        placeholder="Qtd"
                        className="w-20 shrink-0"
                      />
                      <Input
                        value={d.label}
                        onChange={e => updateDeliverable(i, 'label', e.target.value)}
                        placeholder="Descrição da entrega"
                        className="flex-1"
                      />
                      <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0 text-muted-foreground hover:text-destructive" onClick={() => removeDeliverable(i)}>
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" onClick={addDeliverable} className="w-full">
                    <Plus className="h-3.5 w-3.5 mr-1" /> Adicionar entrega
                  </Button>
                </div>
              </div>

              <div>
                <Label>Cláusulas adicionais</Label>
                <p className="text-xs text-muted-foreground mb-1">Use quebras de linha para separar parágrafos. O texto será exibido formatado no contrato.</p>
                <Textarea value={form.additional_clauses} onChange={e => setForm(p => ({ ...p, additional_clauses: e.target.value }))} rows={6} placeholder={"Ex:\nCLÁUSULA 7ª - DA PROPRIEDADE INTELECTUAL\nTodo conteúdo produzido...\n\nCLÁUSULA 8ª - DAS PENALIDADES\nEm caso de atraso..."} className="font-mono text-xs leading-relaxed" />
              </div>

              <Button onClick={handleSave} disabled={saving} className="w-full">
                {saving ? 'Salvando...' : editingId ? 'Atualizar Contrato' : 'Criar Contrato'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Contract List */}
      {contracts.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-3 py-16 text-center">
            <FileText className="h-12 w-12 text-muted-foreground" />
            <p className="text-muted-foreground">Nenhum contrato criado ainda.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {contracts.map(c => {
            const sig = getSignature(c.id);
            const cfg = statusConfig[c.status] || statusConfig.rascunho;
            const Icon = cfg.icon;
            return (
              <Card key={c.id} className="border-border/50 hover:border-border transition-colors">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-foreground truncate">{c.title}</h3>
                        <span className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium ${cfg.color}`}>
                          <Icon className="h-3 w-3" /> {cfg.label}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                        <span>Cliente: <strong className="text-foreground">{c.client_name || '—'}</strong></span>
                        <span>Valor: <strong className="text-foreground">R$ {Number(c.monthly_value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}/mês</strong></span>
                        {c.plan_name && <span>Plano: <strong className="text-foreground">{c.plan_name}</strong></span>}
                        <span>Duração: {c.duration_months} meses</span>
                        <span>Criado: {new Date(c.created_at).toLocaleDateString('pt-BR')}</span>
                      </div>
                      {sig && (
                        <div className="mt-2 space-y-1">
                          <div className="flex items-center gap-2 text-xs text-[hsl(var(--success))]">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            Assinado por {sig.signer_name} ({sig.signer_cpf}) em {new Date(sig.signed_at).toLocaleString('pt-BR')}
                          </div>
                          {sig.signature_hash && (
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
                              <Hash className="h-3 w-3" />
                              {sig.signature_hash.slice(0, 16)}...{sig.signature_hash.slice(-8)}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Button size="sm" variant="outline" onClick={() => openEdit(c)}><Edit2 className="h-3.5 w-3.5" /></Button>
                      {c.status === 'rascunho' && (
                        <Button size="sm" onClick={() => handleSend(c)}><Send className="h-3.5 w-3.5 mr-1" /> Enviar</Button>
                      )}
                      {(c.status === 'enviado' || c.status === 'assinado') && (
                        <>
                          <Button size="sm" variant="outline" onClick={() => copyLink(c.id)}><Copy className="h-3.5 w-3.5 mr-1" /> Link</Button>
                          <Button size="sm" variant="outline" className="text-green-600 hover:text-green-700 hover:bg-green-50" onClick={() => shareWhatsApp(c)}>
                            <MessageCircle className="h-3.5 w-3.5 mr-1" /> WhatsApp
                          </Button>
                          <Button size="sm" variant="outline" asChild>
                            <a href={`/contrato/${c.id}`} target="_blank" rel="noopener noreferrer"><ExternalLink className="h-3.5 w-3.5 mr-1" /> Ver</a>
                          </Button>
                        </>
                      )}
                      <Button size="sm" variant="outline" className="text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => handleDelete(c.id)}>
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
