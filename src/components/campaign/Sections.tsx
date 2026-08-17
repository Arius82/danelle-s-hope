import { useState } from "react";
import {
  ArrowUpRight,
  Check,
  Copy,
  Heart,
  Instagram,
  Link2,
  MessageCircle,
  ShieldCheck,
  X,
} from "lucide-react";
import { campaign } from "@/data/campaign";
import { track } from "@/lib/analytics";
import { PhotoFrame } from "./PhotoFrame";

const brl = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

export function Hero({ onDonate }: { onDonate: () => void }) {
  return (
    <header id="inicio" className="bg-warm px-5 pt-10 pb-12 sm:pt-16">
      <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2 md:items-center">
        <div className="aspect-[4/5] overflow-hidden rounded-3xl shadow-lift sm:aspect-[4/3] md:aspect-[4/5]">
          <PhotoFrame alt="Danelle" label="Foto da Danelle" />
        </div>
        <div>
          <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">
            Campanha de apoio à {campaign.beneficiaria}
          </p>
          <h1 className="mt-3 text-3xl leading-tight font-semibold sm:text-4xl md:text-5xl">
            {campaign.titulo}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            {campaign.subtitulo}
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={onDonate}
              className="rounded-2xl bg-primary px-6 py-4 text-base font-bold text-primary-foreground shadow-soft transition-transform active:scale-[0.99]"
            >
              ❤️ QUERO AJUDAR DANELLE
            </button>
            <a
              href="#historia"
              className="rounded-2xl border border-border bg-card px-6 py-4 text-center text-base font-semibold transition-colors hover:bg-muted"
            >
              Conheça a história
            </a>
          </div>
          <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
            <ShieldCheck className="h-4 w-4 shrink-0 text-primary" aria-hidden />
            Contribuição diretamente para o PIX da {campaign.beneficiaria}.
          </p>
        </div>
      </div>
    </header>
  );
}

export function Situacao({ onDonate }: { onDonate: () => void }) {
  return (
    <section className="px-5 py-14" aria-labelledby="situacao">
      <div className="mx-auto max-w-2xl">
        <h2 id="situacao" className="text-2xl font-semibold sm:text-3xl">
          {campaign.situacao.titulo}
        </h2>
        <p className="mt-4 text-lg leading-relaxed">{campaign.situacao.texto}</p>
        <p className="mt-4 rounded-2xl border border-dashed border-border bg-secondary/60 p-4 text-sm text-muted-foreground">
          {campaign.situacao.detalhes}
        </p>
        <button
          onClick={onDonate}
          className="mt-7 w-full rounded-2xl bg-primary px-6 py-4 text-base font-bold text-primary-foreground shadow-soft transition-transform active:scale-[0.99] sm:w-auto"
        >
          ❤️ Quero ajudar
        </button>
      </div>
    </section>
  );
}

const ajudas = [
  { icone: "🏥", titulo: "Tratamento", texto: "Consultas, procedimentos e acompanhamento médico." },
  { icone: "💊", titulo: "Medicamentos", texto: "Medicamentos e itens necessários durante o tratamento." },
  { icone: "🧪", titulo: "Exames", texto: "Exames e avaliações necessários para acompanhar o tratamento." },
  { icone: "🚗", titulo: "Deslocamentos", texto: "Transporte, viagens e outras despesas relacionadas ao tratamento." },
  { icone: "❤️", titulo: "Cuidados", texto: "Despesas adicionais necessárias durante essa fase." },
];

export function ComoAjuda() {
  return (
    <section id="como-ajudar" className="bg-secondary/50 px-5 py-14" aria-labelledby="como-ajuda">
      <div className="mx-auto max-w-5xl">
        <h2 id="como-ajuda" className="text-2xl font-semibold sm:text-3xl">
          Como sua ajuda pode contribuir
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ajudas.map((a) => (
            <div key={a.titulo} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
              <span className="text-2xl" aria-hidden>
                {a.icone}
              </span>
              <h3 className="mt-3 text-lg font-semibold">{a.titulo}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{a.texto}</p>
            </div>
          ))}
        </div>
        <p className="mt-5 text-xs text-muted-foreground">
          As contribuições podem ajudar com esses custos, conforme a necessidade da família ao longo
          do tratamento.
        </p>
      </div>
    </section>
  );
}

export function Historia() {
  return (
    <section id="historia" className="px-5 py-14" aria-labelledby="historia-titulo">
      <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-[1fr_1.1fr] md:items-start">
        <div className="aspect-[4/5] overflow-hidden rounded-3xl shadow-soft md:sticky md:top-8">
          <PhotoFrame alt="Danelle com a família" label="Foto real da Danelle" />
        </div>
        <div>
          <h2 id="historia-titulo" className="text-2xl font-semibold sm:text-3xl">
            {campaign.historia.titulo}
          </h2>
          <div className="mt-4 space-y-4">
            {campaign.historia.paragrafos.map((p, i) => (
              <p key={i} className="text-base leading-relaxed text-muted-foreground">
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Galeria() {
  const [aberta, setAberta] = useState<number | null>(null);
  const fotos = campaign.fotos;

  return (
    <section className="bg-secondary/50 px-5 py-14" aria-labelledby="fotos">
      <div className="mx-auto max-w-5xl">
        <h2 id="fotos" className="text-2xl font-semibold sm:text-3xl">
          Fotos
        </h2>
        {fotos.length === 0 ? (
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="aspect-square overflow-hidden rounded-2xl">
                <PhotoFrame alt="" label="Espaço para foto da família" />
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {fotos.map((f, i) => (
              <figure key={f.src} className="overflow-hidden rounded-2xl shadow-soft">
                <button
                  onClick={() => setAberta(i)}
                  className="block aspect-square w-full"
                  aria-label="Ampliar foto"
                >
                  <PhotoFrame src={f.src} alt={f.legenda ?? "Foto da campanha"} />
                </button>
                {f.legenda ? (
                  <figcaption className="bg-card px-3 py-2 text-xs text-muted-foreground">
                    {f.legenda}
                  </figcaption>
                ) : null}
              </figure>
            ))}
          </div>
        )}
      </div>

      {aberta !== null && fotos[aberta] ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/80 p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setAberta(null)}
        >
          <button
            aria-label="Fechar"
            className="absolute top-4 right-4 rounded-full bg-card p-2"
            onClick={() => setAberta(null)}
          >
            <X className="h-5 w-5" />
          </button>
          <img
            src={fotos[aberta].src}
            alt={fotos[aberta].legenda ?? "Foto da campanha"}
            className="max-h-[85vh] max-w-full rounded-2xl object-contain"
          />
        </div>
      ) : null}
    </section>
  );
}

export function Progresso() {
  const { arrecadado, meta, atualizadoEm } = campaign.progresso;
  const pct = arrecadado && meta ? Math.min(100, Math.round((arrecadado / meta) * 100)) : 0;

  return (
    <section className="px-5 py-14" aria-labelledby="progresso">
      <div className="mx-auto max-w-2xl rounded-3xl border border-border bg-card p-6 shadow-soft">
        <h2 id="progresso" className="text-2xl font-semibold">
          Progresso da campanha
        </h2>
        <div className="mt-5 grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Já arrecadamos</p>
            <p className="text-2xl font-bold text-primary">
              {arrecadado !== null ? brl(arrecadado) : "R$ [VALOR ATUAL]"}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Meta</p>
            <p className="text-2xl font-bold">{meta !== null ? brl(meta) : "R$ [META]"}</p>
          </div>
        </div>
        <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-[width] duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Última atualização: {atualizadoEm}. Os valores são atualizados manualmente pela família.
        </p>
      </div>
    </section>
  );
}

export function Transparencia() {
  return (
    <section className="bg-secondary/50 px-5 py-14" aria-labelledby="transparencia">
      <div className="mx-auto max-w-2xl">
        <h2 id="transparencia" className="text-2xl font-semibold sm:text-3xl">
          Transparência é importante para nós
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          Sabemos que, ao contribuir, você está confiando em nossa família. Por isso, queremos manter
          esta campanha atualizada e transparente.
        </p>
        <ul className="mt-5 space-y-3">
          {campaign.transparencia.itens.map((item) => (
            <li
              key={item}
              className="flex gap-3 rounded-2xl border border-dashed border-border bg-card p-4 text-sm text-muted-foreground"
            >
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
              <span className="min-w-0">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Atualizacoes() {
  return (
    <section id="atualizacoes" className="px-5 py-14" aria-labelledby="atualizacoes-titulo">
      <div className="mx-auto max-w-2xl">
        <h2 id="atualizacoes-titulo" className="text-2xl font-semibold sm:text-3xl">
          Atualizações
        </h2>
        <ol className="mt-6 space-y-6 border-l border-border pl-6">
          {campaign.atualizacoes.map((u) => (
            <li key={u.data + u.titulo} className="relative">
              <span className="absolute top-1.5 -left-[1.9rem] h-3 w-3 rounded-full bg-primary" />
              <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                {u.data}
              </p>
              <h3 className="mt-1 text-lg font-semibold">{u.titulo}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{u.texto}</p>
              {u.foto ? (
                <img
                  src={u.foto}
                  alt={u.titulo}
                  loading="lazy"
                  className="mt-3 w-full rounded-2xl object-cover shadow-soft"
                />
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Vakinha() {
  return (
    <section className="px-5 pb-14">
      <div className="mx-auto flex max-w-2xl flex-col gap-4 rounded-3xl border border-border bg-card p-6 shadow-soft sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h2 className="text-lg font-semibold">Prefere contribuir pela Vakinha?</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Também temos nossa campanha na Vakinha para quem prefere utilizar uma plataforma de
            arrecadação.
          </p>
        </div>
        <a
          href={campaign.vakinhaUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("click_vakinha")}
          className="inline-flex shrink-0 items-center justify-center gap-1 rounded-2xl border border-primary px-5 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary-soft"
        >
          Ver campanha na Vakinha <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}

export function Compartilhar() {
  const [copiado, setCopiado] = useState(false);
  const url = typeof window !== "undefined" ? window.location.href : "";
  const msg = `${campaign.mensagemCompartilhamento} ${url}`;

  const copiarLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2500);
    } catch {
      /* ignore */
    }
    track("copiar_link");
  };

  return (
    <section className="bg-secondary/50 px-5 py-14" aria-labelledby="compartilhar">
      <div className="mx-auto max-w-2xl">
        <h2 id="compartilhar" className="text-2xl font-semibold sm:text-3xl">
          Você também pode ajudar compartilhando
        </h2>
        <p className="mt-3 text-base text-muted-foreground">
          Se você não puder contribuir agora, compartilhar esta página já é uma grande ajuda.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <a
            href={`https://wa.me/?text=${encodeURIComponent(msg)}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("click_whatsapp")}
            className="flex items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-4 text-sm font-semibold text-primary-foreground"
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </a>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("click_instagram")}
            className="flex items-center justify-center gap-2 rounded-2xl border border-border bg-card px-4 py-4 text-sm font-semibold"
          >
            <Instagram className="h-4 w-4" /> Instagram
          </a>
          <button
            onClick={copiarLink}
            className="flex items-center justify-center gap-2 rounded-2xl border border-border bg-card px-4 py-4 text-sm font-semibold"
          >
            {copiado ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
            {copiado ? "Link copiado!" : "Copiar link"}
          </button>
        </div>
      </div>
    </section>
  );
}

export function CtaFinal({ onDonate }: { onDonate: () => void }) {
  return (
    <section className="bg-warm px-5 py-16">
      <div className="mx-auto max-w-2xl text-center">
        <Heart className="mx-auto h-7 w-7 text-primary" aria-hidden />
        <h2 className="mt-4 text-3xl font-semibold">Você pode fazer parte dessa história.</h2>
        <p className="mt-3 text-base text-muted-foreground">
          Se puder contribuir, agradecemos de coração. Se não puder, compartilhar esta página também
          ajuda muito.
        </p>
        <button
          onClick={onDonate}
          className="mt-7 w-full rounded-2xl bg-primary px-8 py-5 text-lg font-bold text-primary-foreground shadow-lift transition-transform active:scale-[0.99] sm:w-auto"
        >
          ❤️ QUERO AJUDAR DANELLE
        </button>
      </div>
    </section>
  );
}

export function Rodape() {
  return (
    <footer className="border-t border-border px-5 py-10 pb-28 md:pb-10">
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-semibold">Campanha de apoio à {campaign.beneficiaria}</p>
        <p className="mt-1 text-sm text-muted-foreground">Feita com carinho pela família.</p>
        <nav className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
          <a href="#inicio" className="hover:text-primary">
            Início
          </a>
          <a href="#historia" className="hover:text-primary">
            História
          </a>
          <a href="#atualizacoes" className="hover:text-primary">
            Atualizações
          </a>
          <a href="#como-ajudar" className="hover:text-primary">
            Como ajudar
          </a>
          <a
            href={campaign.vakinhaUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("click_vakinha")}
            className="hover:text-primary"
          >
            Vakinha
          </a>
        </nav>
      </div>
    </footer>
  );
}

export function BotaoFixo({ onDonate }: { onDonate: () => void }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur md:hidden">
      <button
        onClick={onDonate}
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 text-base font-bold text-primary-foreground"
      >
        <Copy className="hidden" aria-hidden />❤️ AJUDAR DANELLE
      </button>
    </div>
  );
}