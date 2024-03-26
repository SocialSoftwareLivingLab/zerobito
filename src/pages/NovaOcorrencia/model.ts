export interface InformacoesBasicasData {
    data: Date;
    descricao: string;
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
    tipoDenuncia: string;
    nomeDenuncia: string;
    emailDenuncia: string;
    telefoneDenuncia: string;
    telefoneSecundarioDenuncia: string;
    denunciaCustomizada: string;
}

export interface GravidadeData {
    obito: string;
    gravidade: string;
}

export interface OcorrenciaFormData {
    informacoesBasicas: InformacoesBasicasData;
    vitima: VitimaData;
    denunciante: DenuncianteData;
    gravidade: GravidadeData;
}

export interface CriarOcorrenciaWizardContextData {
    formData: OcorrenciaFormData,
    setInformacoesBasicas: (data: InformacoesBasicasData) => void,
    setVitimaData: (data: VitimaData) => void,
    setDenuncianteData: (data: DenuncianteData) => void,
    setGravidadeData: (data: GravidadeData) => void,
}