import api from '../../../api';

export async function recusarConviteMembroGrupo(idConvite) {
    await api.post(`/api/v1/casos/grupo-trabalho/convite/${idConvite}/recusar`);
}
