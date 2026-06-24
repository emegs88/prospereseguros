import { PARCEIROS } from "@/lib/parceiros";
import { PartnerLogo } from "@/components/brand/partner-logo";

// Seção "Nossos parceiros" — régua com os logos reais das seguradoras.
// Em telas pequenas vira um marquee contínuo; no desktop, grade estática.
export function Parceiros() {
  return (
    <section className="border-y border-zinc-100 bg-white py-14">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-center font-condensed text-2xl font-extrabold uppercase text-zinc-800 md:text-3xl">
          Nossos <span className="text-prospere-blue">parceiros</span>
        </p>
        <p className="mx-auto mt-2 max-w-md text-center text-sm text-zinc-500">
          Trabalhamos com as maiores seguradoras do Brasil para encontrar a
          melhor proteção pelo melhor preço.
        </p>

        {/* desktop: grade */}
        <div className="mt-10 hidden flex-wrap items-center justify-center gap-x-12 gap-y-8 md:flex">
          {PARCEIROS.map((p) => (
            <PartnerLogo
              key={p.id}
              id={p.id}
              title={p.nome}
              className="h-10 w-auto opacity-90 grayscale transition hover:opacity-100 hover:grayscale-0"
            />
          ))}
        </div>

        {/* mobile: marquee */}
        <div className="pause-on-hover mt-8 overflow-hidden md:hidden">
          <div className="animate-marquee flex w-max items-center gap-10">
            {[...PARCEIROS, ...PARCEIROS].map((p, i) => (
              <PartnerLogo
                key={`${p.id}-${i}`}
                id={p.id}
                title={p.nome}
                className="h-8 w-auto opacity-90"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
