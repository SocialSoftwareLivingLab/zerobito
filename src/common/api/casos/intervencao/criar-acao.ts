import api from '../../../api';

export interface CriarAcaoRequest {
    nomeMembro: string;
    nome: string;
    prazo: string; // YYYY-MM-DD
    comentario?: string;
}

export async function criarAcao(idCaso: number, payload: CriarAcaoRequest): Promise<void> {
    await api.post(`/api/v1/casos/${idCaso}/intervencao/acoes`, payload);
}
