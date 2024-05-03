export interface InfoGeralFormData {
    CausaPrimaria: string;
    CausaSecundaria: string;
    Diagnostico: string;
    Comentario: string;
}

export const defaultValue: InfoGeralFormData = {
    CausaPrimaria: 'INDEFINIDO',
    CausaSecundaria: 'INDEFINDO',
    Diagnostico: 'INDEFINIDO',
    Comentario: ''
};
