import React, { useCallback, useRef, useState } from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import {
    CondicaoVitima,
    CriarOcorrenciaRequest,
    TipoFonteDenuncia,
    criarOcorrencia
} from '../../../common/api/ocorrencias/criar-ocorrencia';
import { FormStepApi } from '../../../components/Forms/Ocorrencia/WizardNovaOcorrencia/interface';
import { CriarOcorrenciaWizardContextProvider, useOcorrenciaWizardContext } from './context';
import './style.css';
import RegistrarOcorrenciaView, { RegistrarOcorrenciaViewProps } from './view';

function RegistrarOcorrenciaPage() {
    const formLocalRef = useRef<FormStepApi>(null);
    const formVitimaRef = useRef<FormStepApi>(null);
    const formDenuncianteRef = useRef<FormStepApi>(null);
    const formGravidadeRef = useRef<FormStepApi>(null);

    const [currentStep, setCurrentStep] = useState(1);

    const { formData } = useOcorrenciaWizardContext();

    const navigate = useNavigate();

    const handleNextStep = useCallback(
        (handleNextFormWizard: () => void) => {
            const refMapping = {
                1: formLocalRef,
                2: formVitimaRef,
                3: formDenuncianteRef,
                4: formGravidadeRef
            };

            console.log(currentStep);

            const currentFormRef = refMapping[currentStep];

            if (currentFormRef.current?.validate()) {
                currentFormRef.current?.submitForm();
                handleNextFormWizard();
                setCurrentStep((prev) => prev + 1);
            } else {
                alert('Preencha todos os campos para continuar');
            }
        },
        [currentStep, formLocalRef, formVitimaRef, formDenuncianteRef, formGravidadeRef]
    );

    const handlePreviousStep = useCallback(
        (handlePreviousFormWizard: () => void) => {
            setCurrentStep((prev) => prev - 1);
            handlePreviousFormWizard();
        },
        [setCurrentStep]
    );

    const handleCompleteWizard = useCallback(async () => {
        console.log(formData);

        const payload: CriarOcorrenciaRequest = {
            data: formData.informacoesBasicas.data,
            descricao: formData.informacoesBasicas.descricao,
            titulo: formData.informacoesBasicas.titulo,
            local: {
                estado: formData.informacoesBasicas.local.estado,
                cidade: formData.informacoesBasicas.local.cidade,
                logradouro: formData.informacoesBasicas.local.logradouro
            },
            empresa: {
                cnpj: formData.vitima.cnpjEmpresa,
                nome: formData.vitima.nomeEmpresa,
                tomadoraServico: {
                    cnpj: formData.vitima.tomadoraDeServicoCNPJ,
                    nome: formData.vitima.tomadoraDeServicoNome
                }
            },
            fonte: {
                outroTipo: formData.denunciante.outro,
                tipo: formData.denunciante.tipo as TipoFonteDenuncia,
                detalhe: formData.denunciante.adicionais
            },
            vitima: {
                nome: formData.vitima.nome,
                vinculo: formData.vitima.vinculoEmpresa,
                condicao: formData.gravidade.obito as CondicaoVitima
            }
        };

        await criarOcorrencia(payload);

        await Swal.fire({
            title: 'Ocorrência registrada com sucesso!',
            confirmButtonText: 'Continuar',
            confirmButtonColor: '#134780',
            icon: 'success',
            buttonsStyling: true
        });

        navigate('/home');
    }, [formData, navigate]);

    const registrarOcorrenciaViewProps: RegistrarOcorrenciaViewProps = {
        handles: {
            handleCompleteWizard,
            handleNextStep,
            handlePreviousStep
        },
        refs: {
            formLocalRef,
            formVitimaRef,
            formDenuncianteRef,
            formGravidadeRef
        }
    };

    return <RegistrarOcorrenciaView {...registrarOcorrenciaViewProps} />;
}

export default function RegistrarOcorrencia() {
    return (
        <CriarOcorrenciaWizardContextProvider>
            <RegistrarOcorrenciaPage />
        </CriarOcorrenciaWizardContextProvider>
    );
}
