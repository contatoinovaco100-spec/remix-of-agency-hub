import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useGoogleCalendar } from '@/hooks/useGoogleCalendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import {
  Video, Plus, ExternalLink, Copy, Calendar, Clock, User, Mail,
  Loader2, CheckCircle2, AlertCircle, Wifi,
} from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

interface Meeting {
  id: string;
  client_name: string;
  client_email: string;
  title: string;
  description: string;
  meeting_date: string;
  duration_minutes: number;
  meet_link: string;
  google_event_id: string;
  status: string;
  created_at: string;
}

const anim = (i: number) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: i * 0.04, duration: 0.3 },
});

const emptyForm = {
  client_name: '',
  client_email: '',
  title: '',
  description: '',
  date: '',
  time: '10:00',
  duration_minutes: 30,
};

export default function MeetingsPage() {
  const { user } = useAuth();
  const google = useGoogleCalendar();
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const loadMeetings = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from('meetings')
      .select('*')
      .order('meeting_date', { ascending: true });
    if (data) setMeetings(data as Meeting[]);
    setLoading(false);
  }, []);

  useEffect(() => { loadMeetings(); }, [loadMeetings]);

  // Split meetings into upcoming and past
  const now = new Date().toISOString();
  const upcoming = meetings.filter(m => m.meeting_date >= now || m.status === 'agendada');
  const past = meetings.filter(m => m.meeting_date < now && m.status !== 'agendada');

  const handleSchedule = async () => {
    if (!form.client_name.trim() || !form.client_email.trim() || !form.date || !form.title.trim()) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    if (!google.connected) {
      toast.error('Conecte sua conta Google primeiro');
      return;
    }

    setSaving(true);

    try {
      // Build datetime
      const startDateTime = new Date(`${form.date}T${form.time}:00`);
      const endDateTime = new Date(startDateTime.getTime() + form.duration_minutes * 60000);

      // Create Google Calendar event with Meet link and attendees
      const event = {
        summary: form.title,
        description: form.description || `Reunião com ${form.client_name}`,
        start: { dateTime: startDateTime.toISOString(), timeZone: 'America/Sao_Paulo' },
        end: { dateTime: endDateTime.toISOString(), timeZone: 'America/Sao_Paulo' },
        attendees: [
          { email: form.client_email },
          ...(user?.email ? [{ email: user.email }] : []),
        ],
        conferenceData: {
          createRequest: {
            requestId: crypto.randomUUID(),
            conferenceSolutionKey: { type: 'hangoutsMeet' },
          },
        },
      };

      // Get access token and create event
      const tokens = localStorage.getItem('google_calendar_tokens');
      if (!tokens) throw new Error('Google não conectado');
      const { access_token, refresh_token, expires_at } = JSON.parse(tokens);

      let accessToken = access_token;
      if (Date.now() >= expires_at - 60000) {
        const { data: refreshData, error: refreshError } = await supabase.functions.invoke('google-calendar', {
          body: { action: 'refresh-token', refreshToken: refresh_token },
        });
        if (refreshError) throw refreshError;
        accessToken = refreshData.access_token;
        localStorage.setItem('google_calendar_tokens', JSON.stringify({
          access_token: refreshData.access_token,
          refresh_token,
          expires_at: Date.now() + (refreshData.expires_in * 1000),
        }));
      }

      const { data: eventData, error: eventError } = await supabase.functions.invoke('google-calendar', {
        body: { action: 'create-event', accessToken, event },
      });

      if (eventError) throw eventError;

      const meetLink = eventData.hangoutLink || eventData.conferenceData?.entryPoints?.[0]?.uri || '';

      // Save to database
      await supabase.from('meetings').insert({
        created_by: user?.id,
        client_name: form.client_name,
        client_email: form.client_email,
        title: form.title,
        description: form.description,
        meeting_date: startDateTime.toISOString(),
        duration_minutes: form.duration_minutes,
        meet_link: meetLink,
        google_event_id: eventData.id || '',
        status: 'agendada',
      });

      toast.success('Reunião agendada com sucesso! Convite enviado por email.');
      setDialogOpen(false);
      setForm(emptyForm);
      await loadMeetings();
    } catch (e: any) {
      console.error('Erro ao agendar reunião:', e);
      toast.error('Erro ao agendar reunião. Verifique a conexão com Google.');
    } finally {
      setSaving(false);
    }
  };

  const copyLink = (link: string) => {
    navigator.clipboard.writeText(link);
    toast.success('Link copiado!');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Video className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground">Reuniões</h1>
            <p className="text-xs sm:text-sm text-muted-foreground">Agende e gerencie reuniões via Google Meet</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {/* Google Connection Status */}
          {google.connected ? (
            <Badge variant="secondary" className="hidden sm:flex gap-1.5 bg-[hsl(var(--success))]/10 text-[hsl(var(--success))] border-0">
              <Wifi className="h-3 w-3" /> Google conectado
            </Badge>
          ) : (
            <Button variant="outline" size="sm" onClick={google.connect} className="flex-1 sm:flex-none">
              <Wifi className="h-3.5 w-3.5 mr-1" /> Conectar Google
            </Button>
          )}

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button disabled={!google.connected} className="flex-1 sm:flex-none">
                <Plus className="h-4 w-4 mr-1" /> Agendar
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Agendar Reunião</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Título da reunião *</Label>
                  <Input
                    value={form.title}
                    onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
                    placeholder="Ex: Alinhamento de conteúdo mensal"
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <Label className="text-xs uppercase tracking-wider text-muted-foreground">Nome do cliente *</Label>
                    <Input
                      value={form.client_name}
                      onChange={e => setForm(p => ({ ...p, client_name: e.target.value }))}
                      placeholder="Nome do cliente"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-xs uppercase tracking-wider text-muted-foreground">Email do cliente *</Label>
                    <Input
                      type="email"
                      value={form.client_email}
                      onChange={e => setForm(p => ({ ...p, client_email: e.target.value }))}
                      placeholder="email@cliente.com"
                      className="mt-1"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div>
                    <Label className="text-xs uppercase tracking-wider text-muted-foreground">Data *</Label>
                    <Input
                      type="date"
                      value={form.date}
                      onChange={e => setForm(p => ({ ...p, date: e.target.value }))}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-xs uppercase tracking-wider text-muted-foreground">Horário *</Label>
                    <Input
                      type="time"
                      value={form.time}
                      onChange={e => setForm(p => ({ ...p, time: e.target.value }))}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-xs uppercase tracking-wider text-muted-foreground">Duração (min)</Label>
                    <Input
                      type="number"
                      min={15}
                      max={480}
                      value={form.duration_minutes}
                      onChange={e => setForm(p => ({ ...p, duration_minutes: Number(e.target.value) }))}
                      className="mt-1"
                    />
                  </div>
                </div>
                <div>
                  <Label>Descrição (opcional)</Label>
                  <Textarea
                    value={form.description}
                    onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                    placeholder="Pauta da reunião..."
                    rows={3}
                  />
                </div>
                <Button onClick={handleSchedule} disabled={saving} className="w-full">
                  {saving ? (
                    <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Agendando...</>
                  ) : (
                    <><Calendar className="h-4 w-4 mr-2" /> Agendar e Enviar Convite</>
                  )}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Google not connected warning */}
      {!google.connected && (
        <Card className="border-[hsl(var(--warning))]/30 bg-[hsl(var(--warning))]/5">
          <CardContent className="flex items-center gap-3 p-4">
            <AlertCircle className="h-5 w-5 text-[hsl(var(--warning))] shrink-0" />
            <div>
              <p className="text-sm font-medium text-foreground">Google Calendar não conectado</p>
              <p className="text-xs text-muted-foreground">Conecte sua conta Google para agendar reuniões com link do Google Meet.</p>
            </div>
            <Button size="sm" variant="outline" onClick={google.connect} className="ml-auto shrink-0">
              Conectar
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Tabs */}
      <Tabs defaultValue="proximas" className="space-y-4">
        <TabsList>
          <TabsTrigger value="proximas" className="gap-1.5">
            <Calendar className="h-3.5 w-3.5" /> Próximas ({upcoming.length})
          </TabsTrigger>
          <TabsTrigger value="passadas" className="gap-1.5">
            <Clock className="h-3.5 w-3.5" /> Passadas ({past.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="proximas" className="space-y-3">
          {upcoming.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center gap-3 py-16 text-center">
                <Video className="h-12 w-12 text-muted-foreground/40" />
                <p className="text-muted-foreground">Nenhuma reunião agendada</p>
                <p className="text-xs text-muted-foreground">Clique em "Agendar Reunião" para começar</p>
              </CardContent>
            </Card>
          ) : (
            upcoming.map((m, i) => <MeetingCard key={m.id} meeting={m} index={i} onCopyLink={copyLink} />)
          )}
        </TabsContent>

        <TabsContent value="passadas" className="space-y-3">
          {past.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center gap-3 py-16 text-center">
                <Clock className="h-12 w-12 text-muted-foreground/40" />
                <p className="text-muted-foreground">Nenhuma reunião passada</p>
              </CardContent>
            </Card>
          ) : (
            past.map((m, i) => <MeetingCard key={m.id} meeting={m} index={i} onCopyLink={copyLink} isPast />)
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function MeetingCard({ meeting: m, index, onCopyLink, isPast }: {
  meeting: Meeting;
  index: number;
  onCopyLink: (link: string) => void;
  isPast?: boolean;
}) {
  const dateObj = new Date(m.meeting_date);
  const dateStr = dateObj.toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' });
  const timeStr = dateObj.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  const endTime = new Date(dateObj.getTime() + m.duration_minutes * 60000);
  const endTimeStr = endTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  return (
    <motion.div {...anim(index)}>
      <Card className={`border-border/50 transition-colors ${isPast ? 'opacity-70' : 'hover:border-primary/30'}`}>
        <CardContent className="p-4 sm:p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-4 flex-1 min-w-0">
              {/* Date badge */}
              <div className="flex flex-col items-center justify-center rounded-xl bg-primary/10 px-3 py-2 shrink-0 min-w-[56px] sm:min-w-[60px]">
                <span className="text-[10px] sm:text-xs font-medium text-primary uppercase">
                  {dateObj.toLocaleDateString('pt-BR', { month: 'short' })}
                </span>
                <span className="text-xl sm:text-2xl font-bold text-primary leading-tight">
                  {dateObj.getDate()}
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-sm sm:text-base font-semibold text-foreground truncate">{m.title}</h3>
                <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1 text-[11px] sm:text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <User className="h-3 w-3" /> {m.client_name}
                  </span>
                  <span className="flex items-center gap-1">
                    <Mail className="h-3 w-3" /> {m.client_email}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {timeStr} – {endTimeStr}
                  </span>
                </div>
                {m.description && (
                  <p className="mt-2 text-[11px] sm:text-xs text-muted-foreground line-clamp-2">{m.description}</p>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 shrink-0 pt-2 border-t border-border/50 sm:pt-0 sm:border-0">
              {m.meet_link && (
                <>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onCopyLink(m.meet_link)}
                    className="flex-1 sm:flex-none gap-1.5 h-8 text-xs"
                  >
                    <Copy className="h-3.5 w-3.5" /> Copiar
                  </Button>
                  <Button
                    size="sm"
                    asChild
                    className="flex-1 sm:flex-none gap-1.5 h-8 text-xs"
                  >
                    <a href={m.meet_link} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-3.5 w-3.5" /> Entrar
                    </a>
                  </Button>
                </>
              )}
              {!m.meet_link && (
                <Badge variant="secondary" className="text-[10px] sm:text-xs">Sem link</Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
