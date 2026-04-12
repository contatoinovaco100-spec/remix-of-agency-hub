import { toast } from "sonner";
import { useCallback } from "react";

// Típos de sons disponíveis
export type NotificationSoundType = 'default' | 'sale' | 'agenda' | 'overdue';

// URLs dos sons. Você pode trocar por arquivos locais depois (ex: '/sounds/dinheiro.mp3')
const SOUND_URLS: Record<NotificationSoundType, string> = {
  default: "https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3",
  // Som de caixa registradora (Ka-ching!)
  sale: "https://www.myinstants.com/media/sounds/kaching.mp3", 
  // Som agradável de plim para agenda
  agenda: "https://assets.mixkit.co/active_storage/sfx/2868/2868-preview.mp3", 
  // Som negativo/alerta para tarefa atrasada
  overdue: "https://assets.mixkit.co/active_storage/sfx/2866/2866-preview.mp3", 
};

export function usePushNotification() {
  const playSound = useCallback((type: NotificationSoundType = 'default') => {
    try {
      const audioUrl = SOUND_URLS[type] || SOUND_URLS.default;
      const audio = new Audio(audioUrl);
      audio.volume = type === 'sale' ? 0.7 : 0.5; // Dinheiro um pouquinho mais alto!
      audio.play().catch(error => {
        console.warn("Audio play failed, likely due to browser autoplay policy:", error);
      });
    } catch (e) {
      console.error("Failed to play notification sound.", e);
    }
  }, []);

  const triggerNotification = useCallback((
    title: string, 
    description?: string, 
    type: "default" | "success" | "error" | "info" | "warning" = "default",
    soundType: NotificationSoundType = 'default'
  ) => {
    // 1. Roll the exact sound requested
    playSound(soundType);

    // 2. Tenta a nativa do sistema se o cliente aceitou
    if ("Notification" in window && Notification.permission === "granted") {
      try {
        new Notification(title, {
          body: description,
          icon: "/favicon.ico", 
        });
      } catch (e) {
        console.error("Native notification failed:", e);
      }
    } else if ("Notification" in window && Notification.permission !== "denied") {
      Notification.requestPermission();
    }

    // 3. Mostra na tela bonito com Sonner
    const toastFn = type === "default" ? toast : toast[type];
    
    toastFn(title, {
      description: description,
      duration: type === 'error' || soundType === 'overdue' ? 8000 : 5000, // Atrasadas ficam na tela por mais tempo
      position: "top-right",
      className: "shadow-2xl border border-primary/20 bg-background/95 backdrop-blur-sm",
    });

  }, [playSound]);

  const requestPermission = useCallback(async () => {
    if (!("Notification" in window)) {
      toast.error("Seu navegador não suporta notificações de origem.");
      return false;
    }
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      toast.success("Notificações ativadas com sucesso!");
      playSound('default');
      return true;
    }
    return false;
  }, [playSound]);

  return {
    triggerNotification,
    requestPermission,
    playSound
  };
}
