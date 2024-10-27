import api from '../../../api';

export async function getReunioes(idCaso: number) {
    const response = await api.get(`/api/v1/casos/${idCaso}/planejamento/reunioes`);
    return response.data;
}
