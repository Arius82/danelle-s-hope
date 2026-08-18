import { useEffect, useState } from "react";
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
import { triggerConfetti } from "@/lib/confetti";

const brl = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

export function Hero({ onDonate }: { onDonate: () => void }) {
  const [copiado, setCopiado] = useState(false);

  const copiarChaveRapido = async () => {
    const chave = campaign.pix.chave;
    try {
      await navigator.clipboard.writeText(chave);
    } catch {
      const el = document.createElement("textarea");
      el.value = chave;
      el.style.position = "fixed";
      el.style.opacity = "0";
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopiado(true);
    triggerConfetti();
    track("copiar_pix", { valor: 0, origem: "hero_quick" });
    setTimeout(() => setCopiado(false), 2500);
  };

  return (
    <header id="inicio" className="bg-warm px-5 pt-10 pb-12 sm:pt-16">
      <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2 md:items-center">
        <div className="aspect-[4/5] overflow-hidden rounded-3xl shadow-lift sm:aspect-[4/3] md:aspect-[4/5]">
          <PhotoFrame src={campaign.fotos[0]?.src} alt="Danelle" label="Foto da Danelle" />
        </div>
        <div>
          <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">
            Campanha de apoio à {campaign.beneficiaria}
          </p>
          <h1 className="mt-3 text-3xl leading-tight font-semibold sm:text-4xl md:text-5xl text-foreground">
            Ajude Danelle na luta{" "}
            <span className="relative inline-block">
              <span className="absolute -inset-x-2 -inset-y-0.5 rounded-lg bg-primary/10 -rotate-1" aria-hidden />
              <span className="relative text-primary font-bold">contra o câncer</span>
            </span>
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            {campaign.subtitulo}
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <button
              onClick={onDonate}
              className="rounded-2xl bg-primary px-6 py-4 text-base font-bold text-primary-foreground shadow-soft transition-all hover:brightness-105 active:scale-[0.98] animate-heartbeat"
            >
              ❤️ QUERO AJUDAR DANELLE
            </button>
            <button
              onClick={copiarChaveRapido}
              className="rounded-2xl border border-border bg-card px-6 py-4 text-center text-base font-semibold transition-all hover:bg-muted active:scale-[0.98] flex items-center justify-center gap-2"
            >
              {copiado ? (
                <>
                  <Check className="h-4 w-4 text-primary" /> Chave Copiada!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 text-muted-foreground" /> Copiar Chave PIX
                </>
              )}
            </button>
            <a
              href="#historia"
              className="rounded-2xl border border-border bg-card px-6 py-4 text-center text-base font-semibold transition-all hover:bg-muted active:scale-[0.98] flex items-center justify-center"
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
          className="mt-7 w-full rounded-2xl bg-primary px-6 py-4 text-base font-bold text-primary-foreground shadow-soft transition-transform active:scale-[0.99] animate-heartbeat hover:brightness-105 sm:w-auto"
        >
          ❤️ Quero ajudar
        </button>
      </div>
    </section>
  );
}

export function FichaClinica() {
  const { titulo, subtitulo, detalhes } = campaign.fichaClinica;
  return (
    <section className="bg-card/75 px-5 py-12 border-y border-border/60 backdrop-blur-sm" aria-labelledby="ficha-clinica">
      <div className="mx-auto max-w-2xl">
        <div className="flex items-center gap-3">
          <span className="text-xl inline-flex items-center justify-center h-8 w-8 rounded-lg bg-primary/10 text-primary" aria-hidden>
            📋
          </span>
          <h2 id="ficha-clinica" className="text-xl font-bold sm:text-2xl text-foreground">
            {titulo}
          </h2>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          {subtitulo}
        </p>
        <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-background shadow-soft">
          <dl className="divide-y divide-border">
            {detalhes.map((item, idx) => (
              <div key={idx} className="grid grid-cols-1 p-4 sm:grid-cols-3 sm:gap-4 sm:px-6 hover:bg-muted/30 transition-colors">
                <dt className="text-xs font-semibold uppercase tracking-wider text-primary sm:py-0.5">
                  {item.rotulo}
                </dt>
                <dd className="mt-1 text-sm font-bold text-foreground sm:col-span-2 sm:mt-0">
                  {item.valor}
                </dd>
              </div>
            ))}
          </dl>
        </div>
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
          <PhotoFrame src={campaign.fotos[1]?.src || campaign.fotos[0]?.src} alt="Danelle com a família" label="Foto real da Danelle" />
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

        {campaign.documentos && campaign.documentos.length > 0 ? (
          <>
            <h3 className="mt-10 text-xl font-semibold text-foreground">
              Documentos e Laudos Médicos
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Abaixo estão os laudos oficiais que atestam o quadro clínico e fundamentam a campanha.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {campaign.documentos.map((doc) => (
                <div
                  key={doc.titulo}
                  className="flex flex-col justify-between rounded-2xl border border-border bg-card p-5 shadow-soft hover:shadow-lift transition-all duration-300"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-semibold text-primary uppercase tracking-wider bg-primary/10 px-2.5 py-0.5 rounded-full">
                        {doc.data}
                      </span>
                    </div>
                    <h4 className="mt-3 text-base font-semibold text-foreground leading-snug">
                      {doc.titulo}
                    </h4>
                    <p className="mt-1 text-xs text-muted-foreground font-medium">{doc.emissor}</p>
                    <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                      {doc.descricao}
                    </p>
                  </div>
                  <div className="mt-5 flex gap-2">
                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1 rounded-xl bg-primary px-3 py-2.5 text-center text-xs font-bold text-primary-foreground transition-all hover:brightness-105 active:scale-[0.98]"
                    >
                      Visualizar <ArrowUpRight className="h-3 w-3" />
                    </a>
                    <a
                      href={doc.url}
                      download
                      className="flex-1 inline-flex items-center justify-center gap-1 rounded-xl border border-border bg-secondary px-3 py-2.5 text-center text-xs font-semibold text-secondary-foreground transition-all hover:bg-muted active:scale-[0.98]"
                    >
                      {doc.url.endsWith(".pdf") ? "Baixar PDF" : "Baixar Imagem"}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : null}
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

export function Compartilhar() {
  const [copiado, setCopiado] = useState(false);
  const compartilharWhatsApp = () => {
    const msg = `${campaign.mensagemCompartilhamento} ${window.location.href}`;
    track("click_whatsapp");
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
  };

  const copiarLink = async () => {
    const url = window.location.href;
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
          <button
            onClick={compartilharWhatsApp}
            className="flex items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-4 text-sm font-semibold text-primary-foreground"
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </button>
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
        <Heart className="mx-auto h-7 w-7 text-primary animate-pulse" aria-hidden />
        <h2 className="mt-4 text-3xl font-bold text-foreground">Agradecemos de todo o coração!</h2>
        <p className="mt-3 text-base text-muted-foreground leading-relaxed">
          Cada doação e gesto de carinho fazem a diferença. Caso não possa contribuir financeiramente, 
          você pode nos apoiar imensamente <strong>compartilhando esta página</strong> com amigos e familiares, 
          e também nos sustentando em <strong>oração</strong> pela recuperação da Danelle.
        </p>
        <p className="mt-5 text-lg font-bold text-primary">
          Que Deus abençoe grandemente a sua vida! 🙏
        </p>
        <button
          onClick={onDonate}
          className="mt-8 w-full rounded-2xl bg-primary px-8 py-5 text-lg font-bold text-primary-foreground shadow-lift transition-all hover:brightness-105 active:scale-[0.98] animate-heartbeat sm:w-auto"
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
        </nav>
      </div>
    </footer>
  );
}

export function BotaoFixo({ onDonate }: { onDonate: () => void }) {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setVisivel(true);
      } else {
        setVisivel(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur transition-all duration-300 md:inset-x-auto md:bottom-8 md:right-8 md:left-auto md:border-none md:bg-transparent md:p-0 md:backdrop-blur-none ${
        visivel
          ? "translate-y-0 opacity-100 scale-100"
          : "translate-y-20 opacity-0 scale-90 pointer-events-none md:translate-y-10"
      }`}
    >
      <button
        onClick={onDonate}
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 text-base font-bold text-primary-foreground animate-heartbeat hover:brightness-105 shadow-lift md:w-auto md:rounded-full md:px-8 md:py-4"
      >
        <Copy className="hidden" aria-hidden />❤️ QUERO AJUDAR DANELLE
      </button>
    </div>
  );
}