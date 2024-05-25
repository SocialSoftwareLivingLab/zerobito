import api from '../../api';
import { Causa } from '../../models/caso/causa';

export async function listarDiagnosticos() {
    const response = await api.get<Causa[]>(`/api/v1/casos/diagnosticos`);

    return response.data;
}
