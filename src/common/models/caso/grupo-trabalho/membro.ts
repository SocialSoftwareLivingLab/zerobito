export interface MembroGrupoTrabalho {
    id: number;
    identificador: string;
    nome: string;
    email: string;
    status: {
        codigo: string;
        nome: string;
    };
}
