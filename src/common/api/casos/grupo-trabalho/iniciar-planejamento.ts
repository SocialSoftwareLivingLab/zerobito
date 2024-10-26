import api from '../../../api';

export async function iniciarPlanejamento(idCaso: number) {
    console.log('API chamada para planejamento');
    await api.post(`/api/v1/casos/${idCaso}/planejamento-aceitar`);
}
