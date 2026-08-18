import { ImageIcon } from "lucide-react";

type Props = {
  src?: string | undefined;
  alt: string;
  label?: string | undefined;
  className?: string | undefined;
  onClick?: (() => void) | undefined;
};

/**
 * Exibe uma foto real quando fornecida; caso contrário mostra um espaço
 * claramente identificado para substituição pela família.
 */
export function PhotoFrame({ src, alt, label, className = "", onClick }: Props) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onClick={onClick}
        className={`h-full w-full object-cover ${className}`}
      />
    );
  }
  return (
    <div
      className={`flex h-full w-full flex-col items-center justify-center gap-2 border border-dashed border-border bg-warm p-6 text-center ${className}`}
    >
      <ImageIcon className="h-6 w-6 text-muted-foreground" aria-hidden />
      <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
        {label ?? "Espaço para foto real da Danelle"}
      </p>
    </div>
  );
}