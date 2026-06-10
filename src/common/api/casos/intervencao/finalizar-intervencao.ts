import api from '../../../api';

export async function finalizarIntervencao(idCaso: number) {
    await api.post(`/api/v1/casos/${idCaso}/intervencoes/finalizar`);
}
