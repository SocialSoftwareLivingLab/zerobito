import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import FormWizard, { type FormWizardMethods, type FormWizardProps } from "react-form-wizard-component";
import 'react-form-wizard-component/dist/style.css';
import { Button } from "../../components/Button";
import Denunciante from "../../components/Forms/Ocorrencia/Denunciante";
import Gravidade from "../../components/Forms/Ocorrencia/Gravidade";
import Localidade from "../../components/Forms/Ocorrencia/Localidade/Index";
import Vitima from "../../components/Forms/Ocorrencia/Vitima";
import { FormStepApi } from "../../components/Forms/Ocorrencia/interface";
import Header from "../../components/Page-Header";
import { CriarOcorrenciaWizardContextProvider, useOcorrenciaWizardContext } from "./context";
import "./style.css";

function RegistrarOcorrenciaWizard() {
    const formWizardRef = useRef<FormWizardProps & FormWizardMethods>(null);

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
        console.log("tudo feito!");
        console.log(formData);
    }, [formData]);

    return (
        <>
            <Header title="Comunicação de Evento" explicacao="Nesta etapa o usuário será capaz de adicionar um evento novo, preenchendo as informações abaixo" />
            <div className='content-bar'>
                <FormWizard
                    onComplete={handleCompleteWizard}
                    color="#134780"
                    style={{ textAlign: 'center' }}
                    ref={formWizardRef}
                    nextButtonTemplate={(handleNext) => (<Button action={() => handleNextStep(handleNext)}>Próxima</Button>)}
                    backButtonTemplate={(handleBack) => <Button action={() => handlePreviousStep(handleBack)}>Anterior</Button>}
                    finishButtonTemplate={(handleFinish) => <Button action={handleFinish}>Enviar</Button>}
                >
                    <FormWizard.TabContent title="Local" icon="ti-map-alt">
                        <Localidade ref={formLocalRef} />
                    </FormWizard.TabContent>
                    <FormWizard.TabContent title="Informações Vítima" icon="ti-user">
                        <Vitima ref={formVitimaRef} />
                    </FormWizard.TabContent>
                    <FormWizard.TabContent title="Informações Denunciante" icon="ti-clipboard">
                        <Denunciante ref={formDenuncianteRef} />
                    </FormWizard.TabContent>
                    <FormWizard.TabContent title="Informações Gravidade" icon="ti-pulse">
                        <Gravidade ref={formGravidadeRef} />
                    </FormWizard.TabContent>
                </FormWizard>
            </div>
        </>
    );
}


export default function RegistrarOcorrencia() {
    return (
        <CriarOcorrenciaWizardContextProvider>
            <RegistrarOcorrenciaWizard />
        </CriarOcorrenciaWizardContextProvider>
    );
}