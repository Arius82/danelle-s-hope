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
  FichaClinica,
  Hero,
  Historia,
  Rodape,
  Situacao,
  Transparencia,
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
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Background blobs for premium glassmorphism feel */}
      <div className="absolute top-[10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-blob-warm pointer-events-none filter blur-2xl" />
      <div className="absolute top-[35%] right-[-10%] h-[600px] w-[600px] rounded-full bg-blob-green pointer-events-none filter blur-3xl" />
      <div className="absolute bottom-[20%] left-[-15%] h-[550px] w-[550px] rounded-full bg-blob-warm pointer-events-none filter blur-2xl" />

      <Hero onDonate={abrirModal} />
      <Situacao onDonate={abrirModal} />
      <FichaClinica />
      <ComoAjuda />
      <Historia />
      <Galeria />
      <Transparencia />
      <Atualizacoes />
      <Compartilhar />
      <CtaFinal onDonate={abrirModal} />
      <Rodape />
      <BotaoFixo onDonate={abrirModal} />
      <DonationModal open={modalAberto} onClose={() => setModalAberto(false)} />
    </main>
  );
}
