import api from '../../../api';

export async function iniciarIntervencao(idCaso: number) {
    await api.post(`/api/v1/casos/${idCaso}/intervencoes/iniciar`);
}
