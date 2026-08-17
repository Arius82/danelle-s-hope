/**
 * Camada fina de analytics.
 * PLACEHOLDER: adicione aqui o Google Analytics (gtag) e o Meta Pixel (fbq)
 * quando tiver os IDs reais. Não há IDs fictícios neste arquivo.
 *
 * GA_MEASUREMENT_ID = "[SUBSTITUIR]"
 * META_PIXEL_ID     = "[SUBSTITUIR]"
 */

export type CampaignEvent =
  | "click_quero_ajudar"
  | "abrir_modal_pix"
  | "selecionar_valor"
  | "copiar_pix"
  | "click_whatsapp"
  | "click_instagram"
  | "copiar_link"
  | "scroll_pagina";

export function track(event: CampaignEvent, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const w = window as unknown as {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, ...params });
  w.gtag?.("event", event, params);
  w.fbq?.("trackCustom", event, params);
}

/** Dispara marcos de scroll (25/50/75/100%) uma única vez cada. */
export function initScrollTracking() {
  if (typeof window === "undefined") return () => {};
  const marcos = [25, 50, 75, 100];
  const enviados = new Set<number>();
  const onScroll = () => {
    const total = document.body.scrollHeight - window.innerHeight;
    if (total <= 0) return;
    const pct = Math.round((window.scrollY / total) * 100);
    for (const m of marcos) {
      if (pct >= m && !enviados.has(m)) {
        enviados.add(m);
        track("scroll_pagina", { percent: m });
      }
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  return () => window.removeEventListener("scroll", onScroll);
}