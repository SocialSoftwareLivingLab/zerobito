import api from '../../api';

export const carregarOcorrencias = async () => {
    const response = await api.get('/api/v1/ocorrencias', {
        params: { status: 'AGUARDANDO_ANALISE' }
    });
    return response;
};
