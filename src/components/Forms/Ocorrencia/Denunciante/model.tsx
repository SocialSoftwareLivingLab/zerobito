export interface DenuncianteFormInput {
    tipo: string;
    nome: string;
    email: string;
    telefone: string;
    telefoneSecundario: string;
    customizado: string;
}

export const defaultValue: DenuncianteFormInput = {
    tipo: 'ANONIMO',
    nome: '',
    email: '',
    telefone: '',
    telefoneSecundario: '',
    customizado: null
}