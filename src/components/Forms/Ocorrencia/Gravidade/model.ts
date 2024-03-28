import Gravidade from ".";

export interface GravidadeFormFields {
    condicao: 'OBITO' | 'INCIDENTE_ALTO_POTENCIAL';
    gravidade: 'EMERGENCIAL' | 'MUITO_URGENTE' | 'URGENTE' | 'POUCO_URGENTE' | '';
}


export const defaultValue: GravidadeFormFields = {
   condicao: 'OBITO',
   gravidade: null,
}