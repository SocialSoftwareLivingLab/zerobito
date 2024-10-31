import api from '../../../api';

export interface AgendarReuniaoRequest {
    data: string;
}

export async function agendarReuniao(payload: AgendarReuniaoRequest, idCaso: number) {
    console.log(payload);
    const response = await api.post(`/api/v1/casos/${idCaso}/planejamento/reunioes`, payload);
    return response.data;
}
