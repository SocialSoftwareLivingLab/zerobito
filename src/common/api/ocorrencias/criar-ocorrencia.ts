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
export type GravidadeVitima = 'EMERGENCIAL' | 'MUITO_URGENTE' | 'URGENTE' | 'POUCO_URGENTE' | '';

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
        condicao: CondicaoVitima;
        gravidade: GravidadeVitima;
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
        nome: string;
        email: string;
        telefonePrincipal: string;
        telefoneSecundario: string;
        tipo: TipoFonteDenuncia;
        outroTipo: string;
    };
}

export async function criarOcorrencia(payload: CriarOcorrenciaRequest) {
    await api.post('/api/v1/ocorrencias', payload);
}
