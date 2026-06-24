import Link from "next/link";
import { Instagram, Mail, MapPin, Phone, Trophy } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { EMPRESA } from "@/lib/empresa";
import { PRODUTOS } from "@/lib/produtos";
import { whatsappLink } from "@/lib/whatsapp";

export function SiteFooter() {
  const { endereco, contato } = EMPRESA;
  const ano = new Date().getFullYear();

  return (
    <footer className="bg-prospere-navy text-zinc-300">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        {/* marca + contato */}
        <div>
          <Logo variant="dark" className="h-10 w-auto" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-zinc-400">
            {EMPRESA.tagline.charAt(0) +
              EMPRESA.tagline.slice(1).toLowerCase()}{" "}
            Corretora digital com mais de 23 anos protegendo o que importa.
          </p>
          <div className="mt-6 space-y-3 text-sm">
            <a
              href={whatsappLink({ origem: "footer" })}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 transition hover:text-white"
            >
              <Phone size={16} className="text-prospere-gold" />
              {contato.whatsappExibicao}
            </a>
            <a
              href={`mailto:${contato.email}`}
              className="flex items-center gap-2.5 transition hover:text-white"
            >
              <Mail size={16} className="text-prospere-gold" />
              {contato.email}
            </a>
            <a
              href={contato.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 transition hover:text-white"
            >
              <Instagram size={16} className="text-prospere-gold" />
              {contato.instagram}
            </a>
          </div>

          <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-prospere-gold/30 bg-prospere-gold/10 px-3 py-1.5 text-xs font-semibold text-prospere-gold">
            <Trophy size={13} className="fill-prospere-gold" />
            Patrocinadora oficial · Beach Tennis
          </p>
        </div>

        {/* seguros */}
        <nav>
          <h4 className="font-condensed text-sm font-bold uppercase tracking-wider text-white">
            Seguros
          </h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            {PRODUTOS.map((p) => (
              <li key={p.slug}>
                <Link href={p.href} className="transition hover:text-white">
                  Seguro {p.rotulo}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* institucional */}
        <nav>
          <h4 className="font-condensed text-sm font-bold uppercase tracking-wider text-white">
            Institucional
          </h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link href="/sobre" className="transition hover:text-white">
                Quem somos
              </Link>
            </li>
            <li>
              <Link href="/#como-funciona" className="transition hover:text-white">
                Como funciona
              </Link>
            </li>
            <li>
              <Link href="/area-do-cliente" className="transition hover:text-white">
                Área do cliente
              </Link>
            </li>
            <li>
              <Link href="/privacidade" className="transition hover:text-white">
                Privacidade (LGPD)
              </Link>
            </li>
          </ul>
        </nav>

        {/* endereço */}
        <div>
          <h4 className="font-condensed text-sm font-bold uppercase tracking-wider text-white">
            Onde estamos
          </h4>
          <p className="mt-4 flex gap-2.5 text-sm leading-relaxed text-zinc-400">
            <MapPin size={16} className="mt-0.5 shrink-0 text-prospere-gold" />
            <span>
              {endereco.logradouro}, {endereco.complemento}
              <br />
              {endereco.bairro} — {endereco.cidade}/{endereco.uf}
              <br />
              CEP {endereco.cep}
            </span>
          </p>
        </div>
      </div>

      {/* barra de compliance */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-6 text-xs text-zinc-500 md:flex-row md:items-center md:justify-between">
          <p>{EMPRESA.compliance}</p>
          <p>
            © {ano} {EMPRESA.nomeFantasia}. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
