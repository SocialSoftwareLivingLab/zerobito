export interface UsuarioAutenticado {
    nome: string;
    perfil: 'USER' | 'ADMIN';
    email: string;
    token: string;
}

export interface UsuarioAutenticadoContextData {
    data: UsuarioAutenticado;
    logout: () => void;
    login: (data: UsuarioAutenticado) => void;
}
