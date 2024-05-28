export interface InformacoesBasicasData {
    data: Date;
    descricao: string;
    titulo: string;
    local: {
        estado: string;
        cidade: string;
        logradouro: string;
    };
}

export interface VitimaData {
    nome: string;
    nomeEmpresa: string;
    cnpjEmpresa: string;
    tomadoraDeServicoCNPJ: string;
    tomadoraDeServicoNome: string;
    vinculoEmpresa: string;
}

export interface DenuncianteData {
    tipo: string;
    outro: string;
    adicionais: string;
}

export interface GravidadeData {
    obito: string;
}

export interface OcorrenciaFormData {
    informacoesBasicas: InformacoesBasicasData;
    vitima: VitimaData;
    denunciante: DenuncianteData;
    gravidade: GravidadeData;
}

export interface CriarOcorrenciaWizardContextData {
    formData: OcorrenciaFormData;
    setInformacoesBasicas: (data: InformacoesBasicasData) => void;
    setVitimaData: (data: VitimaData) => void;
    setDenuncianteData: (data: DenuncianteData) => void;
    setGravidadeData: (data: GravidadeData) => void;
}
