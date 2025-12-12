import { AxiosError } from 'axios';
import { MapaEtapaEnum } from '../../../../pages/Caso/Investigacao/enum/mapa-etapa-enum';
import { MapaEtapaStatusEnum } from '../../../../pages/Caso/Investigacao/enum/mapa-etapa-status-enum';
import api from '../../../api';
import Swal from 'sweetalert2';

export interface AlterarMapaEtapaDTO {
    idCaso: number;
    name: MapaEtapaEnum;
    descricao?: string;
    novoStatus?: MapaEtapaStatusEnum;
}

interface BackendError {
    mensagem?: string;
    message?: string;
    detail?: {
        mensagem?: string;
    };
}

export async function alterarMapaEtapa(data: AlterarMapaEtapaDTO) {
    try {
        const response = await api.put(`/api/v1/${data.idCaso}/investigacao/mapa/alterar`, {
            name: data.name,
            descricao: data.descricao,
            novoStatus: data.novoStatus
        });

        return response.data;
    } catch (err) {
        const error = err as AxiosError<BackendError>;
        // Se o backend mandou um JSON com mensagem de erro
        const mensagem =
            error.response?.data?.mensagem ||
            error.response?.data?.detail?.mensagem ||
            error.response?.data?.message ||
            'Erro ao alterar etapa do mapa.';

        // Exibe alerta
        Swal.fire({
            text: 'Erro ao fazer alteração',
            icon: 'error',
            timer: 2000,
            showConfirmButton: false,
            position: 'center',
            toast: true
        });
    }
}
