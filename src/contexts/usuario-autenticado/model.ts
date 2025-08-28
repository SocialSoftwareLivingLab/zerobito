import { Perfil } from '.';

export interface UsuarioAutenticado {
    id: number;
    nome: string;
    perfil: Perfil | null;
    email: string;
    token: string;
}

export interface UsuarioAutenticadoContextData {
    data: UsuarioAutenticado;
    isAutenticado: boolean;
    logout: () => void;
    login: (data: UsuarioAutenticado) => void;
}
