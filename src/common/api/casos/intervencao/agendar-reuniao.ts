import api from '../../../api';

export interface AgendarReuniaoRequest {
    data: string;
}

export async function agendarReuniao(payload: AgendarReuniaoRequest, idCaso: number) {
    const response = await api.post(`/api/v1/casos/${idCaso}/intervencao/reunioes`, payload);
    return response.data;
}
