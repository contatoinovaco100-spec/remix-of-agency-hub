import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, Plus, X, Save } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface EditorialLine {
  id?: string;
  niche: string;
  audience: string;
  tone: string;
  objective: string;
  pillars: string[];
}

export function EditorialLineTab({ clientId }: { clientId: string }) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editorialLine, setEditorialLine] = useState<EditorialLine>({
    niche: '',
    audience: '',
    tone: '',
    objective: '',
    pillars: [],
  });
  const [newPillar, setNewPillar] = useState('');

  useEffect(() => {
    async function loadEditorialLine() {
      if (!clientId) return;
      
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('content_editorial_lines')
          .select('*')
          .eq('client_id', clientId)
          .maybeSingle();

        if (error) throw error;
        
        if (data) {
          setEditorialLine({
            id: data.id,
            niche: data.niche || '',
            audience: data.audience || '',
            tone: data.tone || '',
            objective: data.objective || '',
            pillars: data.pillars || [],
          });
        } else {
          // Reset form if no data
          setEditorialLine({
            niche: '',
            audience: '',
            tone: '',
            objective: '',
            pillars: [],
          });
        }
      } catch (error) {
        console.error('Error loading editorial line:', error);
        toast.error('Erro ao carregar a linha editorial');
      } finally {
        setLoading(false);
      }
    }

    loadEditorialLine();
  }, [clientId]);

  const handleSave = async () => {
    if (!clientId) return;
    
    setSaving(true);
    try {
      const payload = {
        client_id: clientId,
        niche: editorialLine.niche,
        audience: editorialLine.audience,
        tone: editorialLine.tone,
        objective: editorialLine.objective,
        pillars: editorialLine.pillars,
      };

      if (editorialLine.id) {
        // Update
        const { error } = await supabase
          .from('content_editorial_lines')
          .update(payload)
          .eq('id', editorialLine.id);
        
        if (error) throw error;
      } else {
        // Insert
        const { data, error } = await supabase
          .from('content_editorial_lines')
          .insert(payload)
          .select()
          .single();
          
        if (error) throw error;
        if (data) setEditorialLine(prev => ({ ...prev, id: data.id }));
      }
      
      toast.success('Linha Editorial salva com sucesso!');
    } catch (error) {
      console.error('Error saving editorial line:', error);
      toast.error('Erro ao salvar a linha editorial');
    } finally {
      setSaving(false);
    }
  };

  const addPillar = () => {
    if (!newPillar.trim()) return;
    if (editorialLine.pillars.includes(newPillar.trim())) return; // Prevent duplicates
    
    setEditorialLine(prev => ({
      ...prev,
      pillars: [...prev.pillars, newPillar.trim()]
    }));
    setNewPillar('');
  };

  const removePillar = (pillarToRemove: string) => {
    setEditorialLine(prev => ({
      ...prev,
      pillars: prev.pillars.filter(p => p !== pillarToRemove)
    }));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addPillar();
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center p-12">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="border-white/5 bg-black/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Identidade do Cliente</CardTitle>
          <CardDescription>
            Defina o posicionamento estratégico e a comunicação do conteúdo do cliente.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="niche">Nicho de Mercado</Label>
              <Input 
                id="niche" 
                placeholder="Ex: Saúde, Estética, Tecnologia, Direito..." 
                value={editorialLine.niche}
                onChange={(e) => setEditorialLine({ ...editorialLine, niche: e.target.value })}
                className="bg-black/40 border-white/10"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="objective">Objetivo do Conteúdo</Label>
              <Input 
                id="objective" 
                placeholder="Ex: Vendas, Autoridade, Engajamento, Branding..." 
                value={editorialLine.objective}
                onChange={(e) => setEditorialLine({ ...editorialLine, objective: e.target.value })}
                className="bg-black/40 border-white/10"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="audience">Público-alvo</Label>
              <Textarea 
                id="audience" 
                placeholder="Descreva quem é o cliente ideal. Ex: Homens e mulheres de 25 a 45 anos que buscam investir em imóveis de alto padrão."
                value={editorialLine.audience}
                onChange={(e) => setEditorialLine({ ...editorialLine, audience: e.target.value })}
                className="min-h-[100px] bg-black/40 border-white/10 resize-none"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="tone">Tom de Comunicação</Label>
              <Textarea 
                id="tone" 
                placeholder="Ex: Educativo, descontraído, autoridade técnica, inspiracional..."
                value={editorialLine.tone}
                onChange={(e) => setEditorialLine({ ...editorialLine, tone: e.target.value })}
                className="bg-black/40 border-white/10 resize-none"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-white/5 bg-black/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Pilares de Conteúdo</CardTitle>
          <CardDescription>
            Adicione os pilares que sustentarão as ideias (ex: Educação, Bastidores, Prova Social).
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input 
                placeholder="Digite um pilar e pressione Enter..." 
                value={newPillar}
                onChange={(e) => setNewPillar(e.target.value)}
                onKeyDown={handleKeyDown}
                className="max-w-md bg-black/40 border-white/10"
              />
              <Button type="button" variant="secondary" onClick={addPillar}>
                <Plus className="w-4 h-4 mr-2" />
                Adicionar
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 min-h-[40px]">
              {editorialLine.pillars.length === 0 ? (
                <p className="text-sm text-muted-foreground flex items-center">
                  Nenhum pilar adicionado.
                </p>
              ) : (
                editorialLine.pillars.map((pillar) => (
                  <Badge 
                    key={pillar} 
                    variant="secondary"
                    className="py-1 px-3 flex items-center gap-1 text-sm bg-primary/10 text-primary border-primary/20 hover:bg-primary/20"
                  >
                    {pillar}
                    <button 
                      onClick={() => removePillar(pillar)}
                      className="ml-1 rounded-full p-0.5 hover:bg-black/20 transition-colors focus:outline-none"
                    >
                      <X className="w-3 h-3" />
                      <span className="sr-only">Remover {pillar}</span>
                    </button>
                  </Badge>
                ))
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={saving} className="w-full sm:w-auto">
          {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
          Salvar Linha Editorial
        </Button>
      </div>
    </div>
  );
}
