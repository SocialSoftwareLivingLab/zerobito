import api from '../../../api';
export async function iniciarInvestigacao(idCaso: number) {
    await api.post(`/api/v1/casos/${idCaso}/investigacao/iniciar`);
}
