import React, { useState } from "react";
import FormWizard, { type FormWizardMethods, type FormWizardProps } from "react-form-wizard-component";
import 'react-form-wizard-component/dist/style.css';
import { Button } from "../../components/Button";
import Denunciante from "../../components/Forms/Events-forms/Denunciante";
import Gravidade from "../../components/Forms/Events-forms/Gravidade";
import Localidade from "../../components/Forms/Events-forms/Localidade/Index";
import Vitima from "../../components/Forms/Events-forms/Vitima";
import Header from "../../components/Page-Header";
import { CriarOcorrenciaWizardContextProvider, useOcorrenciaWizardContext } from "./context";
import "./style.css";

function ComunicacaoEventoOld() {
    const handleComplete = () => {
        console.log("Form completed!");
        // Handle form completion logic here
    };

    const [formData, setFormData] = useState({
        Localidade: {
            estado: '',
            cidade: '',
            logradouro: '',
        },
        Vitima: {
            nome: '',
            nomeEmpresa: '',
            cnpjEmpresa: '',
            tomadoraDeServicoCNPJ: '',
            tomadoraDeServicoNome: '',
            vinculoEmpresa: '',
        },
        Denunciante: {
            tipoDenuncia: "Anônimo",
            nomeDenuncia: "",
            emailDenuncia: "",
            telefoneDenuncia: "",
            enderecoDenuncia: "",
            denunciaCustomizada: "Anônimo",
        },
        Gravidade: {
            obito: "Com Óbito",
            gravidade: "",
        }
    });

    const handleChange = (stepKey, field, value) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            [stepKey]: {
                ...prevFormData[stepKey],
                [field]: value,
            },
        }));
    };


    const passoHandlers = {
        handleChangeCidade: (value) => handleChange('Localidade', 'cidade', value),
        handleChangeEstado: (value) => handleChange('Localidade', 'estado', value),
        handleChangeLogradouro: (value) => handleChange('Localidade', 'logradouro', value),
        handleChangeNome: (value) => handleChange('Vitima', 'nome', value),
        handleChangCNPJEmpresa: (value) => handleChange('Vitima', 'cnpjEmpresa', value),
        handleChangeTomadoraDeServicoCNPJ: (value) => handleChange('Vitima', 'tomadoraDeServicoCNPJ', value),
        handleChangeTomadoraDeServicoNome: (value) => {
            if (value === '') {
                handleChange('Vitima', 'tomadoraDeServicoCNPJ', '');
            }
            handleChange('Vitima', 'tomadoraDeServicoNome', value);

        },
        handleChangeNomeEmpresa: (value) => {
            if (value === '') {
                handleChange('Vitima', 'cnpjEmpresa', '');
            }
            handleChange('Vitima', 'nomeEmpresa', value);

        },
        handleChangeVinculoEmpresa: (value) => handleChange('Vitima', 'vinculoEmpresa', value),
        handleChangeNomeDenuncia: (value) => handleChange("Denunciante", "nomeDenuncia", value),
        handleChangeEmailDenuncia: (value) => handleChange("Denunciante", "emailDenuncia", value),
        handleChangeTelefoneDenuncia: (value) => handleChange("Denunciante", "telefoneDenuncia", value),
        handleChangeEnderecoDenuncia: (value) => handleChange("Denunciante", "enderecoDenuncia", value),
        handleChangeTipoDenuncia: (value) => {
            if (value === 'Anônimo') {
                handleChange('Denunciante', 'nomeDenuncia', '');
                handleChange('Denunciante', 'emailDenuncia', '');
                handleChange('Denunciante', 'telefoneDenuncia', '');
                handleChange('Denunciante', 'enderecoDenuncia', '');
            }
            handleChange('Denunciante', 'tipoDenuncia', value);
            handleChange('Denunciante', 'denunciaCustomizada', value);
        },
        handleChangeDenunciaCustomizada: (value) => handleChange("Denunciante", "denunciaCustomizada", value),
        handleChangeGravidade: (value) => handleChange("Gravidade", "gravidade", value),
        handleChangeObito: (value) => {
            if (value === "Com Óbito") {
                handleChange("Gravidade", "gravidade", "");
            }
            handleChange("Gravidade", "obito", value);
        }

    };

    const context = useOcorrenciaWizardContext();

    return (
        <CriarOcorrenciaWizardContextProvider>
            <Header title="Comunicação de Evento" explicacao="Nesta etapa o usuário será capaz de adicionar um evento novo, preenchendo as informações abaixo" />
            <div className='content-bar'>
                <FormWizard
                    onComplete={handleComplete}
                    color="#134780"
                    style={{ textAlign: 'center' }}
                    nextButtonTemplate={(handleNext) => (
                        <button className="wizard-button" onClick={handleNext}>
                            Próxima
                        </button>
                    )}
                    backButtonTemplate={(handleBack) =>
                        <button className="wizard-button" onClick={handleBack}>Anterior</button>
                    }
                >
                    <FormWizard.TabContent title="Local" icon="ti-map-alt">

                        <h3>Preencha os dados do local do acidente.</h3>
                        <Localidade handleChangeEstado={passoHandlers.handleChangeEstado}
                            handleChangeCidade={passoHandlers.handleChangeCidade}
                            handleChangeLogradouro={passoHandlers.handleChangeLogradouro}
                            estado={formData.Localidade.estado}
                            cidade={formData.Localidade.cidade}
                            logradouro={formData.Localidade.logradouro} />
                    </FormWizard.TabContent>
                    <FormWizard.TabContent title="Informações Vítima" icon="ti-user">
                        <h3>Preencha os dados da Vítima do acidente.</h3>
                        <Vitima handleChangeNome={passoHandlers.handleChangeNome} handleChangeNomeEmpresa={passoHandlers.handleChangeNomeEmpresa}
                            handleChangeCNPJEmpresa={passoHandlers.handleChangCNPJEmpresa} handleChangeTomadoraDeServicoCNPJ={passoHandlers.handleChangeTomadoraDeServicoCNPJ}
                            handleChangeTomadoraDeServicoNome={passoHandlers.handleChangeTomadoraDeServicoNome} handleChangeVinculoEmpresa={passoHandlers.handleChangeVinculoEmpresa}
                            nome={formData.Vitima.nome} nomeEmpresa={formData.Vitima.nomeEmpresa} cnpjEmpresa={formData.Vitima.cnpjEmpresa}
                            tomadoraDeServicoCNPJ={formData.Vitima.tomadoraDeServicoCNPJ} tomadoraDeServicoNome={formData.Vitima.tomadoraDeServicoNome}
                            vinculoEmpresa={formData.Vitima.vinculoEmpresa} />
                    </FormWizard.TabContent>
                    <FormWizard.TabContent title="Informações Denunciante" icon="ti-clipboard">
                        <h3>Preencha os dados do Denunciante do acidente</h3>
                        <Denunciante handleChangeEmailDenuncia={passoHandlers.handleChangeEmailDenuncia} handleChangeTipoDenuncia={passoHandlers.handleChangeTipoDenuncia}
                            handleChangeEnderecoDenuncia={passoHandlers.handleChangeEnderecoDenuncia} handleChangeNomeDenuncia={passoHandlers.handleChangeNomeDenuncia}
                            handleChangeTelefoneDenuncia={passoHandlers.handleChangeTelefoneDenuncia} tipoDenuncia={formData.Denunciante.tipoDenuncia}
                            emailDenuncia={formData.Denunciante.emailDenuncia} nomeDenuncia={formData.Denunciante.nomeDenuncia} enderecoDenuncia={formData.Denunciante.enderecoDenuncia}
                            telefoneDenuncia={formData.Denunciante.telefoneDenuncia} handleChangeDenunciaCustomizada={passoHandlers.handleChangeDenunciaCustomizada}
                            denunciaCustomizada={formData.Denunciante.denunciaCustomizada} />
                    </FormWizard.TabContent>
                    <FormWizard.TabContent title="Informações Gravidade" icon="ti-pulse">
                        <h3>Preencha os dados da Gravidade do evento</h3>
                        <Gravidade handleChangeGravidade={passoHandlers.handleChangeGravidade} handleChangeObito={passoHandlers.handleChangeObito}
                            gravidade={formData.Gravidade.gravidade} obito={formData.Gravidade.obito} />
                    </FormWizard.TabContent>
                </FormWizard>
                {/* add style */}
                <style>{`
                    @import url("https://cdn.jsdelivr.net/gh/lykmapipo/themify-icons@0.1.2/css/themify-icons.css");
                `}</style>
            </div>
        </CriarOcorrenciaWizardContextProvider>
    );
};

export default function ComunicacaoEvento() {
    function handleComplete() {
        console.log("Form completed!");
    }

    const formRef = React.useRef<FormWizardProps & FormWizardMethods>(null);


    return (
        <CriarOcorrenciaWizardContextProvider>
            <Header title="Comunicação de Evento" explicacao="Nesta etapa o usuário será capaz de adicionar um evento novo, preenchendo as informações abaixo" />
            <div className='content-bar'>
                <FormWizard
                    ref={formRef}
                    onComplete={handleComplete}
                    color="#134780"
                    style={{ textAlign: 'center' }}
                    nextButtonTemplate={(handleNext) => (<Button action={handleNext}>Próxima</Button>)}
                    backButtonTemplate={(handleBack) => <Button action={handleBack}>Próxima</Button>}
                >
                    <FormWizard.TabContent title="Local" icon="ti-map-alt">

                    </FormWizard.TabContent>
                    <FormWizard.TabContent title="Informações Vítima" icon="ti-user">

                    </FormWizard.TabContent>
                    <FormWizard.TabContent title="Informações Denunciante" icon="ti-clipboard">
                        <Denunciante />
                    </FormWizard.TabContent>
                    <FormWizard.TabContent title="Informações Gravidade" icon="ti-pulse">

                    </FormWizard.TabContent>
                </FormWizard>
            </div>
        </CriarOcorrenciaWizardContextProvider>
    );
}


