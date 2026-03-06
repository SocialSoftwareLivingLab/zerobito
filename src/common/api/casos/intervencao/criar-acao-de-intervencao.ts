import api from '../../../api';

export enum AcoesIntervencaoStatusEnum {
    EXITO = 'Ação concluida com êxito.',
    SATISFATORIA = 'Ação concluida de forma satisfatória.',
    SEM_PREVISAO = 'Ação sem previsão de conclusão.'
}

export interface CriarIntervencaoRequest {
    name: string;
    recursos: string;
    prazo: Date;
    prioridade: number;
    status: AcoesIntervencaoStatusEnum;
}

export async function CriarIntervencao(idCaso: number, intervencao: CriarIntervencaoRequest) {
    await api.post(`/api/v1/casos/${idCaso}/intervencoes`, intervencao);
}
