import React, { forwardRef, useCallback, useImperativeHandle } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useOcorrenciaWizardContext } from '../../../../pages/NovaOcorrencia/context';
import { FormStepApi } from '../interface';
import "../style.css";
import { DenuncianteFormInput, defaultValue } from './model';
import DenuncianteView, { DenuncianteViewProps } from './view';

const Denunciante = forwardRef<FormStepApi, {}>((props, ref) => {
    const { handleSubmit, watch, register, trigger, formState: { isValid, errors } } = useForm<DenuncianteFormInput>({ defaultValues: defaultValue });
    const tipoDenuncianteSelecionado = watch('tipo');

    const { setDenuncianteData } = useOcorrenciaWizardContext();

    const submitForm: SubmitHandler<DenuncianteFormInput> = useCallback((data) => {
        setDenuncianteData({
            denunciaCustomizada: data.customizado || null,
            emailDenuncia: data.email,
            telefoneSecundarioDenuncia: data.telefoneSecundario,
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
            trigger();
            return isValid;
        }
    }), [isValid, trigger, handleSubmit, submitForm]);

    const viewProps: DenuncianteViewProps = {
        register,
        submitForm: () => handleSubmit(submitForm)(),
        tipoDenuncianteSelecionado,
        errors
    };

    return <DenuncianteView {...viewProps} />;
});

export default Denunciante;