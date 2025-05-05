import api from '../../../api';

export async function aceitarConviteMembroGrupo(idConvite) {
    await api.post(`/api/v1/casos/grupo-trabalho/convite/${idConvite}/aceitar`);
}
