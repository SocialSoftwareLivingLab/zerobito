export interface OcorrenciaModel {
    id: number;
    data: Date;
    descricao: string;
    titulo: string;
    status: {
        descricao: string;
        sigla: string;
    };
    dataAlteracao: string;
    dataCriacao: string;
    empresa: {
        nome: string;
        cnpj: string;
        tomadoraServico: {
            nome: string;
            cnpj?: string;
        };
    };
    relator: {
        id: number;
        nome: string;
        email: string;
    };
    fonte: {
        tipo: string;
        outroTipo?: string;
        detalhe?: string;
    };
    local: {
        latitude?: number;
        longitude?: number;
        cidade: string;
        estado: string;
        logradouro: string;
    };
    vitima: {
        nome: string;
        vinculo: string;
        condicao: string;
        gravidade?: string;
    };
}
