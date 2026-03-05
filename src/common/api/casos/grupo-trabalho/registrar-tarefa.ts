import api from '../../../api';

interface RegistrarTarefaRequest {
    nomeMembro: string;
    comentario: string;
    nome: string;
    prazo: Date;
}
// teste deploy

export async function RegistrarTarefaMembroGrupo(idCaso: number, payload: RegistrarTarefaRequest) {
    const response = await api.post(
        `/api/v1/casos/${idCaso}/grupo-trabalho/membros/registrar-tarefa`,
        payload
    );
}
