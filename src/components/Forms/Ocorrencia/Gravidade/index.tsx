import React, { forwardRef, useCallback, useImperativeHandle, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useOcorrenciaWizardContext } from '../../../../pages/NovaOcorrencia/context';
import { FormStepApi } from '../interface';
import "../style.css";
import { GravidadeFormFields, defaultValue } from './model';
import GravidadeView, { GravidadeViewProps } from './view';

const Gravidade = forwardRef<FormStepApi, {}>((props, ref) => {
    const { register,reset, handleSubmit, watch, resetField, trigger, formState: { isValid, errors } } = useForm<GravidadeFormFields>();
    const condicao = watch('condicao');

    const { setGravidadeData, formData } = useOcorrenciaWizardContext();

    const submitForm: SubmitHandler<GravidadeFormFields> = useCallback((data) => {
        setGravidadeData({
            obito: data.condicao,
            gravidade: data.gravidade
        });
    }, [setGravidadeData]);

    useEffect(() => {
        const data:GravidadeFormFields = {
            condicao: formData.gravidade.obito,
            gravidade: formData.gravidade.gravidade
          };
        if (condicao === "OBITO") {
          resetField("gravidade", {defaultValue: ""});
        }
        else if(formData.gravidade.obito !== "OBITO"){
            reset(data)
        }
        console.log(data);
        
      }, [condicao, formData, resetField, reset]);

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
        condicao
    };

    return <GravidadeView {...vitimaViewProps} />;
});

export default Gravidade;