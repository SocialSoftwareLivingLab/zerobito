export interface MembroGrupoTrabalho {
    identificador: string;
    nome: string;
    email: string;
    status: {
        codigo: string;
        nome: string;
    };
}
