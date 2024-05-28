import api from '../../api';

export type TipoFonteDenuncia =
    | 'ANONIMA'
    | 'VITIMA'
    | 'FAMILIAR'
    | 'COLEGA_TRABALHO'
    | 'SINDICATO'
    | 'IMPRENSA'
    | 'SERVICO_SAUDE'
    | 'OUTRO';
export type CondicaoVitima = 'OBITO' | 'INCIDENTE_ALTO_POTENCIAL';

export interface CriarOcorrenciaRequest {
    descricao: string;
    titulo: string;
    data: Date;
    local: {
        cidade: string;
        estado: string;
        logradouro: string;
    };
    vitima: {
        nome: string;
        vinculo: string;
        condicao: CondicaoVitima;
    };
    empresa: {
        nome: string;
        cnpj: string;
        tomadoraServico: {
            nome: string;
            cnpj: string;
        };
    };
    fonte: {
        detalhe: string;
        tipo: TipoFonteDenuncia;
        outroTipo: string;
    };
}

export async function criarOcorrencia(payload: CriarOcorrenciaRequest) {
    await api.post('/api/v1/ocorrencias', payload);
}
