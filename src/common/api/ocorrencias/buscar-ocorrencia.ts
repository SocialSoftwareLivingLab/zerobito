import api from '../../api';
import { OcorrenciaModel } from '../../models/ocorrencias/model';

export async function buscarOcorrencia(id: string) {
    console.log(`/api/v1/ocorrencias/${id}`);
    return await api.get<OcorrenciaModel>(`/api/v1/ocorrencias/${id}`);
}
