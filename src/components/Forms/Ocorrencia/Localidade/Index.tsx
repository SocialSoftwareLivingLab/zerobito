import { ErrorMessage } from '@hookform/error-message';
import React, { BaseSyntheticEvent, forwardRef, useCallback, useImperativeHandle } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useOcorrenciaWizardContext } from '../../../../pages/NovaOcorrencia/context';
import "../style.css";

interface LocalidadeFormInput {
    estado: string;
    cidade: string;
    logradouro: string;
}

const Localidade = forwardRef((props, ref) => {
    const formRef = React.useRef<HTMLFormElement>(null);
    const { register, handleSubmit, trigger, formState: { isValid, errors } } = useForm<LocalidadeFormInput>();

    const { setLocalidadeData } = useOcorrenciaWizardContext();

    const onSubmit: SubmitHandler<LocalidadeFormInput> = useCallback((data) => {
        setLocalidadeData({
            estado: data.estado,
            cidade: data.cidade,
            logradouro: data.logradouro
        });
    }, [setLocalidadeData]);

    useImperativeHandle(ref, () => ({
        submitForm: () => {
            handleSubmit(onSubmit)();
        },
        validate(): boolean {
            trigger();
            return isValid;
        }
    }), [trigger, isValid, handleSubmit, onSubmit]);

    return (
        <div className='form-container'>
            <h1>Informações sobre o acidente:</h1>
            <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
                <input type="text" placeholder="Estado" {...register('estado', { required: true })} />
                <ErrorMessage name='estado' errors={errors} as="p" />

                <input type="text" placeholder="Cidade" {...register('cidade', { required: true })} />
                <ErrorMessage name='cidade' errors={errors} as="p" />

                <input type="text" placeholder="Logradouro"  {...register('logradouro', { required: true })} />
                <ErrorMessage name='logradouro' errors={errors} as="p" />
            </form>
        </div>
    );
});

export default Localidade;