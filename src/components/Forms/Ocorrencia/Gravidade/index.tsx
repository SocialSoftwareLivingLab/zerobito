import React, { forwardRef, useCallback, useImperativeHandle } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useOcorrenciaWizardContext } from '../../../../pages/NovaOcorrencia/context';
import { FormStepApi } from '../interface';
import "../style.css";
import { GravidadeFormFields } from './model';
import GravidadeView, { GravidadeViewProps } from './view';

const Gravidade = forwardRef<FormStepApi, {}>((props, ref) => {
    const { register, handleSubmit, watch, trigger, formState: { isValid, errors } } = useForm<GravidadeFormFields>();

    const obito = watch('obito');

    const { setGravidadeData } = useOcorrenciaWizardContext();

    const submitForm: SubmitHandler<GravidadeFormFields> = useCallback((data) => {
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

    const vitimaViewProps: GravidadeViewProps = {
        register,
        submitForm: () => handleSubmit(submitForm)(),
        errors,
        obito
    };

    return <GravidadeView {...vitimaViewProps} />;
});

export default Gravidade;