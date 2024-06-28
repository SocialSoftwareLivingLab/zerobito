import api from '../../../api';
import { Localizacao } from '../../../models/caso/localizacao';

export interface EditLocalizacaoRequest {
    cidade: string;
    estado: string;
    logradouro: string;
    latitude: number;
    longitude: number;
}

export async function editarLocalizacaoCaso(idCaso: number): Promise<Localizacao> {
    const response = await api.get<Localizacao>(`/api/v1/casos/${idCaso}/localizacao`);

    return response.data;
}
