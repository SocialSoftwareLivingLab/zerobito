import api from '../../api';
import { Caso } from '../../models/caso/caso';

export async function buscarCasos() {
    const response = await api.get<Caso[]>('/api/v1/casos');

    return response.data;
}
