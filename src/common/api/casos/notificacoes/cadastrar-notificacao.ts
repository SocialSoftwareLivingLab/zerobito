import api from '../../../api';

export interface CriarNotificacaoRequest {
    identificador: string;
    isEmitida: boolean;
    statusNotificacao: string;
    tipo: string;
    dataEmissao: Date | null;
    observacao: string;
}

export async function EditarNotificacao(idCaso: number, notificacao: CriarNotificacaoRequest) {
    console.log(notificacao);
    await api.put(`/api/v1/casos/${idCaso}/notificacoes`, notificacao);
}
