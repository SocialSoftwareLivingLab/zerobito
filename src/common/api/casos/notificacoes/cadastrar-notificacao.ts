import api from '../../../api';

export interface CriarNotificacaoRequest {
    identificador: string;
    isEmitida: boolean;
    statusNotificacao: string;
    tipo: string;
    dataEmissao: Date;
    observacao: string;
}

export async function EditarNotificacao(idCaso: number, notificacao: CriarNotificacaoRequest) {
    await api.put(`/api/v1/casos/${idCaso}/notificacoes`, notificacao);
}
