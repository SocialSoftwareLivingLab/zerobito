import api from '../../../api';
import { PalavraChaveCaso } from '../../../models/caso/palavra-chave';

export async function buscarPalavrasChave(idCaso: number) {
    const response = await api.get<PalavraChaveCaso[]>(`/api/v1/casos/${idCaso}/palavras-chave`);

    return response.data;
}
