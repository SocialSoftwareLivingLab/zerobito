export interface MembroGrupoTrabalho {
    id: number;
    identificador: string;
    nome: string;
    email: string;
    instituicao: string | null;
    status: {
        codigo: string;
        nome: string;
    };
}
