import api from '../../../api';
import { TipoNotificacao } from '../../../models/caso/notificacao';

export async function consultarTiposNotificacoes(): Promise<TipoNotificacao[]> {
    const response = await api.get('/api/v1/notificacoes/tipos');

    return response.data;
}
