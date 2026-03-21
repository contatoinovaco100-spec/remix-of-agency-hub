import { useState } from 'react';
import { useAgency } from '@/contexts/AgencyContext';
import { Client, ServiceType, ClientStatus, ScopeDetails } from '@/types/agency';
import { Plus, Search, X, ChevronDown, ChevronUp, BarChart3 } from 'lucide-react';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { MetaInsightsPanel } from '@/components/clients/MetaInsightsPanel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const serviceOptions: ServiceType[] = ['Tráfego Pago', 'Social Media', 'Design', 'Copy', 'SEO', 'Landing Page', 'Branding', 'Email Marketing'];
const statusOptions: ClientStatus[] = ['Ativo', 'Pausado', 'Cancelado'];

const statusColors: Record<string, string> = {
  'Ativo': 'bg-success/10 text-success',
  'Pausado': 'bg-warning/10 text-warning',
  'Cancelado': 'bg-destructive/10 text-destructive',
};

const emptyScope: ScopeDetails = { monthlyDeliverables: [], includedServices: [], demandLimits: '', platforms: [], strategicNotes: '' };

export default function ClientsPage() {
  const { clients, team, addClient, updateClient, deleteClient } = useAgency();
  const [search, setSearch] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Client | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const [form, setForm] = useState<Partial<Client>>({});
  
  // Client Access Dialog
  const [accessDialog, setAccessDialog] = useState<{open: boolean, clientId: string | null}>({open: false, clientId: null});
  const [accessEmail, setAccessEmail] = useState('');
  const [accessPassword, setAccessPassword] = useState('');
  const [accessLoading, setAccessLoading] = useState(false);

  const filtered = clients.filter(c =>
    c.companyName.toLowerCase().includes(search.toLowerCase()) ||
    c.contactName.toLowerCase().includes(search.toLowerCase())
  );

  const openNew = () => { setEditing(null); setForm({ serviceType: [], scopeDetails: emptyScope }); setDialogOpen(true); };
  const openEdit = (c: Client) => { setEditing(c); setForm(c); setDialogOpen(true); };

  const handleSave = () => {
    if (!form.companyName) return;
    if (editing) {
      updateClient({ ...editing, ...form } as Client);
    } else {
      addClient({ ...form, id: crypto.randomUUID() } as Client);
    }
    setDialogOpen(false);
  };

  const toggleService = (s: ServiceType) => {
    const current = form.serviceType || [];
    setForm({ ...form, serviceType: current.includes(s) ? current.filter(x => x !== s) : [...current, s] });
  };

  const handleGenerateAccess = async () => {
    if (!accessEmail || !accessPassword || !accessDialog.clientId) {
      toast.error('Preencha email e senha');
      return;
    }
    setAccessLoading(true);
    const { error } = await supabase.auth.signUp({
      email: accessEmail,
      password: accessPassword,
      options: {
        data: { role: 'client', client_id: accessDialog.clientId }
      }
    });
    setAccessLoading(false);
    
    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Acesso gerado com sucesso! O cliente já pode logar.');
      setAccessDialog({open: false, clientId: null});
      setAccessEmail('');
      setAccessPassword('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-heading font-semibold text-foreground">Clientes</h1>
          <p className="text-body text-muted-foreground">{clients.length} clientes cadastrados</p>
        </div>
        <Button onClick={openNew} className="gap-2">
          <Plus className="h-4 w-4" /> Novo Cliente
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar clientes..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Cards */}
      <div className="space-y-3">
        {filtered.map(client => (
          <motion.div
            key={client.id}
            layout
            className="card-shadow rounded-lg bg-card"
          >
            <div
              className="flex cursor-pointer items-center gap-4 px-5 py-4 transition-default hover:bg-secondary/30"
              onClick={() => setExpandedId(expandedId === client.id ? null : client.id)}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-body font-semibold text-primary">
                {client.companyName.substring(0, 2).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground">{client.companyName}</p>
                <p className="text-caption text-muted-foreground">{client.contactName} · {client.scope}</p>
              </div>
              <span className="tabular-nums text-body font-medium text-foreground">
                R$ {client.monthlyValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
              <span className={`rounded-md px-2 py-0.5 text-caption font-medium ${statusColors[client.status]}`}>
                {client.status}
              </span>
              {expandedId === client.id ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
            </div>

            <AnimatePresence>
              {expandedId === client.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                   <div className="border-t border-border px-5 py-4">
                     <Tabs defaultValue="info">
                       <TabsList className="mb-4">
                         <TabsTrigger value="info">Informações</TabsTrigger>
                         <TabsTrigger value="insights" className="gap-1.5">
                           <BarChart3 className="h-3.5 w-3.5" /> Insights Meta
                         </TabsTrigger>
                       </TabsList>

                       <TabsContent value="info" className="space-y-4">
                         <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                           <div><p className="text-caption text-muted-foreground">Email</p><p className="text-body text-foreground">{client.email}</p></div>
                           <div><p className="text-caption text-muted-foreground">Telefone</p><p className="text-body text-foreground">{client.phone}</p></div>
                           <div><p className="text-caption text-muted-foreground">Início do contrato</p><p className="text-body text-foreground">{new Date(client.contractStartDate).toLocaleDateString('pt-BR')}</p></div>
                           <div><p className="text-caption text-muted-foreground">Responsável</p><p className="text-body text-foreground">{client.accountManager}</p></div>
                         </div>

                         <div className="flex flex-wrap gap-1">
                           {client.serviceType.map(s => (
                             <span key={s} className="rounded-md bg-primary/10 px-2 py-0.5 text-caption font-medium text-primary">{s}</span>
                           ))}
                         </div>

                         {client.scopeDetails && (
                           <div className="rounded-md bg-secondary/50 p-4 space-y-3">
                             <h3 className="text-body font-semibold text-foreground">Escopo do Contrato</h3>
                             <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                               {client.scopeDetails.monthlyDeliverables.length > 0 && (
                                 <div>
                                   <p className="text-caption text-muted-foreground mb-1">Entregas mensais</p>
                                   <ul className="space-y-1">{client.scopeDetails.monthlyDeliverables.map((d, i) => <li key={i} className="text-body text-foreground">• {d}</li>)}</ul>
                                 </div>
                               )}
                               {client.scopeDetails.includedServices.length > 0 && (
                                 <div>
                                   <p className="text-caption text-muted-foreground mb-1">Serviços incluídos</p>
                                   <ul className="space-y-1">{client.scopeDetails.includedServices.map((s, i) => <li key={i} className="text-body text-foreground">• {s}</li>)}</ul>
                                 </div>
                               )}
                               {client.scopeDetails.demandLimits && (
                                 <div>
                                   <p className="text-caption text-muted-foreground mb-1">Limite de demandas</p>
                                   <p className="text-body text-foreground">{client.scopeDetails.demandLimits}</p>
                                 </div>
                               )}
                               {client.scopeDetails.platforms.length > 0 && (
                                 <div>
                                   <p className="text-caption text-muted-foreground mb-1">Plataformas</p>
                                   <div className="flex flex-wrap gap-1">{client.scopeDetails.platforms.map(p => <span key={p} className="rounded bg-info/10 px-2 py-0.5 text-caption text-info">{p}</span>)}</div>
                                 </div>
                               )}
                             </div>
                             {client.scopeDetails.strategicNotes && (
                               <div>
                                 <p className="text-caption text-muted-foreground mb-1">Informações estratégicas</p>
                                 <p className="text-body text-foreground">{client.scopeDetails.strategicNotes}</p>
                               </div>
                             )}
                           </div>
                         )}

                         {client.notes && <p className="text-caption text-muted-foreground">Obs: {client.notes}</p>}

                         <div className="flex gap-2">
                           {client.phone && <WhatsAppButton phone={client.phone} name={client.contactName} size="md" />}
                           <Button size="sm" variant="outline" onClick={() => openEdit(client)}>Editar</Button>
                           <Button size="sm" variant="outline" className="text-primary hover:bg-primary/10 border-primary/20" onClick={() => setAccessDialog({open: true, clientId: client.id})}>Gerar Acesso</Button>
                           <Button size="sm" variant="outline" className="text-destructive hover:bg-destructive/10" onClick={() => deleteClient(client.id)}>Excluir</Button>
                         </div>
                       </TabsContent>

                       <TabsContent value="insights">
                         <MetaInsightsPanel clientId={client.id} />
                       </TabsContent>
                     </Tabs>
                   </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? 'Editar Cliente' : 'Novo Cliente'}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Nome da empresa</Label><Input value={form.companyName || ''} onChange={e => setForm({ ...form, companyName: e.target.value })} /></div>
              <div><Label>Responsável</Label><Input value={form.contactName || ''} onChange={e => setForm({ ...form, contactName: e.target.value })} /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Email</Label><Input type="email" value={form.email || ''} onChange={e => setForm({ ...form, email: e.target.value })} /></div>
              <div><Label>Telefone</Label><Input value={form.phone || ''} onChange={e => setForm({ ...form, phone: e.target.value })} /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Data início contrato</Label><Input type="date" value={form.contractStartDate || ''} onChange={e => setForm({ ...form, contractStartDate: e.target.value })} /></div>
              <div><Label>Valor mensal (R$)</Label><Input type="number" value={form.monthlyValue || ''} onChange={e => setForm({ ...form, monthlyValue: Number(e.target.value) })} /></div>
            </div>
            <div><Label>Escopo</Label><Input value={form.scope || ''} onChange={e => setForm({ ...form, scope: e.target.value })} /></div>
            <div>
              <Label>Serviços</Label>
              <div className="mt-1 flex flex-wrap gap-2">
                {serviceOptions.map(s => (
                  <button key={s} type="button" onClick={() => toggleService(s)}
                    className={`rounded-md px-3 py-1 text-caption font-medium transition-default ${(form.serviceType || []).includes(s) ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'}`}
                  >{s}</button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Responsável pela conta</Label>
                <Select value={form.accountManager || ''} onValueChange={v => setForm({ ...form, accountManager: v })}>
                  <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                  <SelectContent>{team.map(m => <SelectItem key={m.id} value={m.name}>{m.name}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label>Status</Label>
                <Select value={form.status || 'Ativo'} onValueChange={v => setForm({ ...form, status: v as ClientStatus })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{statusOptions.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </div>
            <div><Label>Observações</Label><Textarea value={form.notes || ''} onChange={e => setForm({ ...form, notes: e.target.value })} /></div>

            {/* Scope details */}
            <div className="rounded-md border border-border p-4 space-y-3">
              <h3 className="text-body font-semibold text-foreground">Escopo do Contrato</h3>
              <div><Label>Entregas mensais (uma por linha)</Label><Textarea value={(form.scopeDetails?.monthlyDeliverables || []).join('\n')} onChange={e => setForm({ ...form, scopeDetails: { ...(form.scopeDetails || emptyScope), monthlyDeliverables: e.target.value.split('\n').filter(Boolean) } })} /></div>
              <div><Label>Serviços incluídos (um por linha)</Label><Textarea value={(form.scopeDetails?.includedServices || []).join('\n')} onChange={e => setForm({ ...form, scopeDetails: { ...(form.scopeDetails || emptyScope), includedServices: e.target.value.split('\n').filter(Boolean) } })} /></div>
              <div><Label>Limite de demandas</Label><Input value={form.scopeDetails?.demandLimits || ''} onChange={e => setForm({ ...form, scopeDetails: { ...(form.scopeDetails || emptyScope), demandLimits: e.target.value } })} /></div>
              <div><Label>Plataformas (uma por linha)</Label><Textarea value={(form.scopeDetails?.platforms || []).join('\n')} onChange={e => setForm({ ...form, scopeDetails: { ...(form.scopeDetails || emptyScope), platforms: e.target.value.split('\n').filter(Boolean) } })} /></div>
              <div><Label>Informações estratégicas</Label><Textarea value={form.scopeDetails?.strategicNotes || ''} onChange={e => setForm({ ...form, scopeDetails: { ...(form.scopeDetails || emptyScope), strategicNotes: e.target.value } })} /></div>
            </div>

            <Button onClick={handleSave}>{editing ? 'Salvar' : 'Adicionar'}</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Access Dialog */}
      <Dialog open={accessDialog.open} onOpenChange={(open) => setAccessDialog(prev => ({...prev, open}))}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Gerar Acesso do Cliente</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <p className="text-sm text-muted-foreground">
              Crie um login para que este cliente possa acessar o Portal do Cliente e visualizar seu planejamento de conteúdo de forma segura.
            </p>
            <div className="space-y-2">
              <Label>Email do Cliente</Label>
              <Input type="email" value={accessEmail} onChange={e => setAccessEmail(e.target.value)} placeholder="email@cliente.com" />
            </div>
            <div className="space-y-2">
              <Label>Senha (mín. 6 caracteres)</Label>
              <Input type="password" value={accessPassword} onChange={e => setAccessPassword(e.target.value)} placeholder="******" />
            </div>
            <Button onClick={handleGenerateAccess} disabled={accessLoading} className="mt-2 text-white">
              {accessLoading ? 'Gerando...' : 'Criar Acesso'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
