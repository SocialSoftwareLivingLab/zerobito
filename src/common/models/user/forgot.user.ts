import api from '../../api';

export const esqueciSenha = async (email: string) => {
    const response = await api.post('/api/v1/usuarios/redefinir-email', {
        email
    });

    return response;
};
