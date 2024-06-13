export interface NotificacaoCaso {
    id: string;
    identificador: string;
    isEmitida: boolean;
    dataEmissao: string;
    observacao: string;
    tipo: {
        id: string;
        nome: string;
        descricao: string;
    };
    dataCriacao: string;
    criador: {
        id: number;
        nome: string;
        email: string;
    };
}
