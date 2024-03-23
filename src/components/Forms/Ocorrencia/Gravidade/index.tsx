import React, { forwardRef, useCallback, useImperativeHandle } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormStepApi } from '../interface';
import "../style.css";
import { useOcorrenciaWizardContext } from '../../../../pages/NovaOcorrencia/context';
import { ErrorMessage } from '@hookform/error-message';

interface VitimaFormInput {
    obito: string;
    gravidade: string;
}

const Vitima = forwardRef<FormStepApi, {}>((props, ref) => {

    const { register, handleSubmit, watch, trigger, formState: { isValid, errors } } = useForm<VitimaFormInput>();
    const formRef = React.useRef<HTMLFormElement>(null);
    const obito = watch('obito');

    const { setGravidadeData } = useOcorrenciaWizardContext();

    const submitForm: SubmitHandler<VitimaFormInput> = useCallback((data) => {
        setGravidadeData({
            obito: data.obito,
            gravidade: data.gravidade
        });
    }, [setGravidadeData]);

    useImperativeHandle(ref, () => ({
        submitForm: () => {
            handleSubmit(submitForm)();
        },
        validate(): boolean {
            trigger();
            return isValid;
        }
    }), [isValid, trigger, handleSubmit, submitForm]);

    return (
        <div className='form-container'>
            <h1>Informações sobre o acidente:</h1>
            <form ref={formRef} onSubmit={handleSubmit(submitForm)}>
                <select className='form-container-select' {...register('obito', { required: true })} >
                    <option>Selecione...</option>
                    <option value="SIM">Com Óbito</option>
                    <option value="NAO">Sem Óbito</option>
                </select>
                <ErrorMessage name='obito' errors={errors} as="p" />

                {obito === "NAO" && (
                    <>
                        <select className='form-container-select' {...register('gravidade', { required: obito === 'NAO' })} >
                            <option disabled>Selecione...</option>
                            <option value="EMERGENCIAL">Emergencial</option>
                            <option value="MUITO_URGENTE">Muito Grave</option>
                            <option value="URGENTE">Urgência</option>
                            <option value="POUCO_URGENTE">Pouca Urgência</option>
                        </select>
                        <ErrorMessage errors={errors} name='gravidade' as="p" />
                    </>
                )}

            </form>

        </div>
    );
});

export default Vitima;