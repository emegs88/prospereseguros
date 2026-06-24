import { Trophy, MapPin, Medal } from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────
//  PATROCÍNIO OFICIAL — BEACH TENNIS
//  A Prospere é patrocinadora oficial do Beach Tennis. Faixa institucional
//  que reforça a marca esportiva (mesma energia do swoosh do logo).
// ─────────────────────────────────────────────────────────────────────────

export function PatrocinioBeachTennis() {
  return (
    <section className="relative overflow-hidden bg-prospere-navy py-16 text-white">
      <div className="absolute inset-0 bg-glow-prospere opacity-70" />
      <div className="absolute inset-0 bg-grid-prospere [background-size:40px_40px] opacity-20" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-6 md:grid-cols-[1fr_0.85fr]">
        <div className="animate-rise">
          <span className="inline-flex items-center gap-2 rounded-full border border-prospere-gold/40 bg-prospere-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-prospere-gold">
            <Trophy size={14} className="fill-prospere-gold" />
            Patrocinadora oficial
          </span>

          <h2 className="mt-5 font-condensed text-3xl font-extrabold uppercase leading-[1.05] md:text-5xl">
            Orgulho de patrocinar o{" "}
            <span className="text-gradient-prospere">Beach Tennis</span>
          </h2>

          <p className="mt-5 max-w-md text-lg leading-relaxed text-zinc-200">
            A energia, a garra e o espírito de equipe das quadras combinam com
            quem joga junto pela sua tranquilidade. A Prospere é patrocinadora
            oficial do Beach Tennis — protegendo o que importa, dentro e fora da
            areia.
          </p>

          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm text-zinc-300">
            <span className="inline-flex items-center gap-2">
              <Medal size={18} className="text-prospere-gold" />
              Apoio a torneios e atletas
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin size={18} className="text-prospere-gold" />
              Presente nas quadras de Hortolândia e região
            </span>
          </div>
        </div>

        {/* cartão visual — quadra estilizada */}
        <div className="animate-rise [animation-delay:120ms]">
          <div className="relative mx-auto aspect-[4/3] w-full max-w-sm overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-prospere-blue/30 to-prospere-navy p-6 shadow-card">
            {/* quadra de areia estilizada */}
            <div className="absolute inset-6 rounded-2xl border-2 border-white/30">
              <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/30" />
              <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-white/20" />
            </div>
            <div className="relative flex h-full flex-col items-center justify-center text-center">
              <Trophy
                size={56}
                className="text-prospere-gold drop-shadow-lg"
                strokeWidth={1.5}
              />
              <p className="mt-4 font-condensed text-2xl font-extrabold uppercase tracking-wide">
                Prospere
              </p>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-prospere-gold">
                Beach Tennis
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
