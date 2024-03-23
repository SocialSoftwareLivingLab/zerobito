export interface DenuncianteFormInput {
    tipo: string;
    nome: string;
    email: string;
    telefone: string;
    endereco: string;
    customizado: string;
}

export const defaultValue: DenuncianteFormInput = {
    tipo: 'ANONIMO',
    nome: '',
    email: '',
    telefone: '',
    endereco: '',
    customizado: null
}