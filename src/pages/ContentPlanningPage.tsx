import { useState } from 'react';
import { useAgency } from '@/contexts/AgencyContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LayoutList, Lightbulb, PenTool, Calendar as CalendarIcon } from 'lucide-react';
import { motion } from 'framer-motion';

// Componentes das abas que serão criados a seguir
import { EditorialLineTab } from '@/components/content/EditorialLineTab';
import { ContentIdeasTab } from '@/components/content/ContentIdeasTab';
import { ScriptsTab } from '@/components/content/ScriptsTab';
import { ContentCalendarTab } from '@/components/content/ContentCalendarTab';

export default function ContentPlanningPage() {
  const { clients } = useAgency();
  const [selectedClientId, setSelectedClientId] = useState<string>('');

  const selectedClient = clients.find(c => c.id === selectedClientId);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto space-y-6"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between px-2">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
            Planejamento de Conteúdo
          </h1>
          <p className="text-muted-foreground mt-1">
            Hub de estratégia, ideias, roteiros e calendário para os seus clientes.
          </p>
        </div>

        <div className="w-full sm:w-[300px]">
          <Select value={selectedClientId} onValueChange={setSelectedClientId}>
            <SelectTrigger className="w-full bg-black/40 border-white/10">
              <SelectValue placeholder="Selecione um cliente..." />
            </SelectTrigger>
            <SelectContent>
              {clients.map(client => (
                <SelectItem key={client.id} value={client.id}>
                  {client.companyName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {!selectedClientId ? (
        <div className="flex flex-col items-center justify-center h-[50vh] text-center space-y-4 rounded-xl border border-white/5 bg-black/20 backdrop-blur-sm p-8">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <LayoutList className="w-8 h-8 text-primary" />
          </div>
          <div className="space-y-2 max-w-md">
            <h3 className="text-xl font-semibold">Tudo começa pelo Cliente</h3>
            <p className="text-muted-foreground text-sm">
              Selecione um cliente no topo da página para criar e visualizar a linha editorial, as ideias de vídeo, roteiros e o calendário de postagens.
            </p>
          </div>
        </div>
      ) : (
        <Tabs defaultValue="linha-editorial" className="w-full space-y-4">
          <TabsList className="w-full flex h-auto overflow-x-auto justify-start lg:w-auto bg-black/40 border border-white/5 p-1 scrollbar-hide">
            <TabsTrigger value="linha-editorial" className="flex-shrink-0 flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <LayoutList className="w-4 h-4 hidden sm:block" />
              <span className="whitespace-nowrap">Linha Editorial</span>
            </TabsTrigger>
            <TabsTrigger value="ideias" className="flex-shrink-0 flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Lightbulb className="w-4 h-4 hidden sm:block" />
              <span className="whitespace-nowrap">Ideias</span>
            </TabsTrigger>
            <TabsTrigger value="roteiros" className="flex-shrink-0 flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <PenTool className="w-4 h-4 hidden sm:block" />
              <span className="whitespace-nowrap">Roteiros</span>
            </TabsTrigger>
            <TabsTrigger value="calendario" className="flex-shrink-0 flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <CalendarIcon className="w-4 h-4 hidden sm:block" />
              <span className="whitespace-nowrap">Calendário</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="linha-editorial" className="m-0 mt-4 focus-visible:outline-none focus-visible:ring-0">
            <EditorialLineTab clientId={selectedClientId} />
          </TabsContent>

          <TabsContent value="ideias" className="m-0 mt-4 focus-visible:outline-none focus-visible:ring-0">
            <ContentIdeasTab clientId={selectedClientId} />
          </TabsContent>

          <TabsContent value="roteiros" className="m-0 mt-4 focus-visible:outline-none focus-visible:ring-0">
            <ScriptsTab clientId={selectedClientId} />
          </TabsContent>

          <TabsContent value="calendario" className="m-0 mt-4 focus-visible:outline-none focus-visible:ring-0">
            <ContentCalendarTab clientId={selectedClientId} />
          </TabsContent>
        </Tabs>
      )}
    </motion.div>
  );
}
