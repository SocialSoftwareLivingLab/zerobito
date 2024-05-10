export interface Caso {
    id: number;
    nome: string;
    dataCriacao: Date;
    informacoesBasicas: {
        comentario: {
            id: number;
            nome: string;
        };
        causaPrimaria: {
            id: number;
            nome: string;
        };
        causaSecundaria: {
            id: number;
            nome: string;
        };
        diagnostico: {
            id: number;
            nome: string;
        };
    };
    coordenador: {
        id: number;
        nome: string;
    };
    criador: {
        id: number;
        nome: string;
    };
}
