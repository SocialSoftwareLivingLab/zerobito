import api from '../../../api';

export interface CoordenadorApiResponse {
    id: number;
    nome: string;
    email: string;
    dataCriacao: Date;
}

export async function buscarCoordenador(nome?: string) {
    const params = nome ? { nome } : {};

    return api.get<CoordenadorApiResponse[]>('/api/v1/coordenadores', {
        params
    });
}
