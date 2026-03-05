import api from '../../../api';
export async function finalizarIntervencao(id: number) {
    await api.post(`/api/v1/casos/${id}/intervencao/finalizar`);
}
