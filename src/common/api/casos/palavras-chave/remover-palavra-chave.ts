import api from '../../../api';

export async function removerPalavraChave(idCaso: number, idPalavra: number) {
    await api.delete(`/api/v1/casos/${idCaso}/palavras-chave/${idPalavra}`);
}
