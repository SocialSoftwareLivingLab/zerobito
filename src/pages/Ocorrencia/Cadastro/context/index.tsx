import React, { useCallback, createContext, useContext, useState } from 'react';
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
}: CriarOcorrenciaWizardContextProviderProps) {
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
            nome: '',
            nomeEmpresa: '',
            cnpjEmpresa: '',
            tomadoraDeServicoCNPJ: '',
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
            console.log('Dados');
            console.log(data);
            setFormData({
                ...formData,
                denunciante: data
            });
        },
        [formData]
    );

    const setGravidadeData = useCallback(
        (data: GravidadeData) => {
            console.log('Dados');
            console.log(data);
            setFormData({
                ...formData,
                gravidade: data
            });
        },
        [formData]
    );

    return (
        <CriarOcorrenciaWizardContext.Provider
            value={{
                formData,
                setInformacoesBasicas,
                setVitimaData,
                setDenuncianteData,
                setGravidadeData
            }}>
            {children}
        </CriarOcorrenciaWizardContext.Provider>
    );
}

export function useOcorrenciaWizardContext() {
    return useContext(CriarOcorrenciaWizardContext);
}
