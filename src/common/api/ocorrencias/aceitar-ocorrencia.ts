import api from '../../api';

export interface AceitarOcorrenciaRequest {
    ocorrencia: {
        id: number;
    };
    caso: {
        nome: string;
        coordenador: {
            id: number;
        };
        instituicao: string;
    };
}

interface AceitarOcorrenciaApiRequest {
    novoCaso: {
        nome: string;
        coordenador: number;
        instituicao: string;
    };
}

export async function aceitarOcorrenciaComoCaso(data: AceitarOcorrenciaRequest) {
    const body: AceitarOcorrenciaApiRequest = {
        novoCaso: {
            nome: data.caso.nome,
            coordenador: data.caso.coordenador.id,
            instituicao: data.caso.instituicao
        }
    };
    const response = await api.post(`/api/v1/ocorrencias/${data.ocorrencia.id}/aceitar`, body);
}
