import api from '../../../api';

export interface EditNotificacaoRequest {
    isEmitida: boolean;
}

export async function editNotificacao(
    payload: EditNotificacaoRequest,
    idCaso: number,
    identificador: string
) {
    const response = await api.put(
        `/api/v1/casos/${idCaso}/norificacoes/${identificador}`,
        payload
    );

    return response.data;
}
