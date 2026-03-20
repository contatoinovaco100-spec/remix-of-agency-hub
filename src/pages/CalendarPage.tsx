import { useMemo, useState, useEffect } from 'react';
import { useAgency } from '@/contexts/AgencyContext';
import { ChevronLeft, ChevronRight, Plus, Unplug, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useGoogleCalendar } from '@/hooks/useGoogleCalendar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const DAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const MONTHS = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

const eventTypeColors: Record<string, string> = {
  task: 'bg-info/20 text-info',
  delivery: 'bg-success/20 text-success',
  meeting: 'bg-warning/20 text-warning',
  google: 'bg-primary/20 text-primary',
};

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

export default function CalendarPage() {
  const { events, tasks, addEvent, deleteEvent } = useAgency();
  const {
    connected, loading: gLoading, googleEvents,
    connect, disconnect, fetchEvents, createEvent: createGoogleEvent,
  } = useGoogleCalendar();

  const [currentDate, setCurrentDate] = useState(new Date());
  const [newEventOpen, setNewEventOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newType, setNewType] = useState<'task' | 'delivery' | 'meeting'>('meeting');
  const [syncToGoogle, setSyncToGoogle] = useState(false);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Fetch google events when month changes
  useEffect(() => {
    if (connected) fetchEvents(year, month);
  }, [connected, year, month, fetchEvents]);

  const allEvents = useMemo(() => {
    const taskEvents = tasks.filter(t => t.dueDate).map(t => ({
      id: `task-${t.id}`,
      title: t.title,
      date: t.dueDate,
      type: 'task' as const,
    }));

    const gEvents = googleEvents.map(ge => {
      const date = ge.start.date || (ge.start.dateTime ? ge.start.dateTime.split('T')[0] : '');
      return {
        id: `google-${ge.id}`,
        title: ge.summary || '(Sem título)',
        date,
        type: 'google' as const,
      };
    });

    return [...events, ...taskEvents, ...gEvents];
  }, [events, tasks, googleEvents]);

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay();

  const calendarDays = useMemo(() => {
    const days: (number | null)[] = [];
    for (let i = 0; i < firstDayOfWeek; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(i);
    return days;
  }, [firstDayOfWeek, daysInMonth]);

  const getEventsForDay = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return allEvents.filter(e => e.date === dateStr);
  };

  const prev = () => setCurrentDate(new Date(year, month - 1, 1));
  const next = () => setCurrentDate(new Date(year, month + 1, 1));
  const today = new Date();

  const handleCreateEvent = async () => {
    if (!newTitle || !newDate) {
      toast.error('Preencha título e data');
      return;
    }

    await addEvent({
      id: crypto.randomUUID(),
      title: newTitle,
      date: newDate,
      type: newType,
    });

    if (syncToGoogle && connected) {
      await createGoogleEvent(newTitle, newDate);
      fetchEvents(year, month);
    }

    setNewTitle('');
    setNewDate('');
    setNewType('meeting');
    setSyncToGoogle(false);
    setNewEventOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-heading font-semibold text-foreground">Calendário</h1>
          <p className="text-body text-muted-foreground">Prazos, entregas e reuniões</p>
        </div>
        <div className="flex items-center gap-2">
          {connected ? (
            <Button variant="outline" size="sm" onClick={disconnect} className="gap-1.5 text-destructive border-destructive/30 hover:bg-destructive/10">
              <Unplug className="h-3.5 w-3.5" />
              Desconectar Google
            </Button>
          ) : (
            <Button variant="outline" size="sm" onClick={connect} className="gap-1.5">
              <GoogleIcon className="h-4 w-4" />
              Conectar Google Calendar
              {gLoading && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
            </Button>
          )}
          <Dialog open={newEventOpen} onOpenChange={setNewEventOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-1.5">
                <Plus className="h-4 w-4" />
                Novo Evento
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Criar Evento</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Título</Label>
                  <Input value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="Nome do evento" />
                </div>
                <div className="space-y-2">
                  <Label>Data</Label>
                  <Input type="date" value={newDate} onChange={e => setNewDate(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Tipo</Label>
                  <Select value={newType} onValueChange={(v: any) => setNewType(v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="meeting">Reunião</SelectItem>
                      <SelectItem value="delivery">Entrega</SelectItem>
                      <SelectItem value="task">Tarefa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {connected && (
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={syncToGoogle}
                      onChange={e => setSyncToGoogle(e.target.checked)}
                      className="rounded border-border"
                    />
                    <GoogleIcon className="h-4 w-4" />
                    <span className="text-sm text-muted-foreground">Sincronizar com Google Calendar</span>
                  </label>
                )}
                <Button onClick={handleCreateEvent} className="w-full">Criar Evento</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Nav */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={prev}><ChevronLeft className="h-4 w-4" /></Button>
        <span className="text-body font-semibold text-foreground min-w-[180px] text-center">
          {MONTHS[month]} {year}
        </span>
        <Button variant="outline" size="sm" onClick={next}><ChevronRight className="h-4 w-4" /></Button>
      </div>

      {/* Grid */}
      <div className="card-shadow rounded-lg bg-card overflow-hidden">
        <div className="grid grid-cols-7 border-b border-border">
          {DAYS.map(d => (
            <div key={d} className="px-2 py-2 text-center text-caption font-medium text-muted-foreground">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {calendarDays.map((day, i) => {
            const isToday = day && today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;
            const dayEvents = day ? getEventsForDay(day) : [];
            return (
              <div key={i} className={cn('min-h-[100px] border-b border-r border-border/50 p-1.5', !day && 'bg-secondary/20')}>
                {day && (
                  <>
                    <span className={cn(
                      'inline-flex h-6 w-6 items-center justify-center rounded-full text-caption tabular-nums',
                      isToday ? 'bg-primary text-primary-foreground font-semibold' : 'text-muted-foreground'
                    )}>
                      {day}
                    </span>
                    <div className="mt-1 space-y-0.5">
                      {dayEvents.slice(0, 3).map(ev => (
                        <div key={ev.id} className={cn('truncate rounded px-1 py-0.5 text-[10px] font-medium', eventTypeColors[ev.type])}>
                          {ev.title}
                        </div>
                      ))}
                      {dayEvents.length > 3 && (
                        <span className="text-[10px] text-muted-foreground">+{dayEvents.length - 3} mais</span>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex gap-4 flex-wrap">
        <div className="flex items-center gap-1.5"><div className="h-2.5 w-2.5 rounded-full bg-info/50" /><span className="text-caption text-muted-foreground">Tarefas</span></div>
        <div className="flex items-center gap-1.5"><div className="h-2.5 w-2.5 rounded-full bg-success/50" /><span className="text-caption text-muted-foreground">Entregas</span></div>
        <div className="flex items-center gap-1.5"><div className="h-2.5 w-2.5 rounded-full bg-warning/50" /><span className="text-caption text-muted-foreground">Reuniões</span></div>
        {connected && (
          <div className="flex items-center gap-1.5"><div className="h-2.5 w-2.5 rounded-full bg-primary/50" /><span className="text-caption text-muted-foreground">Google Calendar</span></div>
        )}
      </div>
    </div>
  );
}
