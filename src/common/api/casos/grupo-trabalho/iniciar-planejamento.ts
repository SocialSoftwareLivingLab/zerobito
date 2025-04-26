import api from '../../../api';

export async function iniciarPlanejamento(idCaso: number) {
    await api.post(`/api/v1/casos/${idCaso}/planejamento/iniciar`);
}
