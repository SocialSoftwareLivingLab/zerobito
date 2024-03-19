import React, {useState} from "react";
import Header from "../../components/Page-Header";
import FormWizard from "react-form-wizard-component";
import 'react-form-wizard-component/dist/style.css';
import Localidade from "../../components/Forms/Events-forms/Localidade/Index";

function ComunicacaoEvento(){
    const handleComplete = () => {
        console.log("Form completed!");
        // Handle form completion logic here
      };

      const [formData, setFormData] = useState({
        Localidade: {
            estado: '',
            cidade: '',
            local: '',
            referenciaLocalidade: '',
        },
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
        handleChangeLocal: (value) => handleChange('Localidade', 'local', value),
        handleChangeReferenciaLocalidade: (value) => handleChange('Localidade', 'referenciaLocalidade', value),
    };


    return (
        <div>
            <Header title="Comunicação de Evento" explicacao="Nesta etapa o usuário será capaz de adicionar um evento novo, preenchendo as informações abaixo"/>
            <div className='content-bar'>
                <FormWizard
                    onComplete={handleComplete}
                    color= "#134780"
                >
                <FormWizard.TabContent title="Local" icon="ti-map-alt">

                    <h3>Preencha os dados do local do acidente.</h3>
                    <Localidade handleChangeEstado={passoHandlers.handleChangeEstado}
                     handleChangeCidade={passoHandlers.handleChangeCidade} 
                     handleChangeLocal={passoHandlers.handleChangeLocal} 
                     handleChangeReferenciaLocalidade={passoHandlers.handleChangeReferenciaLocalidade} 
                     estado={formData.Localidade.estado} 
                     cidade={formData.Localidade.cidade} 
                     local={formData.Localidade.local} 
                     referenciaLocalidade={formData.Localidade.referenciaLocalidade}/>
                </FormWizard.TabContent>
                <FormWizard.TabContent title="Additional Info" icon="ti-settings">
                    <h3>Second Tab</h3>
                    <p>Some content for the second tab</p>
                </FormWizard.TabContent>
                <FormWizard.TabContent title="Last step" icon="ti-check">
                    <h3>Last Tab</h3>
                    <p>Some content for the last tab</p>
                </FormWizard.TabContent>
                </FormWizard>
                {/* add style */}
                <style>{`
                    @import url("https://cdn.jsdelivr.net/gh/lykmapipo/themify-icons@0.1.2/css/themify-icons.css");
                `}</style>
            </div>
        </div>
    );
};

export default ComunicacaoEvento;

