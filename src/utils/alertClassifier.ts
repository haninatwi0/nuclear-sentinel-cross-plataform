import {
  NivelAlerta,
  TipoOcorrencia,
} from "../types";

export function classifyAlert(
  tipo: TipoOcorrencia,
  descricao: string
): NivelAlerta {
  const texto = descricao
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  const palavrasCriticas = [
    "critico",
    "critica",
    "emergencia",
    "risco elevado",
    "falha grave",
    "vazamento",
    "radiação elevada",
    "radiacao elevada",
  ];

  const palavrasAtipicas = [
    "acima do esperado",
    "fora do padrao",
    "variacao",
    "anomalia",
    "instabilidade",
    "irregular",
  ];

  const possuiPalavraCritica =
    palavrasCriticas.some((palavra) =>
      texto.includes(
        palavra
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
      )
    );

  const possuiPalavraAtipica =
    palavrasAtipicas.some((palavra) =>
      texto.includes(
        palavra
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
      )
    );

  if (possuiPalavraCritica) {
    return "critica";
  }

  if (possuiPalavraAtipica) {
    return "atipica";
  }

  if (tipo === "radiacao") {
    return "atipica";
  }

  return "normal";
}