import React, { forwardRef, useCallback, useImperativeHandle, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useOcorrenciaWizardContext } from '../../../../pages/Ocorrencia/Cadastro/context';
import { FormStepApi } from '../interface';
import '../style.css';
import { DenuncianteFormInput, defaultValue } from './model';
import DenuncianteView, { DenuncianteViewProps } from './view';

interface DenuncianteProps {}

const Denunciante = forwardRef<FormStepApi, DenuncianteProps>((props, ref) => {
    const {
        handleSubmit,
        watch,
        register,
        trigger,
        reset,
        formState: { isValid, errors },
        resetField
    } = useForm<DenuncianteFormInput>({ defaultValues: defaultValue });
    const tipoDenuncianteSelecionado = watch('tipo');

    const { setDenuncianteData, formData } = useOcorrenciaWizardContext();

    const submitForm: SubmitHandler<DenuncianteFormInput> = useCallback(
        (data) => {
            setDenuncianteData({
                tipo: data.tipo,
                outro: data.outro,
                adicionais: data.adicionais
            });
        },
        [setDenuncianteData]
    );

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

    useEffect(() => {
        const data: DenuncianteFormInput = {
            tipo: formData.denunciante.tipo,
            outro: formData.denunciante.outro,
            adicionais: formData.denunciante.adicionais
        };

        reset(data); // Isso recarrega o contexto do formulário
    }, [formData, reset]); // Este efeito é acionado sempre que o formData mudar

    React.useEffect(() => {
        if (tipoDenuncianteSelecionado === 'ANONIMA') {
            resetField('adicionais', { defaultValue: '' });
        }
    }, [tipoDenuncianteSelecionado, resetField]);

    useEffect(() => {
        if (tipoDenuncianteSelecionado !== 'OUTRO') {
            resetField('outro', { defaultValue: '' });
        }
    }, [tipoDenuncianteSelecionado, resetField]);

    const viewProps: DenuncianteViewProps = {
        register,
        submitForm: () => handleSubmit(submitForm)(),
        tipoDenuncianteSelecionado,
        errors
    };

    return <DenuncianteView {...viewProps} />;
});

Denunciante.displayName = 'Denunciante';

export default Denunciante;
