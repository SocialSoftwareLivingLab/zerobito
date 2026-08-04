import api from '../../../api';

interface Request {
    conteudo: string;
}

export async function salvarAtaReuniao(ata: string, idCaso: number, dataReuniao: string) {
    const payload: Request = { conteudo: ata };
    await api.post(`/api/v1/casos/${idCaso}/grupo-trabalho/ata/${dataReuniao}`, payload);
}
