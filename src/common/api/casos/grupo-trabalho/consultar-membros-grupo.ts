import api from '../../../api';
import { MembroGrupoTrabalho } from '../../../models/caso/grupo-trabalho/membro';

export async function buscarMembrosGrupo(idCaso: number) {
    const response = await api.get<MembroGrupoTrabalho[]>(
        `/api/v1/casos/${idCaso}/grupo-trabalho/membros`
    );

    return response.data;
}
