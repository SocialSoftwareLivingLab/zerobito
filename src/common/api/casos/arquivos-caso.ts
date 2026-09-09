import api from '../../api';

export interface ArquivoCaso {
    id: string;
    filename: string;
    mimeType: string;
    size: number;
    createdAt: string;
}

export async function listarArquivosCaso(idCaso: number): Promise<ArquivoCaso[]> {
    const { data } = await api.get(`/api/v1/casos/${idCaso}/arquivos`);
    return data;
}

export async function uploadArquivoCaso(idCaso: number, file: File): Promise<ArquivoCaso> {
    const form = new FormData();
    form.append('file', file);
    const { data } = await api.post(`/api/v1/casos/${idCaso}/arquivos`, form, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return data;
}

export async function downloadArquivoCaso(
    idCaso: number,
    arquivoId: string,
    filename: string
): Promise<void> {
    const response = await api.get(`/api/v1/casos/${idCaso}/arquivos/${arquivoId}`, {
        responseType: 'blob'
    });
    const url = URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

export async function removerArquivoCaso(idCaso: number, arquivoId: string): Promise<void> {
    await api.delete(`/api/v1/casos/${idCaso}/arquivos/${arquivoId}`);
}
