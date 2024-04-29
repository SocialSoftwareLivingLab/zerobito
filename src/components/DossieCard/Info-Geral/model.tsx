export interface DossieForm {
    CausaPrimaria: string;
    CausaSecundaria: string;
    Diagnostico: string;
    Comentario: string;
}

export const defaultValue: DossieForm = {
    CausaPrimaria: '',
    CausaSecundaria: '',
    Diagnostico: '',
    Comentario: ''
};
