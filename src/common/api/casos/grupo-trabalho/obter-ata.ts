import api from '../../../api';

export async function obterAtaReuniao(idCaso: number, dataReuniao: string) {
    return await api.post(`/api/v1/casos/${idCaso}/grupo-trabalho/ata/${dataReuniao}/obter`);
}
