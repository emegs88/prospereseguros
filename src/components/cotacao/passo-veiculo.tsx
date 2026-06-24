"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { brl } from "@/lib/utils";
import {
  listarMarcas,
  listarModelos,
  listarAnos,
  consultarValor,
  type FipeMarca,
  type FipeModelo,
} from "@/lib/fipe";
import { useCotacaoAuto } from "@/store/cotacao-auto";

export function PassoVeiculo() {
  const { veiculo, setVeiculo, avancar } = useCotacaoAuto();

  const [marcas, setMarcas] = useState<FipeMarca[]>([]);
  const [modelos, setModelos] = useState<FipeModelo[]>([]);
  const [anos, setAnos] = useState<number[]>([]);
  const [buscandoValor, setBuscandoValor] = useState(false);

  // carrega marcas e anos uma vez
  useEffect(() => {
    listarMarcas().then(setMarcas);
    listarAnos().then(setAnos);
  }, []);

  // ao mudar a marca, recarrega modelos
  useEffect(() => {
    if (!veiculo.marcaCodigo) {
      setModelos([]);
      return;
    }
    listarModelos(veiculo.marcaCodigo).then(setModelos);
  }, [veiculo.marcaCodigo]);

  // ao ter modelo + ano, consulta o valor FIPE
  useEffect(() => {
    if (!veiculo.modeloCodigo || !veiculo.anoModelo) return;
    setBuscandoValor(true);
    consultarValor(veiculo.modeloCodigo, veiculo.anoModelo)
      .then((v) => {
        if (v)
          setVeiculo({ valorFipe: v.valorFipe, fipe: v.fipe });
      })
      .finally(() => setBuscandoValor(false));
  }, [veiculo.modeloCodigo, veiculo.anoModelo, setVeiculo]);

  const podeAvancar =
    !!veiculo.marcaNome &&
    !!veiculo.modeloNome &&
    !!veiculo.anoModelo &&
    !!veiculo.valorFipe;

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-condensed text-2xl font-extrabold uppercase text-zinc-900">
          Qual é o seu veículo?
        </h2>
        <p className="mt-1 text-sm text-zinc-500">
          Buscamos o valor FIPE automaticamente para a cotação.
        </p>
      </div>

      <div>
        <Label htmlFor="marca">Marca</Label>
        <Select
          id="marca"
          value={veiculo.marcaCodigo ?? ""}
          onChange={(e) => {
            const codigo = e.target.value;
            const nome = marcas.find((m) => m.codigo === codigo)?.nome;
            setVeiculo({
              marcaCodigo: codigo,
              marcaNome: nome,
              modeloCodigo: undefined,
              modeloNome: undefined,
              valorFipe: undefined,
            });
          }}
        >
          <option value="">Selecione a marca</option>
          {marcas.map((m) => (
            <option key={m.codigo} value={m.codigo}>
              {m.nome}
            </option>
          ))}
        </Select>
      </div>

      <div>
        <Label htmlFor="modelo">Modelo</Label>
        <Select
          id="modelo"
          disabled={!veiculo.marcaCodigo}
          value={veiculo.modeloCodigo ?? ""}
          onChange={(e) => {
            const codigo = e.target.value;
            const nome = modelos.find((m) => m.codigo === codigo)?.nome;
            setVeiculo({
              modeloCodigo: codigo,
              modeloNome: nome,
              valorFipe: undefined,
            });
          }}
        >
          <option value="">
            {veiculo.marcaCodigo ? "Selecione o modelo" : "Escolha a marca antes"}
          </option>
          {modelos.map((m) => (
            <option key={m.codigo} value={m.codigo}>
              {m.nome}
            </option>
          ))}
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="ano">Ano do modelo</Label>
          <Select
            id="ano"
            disabled={!veiculo.modeloCodigo}
            value={veiculo.anoModelo ?? ""}
            onChange={(e) =>
              setVeiculo({ anoModelo: Number(e.target.value) || undefined })
            }
          >
            <option value="">Ano</option>
            {anos.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <Label htmlFor="placa">Placa (opcional)</Label>
          <Input
            id="placa"
            placeholder="ABC1D23"
            maxLength={8}
            value={veiculo.placa ?? ""}
            onChange={(e) =>
              setVeiculo({ placa: e.target.value.toUpperCase() })
            }
          />
        </div>
      </div>

      {/* valor FIPE */}
      <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
          Valor FIPE
        </p>
        {buscandoValor ? (
          <p className="mt-1 flex items-center gap-2 text-zinc-500">
            <Loader2 size={16} className="animate-spin" /> Consultando…
          </p>
        ) : veiculo.valorFipe ? (
          <p className="mt-1 font-condensed text-2xl font-extrabold text-prospere-blue">
            {brl(veiculo.valorFipe)}
          </p>
        ) : (
          <p className="mt-1 text-sm text-zinc-400">
            Selecione modelo e ano para ver o valor.
          </p>
        )}
      </div>

      <div className="flex justify-end pt-2">
        <Button size="lg" disabled={!podeAvancar} onClick={avancar}>
          Continuar <ArrowRight size={18} />
        </Button>
      </div>
    </div>
  );
}
