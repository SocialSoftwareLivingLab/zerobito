import api from '../../../api';
import { Caso } from '../../../models/caso/caso';
export interface Permissoes {
    codigo: string;
}

export interface Perfil {
    id: number;
    nome: string;
    permissoes: Permissoes[];
}

export interface UsuarioPerfil {
    userId: number;
    perfilId: number;
    perfil: Perfil;
    caso?: Caso | null;
}

export async function obterPermissoesUsuarioNoCaso(idCaso: number): Promise<string[]> {
    const response = await api.get(`/api/v1/perfis-usuario/usuario/caso/${idCaso}/permissoes`);
    return response.data;
}

export async function obterPerfisUsuario(): Promise<UsuarioPerfil[]> {
    const response = await api.get(`/api/v1/perfis-usuario/usuario`);
    return response.data;
}
