import api from '../../../api';

export async function adicionarPalavraChave(idCaso: number, valor: string) {
    const response = await api.post(`/api/v1/casos/${idCaso}/palavras-chave`, { valor });

    return response.data;
}
