import api from '../../../api';

export interface CriarNotificacaoRequest {
    identificador: string;
    isEmitida: boolean;
    tipo: string;
    dataEmissao: Date;
    observacao: string;
}

export async function cadastrarNotificacao(idCaso: number, notificacao: CriarNotificacaoRequest) {
    await api.post(`/api/v1/casos/${idCaso}/notificacoes`, notificacao);
}
