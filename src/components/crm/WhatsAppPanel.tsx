import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { MessageCircle, Send, RefreshCw, Wifi, WifiOff, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

interface Chat {
  phone: string;
  name: string;
  lastMessage?: string;
  lastMessageTimestamp?: number;
  unreadCount?: number;
  profilePicUrl?: string;
}

interface Message {
  messageId: string;
  phone: string;
  body: string;
  fromMe: boolean;
  timestamp: number;
  type?: string;
}

export function WhatsAppPanel() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [connected, setConnected] = useState<boolean | null>(null);
  const [search, setSearch] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const callZapi = async (action: string, body: Record<string, unknown> = {}) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) throw new Error('Not authenticated');

    const res = await supabase.functions.invoke('zapi-whatsapp', {
      body: { action, ...body },
    });

    if (res.error) throw new Error(res.error.message);
    return res.data;
  };

  const checkStatus = async () => {
    try {
      const data = await callZapi('get-status');
      setConnected(data?.connected === true || data?.status === 'CONNECTED');
    } catch {
      setConnected(false);
    }
  };

  const loadChats = async () => {
    setLoading(true);
    try {
      const data = await callZapi('get-chats');
      const chatList: Chat[] = (Array.isArray(data) ? data : []).map((c: any) => ({
        phone: c.phone || c.id?.replace('@c.us', '') || '',
        name: c.name || c.contact?.name || c.phone || 'Desconhecido',
        lastMessage: c.lastMessageBody || c.lastMessage?.body || '',
        lastMessageTimestamp: c.lastMessageTimestamp || c.lastMessage?.timestamp || 0,
        unreadCount: c.unreadCount || 0,
        profilePicUrl: c.profilePicUrl || c.imgUrl || '',
      }));
      chatList.sort((a, b) => (b.lastMessageTimestamp || 0) - (a.lastMessageTimestamp || 0));
      setChats(chatList);
    } catch (err: any) {
      toast({ title: 'Erro ao carregar conversas', description: err.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const loadMessages = async (chat: Chat) => {
    setSelectedChat(chat);
    setMessages([]);
    try {
      const data = await callZapi('get-messages', { phone: chat.phone });
      const msgs: Message[] = (Array.isArray(data) ? data : []).map((m: any) => ({
        messageId: m.messageId || m.id || crypto.randomUUID(),
        phone: m.phone || chat.phone,
        body: m.body || m.text?.message || m.content || '',
        fromMe: m.fromMe ?? false,
        timestamp: m.timestamp || m.mompiledAt || 0,
        type: m.type || 'chat',
      }));
      msgs.sort((a, b) => a.timestamp - b.timestamp);
      setMessages(msgs);
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    } catch (err: any) {
      toast({ title: 'Erro ao carregar mensagens', description: err.message, variant: 'destructive' });
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedChat) return;
    setSending(true);
    try {
      await callZapi('send-text', { phone: selectedChat.phone, message: newMessage });
      setMessages(prev => [...prev, {
        messageId: crypto.randomUUID(),
        phone: selectedChat.phone,
        body: newMessage,
        fromMe: true,
        timestamp: Math.floor(Date.now() / 1000),
      }]);
      setNewMessage('');
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    } catch (err: any) {
      toast({ title: 'Erro ao enviar', description: err.message, variant: 'destructive' });
    } finally {
      setSending(false);
    }
  };

  useEffect(() => {
    checkStatus();
    loadChats();
  }, []);

  const filteredChats = chats.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search)
  );

  const formatTime = (ts: number) => {
    if (!ts) return '';
    const d = new Date(ts * 1000);
    return d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex h-[calc(100vh-220px)] rounded-lg border border-border bg-card overflow-hidden">
      {/* Sidebar - Chat list */}
      <div className="flex w-80 flex-col border-r border-border">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-success" />
            <span className="text-body font-semibold text-foreground">WhatsApp</span>
            {connected !== null && (
              connected
                ? <Wifi className="h-3.5 w-3.5 text-success" />
                : <WifiOff className="h-3.5 w-3.5 text-destructive" />
            )}
          </div>
          <Button variant="ghost" size="icon" onClick={loadChats} disabled={loading}>
            <RefreshCw className={cn("h-4 w-4", loading && "animate-spin")} />
          </Button>
        </div>

        {/* Search */}
        <div className="px-3 py-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar conversa..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9 h-9"
            />
          </div>
        </div>

        {/* Chat list */}
        <div className="flex-1 overflow-y-auto">
          {filteredChats.length === 0 && !loading && (
            <p className="px-4 py-8 text-center text-caption text-muted-foreground">
              {connected === false ? 'WhatsApp não conectado na Z-API' : 'Nenhuma conversa encontrada'}
            </p>
          )}
          {filteredChats.map(chat => (
            <button
              key={chat.phone}
              onClick={() => loadMessages(chat)}
              className={cn(
                'flex w-full items-start gap-3 px-4 py-3 text-left transition-default hover:bg-secondary/50',
                selectedChat?.phone === chat.phone && 'bg-primary/10'
              )}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-success/20 text-sm font-medium text-success">
                {chat.name.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className="truncate text-body font-medium text-foreground">{chat.name}</span>
                  <span className="text-[10px] text-muted-foreground">{formatTime(chat.lastMessageTimestamp || 0)}</span>
                </div>
                <p className="truncate text-caption text-muted-foreground">{chat.lastMessage}</p>
              </div>
              {(chat.unreadCount ?? 0) > 0 && (
                <span className="mt-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-success px-1 text-[10px] font-bold text-success-foreground">
                  {chat.unreadCount}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Chat area */}
      <div className="flex flex-1 flex-col">
        {selectedChat ? (
          <>
            {/* Chat header */}
            <div className="flex items-center gap-3 border-b border-border px-4 py-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-success/20 text-sm font-medium text-success">
                {selectedChat.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-body font-medium text-foreground">{selectedChat.name}</p>
                <p className="text-caption text-muted-foreground">+{selectedChat.phone}</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
              {messages.map(msg => (
                <div key={msg.messageId} className={cn('flex', msg.fromMe ? 'justify-end' : 'justify-start')}>
                  <div className={cn(
                    'max-w-[70%] rounded-lg px-3 py-2 text-body',
                    msg.fromMe
                      ? 'bg-success/20 text-foreground'
                      : 'bg-secondary text-foreground'
                  )}>
                    <p className="whitespace-pre-wrap break-words">{msg.body || `[${msg.type}]`}</p>
                    <span className="mt-1 block text-right text-[10px] text-muted-foreground">{formatTime(msg.timestamp)}</span>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="flex items-end gap-2 border-t border-border px-4 py-3">
              <Textarea
                placeholder="Digite uma mensagem..."
                value={newMessage}
                onChange={e => setNewMessage(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                className="min-h-[40px] max-h-[120px] resize-none"
                rows={1}
              />
              <Button onClick={sendMessage} disabled={sending || !newMessage.trim()} size="icon" className="shrink-0">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center text-muted-foreground">
            <div className="text-center">
              <MessageCircle className="mx-auto mb-3 h-12 w-12 opacity-30" />
              <p className="text-body">Selecione uma conversa</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
