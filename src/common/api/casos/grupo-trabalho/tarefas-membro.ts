import api from '../../../api';
import { Tarefa } from '../../../models/caso/grupo-trabalho/tarefa';

export async function buscarTarefasMembro(idCaso: number, payload: number) {
    const response = await api.get<Tarefa[]>(
        `/api/v1/casos/${idCaso}/grupo-trabalho/membros/tarefas/${payload}`
    );

    return response.data;
}
