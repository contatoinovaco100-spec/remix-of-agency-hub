import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Pencil, Trash2, Camera } from 'lucide-react';
import { toast } from 'sonner';

interface Equipment {
  id: string; name: string; category: string; brand: string; model: string;
  serial_number: string; status: string; condition: string; notes: string;
}

const CATEGORIES = ['Câmera', 'Lente', 'Iluminação', 'Áudio', 'Estabilização', 'Drone', 'Acessório', 'Computador', 'Outro'];
const STATUSES = ['Disponível', 'Em uso', 'Manutenção', 'Indisponível'];
const CONDITIONS = ['Novo', 'Excelente', 'Bom', 'Regular', 'Ruim'];

const statusColor: Record<string, string> = {
  'Disponível': 'bg-emerald-500/10 text-emerald-600',
  'Em uso': 'bg-amber-500/10 text-amber-600',
  'Manutenção': 'bg-orange-500/10 text-orange-600',
  'Indisponível': 'bg-red-500/10 text-red-600',
};

const emptyForm = { name: '', category: '', brand: '', model: '', serial_number: '', status: 'Disponível', condition: 'Bom', notes: '' };

export default function EquipmentPage() {
  const [items, setItems] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [filterCat, setFilterCat] = useState('all');

  const fetch = async () => {
    const { data } = await supabase.from('equipment').select('*').order('name');
    setItems((data as any[]) || []);
    setLoading(false);
  };
  useEffect(() => { fetch(); }, []);

  const handleSave = async () => {
    if (!form.name) { toast.error('Nome é obrigatório'); return; }
    if (editId) {
      await supabase.from('equipment').update(form as any).eq('id', editId);
      toast.success('Equipamento atualizado');
    } else {
      await supabase.from('equipment').insert(form as any);
      toast.success('Equipamento cadastrado');
    }
    setForm(emptyForm); setEditId(null); setOpen(false); fetch();
  };

  const handleEdit = (eq: Equipment) => {
    setForm({ name: eq.name, category: eq.category, brand: eq.brand, model: eq.model, serial_number: eq.serial_number, status: eq.status, condition: eq.condition, notes: eq.notes });
    setEditId(eq.id); setOpen(true);
  };

  const handleDelete = async (id: string) => {
    await supabase.from('equipment').delete().eq('id', id);
    toast.success('Equipamento removido'); fetch();
  };

  const filtered = filterCat === 'all' ? items : items.filter(e => e.category === filterCat);
  const counts = { total: items.length, available: items.filter(e => e.status === 'Disponível').length, inUse: items.filter(e => e.status === 'Em uso').length, maintenance: items.filter(e => e.status === 'Manutenção').length };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Equipamentos</h1>
          <p className="text-sm text-muted-foreground">Controle de câmeras, lentes, áudio e mais</p>
        </div>
        <Dialog open={open} onOpenChange={v => { setOpen(v); if (!v) { setEditId(null); setForm(emptyForm); } }}>
          <DialogTrigger asChild><Button><Plus className="mr-2 h-4 w-4" />Novo Equipamento</Button></DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader><DialogTitle>{editId ? 'Editar' : 'Novo'} Equipamento</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <div><Label>Nome *</Label><Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label>Categoria</Label>
                  <Select value={form.category} onValueChange={v => setForm({ ...form, category: v })}>
                    <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                    <SelectContent>{CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div><Label>Status</Label>
                  <Select value={form.status} onValueChange={v => setForm({ ...form, status: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{STATUSES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label>Marca</Label><Input value={form.brand} onChange={e => setForm({ ...form, brand: e.target.value })} /></div>
                <div><Label>Modelo</Label><Input value={form.model} onChange={e => setForm({ ...form, model: e.target.value })} /></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label>Nº de Série</Label><Input value={form.serial_number} onChange={e => setForm({ ...form, serial_number: e.target.value })} /></div>
                <div><Label>Condição</Label>
                  <Select value={form.condition} onValueChange={v => setForm({ ...form, condition: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{CONDITIONS.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
              </div>
              <div><Label>Observações</Label><Textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} /></div>
              <Button className="w-full" onClick={handleSave}>Salvar</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold text-foreground">{counts.total}</p><p className="text-xs text-muted-foreground">Total</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold text-emerald-600">{counts.available}</p><p className="text-xs text-muted-foreground">Disponíveis</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold text-amber-600">{counts.inUse}</p><p className="text-xs text-muted-foreground">Em uso</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold text-orange-600">{counts.maintenance}</p><p className="text-xs text-muted-foreground">Manutenção</p></CardContent></Card>
      </div>

      <div className="flex gap-2 flex-wrap">
        <Badge variant={filterCat === 'all' ? 'default' : 'outline'} className="cursor-pointer" onClick={() => setFilterCat('all')}>Todos</Badge>
        {CATEGORIES.map(c => <Badge key={c} variant={filterCat === c ? 'default' : 'outline'} className="cursor-pointer" onClick={() => setFilterCat(c)}>{c}</Badge>)}
      </div>

      {loading ? <p className="text-muted-foreground">Carregando...</p> : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
          <Camera className="h-12 w-12 mb-3 opacity-40" /><p>Nenhum equipamento cadastrado</p>
        </div>
      ) : (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead><TableHead>Categoria</TableHead><TableHead>Marca / Modelo</TableHead>
                <TableHead>Status</TableHead><TableHead>Condição</TableHead><TableHead className="w-20"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(eq => (
                <TableRow key={eq.id}>
                  <TableCell className="font-medium">{eq.name}</TableCell>
                  <TableCell>{eq.category}</TableCell>
                  <TableCell>{[eq.brand, eq.model].filter(Boolean).join(' ') || '—'}</TableCell>
                  <TableCell><Badge className={statusColor[eq.status] || ''}>{eq.status}</Badge></TableCell>
                  <TableCell>{eq.condition}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <button onClick={() => handleEdit(eq)}><Pencil className="h-4 w-4 text-muted-foreground hover:text-primary" /></button>
                      <button onClick={() => handleDelete(eq.id)}><Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" /></button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  );
}
