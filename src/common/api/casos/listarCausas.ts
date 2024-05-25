import api from '../../api';
import { Causa } from '../../models/caso/causa';

export async function listarCausas() {
    const response = await api.get<Causa[]>(`/api/v1/casos/causas`);

    return response.data;
}
