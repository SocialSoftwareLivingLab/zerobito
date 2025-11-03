import api from '../../api';

export interface EditarOcorrenciaRequest {
    titulo?: string;
    descricao?: string;
    data?: Date;
    local?: {
        estado?: string;
        cidade?: string;
        logradouro?: string;
    };
    vitima?: {
        numero?: string;
        nome?: string;
        vinculo?: string;
        condicao?: string;
    };
    empresa?: {
        nome?: string;
        cnpj?: string;
        cnae?: string;
        tomadoraServico?: {
            nome?: string;
            cnpj?: string;
            cnae?: string;
        };
    };
    fonte?: {
        tipo?: string;
        outroTipo?: string;
        detalhe?: string;
    };
}

export async function editarOcorrencia(idOcorrencia: number, payload: EditarOcorrenciaRequest) {
    const response = await api.patch(`/api/v1/ocorrencias/${idOcorrencia}`, payload);
    return response.data;
}
