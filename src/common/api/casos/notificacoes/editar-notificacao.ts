import api from '../../../api';

export interface EditInfoGeralRequest {
    isEmitida: boolean;
}

export async function editNotificacao(
    payload: EditInfoGeralRequest,
    idCaso: number,
    identificador: string
) {
    const response = await api.put(
        `/api/v1/casos/${idCaso}/norificacoes/${identificador}`,
        payload
    );

    return response.data;
}
