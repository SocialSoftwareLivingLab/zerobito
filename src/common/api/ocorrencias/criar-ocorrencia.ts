import api from "../../api";

export interface CriarOcorrenciaRequest {
    descricao: string;
    data: Date;
    local: {
      cidade: string;
      estado: string;
      logradouro: string;
    };
    vitima: {
      nome: string;
      vinculo: string;
      condicao: string;
      gravidade: string;
    };
    empresa: {
      nome: string;
      cnpj: string;
      tomadoraServico: {
        nome: string;
        cnpj: string;
      }
    };
    fonte: {
      nome: string;
      email: string;
      telefonePrincipal: string;
      telefoneSecundario: string;
      tipo: string;
      outroTipo: string;
    };
}

export async function criarOcorrencia(payload: CriarOcorrenciaRequest) {
    api.post("/api/v1/ocorrencias", payload);
}