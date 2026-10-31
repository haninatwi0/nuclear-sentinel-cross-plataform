export type Papel = "operador" | "supervisor";

export type NivelAlerta = "normal" | "atipica" | "critica";

export type StatusOcorrencia =
  | "aberta"
  | "em_analise"
  | "resolvida";

export type TipoOcorrencia =
  | "temperatura"
  | "radiacao"
  | "sensor"
  | "estrutura"
  | "seguranca"
  | "outro";

export type Usuario = {
  id: string;
  nome: string;
  email: string;
  senha: string;
  papel: Papel;
};

export type Ocorrencia = {
  id: string;
  titulo: string;
  descricao: string;
  local: string;
  tipo: TipoOcorrencia;
  nivelAlerta: NivelAlerta;
  status: StatusOcorrencia;
  dataHora: string;
  criadoPor: string;
  criadoPorNome: string;
};

export type AuthSession = {
  usuarioId: string;
  nome: string;
  email: string;
  papel: Papel;
};

export type NovaOcorrencia = {
  titulo: string;
  descricao: string;
  local: string;
  tipo: TipoOcorrencia;
  status: StatusOcorrencia;
};