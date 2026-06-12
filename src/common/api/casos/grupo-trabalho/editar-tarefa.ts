import { AxiosError } from 'axios';
import api from '../../../api';
import Swal from 'sweetalert2';

interface EditarTarefaRequest {
    nomeMembro?: string;
    comentario?: string;
    nome?: string;
    prazo?: Date;
    statusCodigo?: string;
    statusConclusaoCodigo?: string;
}

export async function EditarTarefaMembroGrupo(
    idCaso: number,
    idTarefa: number,
    payload: EditarTarefaRequest
): Promise<boolean> {
    try {
        await api.put(
            `/api/v1/casos/${idCaso}/grupo-trabalho/membros/tarefas/editar/${idTarefa}`,
            payload
        );
        Swal.fire({
            text: 'Tarefa editada com sucesso!',
            icon: 'success',
            timer: 1800,
            showConfirmButton: false,
            position: 'center',
            toast: true
        });
        return true;
    } catch (error: unknown) {
        console.error('Erro ao editar tarefa:', error);

        let mensagemErro = 'Ocorreu um erro desconhecido';

        if (error instanceof AxiosError) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            mensagemErro = (error.response?.data as any)?.message || error.message;
        } else if (error instanceof Error) {
            mensagemErro = error.message;
        }
        Swal.fire({
            text: `Erro ao editar tarefa: ${mensagemErro}`,
            icon: 'error',
            timer: 1800,
            showConfirmButton: false,
            position: 'center',
            toast: true
        });
        return false; // indica falha
    }
}
