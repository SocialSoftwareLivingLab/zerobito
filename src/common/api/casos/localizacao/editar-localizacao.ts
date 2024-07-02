import api from '../../../api';

export interface EditLocalizacaoRequest {
    cidade: string;
    estado: string;
    logradouro: string;
    latitude: number;
    longitude: number;
}

export async function editarLocalizacaoCaso(payload: EditLocalizacaoRequest, idCaso: number) {
    console.log(payload);
    const response = await api.put(`/api/v1/casos/${idCaso}/localizacao`, payload);

    return response.data;
}
