export interface GravidadeFormFields {
    condicao: 'OBITO' | 'INCIDENTE_ALTO_POTENCIAL' | 'ATENDIMENTO_HOSPITALAR';
}

export const defaultValue: GravidadeFormFields = {
    condicao: 'OBITO'
};
