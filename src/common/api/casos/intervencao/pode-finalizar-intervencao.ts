import api from '../../../api';

export async function podeFinalizarIntervencao(idCaso: number): Promise<boolean> {
    const { data } = await api.get(`/api/v1/casos/${idCaso}/intervencoes/pode-finalizar`);
    return data.podeFinalizar;
}
