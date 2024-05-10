import api from '../../api';

export async function buscarCasos() {
    const response = await api.get<Caso[]>('/api/v1/casos');

    return response.data;
}
