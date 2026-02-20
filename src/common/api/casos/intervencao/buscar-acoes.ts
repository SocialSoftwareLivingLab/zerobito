import api from '../../../api';

export interface AcaoIntervencao {
    id: number;
    nome: string;
    descricao: string;
    responsavel: {
        id: number;
        nome: string;
    };
    status: {
        id: number;
        codigo: string;
        nome: string;
    };
    statusConclusao?: {
        id: number;
        codigo: string;
        nome: string;
    };
    tipoAcao: {
        id: number;
        codigo: string;
        nome: string;
    };
    prazo: Date;
    dataConclusao?: Date;
    comentario?: string;
    dataCriacao: Date;
}

export async function buscarAcoesIntervencao(idCaso: number): Promise<AcaoIntervencao[]> {
    const response = await api.get(`/api/v1/casos/${idCaso}/intervencao/acoes`);
    return response.data;
}

export async function buscarAcoesMembro(
    idCaso: number,
    idMembro: number
): Promise<AcaoIntervencao[]> {
    const response = await api.get(`/api/v1/casos/${idCaso}/intervencao/membros/${idMembro}/acoes`);
    return response.data;
}
