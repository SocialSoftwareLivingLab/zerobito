import api from '../../../api';

interface EnviarConviteRequest {
    motivo: string;
    convidado: {
        nome: string;
        email: string;
    };
}

export async function enviarConviteMembroGrupo(idCaso: number, convite: EnviarConviteRequest) {
    await api.post(`/api/v1/casos/${idCaso}/grupo-trabalho/convite`, convite);
}
