import api from '../../api';
import { Caso } from '../../models/caso/caso';

export async function buscarCasos(userId: number) {
    const response = await api.get<Caso[]>(`/api/v1/casos/membro/${userId}`);
    console.log('caso sendo buscado por : ');
    console.log(userId);
    return response.data;
}
