import { ErrorMessage } from '@hookform/error-message';
import React, { forwardRef, useCallback, useImperativeHandle } from 'react';
import { SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { useOcorrenciaWizardContext } from '../../../../pages/NovaOcorrencia/context';
import { FormStepApi } from '../interface';
import "../style.css";

interface DenuncianteFormInput {
    tipo: string;
    nome: string;
    email: string;
    telefone: string;
    endereco: string;
    customizado: string;
}

const defaultValue: DenuncianteFormInput = {
    tipo: 'ANONIMO',
    nome: '',
    email: '',
    telefone: '',
    endereco: '',
    customizado: null
}

const Denunciante = forwardRef<FormStepApi, {}>((props, ref) => {
    const { handleSubmit, watch, register, trigger, formState: { isValid, errors } } = useForm<DenuncianteFormInput>({ defaultValues: { tipo: 'ANONIMO' } });
    const tipoDenuncianteSelecionado = watch('tipo');

    const { setDenuncianteData } = useOcorrenciaWizardContext();

    const submitForm: SubmitHandler<DenuncianteFormInput> = useCallback((data) => {
        setDenuncianteData({
            denunciaCustomizada: data.customizado || null,
            emailDenuncia: data.email,
            enderecoDenuncia: data.endereco,
            nomeDenuncia: data.nome,
            telefoneDenuncia: data.telefone,
            tipoDenuncia: data.tipo
        });
    }, [setDenuncianteData]);

    useImperativeHandle(ref, () => ({
        submitForm: () => {
            handleSubmit(submitForm)();
        },
        validate(): boolean {
            console.log("validando...")
            trigger();
            return isValid;
        }
    }), [isValid, trigger, handleSubmit, submitForm]);

    return (
        <>
            <h1>Informações sobre o acidente</h1>
            <div className="form-container">
                <form onSubmit={handleSubmit(submitForm)}>
                    <select className='form-container-select' {...register('tipo')}>
                        <option value="ANONIMO">Denunciante Anônimo</option>
                        <option value="VITIMA">Vítima</option>
                        <option value="FAMILIAR">Familiar</option>
                        <option value="COLEGA_TRABALHO">Colega de Trabalho</option>
                        <option value="SINDICATO">Sindicato</option>
                        <option value="IMPRENSA">Imprensa</option>
                        <option value="SERVICO_SAUDE">Serviço de Saúde</option>
                        <option value="OUTRO">Outro</option>
                    </select>

                    <ErrorMessage errors={errors} name='tipo' as="p" />

                    {tipoDenuncianteSelecionado === 'OUTRO' && <input type='text' placeholder='Informe o tipo de denunciante' {...register("customizado", { required: true })} />}
                    {tipoDenuncianteSelecionado !== "ANONIMO" &&
                        <>
                            <input type="text" placeholder="Nome do Denunciante" {...register('nome', { required: true })} />
                            <ErrorMessage name='nome' errors={errors} as="p" />

                            <input type="text" placeholder="E-mail do Denunciante" {...register('email', { required: true })} />
                            <ErrorMessage name='email' errors={errors} as="p" />

                            <input type="text" placeholder="Telefone para contato do Denunciante" {...register('telefone', { required: true })} />
                            <ErrorMessage name='telefone' errors={errors} as="p" />

                            <input type="text" placeholder="Endereço do Denunciante" {...register('endereco', { required: true })} />
                            <ErrorMessage name='endereco' errors={errors} as="p" />
                        </>
                    }
                </form>
            </div>
        </>
    );
});

export default Denunciante;