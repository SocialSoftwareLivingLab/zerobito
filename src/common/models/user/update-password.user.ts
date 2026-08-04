import api from '../../api';

export const redefinirSenha = async (token: string, senha: string) => {
    const response = await api.post('/api/v1/usuarios/redefinir/', {
        senha,
        token
    });

    return response;
};
