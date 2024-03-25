import React, { useCallback, useRef, useState } from "react";
import { FormStepApi } from "../../components/Forms/Ocorrencia/interface";
import { CriarOcorrenciaWizardContextProvider, useOcorrenciaWizardContext } from "./context";
import RegistrarOcorrenciaView, { RegistrarOcorrenciaViewProps } from "./view";
import { criarOcorrencia } from "../../common/api/ocorrencias/criar-ocorrencia";

function RegistrarOcorrenciaPage() {
    const formLocalRef = useRef<FormStepApi>(null);
    const formVitimaRef = useRef<FormStepApi>(null);
    const formDenuncianteRef = useRef<FormStepApi>(null);
    const formGravidadeRef = useRef<FormStepApi>(null);

    const [currentStep, setCurrentStep] = useState(1);

    const { formData } = useOcorrenciaWizardContext();

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

    const handleCompleteWizard = useCallback(() => {
        console.log(formData);
    }, [formData]);


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