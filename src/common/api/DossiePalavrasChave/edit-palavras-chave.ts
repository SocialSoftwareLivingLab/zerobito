import api from '../../api';

export interface EditPalavrasRequest {
    palavrasChave: string[];
}

export async function editPalavras(payload: EditPalavrasRequest) {
    await api.put('/api/v1/dossie', payload);
}
