import { AxiosError } from 'axios';
import api from '../../../api';

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
        const response = await api.put(
            `/api/v1/casos/${idCaso}/grupo-trabalho/membros/tarefas/editar/${idTarefa}`,
            payload
        );
        console.log(response);
        alert('✅ Tarefa editada com sucesso!');
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
        alert(`❌ Erro ao editar tarefa: ${mensagemErro}`);
        return false; // indica falha
    }
}
