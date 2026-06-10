import api from '../../../api';

export async function listarAnexosIntervencao(idCaso: number, idIntervencao: number) {
    const { data } = await api.get(`/api/v1/casos/${idCaso}/intervencoes/${idIntervencao}/anexos`);
    return data;
}

export async function uploadAnexoIntervencao(idCaso: number, idIntervencao: number, file: File) {
    const formData = new FormData();
    formData.append('file', file);
    const { data } = await api.post(
        `/api/v1/casos/${idCaso}/intervencoes/${idIntervencao}/anexos`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
    );
    return data;
}

export async function removerAnexoIntervencao(
    idCaso: number,
    idIntervencao: number,
    arquivoId: string
) {
    await api.delete(`/api/v1/casos/${idCaso}/intervencoes/${idIntervencao}/anexos/${arquivoId}`);
}
