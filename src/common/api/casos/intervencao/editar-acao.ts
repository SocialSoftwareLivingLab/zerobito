import api from '../../../api';

export interface EditarAcaoRequest {
    nome?: string;
    descricao?: string;
    idResponsavel?: number;
    idStatus?: number;
    idStatusConclusao?: number;
    idTipoAcao?: number;
    prazo?: string; // YYYY-MM-DD
    dataConclusao?: string; // YYYY-MM-DD
    comentario?: string;
}

export async function editarAcao(
    idCaso: number,
    idAcao: number,
    payload: EditarAcaoRequest
): Promise<void> {
    await api.put(`/api/v1/casos/${idCaso}/intervencao/acoes/${idAcao}`, payload);
}
