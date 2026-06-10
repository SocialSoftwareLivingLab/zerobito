import api from '../../../api';
import { AcoesIntervencaoStatusEnum, NivelIntervencaoEnum } from './criar-acao-de-intervencao';

export interface AtualizarIntervencaoRequest {
    name?: string;
    recursos?: string;
    prazo?: string;
    prioridade?: number;
    nivel?: NivelIntervencaoEnum;
    status?: AcoesIntervencaoStatusEnum;
    autorNome?: string;
}

export async function atualizarIntervencao(
    idCaso: number,
    idIntervencao: number,
    data: AtualizarIntervencaoRequest
) {
    await api.patch(`/api/v1/casos/${idCaso}/intervencoes/${idIntervencao}`, data);
}
