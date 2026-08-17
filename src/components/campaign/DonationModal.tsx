import { useEffect, useState } from "react";
import { Check, Copy, QrCode, X } from "lucide-react";
import { campaign } from "@/data/campaign";
import { track } from "@/lib/analytics";

type Props = { open: boolean; onClose: () => void };

export function DonationModal({ open, onClose }: Props) {
  const [valor, setValor] = useState<number | "outro" | null>(null);
  const [copiado, setCopiado] = useState(false);

  useEffect(() => {
    if (!open) return;
    track("abrir_modal_pix");
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!copiado) return;
    const t = setTimeout(() => setCopiado(false), 2500);
    return () => clearTimeout(t);
  }, [copiado]);

  if (!open) return null;

  const copiarPix = async () => {
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
    track("copiar_pix", { valor });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/40 p-0 backdrop-blur-[2px] sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-doacao-titulo"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-h-[92vh] w-full max-w-md overflow-y-auto rounded-t-3xl bg-card p-6 shadow-lift sm:rounded-3xl"
      >
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
          <div className="min-w-0">
            <h2 id="modal-doacao-titulo" className="text-2xl font-semibold">
              Como você gostaria de ajudar?
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Qualquer valor pode fazer diferença. Sua contribuição será enviada diretamente para{" "}
              {campaign.beneficiaria}.
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="shrink-0 rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2">
          {campaign.valoresSugeridos.map((v) => (
            <button
              key={v}
              onClick={() => {
                setValor(v);
                track("selecionar_valor", { valor: v });
              }}
              className={`rounded-xl border px-3 py-3 text-base font-semibold transition-colors ${
                valor === v
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-secondary text-secondary-foreground hover:border-primary"
              }`}
            >
              R$ {v}
            </button>
          ))}
          <button
            onClick={() => {
              setValor("outro");
              track("selecionar_valor", { valor: "outro" });
            }}
            className={`col-span-2 rounded-xl border px-3 py-3 text-base font-semibold transition-colors ${
              valor === "outro"
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-secondary text-secondary-foreground hover:border-primary"
            }`}
          >
            Outro valor
          </button>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          O valor escolhido é apenas uma sugestão — você digita o valor final no seu banco.
        </p>

        <div className="mt-6 rounded-2xl border border-primary/25 bg-primary-soft/60 p-4">
          <p className="text-sm font-semibold">PIX da {campaign.beneficiaria}</p>
          <p
            className="mt-2 rounded-xl border border-border bg-card px-3 py-3 font-mono text-sm break-all select-all"
            data-testid="chave-pix"
          >
            {campaign.pix.chave}
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            Titular: {campaign.pix.titular} · {campaign.pix.banco}
          </p>
          <button
            onClick={copiarPix}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-4 text-base font-bold text-primary-foreground transition-transform active:scale-[0.99]"
          >
            {copiado ? (
              <>
                <Check className="h-5 w-5" /> PIX copiado!
              </>
            ) : (
              <>
                <Copy className="h-5 w-5" /> COPIAR PIX
              </>
            )}
          </button>
        </div>

        <div className="mt-5 flex flex-col items-center gap-3">
          <div className="flex h-44 w-44 items-center justify-center overflow-hidden rounded-2xl border border-dashed border-border bg-warm">
            {campaign.pix.qrCodeSrc ? (
              <img
                src={campaign.pix.qrCodeSrc}
                alt={`QR Code do PIX da ${campaign.beneficiaria}`}
                loading="lazy"
                className="h-full w-full object-contain"
              />
            ) : (
              <div className="flex flex-col items-center gap-2 p-4 text-center">
                <QrCode className="h-7 w-7 text-muted-foreground" aria-hidden />
                <span className="text-xs text-muted-foreground">
                  Espaço para o QR Code do PIX
                </span>
              </div>
            )}
          </div>
          <p className="text-center text-sm text-muted-foreground">
            Prefere usar o celular para pagar? Aponte a câmera para o QR Code.
          </p>
        </div>

        <button
          onClick={onClose}
          className="mt-5 w-full rounded-xl border border-border px-4 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
        >
          Fechar
        </button>
      </div>
    </div>
  );
}