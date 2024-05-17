export interface InfoGeralFormData {
    CausaPrimaria: string;
    CausaSecundaria: string;
    Diagnostico: string;
    Comentario: string;
}

export const defaultValue: InfoGeralFormData = {
    CausaPrimaria: 'Indefinido',
    CausaSecundaria: 'Indefinido',
    Diagnostico: 'Indefinido',
    Comentario: ''
};
