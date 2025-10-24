import { Perfil } from '.';

export interface UsuarioAutenticado {
    id: number;
    nome: string;
    email: string;
    token: string;
}

export interface UsuarioAutenticadoContextData {
    data: UsuarioAutenticado;
    isAutenticado: boolean;
    logout: () => void;
    login: (data: UsuarioAutenticado) => void;
}
