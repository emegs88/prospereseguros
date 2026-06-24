import { cn } from "@/lib/utils";
import type { ParceiroId } from "@/lib/parceiros";

// ─────────────────────────────────────────────────────────────────────────
//  Logos das seguradoras parceiras.
//
//  • Se a marca tiver um arquivo OFICIAL (prop `logo`, ex.: "/seguradoras/
//    azul.svg"), ele é renderizado como <img> — fica 100% exato.
//  • Caso contrário, cai no vetor desenhado (MARKS), normalizado em
//    viewBox 0 0 200 56 para alinhar na régua de parceiros.
//
//  Assim, basta jogar os arquivos oficiais em /public/seguradoras/ e apontar
//  `logo` em src/lib/parceiros.ts — sem mexer neste componente.
// ─────────────────────────────────────────────────────────────────────────

interface PartnerLogoProps {
  id: ParceiroId;
  title: string;
  /** Caminho do logo oficial em /public. Se informado, usa o arquivo real. */
  logo?: string;
  className?: string;
}

export function PartnerLogo({ id, title, logo, className }: PartnerLogoProps) {
  // Logo oficial → arquivo real, exato.
  if (logo) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={logo}
        alt={title}
        loading="lazy"
        decoding="async"
        className={cn("h-9 w-auto object-contain", className)}
      />
    );
  }

  // Sem arquivo oficial → vetor desenhado.
  return (
    <svg
      viewBox="0 0 200 56"
      role="img"
      aria-label={title}
      className={cn("h-9 w-auto", className)}
    >
      <title>{title}</title>
      {MARKS[id]}
    </svg>
  );
}

const MARKS: Record<ParceiroId, JSX.Element> = {
  // ── Allianz: wordmark azul-escuro + 3 barras no octógono ──────────────
  allianz: (
    <g>
      <text
        x="6"
        y="36"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight="700"
        fontSize="26"
        fill="#003781"
        letterSpacing="-0.5"
      >
        Allianz
      </text>
      <g transform="translate(132 12)">
        <circle cx="16" cy="16" r="16" fill="#003781" />
        <rect x="9" y="14" width="3" height="11" fill="#fff" />
        <rect x="14.5" y="9" width="3" height="16" fill="#fff" />
        <rect x="20" y="11.5" width="3" height="13.5" fill="#fff" />
      </g>
    </g>
  ),

  // ── Azul Seguros: "azul" gradiente + "seguros" cinza ──────────────────
  azul: (
    <g>
      <defs>
        <linearGradient id="azulGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#00AEEF" />
          <stop offset="100%" stopColor="#1B3A8B" />
        </linearGradient>
      </defs>
      <text
        x="6"
        y="32"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight="800"
        fontSize="30"
        fill="url(#azulGrad)"
      >
        azul
      </text>
      <text
        x="9"
        y="48"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight="500"
        fontSize="13"
        letterSpacing="3"
        fill="#5B6770"
      >
        seguros
      </text>
    </g>
  ),

  // ── Bradesco Seguros: símbolo + "bradesco" + "seguros" ────────────────
  bradesco: (
    <g>
      <path
        d="M14 6 C9 12 8 20 12 27 C9 22 11 14 16 11 C13 16 14 22 18 26 C21 18 19 11 14 6 Z"
        fill="#CC092F"
      />
      <text
        x="30"
        y="30"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight="700"
        fontSize="22"
        fill="#CC092F"
      >
        bradesco
      </text>
      <text
        x="31"
        y="46"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight="400"
        fontSize="13"
        letterSpacing="1"
        fill="#CC092F"
      >
        seguros
      </text>
    </g>
  ),

  // ── HDI Seguros: "HDI" verde com barra + "Seguros" ────────────────────
  hdi: (
    <g>
      <text
        x="40"
        y="30"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight="800"
        fontSize="26"
        fill="#006A4D"
      >
        HDI
      </text>
      <rect x="40" y="9" width="62" height="3" fill="#8CC63F" />
      <text
        x="41"
        y="48"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight="400"
        fontSize="14"
        fill="#4A4A4A"
      >
        Seguros
      </text>
    </g>
  ),

  // ── MAPFRE: cogumelo + wordmark vermelho ──────────────────────────────
  mapfre: (
    <g transform="translate(0 4)">
      <g transform="translate(4 8)">
        <ellipse cx="13" cy="11" rx="13" ry="9" fill="#D81E2C" />
        <rect x="10" y="18" width="6" height="10" rx="2" fill="#D81E2C" />
        <circle cx="8" cy="9" r="2.2" fill="#fff" />
        <circle cx="15" cy="7" r="1.8" fill="#fff" />
        <circle cx="19" cy="11" r="1.6" fill="#fff" />
      </g>
      <text
        x="38"
        y="35"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight="800"
        fontSize="28"
        letterSpacing="1"
        fill="#D81E2C"
      >
        MAPFRE
      </text>
    </g>
  ),

  // ── Porto Seguro: "PORTO SEGURO" azul + vela ──────────────────────────
  porto: (
    <g>
      <text
        x="6"
        y="26"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight="800"
        fontSize="19"
        letterSpacing="0.5"
        fill="#003C9E"
      >
        PORTO
      </text>
      <text
        x="6"
        y="46"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight="800"
        fontSize="19"
        letterSpacing="0.5"
        fill="#003C9E"
      >
        SEGURO
      </text>
      <g transform="translate(120 10)">
        <rect width="40" height="36" rx="6" fill="#0072CE" />
        <path d="M10 30 L20 8 L20 30 Z" fill="#fff" />
        <path d="M22 30 L22 12 L33 30 Z" fill="#fff" />
      </g>
    </g>
  ),

  // ── Suhai Seguros: "SUHAI" verde + "SEGUROS" ──────────────────────────
  suhai: (
    <g>
      <text
        x="14"
        y="32"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight="800"
        fontSize="28"
        letterSpacing="0.5"
        fill="#1F9B4E"
      >
        SUHAI
      </text>
      <text
        x="58"
        y="48"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight="600"
        fontSize="11"
        letterSpacing="3"
        fill="#1F9B4E"
      >
        SEGUROS
      </text>
    </g>
  ),

  // ── SulAmérica: onda laranja + wordmark azul ──────────────────────────
  sulamerica: (
    <g>
      <path
        d="M14 18 C40 6 70 6 96 14 C120 21 150 21 176 12 C150 26 120 26 96 19 C70 11 40 11 14 22 Z"
        fill="#F58220"
      />
      <text
        x="20"
        y="46"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight="800"
        fontSize="24"
        fill="#003B7E"
      >
        SulAmérica
      </text>
    </g>
  ),

  // ── Tokio Marine Seguradora: emblema verde/dourado + wordmark ─────────
  tokio: (
    <g>
      <g transform="translate(2 8)">
        <circle cx="20" cy="20" r="20" fill="#00853F" />
        <path d="M12 28 C16 14 24 14 28 28 C24 22 16 22 12 28 Z" fill="#C8A24B" />
        <path d="M14 12 C22 16 22 24 18 30 C24 24 24 14 14 12 Z" fill="#fff" />
      </g>
      <text
        x="50"
        y="26"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontWeight="700"
        fontSize="16"
        fill="#1A2A4A"
      >
        TOKIO MARINE
      </text>
      <text
        x="50"
        y="44"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontWeight="700"
        fontSize="13"
        letterSpacing="0.5"
        fill="#1A2A4A"
      >
        SEGURADORA
      </text>
    </g>
  ),

  // ── Youse: wordmark magenta minimalista (digital, grupo Caixa) ────────
  youse: (
    <g>
      <text
        x="14"
        y="38"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight="800"
        fontSize="32"
        letterSpacing="-1"
        fill="#E6007E"
      >
        youse
      </text>
      <circle cx="150" cy="14" r="4.5" fill="#E6007E" />
    </g>
  ),
};
