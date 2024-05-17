import api from '../../api';

export interface EditInfoGeralRequest {
    causaPrimaria: string;
    causaSecundaria: string;
    diagnostico: string;
    comentarios: string;
}

export async function editInfoGeral(payload: EditInfoGeralRequest, idCaso: number) {
    const response = await api.put(`/api/v1/casos/${idCaso}/informacoes-basicas`, payload);

    return response.data;
}
