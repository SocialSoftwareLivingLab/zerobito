import api from '../../../api';

export async function editDataObito(payload: Date, idCaso: number) {
    const response = await api.put(`/api/v1/casos/${idCaso}/data-obito`, payload);
    return response.data;
}
