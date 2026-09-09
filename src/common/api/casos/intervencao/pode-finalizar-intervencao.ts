import api from '../../../api';

export interface PodeFinalizarIntervencaoResult {
    podeFinalizar: boolean;
    mensagem?: string;
}

export async function podeFinalizarIntervencao(
    idCaso: number
): Promise<PodeFinalizarIntervencaoResult> {
    const { data } = await api.get(`/api/v1/casos/${idCaso}/intervencoes/pode-finalizar`);
    return data;
}
