import api from '../../../api';

export enum AcoesIntervencaoStatusEnum {
    EXITO = 'Ação concluida com êxito.',
    SATISFATORIA = 'Ação concluida de forma satisfatória.',
    SEM_PREVISAO = 'Ação sem previsão de conclusão.'
}

export enum NivelIntervencaoEnum {
    MICRO = 'MICRO',
    MESO = 'MESO',
    MACRO = 'MACRO'
}

export interface CriarIntervencaoRequest {
    name: string;
    recursos: string;
    prazo: string;
    prioridade: number;
    nivel?: NivelIntervencaoEnum;
    autorNome: string;
}

export async function CriarIntervencao(idCaso: number, intervencao: CriarIntervencaoRequest) {
    console.log('aaaa');
    await api.post(`/api/v1/casos/${idCaso}/intervencoes`, intervencao);
}
