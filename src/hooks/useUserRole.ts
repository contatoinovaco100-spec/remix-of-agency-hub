import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export function useUserRole() {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [clientId, setClientId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setIsAdmin(false);
      setIsClient(false);
      setClientId(null);
      setLoading(false);
      return;
    }
    
    const role = user.user_metadata?.role;
    if (role === 'client') {
      setIsClient(true);
      setIsAdmin(false);
      setClientId(user.user_metadata?.client_id || null);
    } else {
      setIsAdmin(true);
      setIsClient(false);
    }
    setLoading(false);
  }, [user]);

  return { isAdmin, isClient, clientId, loading };
}

export type AppModule = 'comercial' | 'operacional';

export function useModuleAccess() {
  const { user } = useAuth();
  const { isAdmin } = useUserRole();
  const [modules, setModules] = useState<AppModule[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { setModules([]); setLoading(false); return; }
    if (isAdmin) { setModules(['comercial', 'operacional']); setLoading(false); return; }
    supabase
      .from('user_module_access')
      .select('module')
      .eq('user_id', user.id)
      .then(({ data }) => {
        setModules((data?.map(r => r.module) ?? []) as AppModule[]);
        setLoading(false);
      });
  }, [user, isAdmin]);

  const hasModule = (mod: AppModule) => isAdmin || modules.includes(mod);

  return { modules, hasModule, isAdmin, loading };
}

// Route-to-module mapping
export const ROUTE_MODULE_MAP: Record<string, AppModule> = {
  '/crm': 'comercial',
  '/clientes': 'operacional',
  '/tarefas': 'operacional',
  '/equipe': 'operacional',
  '/calendario': 'operacional',
  '/reunioes': 'operacional',
};

export const MODULE_LABELS: Record<AppModule, string> = {
  comercial: 'Comercial',
  operacional: 'Operacional',
};

export const MODULE_DESCRIPTIONS: Record<AppModule, string> = {
  comercial: 'CRM, funil de vendas e leads',
  operacional: 'Kanban de tarefas, clientes, equipe e calendário',
};
