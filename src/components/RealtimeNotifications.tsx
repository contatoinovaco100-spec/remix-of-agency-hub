import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { usePushNotification } from '@/hooks/usePushNotification';
import { useModuleAccess } from '@/hooks/useUserRole';

export function RealtimeNotifications() {
  const { triggerNotification } = usePushNotification();
  const { isAdmin } = useModuleAccess();

  useEffect(() => {
    // Only admins should receive these global alerts
    if (!isAdmin) return;

    console.log("🔔 Realtime listener active for contracts...");

    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'contracts',
          filter: 'status=eq.assinado'
        },
        (payload) => {
          console.log('Change received!', payload);
          const contract = payload.new;
          
          triggerNotification(
            "Venda Confirmada! 💰", 
            `O contrato "${contract.title}" foi assinado por ${contract.client_name}.`, 
            "success", 
            "sale"
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [isAdmin, triggerNotification]);

  return null; // This is a logic-only component
}
