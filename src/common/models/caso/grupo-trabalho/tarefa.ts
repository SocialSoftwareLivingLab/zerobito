export interface Tarefa {
    identificador: string;
    comentario: string;
    nome: string;
    status: {
        codigo: string;
        nome: string;
    };
    status_conclusao: {
        codigo: string;
        nome: string;
    };
    prazo: Date;
}
