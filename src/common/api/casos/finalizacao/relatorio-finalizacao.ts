import api from '../../../api';

export enum AtorFinalizacaoEnum {
    SUJEITO = 'Sujeito',
    INSTRUMENTOS = 'Instrumentos',
    REGRAS = 'Regras',
    COMUNIDADE = 'Comunidade',
    DIVISAO_TRABALHO = 'Divisão de Trabalho',
    OBJETO = 'Objeto'
}

export enum StatusRelatorioFinalizacaoEnum {
    RASCUNHO = 'RASCUNHO',
    REVISAO = 'REVISAO',
    FINALIZADO = 'FINALIZADO'
}

export interface AtorRelatorioFinalizacao {
    id: number;
    ator: AtorFinalizacaoEnum;
    descricao: string;
}

export interface RelatorioFinalizacao {
    id: number;
    status: StatusRelatorioFinalizacaoEnum;
    atores: AtorRelatorioFinalizacao[];
}

export async function buscarRelatorioFinalizacao(idCaso: number): Promise<RelatorioFinalizacao> {
    const { data } = await api.get<RelatorioFinalizacao>(
        `/api/v1/casos/${idCaso}/finalizacao/relatorio`
    );
    return data;
}

export async function atualizarAtorRelatorioFinalizacao(
    idCaso: number,
    idAtor: number,
    descricao: string
): Promise<AtorRelatorioFinalizacao> {
    const { data } = await api.patch<AtorRelatorioFinalizacao>(
        `/api/v1/casos/${idCaso}/finalizacao/relatorio/atores/${idAtor}`,
        { descricao }
    );
    return data;
}

export async function submeterRelatorioFinalizacaoAoGT(idCaso: number) {
    await api.post(`/api/v1/casos/${idCaso}/finalizacao/relatorio/submeter-gt`);
}
