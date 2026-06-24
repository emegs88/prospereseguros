# Logos das seguradoras

Os logos exibidos na régua "Nossos parceiros" são, hoje, **desenhados em SVG
vetorial** dentro do componente `src/components/brand/partner-logo.tsx`.
Vantagens: nítidos em qualquer tela, leves, fundo transparente e sem depender
de arquivos externos.

## Quer usar os arquivos OFICIAIS de cada seguradora?

Siga este padrão (1 arquivo POR marca, nunca uma colagem):

1. Salve **um arquivo por seguradora**, com fundo **transparente**, nomeado
   pelo `id` usado em `src/lib/parceiros.ts`:

   ```
   public/seguradoras/allianz.svg
   public/seguradoras/azul.svg
   public/seguradoras/bradesco.svg
   public/seguradoras/hdi.svg
   public/seguradoras/mapfre.svg
   public/seguradoras/porto.svg
   public/seguradoras/suhai.svg
   public/seguradoras/sulamerica.svg
   public/seguradoras/tokio.svg
   ```

   - Prefira **SVG** (vetorial). Se só tiver PNG, use PNG com transparência e
     pelo menos 2x a altura de exibição (ex.: 80–120px de altura).
   - **NÃO** use uma única imagem com vários logos juntos ("clipart"/colagem):
     não dá para separar marca por marca e costuma ter fundo e marcas extras.

2. No componente `partner-logo.tsx`, troque o render do `id` por uma `<img>`:

   ```tsx
   import Image from "next/image";

   // dentro de MARKS, no lugar do <g>...</g> de cada marca:
   azul: <img src="/seguradoras/azul.svg" alt="Azul Seguros" />,
   ```

   (ou use o `next/image` com width/height fixos para melhor performance).

## Direitos de marca

Use apenas logos das seguradoras com as quais a Prospere **efetivamente
trabalha** (uso editorial: corretora indicando suas parceiras). Evite bancos de
imagem genéricos / "clipart" — risco de direito autoral e qualidade ruim.
