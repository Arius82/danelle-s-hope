import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { DonationModal } from "@/components/campaign/DonationModal";
import {
  Atualizacoes,
  BotaoFixo,
  ComoAjuda,
  Compartilhar,
  CtaFinal,
  Galeria,
  Hero,
  Historia,
  Progresso,
  Rodape,
  Situacao,
  Transparencia,
  Vakinha,
} from "@/components/campaign/Sections";
import { initScrollTracking, track } from "@/lib/analytics";

const TITLE = "Ajude Danelle na luta contra o câncer";
const DESCRIPTION =
  "Conheça a história da Danelle e saiba como ajudar nossa família durante seu tratamento contra o câncer.";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { property: "og:locale", content: "pt_BR" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

function Index() {
  const [modalAberto, setModalAberto] = useState(false);

  const abrirModal = useCallback(() => {
    track("click_quero_ajudar");
    setModalAberto(true);
  }, []);

  useEffect(() => initScrollTracking(), []);

  return (
    <main className="min-h-screen bg-background">
      <Hero onDonate={abrirModal} />
      <Situacao onDonate={abrirModal} />
      <ComoAjuda />
      <Historia />
      <Galeria />
      <Transparencia />
      <Progresso />
      <Atualizacoes />
      <Vakinha />
      <Compartilhar />
      <CtaFinal onDonate={abrirModal} />
      <Rodape />
      <BotaoFixo onDonate={abrirModal} />
      <DonationModal open={modalAberto} onClose={() => setModalAberto(false)} />
    </main>
  );
}
