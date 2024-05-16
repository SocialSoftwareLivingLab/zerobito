import api from '../../api';

export interface EditInfoGeralRequest {
    CausaPrimaria: string;
    CausaSecundaria: string;
    Diagnostico: string;
    Comentario: string;
}

export async function editInfoGeral(payload: EditInfoGeralRequest, idCaso: number) {
    const response = await api.put(`/api/v1/casos/${idCaso}/palavras-chave`, payload);

    return response.data;
}
