import React from "react";
import { createContext, useContext, useState } from "react";

interface LocalidadeData {
    estado: string;
    cidade: string;
    logradouro: string;
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
    enderecoDenuncia: string;
    denunciaCustomizada: string;
}

export interface GravidadeData {
    obito: string;
    gravidade: string;
}

export interface FormData {
    localidade: LocalidadeData;
    vitima: VitimaData;
    denunciante: DenuncianteData;
    gravidade: GravidadeData;
}

export interface CriarOcorrenciaWizardContextData {
    formData: FormData,
    setLocalidadeData: (data: LocalidadeData) => void,
    setVitimaData: (data: VitimaData) => void,
    setDenuncianteData: (data: DenuncianteData) => void,
    setGravidadeData: (data: GravidadeData) => void,
}

export const CriarOcorrenciaWizardContext = createContext({} as CriarOcorrenciaWizardContextData);

export interface CriarOcorrenciaWizardContextProviderProps {
    children: React.ReactNode;
}

export function CriarOcorrenciaWizardContextProvider({children}: CriarOcorrenciaWizardContextProviderProps) {
    const [formData, setFormData] = useState<FormData>({
        localidade: {
            estado: '',
            cidade: '',
            logradouro: '',
        },
        vitima: {
            nome: '',
            nomeEmpresa: '',
            cnpjEmpresa: '',
            tomadoraDeServicoCNPJ: '',
            tomadoraDeServicoNome: '',
            vinculoEmpresa: '',
        },
        denunciante: {
            tipoDenuncia: '',
            nomeDenuncia: '',
            emailDenuncia: '',
            telefoneDenuncia: '',
            enderecoDenuncia: '',
            denunciaCustomizada: '',
        },
        gravidade: {
            obito: '',
            gravidade: '',
        },
    } as FormData);
    
    function setLocalidadeData(data: LocalidadeData) {
        setFormData(prevFormData => ({
            ...prevFormData,
            localidade: data,
        }));
    }

    function setVitimaData(data: VitimaData) {
        setFormData(prevFormData => ({
            ...prevFormData,
            vitima: data,
        }));
    }

    function setDenuncianteData(data: DenuncianteData) {
        setFormData(prevFormData => ({
            ...prevFormData,
            denunciante: data,
        }));
    }

    function setGravidadeData(data: GravidadeData) {
        setFormData(prevFormData => ({
            ...prevFormData,
            gravidade: data,
        }));
    }

    return (
        <CriarOcorrenciaWizardContext.Provider value={{ formData, setLocalidadeData, setVitimaData, setDenuncianteData, setGravidadeData }}>
            {children}
        </CriarOcorrenciaWizardContext.Provider>
    );
}

export function useOcorrenciaWizardContext() {
    return useContext(CriarOcorrenciaWizardContext);
}