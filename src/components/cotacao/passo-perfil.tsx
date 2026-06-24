"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Loader2, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { consultarCep, formatarCep, normalizarCep } from "@/lib/cep";
import { useCotacaoAuto } from "@/store/cotacao-auto";

const USOS = [
  { v: "particular", r: "Particular / lazer" },
  { v: "trabalho", r: "Trabalho / deslocamento" },
  { v: "app", r: "Aplicativo (Uber/99)" },
] as const;

export function PassoPerfil() {
  const { perfil, setPerfil, avancar, voltar } = useCotacaoAuto();
  const [buscandoCep, setBuscandoCep] = useState(false);
  const [cepErro, setCepErro] = useState<string | null>(null);

  async function onCepBlur() {
    const n = normalizarCep(perfil.cep ?? "");
    if (n.length !== 8) {
      setCepErro(n.length ? "CEP deve ter 8 dígitos" : null);
      return;
    }
    setCepErro(null);
    setBuscandoCep(true);
    const end = await consultarCep(n);
    setBuscandoCep(false);
    if (end) setPerfil({ cidade: end.cidade, uf: end.uf });
  }

  const podeAvancar =
    normalizarCep(perfil.cep ?? "").length === 8 &&
    !!perfil.idade &&
    perfil.idade >= 18 &&
    !!perfil.usoVeiculo;

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-condensed text-2xl font-extrabold uppercase text-zinc-900">
          Conte sobre você
        </h2>
        <p className="mt-1 text-sm text-zinc-500">
          O perfil define o preço — leva poucos segundos.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="cep">CEP onde o carro dorme</Label>
          <Input
            id="cep"
            inputMode="numeric"
            placeholder="00000-000"
            value={perfil.cep ? formatarCep(perfil.cep) : ""}
            onChange={(e) => setPerfil({ cep: e.target.value })}
            onBlur={onCepBlur}
          />
          {buscandoCep && (
            <p className="mt-1 flex items-center gap-1.5 text-xs text-zinc-500">
              <Loader2 size={12} className="animate-spin" /> Buscando endereço…
            </p>
          )}
          {perfil.cidade && !buscandoCep && (
            <p className="mt-1 flex items-center gap-1.5 text-xs text-prospere-blue">
              <MapPin size={12} /> {perfil.cidade}/{perfil.uf}
            </p>
          )}
          {cepErro && (
            <p className="mt-1 text-xs text-red-600">{cepErro}</p>
          )}
        </div>

        <div>
          <Label htmlFor="idade">Sua idade</Label>
          <Input
            id="idade"
            type="number"
            inputMode="numeric"
            min={18}
            max={99}
            placeholder="Ex.: 34"
            value={perfil.idade ?? ""}
            onChange={(e) =>
              setPerfil({ idade: Number(e.target.value) || undefined })
            }
          />
        </div>
      </div>

      <div>
        <Label>Como você usa o veículo?</Label>
        <div className="grid gap-2 sm:grid-cols-3">
          {USOS.map((u) => (
            <button
              key={u.v}
              type="button"
              onClick={() => setPerfil({ usoVeiculo: u.v })}
              className={cn(
                "rounded-xl border px-4 py-3 text-left text-sm font-medium transition",
                perfil.usoVeiculo === u.v
                  ? "border-prospere-blue bg-prospere-blue/5 text-prospere-blue ring-2 ring-prospere-blue/20"
                  : "border-zinc-300 text-zinc-700 hover:border-prospere-blue/40",
              )}
            >
              {u.r}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="sexo">Sexo (opcional)</Label>
          <Select
            id="sexo"
            value={perfil.sexo ?? ""}
            onChange={(e) =>
              setPerfil({
                sexo: (e.target.value || undefined) as
                  | "M"
                  | "F"
                  | "OUTRO"
                  | undefined,
              })
            }
          >
            <option value="">Prefiro não informar</option>
            <option value="F">Feminino</option>
            <option value="M">Masculino</option>
            <option value="OUTRO">Outro</option>
          </Select>
        </div>

        <div className="flex items-end gap-4 pb-1">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-zinc-700">
            <input
              type="checkbox"
              className="h-4 w-4 accent-prospere-blue"
              checked={!!perfil.garagemResidencia}
              onChange={(e) =>
                setPerfil({ garagemResidencia: e.target.checked })
              }
            />
            Garagem em casa
          </label>
          <label className="flex cursor-pointer items-center gap-2 text-sm text-zinc-700">
            <input
              type="checkbox"
              className="h-4 w-4 accent-prospere-blue"
              checked={!!perfil.condutorJovem}
              onChange={(e) => setPerfil({ condutorJovem: e.target.checked })}
            />
            Condutor 18–25
          </label>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2">
        <Button variant="ghost" onClick={voltar}>
          <ArrowLeft size={18} /> Voltar
        </Button>
        <Button size="lg" disabled={!podeAvancar} onClick={avancar}>
          Continuar <ArrowRight size={18} />
        </Button>
      </div>
    </div>
  );
}
