import api from '../../api';

export const listarOcorrencias = async (id: number) => {
    const response = await api.get(`/api/v1/casos/${id}/ocorrencias`);
    return response;
};
