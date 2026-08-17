/**
 * ARQUIVO CENTRAL DA CAMPANHA
 * Altere aqui todos os dados: nome, PIX, meta, valor arrecadado, textos,
 * fotos e atualizações. Nenhum outro arquivo precisa ser editado.
 */

export const campaign = {
  beneficiaria: "Danelle Isabella Bastos César",

  titulo: "Ajude Danelle na luta contra o câncer",
  subtitulo:
    "Neste momento, nossa família precisa de ajuda para enfrentar os custos do tratamento e continuar oferecendo a Danelle todo o cuidado necessário.",

  /** PIX — substitua pela chave real da Danelle */
  pix: {
    chave: "81986775698",
    titular: "Danelle Isabella Bastos César",
    banco: "Mercado Pago / Banco do Brasil / Nubank", // standard/flexible
    /** Coloque a imagem do QR Code em public/images/qrcode-pix.png e informe o caminho aqui */
    qrCodeSrc: "" as string,
  },

  /** Valores sugeridos no modal (em reais) */
  valoresSugeridos: [20, 50, 100, 200],

  /** Progresso — atualize manualmente ou conecte a um banco de dados depois */
  progresso: {
    arrecadado: 22102 as number | null,
    meta: 100000 as number | null,
    atualizadoEm: "17/08/2026",
  },

  vakinhaUrl: "https://www.vakinha.com.br/vaquinha/danelle-isabela-contra-o-cancer-ajude-nos-a-continuar-o-tratamento",

  situacao: {
    titulo: "Por que estamos pedindo ajuda?",
    texto:
      "Danelle tem 40 anos e está enfrentando um carcinoma metaplásico invasivo da mama, um tipo raro e muito agressivo de câncer. Após passar por uma mastectomia, a doença infelizmente evoluiu para um quadro metastático, atingindo o fígado, pulmões, ossos e linfonodos. Recentemente, exames apontaram múltiplas lesões hepáticas e a presença de ascite, exigindo acompanhamento oncológico constante e tratamento sistêmico imediato.",
    detalhes:
      "O carcinoma metaplásico possui um alto índice de proliferação (Ki-67 de 90%, grau III, triplo-negativo), o que significa que as células tumorais se multiplicam muito rápido. Isso exige uma resposta médica rápida e coordenada, além de cuidados intensivos diários.",
  },

  historia: {
    titulo: "A história da Danelle",
    paragrafos: [
      "Danelle é esposa, mãe de 3 meninos maravilhosos e uma pessoa extremamente amada por toda a nossa família. Sempre dedicada a cuidar de todos ao seu redor, agora ela é quem mais precisa de nosso amparo e solidariedade.",
      "A descoberta do câncer de mama trouxe um desafio imenso. Mesmo após a cirurgia de remoção da mama (mastectomia), o diagnóstico tornou-se ainda mais complexo com o surgimento de metástases em diferentes órgãos.",
      "Os custos do tratamento vão muito além da medicação em si. Envolvem despesas pesadas com exames constantes, consultas com especialistas, alimentação especial, medicamentos de suporte, terapias complementares e o transporte necessário para as sessões médicas.",
      "Como família, decidimos pedir ajuda porque o peso financeiro e emocional desse momento tornou-se grande demais para carregarmos sozinhos. Cada contribuição, por menor que seja, é um sopro de esperança e uma força a mais para continuarmos lutando pela vida da Danelle.",
    ],
  },

  /** Fotos reais fornecidas pela família. Deixe [] enquanto não houver fotos. */
  fotos: [
    {
      src: "https://static.vakinha.com.br/uploads/vakinha/image/6272380/1786902098.22.jpg?ims=700x410",
      legenda: "Danelle Isabella Bastos César",
    },
  ] as { src: string; legenda?: string }[],

  /** Linha do tempo de atualizações — adicione novos itens no topo */
  atualizacoes: [
    {
      data: "17/08/2026",
      titulo: "Atualização da Campanha",
      texto:
        "Atualizamos nossos canais oficiais e nossa chave PIX pessoal direta para facilitar as doações. Seguimos em busca de alternativas médicas e tratamentos sistêmicos para controle da doença.",
      foto: "" as string,
    },
    {
      data: "16/08/2026",
      titulo: "Começamos nossa campanha",
      texto:
        "Hoje iniciamos esta campanha para ajudar Danelle durante o tratamento. Vamos usar este espaço para compartilhar notícias e manter todos informados.",
      foto: "" as string,
    },
  ],

  transparencia: {
    itens: [
      "Prestação de contas: Todas as doações recebidas via PIX pessoal ou Vakinha serão documentadas de forma transparente.",
      "Uso dos recursos: Os fundos serão destinados exclusivamente a exames, consultas, medicamentos de suporte, terapias e custos de locomoção.",
      "Atualizações médicas: Compartilharemos a evolução do tratamento e as orientações da equipe médica.",
    ],
  },

  mensagemCompartilhamento:
    "Oi! Estou ajudando na campanha da Danelle, que está enfrentando um câncer. Se puder contribuir ou compartilhar, já será uma grande ajuda. ❤️",
};

export type Campaign = typeof campaign;