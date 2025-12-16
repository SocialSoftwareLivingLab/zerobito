import api from '../../../api';

export async function finalizarIntervencao(idCaso: number): Promise<void> {
    await api.post(`/api/v1/casos/${idCaso}/intervencao/finalizar`);
}
