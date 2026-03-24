export type DiagnosticCategory = 'posicionamento' | 'presenca' | 'autoridade' | 'conversao';

export interface DiagnosticRule {
  id: string;
  category: DiagnosticCategory;
  question: string;
  type: 'select' | 'checkbox' | 'scale';
  options: string[];
  logic: Record<string, {
    score: number;
    insight?: string;
    isPositive?: boolean;
    action?: string;
  }>;
}

export const DIAGNOSTIC_RULES: DiagnosticRule[] = [
  // POSICIONAMENTO
  {
    id: 'nicho',
    category: 'posicionamento',
    question: 'O nicho está bem definido?',
    type: 'select',
    options: ['Sim', 'Não', 'Parcial'],
    logic: {
      'Sim': { score: 25, insight: 'Nicho bem definido e claro.', isPositive: true },
      'Não': { score: 0, insight: 'Nicho indefinido prejudica a atração de leads qualificados.', isPositive: false, action: 'Definir comunicações específicas para um ICP (Ideal Customer Profile) claro.' },
      'Parcial': { score: 10, insight: 'Nicho em fase de transição ou ajuste.', isPositive: false, action: 'Afilar a comunicação para falar com um público único.' }
    }
  },
  {
    id: 'promessa',
    category: 'posicionamento',
    question: 'Existe uma promessa clara de transformação?',
    type: 'select',
    options: ['Sim', 'Não', 'Parcial'],
    logic: {
      'Sim': { score: 25, insight: 'Proposta única de valor bem comunicada.', isPositive: true },
      'Não': { score: 0, insight: 'Falta de uma Big Idea ou promessa clara de resultado.', isPositive: false, action: 'Estruturar uma oferta baseada em uma transformação específica.' },
      'Parcial': { score: 10, insight: 'Promessa genérica ou confusa.', isPositive: false, action: 'Tornar a promessa mais específica e mensurável.' }
    }
  },
  {
    id: 'perfil',
    category: 'posicionamento',
    question: 'Como o perfil se posiciona?',
    type: 'select',
    options: ['Especialista', 'Criador de Conteúdo', 'Indefinido'],
    logic: {
      'Especialista': { score: 50, insight: 'Posicionamento de autoridade e domínio de campo.', isPositive: true },
      'Criador de Conteúdo': { score: 20, insight: 'Perfil muito focado em entretenimento, baixa percepção de venda.', isPositive: false, action: 'Transicionar de "conteudista" para "estratega" focado em soluções.' },
      'Indefinido': { score: 0, insight: 'Falta de clareza sobre quem é a pessoa por trás da marca.', isPositive: false, action: 'Definir pilares de conteúdo que demonstrem expertise.' }
    }
  },

  // PRESENÇA DIGITAL
  {
    id: 'frequencia',
    category: 'presenca',
    question: 'Frequência de postagens?',
    type: 'select',
    options: ['Diário', '3x por semana', '1x por semana', 'Não posta'],
    logic: {
      'Diário': { score: 40, insight: 'Alta consistência e manutenção de algoritmo.', isPositive: true },
      '3x por semana': { score: 25, insight: 'Frequência moderada, aceitável para manutenção.', isPositive: true },
      '1x por semana': { score: 10, insight: 'Baixa frequência, risco de queda de alcance.', isPositive: false, action: 'Aumentar frequência para pelo menos 3 vezes na semana.' },
      'Não posta': { score: 0, insight: 'Perfil abandonado ou vitrine estática.', isPositive: false, action: 'Retomar postagens estratégicas imediatamente.' }
    }
  },
  {
    id: 'padrao_visual',
    category: 'presenca',
    question: 'Existe padrão visual (branding)?',
    type: 'select',
    options: ['Sim', 'Não'],
    logic: {
      'Sim': { score: 30, insight: 'Identidade visual profissional e reconhecível.', isPositive: true },
      'Não': { score: 0, insight: 'Estética amadora ou ruidosa.', isPositive: false, action: 'Definir uma paleta de cores e tipografia padrão.' }
    }
  },
  {
    id: 'estrategico',
    category: 'presenca',
    question: 'O conteúdo é estratégico ou aleatório?',
    type: 'select',
    options: ['Estratégico', 'Parcial', 'Aleatório'],
    logic: {
      'Estratégico': { score: 30, insight: 'Conteúdo focado em funil (topo, meio e fundo).', isPositive: true },
      'Parcial': { score: 15, insight: 'Falta de clareza sobre o objetivo final da postagem.', isPositive: false, action: 'Mapear a jornada do cliente e criar conteúdos direcionados.' },
      'Aleatório': { score: 0, insight: 'Postagens feitas sem objetivo de venda ou crescimento.', isPositive: false, action: 'Implementar um calendário editorial estratégico.' }
    }
  },

  // AUTORIDADE
  {
    id: 'resultados',
    category: 'autoridade',
    question: 'Mostra resultados de clientes?',
    type: 'select',
    options: ['Sim', 'Não'],
    logic: {
      'Sim': { score: 40, insight: 'Forte prova social através de resultados reais.', isPositive: true },
      'Não': { score: 0, insight: 'Baixa percepção de eficácia (ausência de prova social).', isPositive: false, action: 'Criar destaques e posts constantes com resultados e estudos de caso.' }
    }
  },
  {
    id: 'depoimentos',
    category: 'autoridade',
    question: 'Possui depoimentos?',
    type: 'select',
    options: ['Sim', 'Não'],
    logic: {
      'Sim': { score: 30, insight: 'Validação externa de terceiros sobre o serviço.', isPositive: true },
      'Não': { score: 0, insight: 'Falta de validação e confiança de mercado.', isPositive: false, action: 'Solicitar feedbacks estruturados dos clientes atuais.' }
    }
  },
  {
    id: 'storytelling',
    category: 'autoridade',
    question: 'Usa storytelling na comunicação?',
    type: 'select',
    options: ['Sim', 'Não'],
    logic: {
      'Sim': { score: 30, insight: 'Capacidade de conexão emocional e retenção.', isPositive: true },
      'Não': { score: 0, insight: 'Comunicação muito técnica ou mecânica.', isPositive: false, action: 'Humanizar o perfil através de narrativas de superação e bastidores.' }
    }
  },

  // CONVERSÃO
  {
    id: 'cta',
    category: 'conversao',
    question: 'Possui CTA claro nas postagens?',
    type: 'select',
    options: ['Sim', 'Não'],
    logic: {
      'Sim': { score: 30, insight: 'Direcionamento claro para a próxima etapa do funil.', isPositive: true },
      'Não': { score: 0, insight: 'Falta de comando de ação, perda de oportunidades de venda.', isPositive: false, action: 'Incluir CTAs específicos (comente, mande DM, link na bio) em cada post.' }
    }
  },
  {
    id: 'link_contato',
    category: 'conversao',
    question: 'Possui link para contato (Bio)?',
    type: 'select',
    options: ['Sim', 'Não'],
    logic: {
      'Sim': { score: 30, insight: 'Porta de entrada para aquisição bem definida.', isPositive: true },
      'Não': { score: 0, insight: 'Dificuldade do cliente em comprar ou entrar em contato.', isPositive: false, action: 'Estruturar um linktree ou direct link para o WhatsApp.' }
    }
  },
  {
    id: 'oferta',
    category: 'conversao',
    question: 'Possui oferta definida?',
    type: 'select',
    options: ['Sim', 'Não'],
    logic: {
      'Sim': { score: 40, insight: 'Clareza total sobre o que está sendo vendido.', isPositive: true },
      'Não': { score: 0, insight: 'O público não sabe como contratar você.', isPositive: false, action: 'Definir um produto ou serviço de entrada (tripwire) e um core offer.' }
    }
  }
];
