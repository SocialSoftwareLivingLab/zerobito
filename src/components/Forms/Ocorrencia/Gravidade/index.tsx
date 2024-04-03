import React, { forwardRef, useCallback, useImperativeHandle, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useOcorrenciaWizardContext } from '../../../../pages/NovaOcorrencia/context';
import { FormStepApi } from '../interface';
import '../style.css';
import { GravidadeFormFields, defaultValue } from './model';
import GravidadeView, { GravidadeViewProps } from './view';

interface GravidadeProps {}

const Gravidade = forwardRef<FormStepApi, GravidadeProps>((props, ref) => {
    const {
        register,
        handleSubmit,
        watch,
        resetField,
        trigger,
        formState: { isValid, errors }
    } = useForm<GravidadeFormFields>({ defaultValues: defaultValue });

    const condicao = watch('condicao');

    const { setGravidadeData, formData } = useOcorrenciaWizardContext();

    const submitForm: SubmitHandler<GravidadeFormFields> = useCallback(
        (data) => {
            setGravidadeData({
                obito: data.condicao,
                gravidade: data.gravidade
            });
        },
        [setGravidadeData]
    );

    React.useEffect(() => {
        const data: GravidadeFormFields = {
            condicao: formData.gravidade.obito,
            gravidade: formData.gravidade.gravidade
        };
        reset(data);
    }, [formData]);

    React.useEffect(() => {
        if (condicao === 'OBITO') {
            resetField('gravidade', { defaultValue: '' });
        }
    }, [condicao, resetField]);

    useImperativeHandle(
        ref,
        () => ({
            submitForm: () => {
                handleSubmit(submitForm)();
            },
            validate(): boolean {
                trigger();
                return isValid;
            }
        }),
        [isValid, trigger, handleSubmit, submitForm]
    );

    const vitimaViewProps: GravidadeViewProps = {
        register,
        submitForm: () => handleSubmit(submitForm)(),
        errors,
        condicao
    };

    return <GravidadeView {...vitimaViewProps} />;
});

Gravidade.displayName = 'Gravidade';

export default Gravidade;
