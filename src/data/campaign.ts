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
    banco: "Bradesco",
    /** Coloque a imagem do QR Code em public/images/qrcode-pix.png e informe o caminho aqui */
    qrCodeSrc: "" as string,
  },

  /** Valores sugeridos no modal (em reais) */
  valoresSugeridos: [20, 50, 100, 200],


  situacao: {
    titulo: "Por que estamos pedindo ajuda?",
    texto:
      "Danelle tem 40 anos e está enfrentando um carcinoma metaplásico invasivo da mama, um tipo raro e muito agressivo de câncer. Após passar por uma mastectomia, a doença infelizmente evoluiu para um quadro metastático, atingindo o fígado, pulmões, ossos e linfonodos. Recentemente, exames apontaram múltiplas lesões hepáticas e a presença de ascite, exigindo acompanhamento oncológico constante e tratamento sistêmico imediato.",
    detalhes:
      "O carcinoma metaplásico possui um alto índice de proliferação (Ki-67 de 90%, grau III, triplo-negativo), o que significa que as células tumorais se multiplicam muito rápido. Isso exige uma resposta médica rápida e coordenada, além de cuidados intensivos diários.",
  },

  fichaClinica: {
    titulo: "Resumo Clínico da Paciente",
    subtitulo: "Ficha médica consolidada a partir dos exames e laudos anexos:",
    detalhes: [
      { rotulo: "Diagnóstico", valor: "Carcinoma Metaplásico Invasivo de Mama (Grau III)" },
      { rotulo: "Subtipo Molecular", valor: "Triplo-Negativo (Ki-67: 90% - Alta proliferação)" },
      { rotulo: "Evolução Médica", valor: "Quadro Metastático (Fígado, Pulmão, Ossos e Linfonodos)" },
      { rotulo: "Complicações Recentes", valor: "Múltiplas lesões hepáticas e presença de ascite" },
      { rotulo: "Ação Imediata", valor: "Tratamento Sistêmico Urgente e Acompanhamento Oncológico" },
    ],
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
      src: "/images/foto-principal.jpg",
      legenda: "Danelle Isabella Bastos César",
    },
    {
      src: "/images/foto-1.jpg",
      legenda: "Danelle com o esposo e os filhos",
    },
    {
      src: "/images/foto-2.jpg",
      legenda: "Momento em família comemorando aniversário",
    },
    {
      src: "/images/foto-3.jpg",
      legenda: "Danelle com seu esposo e filhos",
    },
    {
      src: "/images/foto-4.jpg",
      legenda: "Danelle e sua linda família",
    },
    {
      src: "/images/foto-5.jpg",
      legenda: "Família reunida comemorando aniversário",
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
      "Comprovação médica: Disponibilizamos os laudos oficiais de exames e biópsia diretamente nesta página para certificar o diagnóstico e a gravidade do caso.",
      "Uso dos recursos: Os fundos serão destinados exclusivamente a exames, consultas, medicamentos de suporte, terapias e custos de locomoção.",
      "Atualizações médicas: Compartilharemos a evolução do tratamento e as orientações da equipe médica.",
    ],
  },

  documentos: [
    {
      titulo: "Laudo Histopatológico (Biópsia)",
      data: "05/06/2026",
      emissor: "CEDAPP - Centro de Diagnóstico Anatomopatológico",
      descricao: "Laudo de estudo imuno-histoquímico confirmando o diagnóstico de carcinoma metaplásico da mama esquerda, grau III (triplo-negativo) com índice de proliferação celular (Ki-67) de 90%.",
      url: "/documents/laudo-histopatologico.pdf",
    },
    {
      titulo: "Laudo de Exame PET/CT",
      data: "27/07/2026",
      emissor: "Nova Diagnóstico por Imagem",
      descricao: "Mapeamento corporal completo demonstrando lesões hipermetabólicas compatíveis com o quadro metastático da doença nos ossos, fígado, pulmões e linfonodos.",
      url: "/documents/laudo-petscan.jpg",
    },
  ],

  mensagemCompartilhamento:
    "Oi! Estou ajudando na campanha da Danelle, que está enfrentando um câncer. Se puder contribuir ou compartilhar, já será uma grande ajuda. ❤️",
};

export type Campaign = typeof campaign;