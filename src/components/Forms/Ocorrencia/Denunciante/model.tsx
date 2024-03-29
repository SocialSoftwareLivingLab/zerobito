export interface DenuncianteFormInput {
    tipo: string;
    nome: string;
    email: string;
    telefone: string;
    telefoneSecundario: string;
    customizado: string;
}

export const defaultValue: DenuncianteFormInput = {
    tipo: 'ANONIMA',
    nome: null,
    email: null,
    telefone: null,
    telefoneSecundario: null,
    customizado: null
};
