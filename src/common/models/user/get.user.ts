import api from '../../api';

export const carregarUsuarios = async () => {
    const response = await api.get('/users');
    return response;
};
