import { Localizacao } from './localizacao';

export interface Caso {
    id: number;
    nome: string;
    dataCriacao: Date;
    informacoesBasicas: {
        comentario: string;
        causaPrimaria: string;
        causaSecundaria: string;
        diagnostico: string;
    };
    coordenador: {
        id: number;
        nome: string;
    };
    criador: {
        id: number;
        nome: string;
    };
    localizacao: Localizacao;
}
