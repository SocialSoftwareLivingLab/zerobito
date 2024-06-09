export interface DocumentoNotificacao {
    id: number;
    dataCriacao: Date;
    dataEmissao: Date;
    identificacao: string;
    observacao: string;
    tipo: {
        id: number;
        nome: string;
    };
}
