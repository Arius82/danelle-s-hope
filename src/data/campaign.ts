/**
 * ARQUIVO CENTRAL DA CAMPANHA
 * Altere aqui todos os dados: nome, PIX, meta, valor arrecadado, textos,
 * fotos e atualizações. Nenhum outro arquivo precisa ser editado.
 */

export const campaign = {
  beneficiaria: "Danelle",

  titulo: "Ajude Danelle a continuar sua luta contra o câncer",
  subtitulo:
    "Neste momento, nossa família precisa de ajuda para enfrentar os custos do tratamento e continuar oferecendo a Danelle todo o cuidado necessário.",

  /** PIX — substitua pela chave real da Danelle */
  pix: {
    chave: "[SUBSTITUIR: CHAVE PIX DA DANELLE]",
    titular: "[SUBSTITUIR: NOME COMPLETO DO TITULAR]",
    banco: "[SUBSTITUIR: BANCO]",
    /** Coloque a imagem do QR Code em public/images/qrcode-pix.png e informe o caminho aqui */
    qrCodeSrc: "" as string,
  },

  /** Valores sugeridos no modal (em reais) */
  valoresSugeridos: [20, 50, 100, 200],

  /** Progresso — atualize manualmente ou conecte a um banco de dados depois */
  progresso: {
    arrecadado: null as number | null, // null = "a informar"
    meta: null as number | null, // null = "a informar"
    atualizadoEm: "[SUBSTITUIR: DATA DA ÚLTIMA ATUALIZAÇÃO]",
  },

  vakinhaUrl: "https://www.vakinha.com.br/6272380",

  situacao: {
    titulo: "Por que estamos pedindo ajuda?",
    texto:
      "Danelle está enfrentando um câncer agressivo e, neste momento, nossa família está concentrada em seu tratamento e em tudo o que é necessário para atravessar essa fase.",
    detalhes: "[ESPAÇO RESERVADO: história médica detalhada, a ser preenchida pela família]",
  },

  historia: {
    titulo: "A história da Danelle",
    paragrafos: [
      "[ESPAÇO RESERVADO: quem é a Danelle — família, trabalho, o que ela gosta de fazer]",
      "[ESPAÇO RESERVADO: diagnóstico — quando e como aconteceu]",
      "[ESPAÇO RESERVADO: evolução do tratamento até aqui]",
      "[ESPAÇO RESERVADO: tratamentos já realizados]",
      "[ESPAÇO RESERVADO: próximos passos]",
      "[ESPAÇO RESERVADO: principais despesas da família neste momento]",
    ],
  },

  /** Fotos reais fornecidas pela família. Deixe [] enquanto não houver fotos. */
  fotos: [] as { src: string; legenda?: string }[],

  /** Linha do tempo de atualizações — adicione novos itens no topo */
  atualizacoes: [
    {
      data: "17/08/2026",
      titulo: "Começamos nossa campanha",
      texto:
        "Hoje iniciamos esta campanha para ajudar Danelle durante o tratamento. Vamos usar este espaço para compartilhar notícias e manter todos informados.",
      foto: "" as string,
    },
  ],

  transparencia: {
    itens: [
      "Atualizações do tratamento: [ESPAÇO RESERVADO]",
      "Atualizações da arrecadação: [ESPAÇO RESERVADO]",
      "Informações importantes: [ESPAÇO RESERVADO]",
      "Prestação de contas: [ESPAÇO RESERVADO — será publicada quando disponível]",
    ],
  },

  mensagemCompartilhamento:
    "Oi! Estou ajudando na campanha da Danelle, que está enfrentando um câncer. Se puder contribuir ou compartilhar, já será uma grande ajuda. ❤️",
};

export type Campaign = typeof campaign;