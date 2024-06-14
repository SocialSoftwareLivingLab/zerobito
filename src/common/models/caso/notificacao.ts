export interface TipoNotificacao {
    id: string;
    nome: string;
    descricao: string;
}

export interface NotificacaoCaso {
    id: string;
    identificador: string;
    isEmitida: boolean;
    dataEmissao: string;
    observacao: string;
    tipo: TipoNotificacao;
    dataCriacao: string;
    criador: {
        id: number;
        nome: string;
        email: string;
    };
}
