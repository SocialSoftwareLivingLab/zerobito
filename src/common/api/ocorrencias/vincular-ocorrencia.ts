import api from '../../api';

export interface VincularOcorrenciaRequest {
    ocorrencia: {
        id: number;
    };
    caso: {
        id: number;
    };
}

interface VincularOcorrenciaApiRequest {
    idCaso: number;
}

export async function vincularOcorrenciaAoCaso(data: VincularOcorrenciaRequest) {
    const body: VincularOcorrenciaApiRequest = {
        idCaso: data.caso.id
    };
    await api.post(`/api/v1/ocorrencias/${data.ocorrencia.id}/vincular`, body);
}
