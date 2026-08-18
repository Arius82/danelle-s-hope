import { useEffect, useState } from "react";
import { Check, Copy, QrCode, X } from "lucide-react";
import { campaign } from "@/data/campaign";
import { track } from "@/lib/analytics";
import { generatePixPayload } from "@/lib/pix";
import { triggerConfetti } from "@/lib/confetti";

type Props = { open: boolean; onClose: () => void };

export function DonationModal({ open, onClose }: Props) {
  const [valor, setValor] = useState<number | "outro" | null>(null);
  const [customValor, setCustomValor] = useState<string>("");
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

  const activeAmount = valor === "outro" ? parseFloat(customValor) || 0 : valor || 0;

  const payload = generatePixPayload({
    key: campaign.pix.chave,
    name: campaign.pix.titular,
    city: "JOAO PESSOA",
    amount: activeAmount,
  });

  const copiarPix = async () => {
    const textToCopy = payload || campaign.pix.chave;
    try {
      await navigator.clipboard.writeText(textToCopy);
    } catch {
      const el = document.createElement("textarea");
      el.value = textToCopy;
      el.style.position = "fixed";
      el.style.opacity = "0";
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopiado(true);
    triggerConfetti();
    track("copiar_pix", { valor: activeAmount });
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
              Sua contribuição será enviada diretamente para a conta bancária da {campaign.beneficiaria}.
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
              setCustomValor("");
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

        {valor === "outro" && (
          <div className="mt-4">
            <label htmlFor="custom-amount" className="text-sm font-semibold text-foreground">
              Digite o valor da doação:
            </label>
            <div className="relative mt-2 rounded-xl shadow-inner">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-muted-foreground font-semibold">
                R$
              </span>
              <input
                id="custom-amount"
                type="number"
                min="1"
                step="any"
                value={customValor}
                onChange={(e) => setCustomValor(e.target.value)}
                className="w-full rounded-xl border border-border bg-card py-3 pl-10 pr-4 font-semibold outline-none focus:border-primary transition-colors"
                placeholder="0,00"
              />
            </div>
          </div>
        )}

        <p className="mt-2 text-xs text-muted-foreground">
          {valor === "outro"
            ? "O código PIX abaixo será atualizado automaticamente com o valor digitado."
            : "O valor selecionado será preenchido automaticamente ao copiar o código abaixo."}
        </p>

        <div className="mt-6 rounded-2xl border border-primary/25 bg-primary-soft/60 p-4 text-center">
          <p className="text-sm font-semibold text-foreground">Código PIX Copia e Cola</p>
          <div className="mt-2 rounded-xl border border-border bg-card px-3 py-3 font-mono text-xs text-primary max-h-16 overflow-y-auto whitespace-pre-wrap break-all select-all text-left">
            {payload}
          </div>
          <button
            onClick={copiarPix}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-4 text-base font-bold text-primary-foreground transition-transform active:scale-[0.99] shadow-soft hover:brightness-105"
          >
            {copiado ? (
              <>
                <Check className="h-5 w-5" /> PIX copiado!
              </>
            ) : (
              <>
                <Copy className="h-5 w-5" /> COPIAR CÓDIGO PIX
              </>
            )}
          </button>
        </div>

        <div className="mt-5 flex flex-col items-center gap-3">
          <div className="flex h-44 w-44 items-center justify-center overflow-hidden rounded-2xl border border-dashed border-border bg-warm p-1 shadow-inner">
            {payload ? (
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(payload)}`}
                alt={`QR Code do PIX da ${campaign.beneficiaria}`}
                loading="lazy"
                className="h-full w-full object-contain animate-fade-in"
              />
            ) : (
              <div className="flex flex-col items-center gap-2 p-4 text-center">
                <QrCode className="h-7 w-7 text-muted-foreground" aria-hidden />
                <span className="text-xs text-muted-foreground">
                  Selecione ou digite um valor...
                </span>
              </div>
            )}
          </div>
          <p className="text-center text-xs text-muted-foreground max-w-[280px]">
            Aponte a câmera do aplicativo do seu banco para o QR Code acima. O valor será preenchido automaticamente.
          </p>
        </div>

        <div className="mt-5 border-t border-border pt-4 text-center">
          <p className="text-xs font-semibold text-muted-foreground">Caso prefira digitar os dados manualmente:</p>
          <p className="mt-1 text-sm font-bold text-foreground">
            Chave Celular: {campaign.pix.chave === "81986775698" ? "(81) 98677-5698" : campaign.pix.chave}
          </p>
          <p className="text-[10px] text-muted-foreground mt-0.5">
            Titular: {campaign.pix.titular} · {campaign.pix.banco}
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