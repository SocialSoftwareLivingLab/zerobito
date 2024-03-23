import React, { forwardRef, useCallback, useImperativeHandle } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useOcorrenciaWizardContext } from '../../../../pages/NovaOcorrencia/context';
import "../style.css";
import LocalidadeView, { LocalidadeViewProps } from './view';

interface LocalidadeFormInput {
    estado: string;
    cidade: string;
    logradouro: string;
}

const Localidade = forwardRef((props, ref) => {
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

    const localidadeViewProps: LocalidadeViewProps = {
        submitForm: handleSubmit(onSubmit),
        errors,
        register
    };


    return <LocalidadeView {...localidadeViewProps} />;
});

export default Localidade;