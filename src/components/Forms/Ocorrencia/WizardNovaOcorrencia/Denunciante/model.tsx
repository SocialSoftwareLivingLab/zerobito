export interface DenuncianteFormInput {
    tipo: string;
    outro: string;
    adicionais: string;
}

export const defaultValue: DenuncianteFormInput = {
    tipo: 'ANONIMA',
    outro: null,
    adicionais: ''
};
