import React, { useCallback, createContext, useContext, useMemo, useState } from 'react';
import {
    CriarOcorrenciaWizardContextData,
    DenuncianteData,
    OcorrenciaFormData,
    GravidadeData,
    InformacoesBasicasData,
    VitimaData
} from '../model';

export const CriarOcorrenciaWizardContext = createContext({} as CriarOcorrenciaWizardContextData);

export interface CriarOcorrenciaWizardContextProviderProps {
    children: React.ReactNode;
}

export function CriarOcorrenciaWizardContextProvider({
    children
}: Readonly<CriarOcorrenciaWizardContextProviderProps>) {
    const [formData, setFormData] = useState<OcorrenciaFormData>({
        informacoesBasicas: {
            data: new Date(),
            descricao: '',
            titulo: '',
            local: {
                estado: '',
                cidade: '',
                logradouro: ''
            }
        },
        vitima: {
            quantidade: '',
            nome: '',
            nomeEmpresa: '',
            cnpjEmpresa: '',
            tomadoraDeServicoCNPJ: '',
            tomadoraDeServicoCNAE: '',
            tomadoraDeServicoNome: '',
            vinculoEmpresa: 'Desconhecido'
        },
        denunciante: {
            tipo: 'ANONIMA',
            outro: null,
            adicionais: null
        },
        gravidade: {
            obito: '',
            gravidade: ''
        }
    } as OcorrenciaFormData);

    const setInformacoesBasicas = useCallback(
        (data: InformacoesBasicasData) => {
            setFormData({
                ...formData,
                informacoesBasicas: data
            });
        },
        [formData]
    );

    const setVitimaData = useCallback(
        (data: VitimaData) => {
            setFormData({
                ...formData,
                vitima: data
            });
        },
        [formData]
    );

    const setDenuncianteData = useCallback(
        (data: DenuncianteData) => {
            setFormData({
                ...formData,
                denunciante: data
            });
        },
        [formData]
    );

    const setGravidadeData = useCallback(
        (data: GravidadeData) => {
            setFormData({
                ...formData,
                gravidade: data
            });
        },
        [formData]
    );

    const contextValue = useMemo(
        () => ({
            formData,
            setInformacoesBasicas,
            setVitimaData,
            setDenuncianteData,
            setGravidadeData
        }),
        [formData, setInformacoesBasicas, setVitimaData, setDenuncianteData, setGravidadeData]
    );

    return (
        <CriarOcorrenciaWizardContext.Provider value={contextValue}>
            {children}
        </CriarOcorrenciaWizardContext.Provider>
    );
}

export function useOcorrenciaWizardContext() {
    return useContext(CriarOcorrenciaWizardContext);
}
