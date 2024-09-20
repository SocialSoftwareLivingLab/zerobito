import api from '../../api';
import { Caso } from '../../models/caso/caso';

export async function buscarCaso(id: number) {
    const response = await api.get<Caso>(`/api/v1/casos/${id}`);
    console.log('Caso em questao');
    console.log(response.data.dataCaso);
    return response.data;
}
