import { resetarDados } from '../../../contexts/usuario-autenticado';
import api from '../../api';

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        config.headers.authorization = `Bearer ${token}`;
        return config;
    },
    (error: unknown) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        if (error.response.status === 401) {
            resetarDados();
            return (window.location.href = '/login');
        }
        return Promise.reject(error);
    }
);

interface LoginResponse {
    token: string;
    usuario: {
        id: number;
        nome: string;
        email: string;
        perfil: 'USER' | 'ADMIN';
    };
}

export const login = async ({ email, senha }: { email: string; senha: string }) => {
    try {
        const { data } = await api.post<LoginResponse>(`/api/v1/auth/login`, {
            email,
            senha
        });

        return data;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return Promise.reject(error.response.data.error);
    }
};
