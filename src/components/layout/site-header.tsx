"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { PRODUTOS } from "@/lib/produtos";
import { whatsappLink } from "@/lib/whatsapp";

const NAV = [
  { rotulo: "Seguros", href: "/#produtos" },
  { rotulo: "Como funciona", href: "/#como-funciona" },
  { rotulo: "Quem somos", href: "/sobre" },
  { rotulo: "Contato", href: "/#contato" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [aberto, setAberto] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // trava o scroll quando o menu mobile está aberto
  useEffect(() => {
    document.body.style.overflow = aberto ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [aberto]);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "border-b border-zinc-200 bg-white/90 backdrop-blur"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          aria-label="Prospere Seguros — início"
          className="flex items-center"
        >
          <Logo variant="light" priority className="h-11 w-auto" />
        </Link>

        {/* nav desktop */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-zinc-700 transition hover:text-prospere-blue"
            >
              {item.rotulo}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button asChild variant="ghost" size="sm">
            <a
              href={whatsappLink({ origem: "header" })}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
          </Button>
          <Button asChild size="sm">
            <Link href="/cotar/auto">Cotar agora</Link>
          </Button>
        </div>

        {/* botão mobile */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg p-2 text-zinc-800 md:hidden"
          aria-label={aberto ? "Fechar menu" : "Abrir menu"}
          aria-expanded={aberto}
          onClick={() => setAberto((v) => !v)}
        >
          {aberto ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* drawer mobile */}
      {aberto && (
        <div className="fixed inset-0 top-16 z-40 bg-white md:hidden">
          <nav className="flex flex-col gap-1 px-6 py-6">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setAberto(false)}
                className="rounded-xl px-3 py-3 text-lg font-medium text-zinc-800 hover:bg-zinc-50"
              >
                {item.rotulo}
              </Link>
            ))}

            <p className="mt-4 px-3 text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Cotar seguro
            </p>
            <div className="grid grid-cols-2 gap-2 px-1">
              {PRODUTOS.map((p) => (
                <Link
                  key={p.slug}
                  href={p.href}
                  onClick={() => setAberto(false)}
                  className="rounded-xl border border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-700 hover:border-prospere-blue hover:text-prospere-blue"
                >
                  {p.rotulo}
                </Link>
              ))}
            </div>

            <Button asChild className="mt-6">
              <Link href="/cotar/auto" onClick={() => setAberto(false)}>
                Cotar agora
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
