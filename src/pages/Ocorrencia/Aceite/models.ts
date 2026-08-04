import { OcorrenciaModel } from '../../../common/models/ocorrencias/model';

export type OcorrenciaCarregadaType = {
    loading: boolean;
    success: boolean;
    data: OcorrenciaModel | null;
};
