import api from '../../api';
import { Caso } from '../../models/caso/caso';

export async function buscarCasos(userId: number) {
    const response = await api.get<Caso[]>(`/api/v1/casos/membro/${userId}`);
    return response.data;
}
