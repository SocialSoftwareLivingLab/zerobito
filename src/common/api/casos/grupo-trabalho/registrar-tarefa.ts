import api from '../../../api';

interface RegistrarTarefaRequest {
    nomeMembro: string;
    comentario: string;
    nome: string;
    prazo: Date;
}

export async function RegistrarTarefaMembroGrupo(idCaso: number, payload: RegistrarTarefaRequest) {
    console.log(payload);
    await api.post(`/api/v1/casos/${idCaso}/grupo-trabalho/membros/registrar-tarefa`, payload);
}
