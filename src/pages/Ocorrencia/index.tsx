import React, { useState } from 'react';
import Menu from '../../components/Menu';
import useOcorrenciaViewModel from './view.model';
import PassoUm from './Passo1';
import PassoDois from './Passo2';
import PassoTres from './Passo3';
import PassoQuatro from './Passo4';
import './style.css';


const ComunicacaoEvento = () => {
    const {
        handleSubmit
    } = useOcorrenciaViewModel();

    const [step, setStep] = useState(1);

    const [formData, setFormData] = useState({
        passo1: {
            estado: '',
            cidade: '',
            local: '',
            referenciaLocalidade: '',
            data: '',
        },
        passo2: {
            nomeVitima: '',
            empresaEmpregadora: '',
            vinculo: '',
            descricao: '',
        },
        passo3: {
            tipoOcorrencia: '',
            nomeContato: '',
            emailContato: '',
            telefoneContato: '',
        },
        passo4: {
            condicaoAcidentado: '',
            gravidade: '',
            statusEvento: 'Aguardando Análise'
        }
    });

    const passoHandlers = {
        handleChangeCidade: (value) => handleChange('passo1', 'cidade', value),
        handleChangeEstado: (value) => handleChange('passo1', 'estado', value),
        handleChangeLocal: (value) => handleChange('passo1', 'local', value),
        handleChangeReferenciaLocalidade: (value) => handleChange('passo1', 'referenciaLocalidade', value),
        handleChangeData: (value) => handleChange('passo1', 'data', value),
        handleChangeNomeVitima: (value) => handleChange('passo2', 'nomeVitima', value),
        handleChangeEmpresaEmpregadora: (value) => handleChange('passo2', 'empresaEmpregadora', value),
        handleChangeVinculo: (value) => handleChange('passo2', 'vinculo', value),
        handleChangeDescricao: (value) => handleChange('passo2', 'descricao', value),
        handleChangeTipoOcorrencia: (value) => handleChange('passo3', 'tipoOcorrencia', value),
        handleChangeNomeContato: (value) => handleChange('passo3', 'nomeContato', value),
        handleChangeEmailContato: (value) => handleChange('passo3', 'emailContato', value),
        handleChangeTelefoneContato: (value) => handleChange('passo3', 'telefoneContato', value),
        handleChangeCondicaoAcidentado: (value) => handleChange('passo4', 'condicaoAcidentado', value),
        handleChangeGravidade: (value) => handleChange('passo4', 'gravidade', value),
    };

    const getCompStep = () => {
        switch (step) {
            case 1:
                return <PassoUm
                    handleChangeCidade={passoHandlers.handleChangeCidade}
                    handleChangeEstado={passoHandlers.handleChangeEstado}
                    handleChangeLocal={passoHandlers.handleChangeLocal}
                    handleChangeReferenciaLocalidade={passoHandlers.handleChangeReferenciaLocalidade}
                    handleChangeData={passoHandlers.handleChangeData}
                    estado={formData.passo1.estado || ''}
                    cidade={formData.passo1.cidade || ''}
                    local={formData.passo1.local || ''}
                    referenciaLocalidade={formData.passo1.referenciaLocalidade || ''}
                    data={formData.passo1.data || ''}
                />;
            case 2:
                return <PassoDois
                    handleChangeNomeVitima={passoHandlers.handleChangeNomeVitima}
                    handleChangeEmpresaEmpregadora={passoHandlers.handleChangeEmpresaEmpregadora}
                    handleChangeVinculo={passoHandlers.handleChangeVinculo}
                    handleChangeDescricao={passoHandlers.handleChangeDescricao}
                    nomeVitima={formData.passo2.nomeVitima || ''}
                    empresaEmpregadora={formData.passo2.empresaEmpregadora || ''}
                    vinculo={formData.passo2.vinculo || ''}
                    descricao={formData.passo2.descricao || ''}
                />;
            case 3:
                return <PassoTres
                    handleChangeTipoOcorrencia={passoHandlers.handleChangeTipoOcorrencia}
                    handleChangeNomeContato={passoHandlers.handleChangeNomeContato}
                    handleChangeEmailContato={passoHandlers.handleChangeEmailContato}
                    handleChangeTelefoneContato={passoHandlers.handleChangeTelefoneContato}
                    tipoOcorrencia={formData.passo3.tipoOcorrencia || ''}
                    nomeContato={formData.passo3.nomeContato || ''}
                    emailContato={formData.passo3.emailContato || ''}
                    telefoneContato={formData.passo3.telefoneContato || ''}
                />;
            case 4:
                return <PassoQuatro
                    handleChangeCondicaoAcidentado={passoHandlers.handleChangeCondicaoAcidentado}
                    handleChangeGravidade={passoHandlers.handleChangeGravidade}
                    condicaoAcidentado={formData.passo4.condicaoAcidentado || ''}
                    gravidade={formData.passo4.gravidade || ''}
                />;
            default:
                return <PassoUm
                    handleChangeCidade={passoHandlers.handleChangeCidade}
                    handleChangeEstado={passoHandlers.handleChangeEstado}
                    handleChangeLocal={passoHandlers.handleChangeLocal}
                    handleChangeReferenciaLocalidade={passoHandlers.handleChangeReferenciaLocalidade}
                    handleChangeData={passoHandlers.handleChangeData}
                    estado={formData.passo1.estado || ''}
                    cidade={formData.passo1.cidade || ''}
                    local={formData.passo1.local || ''}
                    referenciaLocalidade={formData.passo1.referenciaLocalidade || ''}
                    data={formData.passo1.data || ''}
                />;
        }
    };

    const handleContinuarClick = (e) => {
        e.preventDefault();
        // Check if the current step is 4 and if the condition of the accident is 'óbito'.
        if (step === 4 && formData.passo4.condicaoAcidentado === 'Sem Óbito') {
            handleSubmit(formData);
        } 
        else if (step < 4) {
            setStep(step + 1);
        } else {
            handleSubmit(formData);
        }
    };


    const handleVoltarClick = (e) => {
        e.preventDefault();
        if (step === 2 || step === 3 || step === 4) {
            setStep(step - 1);
        }
    };

    const handleChange = (stepKey, field, value) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            [stepKey]: {
                ...prevFormData[stepKey],
                [field]: value,
            },
        }));
    };

    return (
        <div>
            <Menu />
            <div className='content-bar'>
                <h1 className=''>Comunicação de Evento</h1>
                <div className='content-bar-subtex'>
                    Esta etapa o usuario sera capaz de adicionar um evento novo, preenchendo as Informações abaixo
                </div>
            </div>
            <div className='ocorrencia-content'>
                <form className='form-container'>
                    <div className="steps">
                        <div>
                            <div className=''>
                                {getCompStep()}
                            </div>
                            <div className='form-container-group-button'>
                                {step === 1 ? null :
                                    <button className="button" onClick={handleVoltarClick}>
                                        Voltar
                                    </button>
                                }
                                <button className="button" onClick={handleContinuarClick}>
                                    {step === 4 ?
                                        'Enviar' : 'Continuar'
                                    }
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ComunicacaoEvento;

