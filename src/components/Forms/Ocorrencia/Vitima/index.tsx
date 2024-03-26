import React, { forwardRef, useCallback, useImperativeHandle } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useOcorrenciaWizardContext } from '../../../../pages/NovaOcorrencia/context';
import { FormStepApi } from '../interface';
import "../style.css";
import { VitimaFormFields } from './model';
import VitimaView, { VitimaViewProps } from './view';

const Vitima = forwardRef<FormStepApi, {}>((props, ref) => {
    const { handleSubmit, register, watch, trigger, formState: { isValid, errors } } = useForm<VitimaFormFields>();

    const nomeEmpresa = watch('nomeEmpresa');
    const tomadoraDeServicoNome = watch('tomadoraDeServicoNome');

    const { setVitimaData } = useOcorrenciaWizardContext();

    const onSubmit: SubmitHandler<VitimaFormFields> = useCallback((data) => {
        setVitimaData({
            nome: data.nome,
            nomeEmpresa: data.nomeEmpresa,
            cnpjEmpresa: data.cnpjEmpresa,
            tomadoraDeServicoNome: data.tomadoraDeServicoNome,
            tomadoraDeServicoCNPJ: data.tomadoraDeServicoCNPJ,
            vinculoEmpresa: data.tipoContrato
        });
    }, [setVitimaData]);

    useImperativeHandle(ref, () => ({
        submitForm: () => {
            handleSubmit(onSubmit)();
        },
        validate(): boolean {
            trigger();
            return isValid;
        }
    }), [isValid, trigger, handleSubmit, onSubmit]);

    const vitimaViewProps: VitimaViewProps = {
        submitForm: handleSubmit(onSubmit),
        errors,
        register,
        nomeEmpresa,
        tomadoraDeServicoNome
    };
    
    return <VitimaView {...vitimaViewProps} />;
});

export default Vitima;