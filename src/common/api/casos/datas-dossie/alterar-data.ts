import api from '../../../api';

export async function editData(payload: Date, idCaso: number) {
    const response = await api.put(`/api/v1/casos/${idCaso}/data-caso`, payload);
    return response.data;
}
