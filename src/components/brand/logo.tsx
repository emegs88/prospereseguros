import Image from "next/image";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────────────────
//  Logo oficial PROSPERE SEGUROS (arte real PNG transparente, já recortada).
//  /public/brand/prospere-logo.png  (≈428×235, fundo transparente)
//
//  variant="light" → fundos claros (arte original: P azul + texto preto/azul).
//  variant="dark"  → fundos escuros (preto da arte → branco via filtro).
//  iconOnly        → mostra só o símbolo (P + swoosh), recortando a wordmark.
// ─────────────────────────────────────────────────────────────────────────

interface LogoProps {
  className?: string;
  variant?: "light" | "dark";
  /** apenas o símbolo (P + swoosh), sem o texto */
  iconOnly?: boolean;
  priority?: boolean;
}

const SRC = "/brand/prospere-logo.png";
const W = 428;
const H = 235;

export function Logo({
  className,
  variant = "light",
  iconOnly = false,
  priority = false,
}: LogoProps) {
  const dark = variant === "dark";

  if (iconOnly) {
    // janela quadrada focando o "P" + swoosh (lado esquerdo da arte)
    return (
      <span
        className={cn(
          "relative block h-9 w-9 overflow-hidden",
          className,
        )}
        aria-label="Prospere Seguros"
      >
        <Image
          src={SRC}
          alt="Prospere Seguros"
          fill
          priority={priority}
          sizes="48px"
          className={cn(
            "object-cover object-left",
            dark && "brightness-0 invert",
          )}
        />
      </span>
    );
  }

  return (
    <Image
      src={SRC}
      alt="Prospere Seguros"
      width={W}
      height={H}
      priority={priority}
      sizes="220px"
      className={cn(
        "h-10 w-auto object-contain",
        dark && "brightness-0 invert",
        className,
      )}
    />
  );
}
