import api from '../../../api';
import { NotificacaoCaso } from '../../../models/caso/notificacao';

export async function consultarNotificacoes(idCaso: number): Promise<NotificacaoCaso[]> {
    const response = await api.get<NotificacaoCaso[]>(`/api/v1/casos/${idCaso}/notificacoes`);
    console.log(response.data);

    return response.data;
}
