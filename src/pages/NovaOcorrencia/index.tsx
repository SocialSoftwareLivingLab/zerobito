import React, { useCallback, useRef, useState } from "react";
import { FormStepApi } from "../../components/Forms/Ocorrencia/interface";
import { CriarOcorrenciaWizardContextProvider, useOcorrenciaWizardContext } from "./context";
import RegistrarOcorrenciaView, { RegistrarOcorrenciaViewProps } from "./view";
import { CriarOcorrenciaRequest, criarOcorrencia } from "../../common/api/ocorrencias/criar-ocorrencia";
import { useHistory } from "react-router-dom";

function RegistrarOcorrenciaPage() {
    const formLocalRef = useRef<FormStepApi>(null);
    const formVitimaRef = useRef<FormStepApi>(null);
    const formDenuncianteRef = useRef<FormStepApi>(null);
    const formGravidadeRef = useRef<FormStepApi>(null);

    const [currentStep, setCurrentStep] = useState(1);

    const { formData } = useOcorrenciaWizardContext();

    const history = useHistory();

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
                alert("Preencha todos os campos para continuar");
            }
        },
        [currentStep, formLocalRef, formVitimaRef, formDenuncianteRef, formGravidadeRef]
    );

    const handlePreviousStep = useCallback(
        (handlePreviousFormWizard: () => void) => {
            setCurrentStep((prev) => prev - 1);
            handlePreviousFormWizard();
        }
        , [setCurrentStep]);

    const handleCompleteWizard = useCallback(async () => {
        console.log(formData);

        const payload: CriarOcorrenciaRequest = {
            data: formData.informacoesBasicas.data,
            descricao: formData.informacoesBasicas.descricao,
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
                email: formData.denunciante.emailDenuncia,
                nome: formData.denunciante.nomeDenuncia,
                outroTipo: formData.denunciante.denunciaCustomizada,
                telefonePrincipal: formData.denunciante.telefoneDenuncia,
                telefoneSecundario: formData.denunciante.telefoneSecundarioDenuncia,
                tipo: formData.denunciante.tipoDenuncia
            },
            vitima: {
                nome: formData.vitima.nome,
                vinculo: formData.vitima.vinculoEmpresa,
                condicao: formData.gravidade.obito === "SIM" ? "COM_OBITO" : "SEM_OBITO",
                gravidade: formData.gravidade.gravidade
            }
        };
        
        await criarOcorrencia(payload);

        alert("Ocorrência registrada com sucesso")

        history.push("/home");

    }, [formData, history]);


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