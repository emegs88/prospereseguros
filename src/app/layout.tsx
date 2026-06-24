import type { Metadata, Viewport } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import { EMPRESA } from "@/lib/empresa";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { WhatsappFab } from "@/components/layout/whatsapp-fab";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-condensed",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(EMPRESA.contato.site),
  title: {
    default: "Prospere Seguros — Cote, compare e contrate em minutos",
    template: "%s | Prospere Seguros",
  },
  description:
    "Corretora digital em Hortolândia/SP. Compare 8 seguradoras (Porto, Bradesco, Allianz, HDI, Tokio Marine e mais) e contrate seu seguro auto, vida ou residencial sem burocracia.",
  keywords: [
    "seguro auto",
    "cotação de seguro",
    "comparar seguro",
    "corretora de seguros",
    "Hortolândia",
    "Prospere Seguros",
  ],
  authors: [{ name: EMPRESA.nomeFantasia }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: EMPRESA.contato.site,
    siteName: EMPRESA.nomeFantasia,
    title: "Prospere Seguros — Proteção hoje, tranquilidade sempre",
    description: EMPRESA.promessa,
    images: [{ url: "/brand/logo-dark.svg", width: 360, height: 120 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prospere Seguros",
    description: EMPRESA.promessa,
  },
  icons: { icon: "/brand/icon.svg" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0047BA",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${oswald.variable}`}>
      <body className="min-h-screen bg-background font-sans">
        <SiteHeader />
        {children}
        <SiteFooter />
        <WhatsappFab />
      </body>
    </html>
  );
}
