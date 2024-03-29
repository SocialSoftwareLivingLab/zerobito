import React from 'react';
import FormWizard from 'react-form-wizard-component';
import 'react-form-wizard-component/dist/style.css';
import ConfirmacaoOcorrencia from '../../components/Forms/Ocorrencia/Confirmacao';
import Denunciante from '../../components/Forms/Ocorrencia/Denunciante';
import Gravidade from '../../components/Forms/Ocorrencia/Gravidade';
import InformacoesBasicas from '../../components/Forms/Ocorrencia/InformacoesBasicas/Index';
import Vitima from '../../components/Forms/Ocorrencia/Vitima';
import { FormStepApi } from '../../components/Forms/Ocorrencia/interface';
import Header from '../../components/Page-Header';
import { Button } from '../../components/ui/Button';
import { OcorrenciaFormData } from './model';
import './style.css';

export interface RegistrarOcorrenciaViewProps {
    handles: {
        handleCompleteWizard: (data: OcorrenciaFormData) => void;
        handleNextStep: (handleNext: () => void) => void;
        handlePreviousStep: (handleBack: () => void) => void;
    };
    refs: {
        formLocalRef: React.RefObject<FormStepApi>;
        formVitimaRef: React.RefObject<FormStepApi>;
        formDenuncianteRef: React.RefObject<FormStepApi>;
        formGravidadeRef: React.RefObject<FormStepApi>;
    };
}

export default function RegistrarOcorrenciaView({ handles, refs }: RegistrarOcorrenciaViewProps) {
    return (
        <>
            <Header
                title="Comunicação de Evento"
                explicacao="Nesta etapa o usuário será capaz de adicionar um evento novo, preenchendo as informações abaixo"
            />
            <div className="content-bar">
                <FormWizard
                    onComplete={handles.handleCompleteWizard}
                    color="#134780"
                    style={{ textAlign: 'center' }}
                    nextButtonTemplate={(handleNext) => (
                        <Button action={() => handles.handleNextStep(handleNext)}>Próxima</Button>
                    )}
                    backButtonTemplate={(handleBack) => (
                        <Button action={() => handles.handlePreviousStep(handleBack)}>
                            Anterior
                        </Button>
                    )}
                    finishButtonTemplate={(handleFinish) => (
                        <Button type="submit" action={handleFinish}>
                            Enviar
                        </Button>
                    )}>
                    <FormWizard.TabContent title="Local" icon="ti-map-alt">
                        <InformacoesBasicas ref={refs.formLocalRef} />
                    </FormWizard.TabContent>
                    <FormWizard.TabContent title="Informações Vítima" icon="ti-user">
                        <Vitima ref={refs.formVitimaRef} />
                    </FormWizard.TabContent>
                    <FormWizard.TabContent title="Informações Denunciante" icon="ti-clipboard">
                        <Denunciante ref={refs.formDenuncianteRef} />
                    </FormWizard.TabContent>
                    <FormWizard.TabContent title="Informações Gravidade" icon="ti-pulse">
                        <Gravidade ref={refs.formGravidadeRef} />
                    </FormWizard.TabContent>
                    <FormWizard.TabContent title="Confirmação" icon="ti-info-alt">
                        <ConfirmacaoOcorrencia />
                    </FormWizard.TabContent>
                </FormWizard>
            </div>
        </>
    );
}
