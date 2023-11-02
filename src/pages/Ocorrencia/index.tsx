import React, { useState } from 'react';
import Menu from '../../components/Menu';
import useOcorrenciaViewModel from './view.model';
import PassoUm from './Passo1';
import PassoDois from './Passo2';
import PassoTres from './Passo3';
import PassoQuatro from './Passo4';
import './style.css';


const ComunicacaoEvento = () => {
    const { handleSubmit } = useOcorrenciaViewModel();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        passo1: {},
        passo2: {},
        passo3: {},
        passo4: {},
    });

    const handleUpdateData = (step, data) => {
        setFormData({
            ...formData,
            [`passo${step}`]: data,
        });
    };

    const getCompStep = () => {
        switch (step) {
            case 1:
                return <PassoUm />;
            case 2:
                return <PassoDois />;
            case 3:
                return <PassoTres />;
            case 4:
                return <PassoQuatro />;
            default:
                return <PassoUm />;
        }
    };

    const handleContinuarClick = (e) => {
        e.preventDefault(); // Adicione esta linha
        if (step === 1 || step === 2 || step === 3) {
            setStep(step + 1);
        } else if (step === 4) {
            handleSubmit(formData); // Aqui você passa o formData para o handleSubmit
        }
    };

    const handleVoltarClick = (e) => {
        e.preventDefault(); // Adicione esta linha
        if (step === 2 || step === 3 || step === 4) {
            setStep(step - 1);
        }
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
                                    <button onClick={handleVoltarClick}>
                                        Voltar
                                    </button>
                                }
                                <button onClick={handleContinuarClick}>
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
