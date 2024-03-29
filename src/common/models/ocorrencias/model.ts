export interface OcorrenciaModel {
    id: number;
    data: Date;
    descricao: string;
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
    fonte: {
        nome?: string;
        email?: string;
        tipo: string;
        outroTipo?: string;
        telefonePrincipal?: string;
        telefoneSecundario?: string;
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
