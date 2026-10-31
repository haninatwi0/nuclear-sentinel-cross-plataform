import { Ocorrencia } from "../types";

export const ocorrenciasIniciais: Ocorrencia[] = [
  {
    id: "occ-001",
    titulo: "Temperatura dentro do padrão",
    descricao:
      "Leitura de temperatura realizada durante inspeção de rotina. Valores dentro do intervalo esperado.",
    local: "Setor A - Sala de Controle",
    tipo: "temperatura",
    nivelAlerta: "normal",
    status: "resolvida",
    dataHora: "2026-10-28T08:30:00",
    criadoPor: "user-001",
    criadoPorNome: "Operador Nuclear",
  },
  {
    id: "occ-002",
    titulo: "Variação de temperatura",
    descricao:
      "Sensor registrou uma variação acima do comportamento esperado durante o monitoramento.",
    local: "Setor B - Área Técnica",
    tipo: "temperatura",
    nivelAlerta: "atipica",
    status: "em_analise",
    dataHora: "2026-10-29T14:15:00",
    criadoPor: "user-001",
    criadoPorNome: "Operador Nuclear",
  },
  {
    id: "occ-003",
    titulo: "Leitura crítica de sensor",
    descricao:
      "Sensor apresentou leitura classificada como crítica. Necessária avaliação imediata da equipe responsável.",
    local: "Setor C - Área de Monitoramento",
    tipo: "sensor",
    nivelAlerta: "critica",
    status: "aberta",
    dataHora: "2026-10-30T10:45:00",
    criadoPor: "user-002",
    criadoPorNome: "Supervisor Nuclear",
  },
];