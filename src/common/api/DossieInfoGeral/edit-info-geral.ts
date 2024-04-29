import api from '../../api';

export interface EditInfoGeralRequest {
    CausaPrimaria: string;
    CausaSecundaria: string;
    Diagnostico: string;
    Comentario: string;
}

export async function editInfoGeral(payload: EditInfoGeralRequest) {
    await api.put('/api/v1/dossie', payload);
}
