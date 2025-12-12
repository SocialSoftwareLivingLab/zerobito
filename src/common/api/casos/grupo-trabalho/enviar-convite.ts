import { AxiosError } from 'axios';
import api from '../../../api';
import Swal from 'sweetalert2';

interface EnviarConviteRequest {
    motivo: string;
    convidado: {
        nome: string;
        email: string;
        instituicao: string;
    };
}

export async function enviarConviteMembroGrupo(idCaso: number, convite: EnviarConviteRequest) {
    try {
        const response = await api.post(`/api/v1/casos/${idCaso}/grupo-trabalho/convite`, convite);
        // Se o status não for 2xx, considera como erro (por precaução)
        if (response.status >= 200 && response.status < 300) {
            await Swal.fire({
                title: 'Convite enviado!',
                text: 'Foi enviado um convite para participação ao grupo de trabalho para o e-mail informado',
                icon: 'success',
                timer: 4000,
                confirmButtonText: 'Continuar'
            });
        }

        return response.data;
    } catch (error) {
        // Tenta extrair mensagem do backend (se for um AxiosError)
        const mensagemErro =
            (error as AxiosError)?.response?.data?.message ??
            'Erro desconhecido ao enviar convite.';

        // Lança erro com a mensagem limpa
        Swal.fire({
            title: 'Convite não pode ser enviado.',
            text: mensagemErro,
            icon: 'error',
            timer: 1250,
            confirmButtonText: 'Continuar'
        });
    }
}
