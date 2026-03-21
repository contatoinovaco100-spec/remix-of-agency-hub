import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import logoInova from '@/assets/logo-inova.png';
import { cn } from '@/lib/utils';
import { Clapperboard, Calendar, Target, FileText, Link2, MessageSquare, Loader2, ChevronDown, ChevronRight, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useUserRole } from '@/hooks/useUserRole';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface TaskData {
  id: string;
  title: string;
  video_name: string;
  description: string;
  video_idea: string;
  full_script: string;
  video_references: string;
  observations: string;
  video_objective: string;
  platform: string;
  format: string;
  due_date: string | null;
  status: string;
  creative_direction: string;
  editing_style: string;
  strategic_notes: string;
}

function TaskCard({ task, index }: { task: TaskData; index: number }) {
  const [open, setOpen] = useState(index === 0);
  const videoName = task.video_name || task.title || 'Sem título';

  const sections = [
    { icon: Target, label: 'Objetivo', content: task.video_objective },
    { icon: FileText, label: 'Ideia do Vídeo', content: task.video_idea },
    { icon: FileText, label: 'Roteiro', content: task.full_script, large: true },
    { icon: Link2, label: 'Referências', content: task.video_references, isLinks: true },
    { icon: Clapperboard, label: 'Direção Criativa', content: task.creative_direction },
    { icon: Clapperboard, label: 'Estilo de Edição', content: task.editing_style },
    { icon: MessageSquare, label: 'Notas Estratégicas', content: task.strategic_notes },
    { icon: MessageSquare, label: 'Observações', content: task.observations },
  ].filter(s => s.content);

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      {/* Collapsed header */}
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-4 p-5 text-left transition-colors hover:bg-secondary/20"
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
          <Clapperboard className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-muted-foreground">#{index + 1}</span>
            <h3 className="text-base font-semibold text-foreground truncate">{videoName}</h3>
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-2">
            {task.platform && (
              <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-medium text-primary">{task.platform}</span>
            )}
            {task.format && (
              <span className="rounded-full bg-info/10 px-2.5 py-0.5 text-[11px] font-medium text-info">{task.format}</span>
            )}
            {task.status && (
              <span className="rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">{task.status}</span>
            )}
            {task.due_date && (
              <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                <Calendar className="h-3 w-3" />
                {new Date(task.due_date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
              </span>
            )}
          </div>
        </div>
        {open ? <ChevronDown className="h-5 w-5 text-muted-foreground shrink-0" /> : <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />}
      </button>

      {/* Expanded content */}
      {open && (
        <div className="border-t border-border p-5 space-y-4">
          {task.description && (
            <p className="text-sm text-muted-foreground">{task.description}</p>
          )}
          {sections.map((section, i) => (
            <div key={i}>
              <div className="mb-1.5 flex items-center gap-2">
                <section.icon className="h-3.5 w-3.5 text-primary" />
                <h4 className="text-xs font-semibold text-foreground uppercase tracking-wide">{section.label}</h4>
              </div>
              {section.isLinks ? (
                <div className="space-y-1">
                  {section.content!.split('\n').filter(Boolean).map((line, j) => (
                    <a key={j} href={line.trim().startsWith('http') ? line.trim() : `https://${line.trim()}`} target="_blank" rel="noopener noreferrer" className="block text-sm text-primary underline underline-offset-2 hover:text-primary/80 break-all">
                      {line.trim()}
                    </a>
                  ))}
                </div>
              ) : (
                <p className={cn(
                  'text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed',
                  section.large && 'rounded-lg bg-secondary/30 p-3 font-mono text-xs'
                )}>
                  {section.content}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ClientPortalPage() {
  const { signOut } = useAuth();
  const { clientId } = useUserRole();
  const navigate = useNavigate();
  
  const [tasks, setTasks] = useState<TaskData[]>([]);
  const [clientName, setClientName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!clientId) {
      setLoading(false);
      return;
    }
    loadContent(clientId);
  }, [clientId]);

  const loadContent = async (id: string) => {
    setLoading(true);

    const { data: clientData } = await supabase.from('clients').select('company_name').eq('id', id).maybeSingle();
    if (clientData) {
      setClientName(clientData.company_name);
    }
    
    const { data: allTasks } = await supabase.from('tasks').select('*').eq('client_id', id).order('created_at');
    if (allTasks) {
      setTasks(allTasks as TaskData[]);
    }

    setLoading(false);
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <img src={logoInova} alt="Inova" className="h-10" />
          <div className="flex items-center gap-4 text-right">
            <div>
              {clientName && <p className="text-sm font-medium text-foreground">{clientName}</p>}
              <p className="text-xs text-muted-foreground">{tasks.length} {tasks.length === 1 ? 'conteúdo' : 'conteúdos'}</p>
            </div>
            <Button variant="ghost" size="icon" onClick={handleLogout} title="Sair do Portal">
              <LogOut className="h-5 w-5 text-muted-foreground" />
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-3xl px-6 py-8">
        <div className="mb-6">
          <h1 className="text-xl font-bold text-foreground">Planejamento de Conteúdo</h1>
          <p className="text-sm text-muted-foreground">Bem-vindo ao seu portal exclusivo. Aqui estão as ideias preparadas para você.</p>
        </div>

        {tasks.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border p-12 text-center text-muted-foreground">
            Ainda não há conteúdos aprovados para o seu planejamento.
          </div>
        ) : (
          <div className="space-y-4">
            {tasks.map((task, i) => (
              <TaskCard key={task.id} task={task} index={i} />
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 border-t border-border pt-6 text-center">
          <img src={logoInova} alt="Inova" className="mx-auto h-8 opacity-50" />
          <p className="mt-2 text-xs text-muted-foreground">Conteúdo preparado pela equipe Inova</p>
        </div>
      </main>
    </div>
  );
}
