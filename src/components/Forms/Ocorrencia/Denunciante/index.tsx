import React, { forwardRef, useCallback, useImperativeHandle, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useOcorrenciaWizardContext } from '../../../../pages/NovaOcorrencia/context';
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
                denunciaCustomizada: data.customizado || null,
                emailDenuncia: data.email,
                telefoneSecundarioDenuncia: data.telefoneSecundario,
                nomeDenuncia: data.nome,
                telefoneDenuncia: data.telefone,
                tipoDenuncia: data.tipo
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
            tipo: formData.denunciante.tipoDenuncia,
            telefone: formData.denunciante.telefoneDenuncia,
            nome: formData.denunciante.nomeDenuncia,
            telefoneSecundario: formData.denunciante.telefoneSecundarioDenuncia,
            email: formData.denunciante.emailDenuncia,
            customizado: formData.denunciante.denunciaCustomizada
        };

        reset(data); // Isso recarrega o contexto do formulário
    }, [formData, reset]); // Este efeito é acionado sempre que o formData mudar

    React.useEffect(() => {
        if (tipoDenuncianteSelecionado === 'ANONIMA') {
            resetField('nome', { defaultValue: '' });
            resetField('customizado', { defaultValue: '' });
            resetField('email', { defaultValue: '' });
            resetField('telefone', { defaultValue: '' });
            resetField('telefoneSecundario', { defaultValue: '' });
        }
    }, [tipoDenuncianteSelecionado, resetField]);

    useEffect(() => {
        if (tipoDenuncianteSelecionado !== 'OUTRO') {
            resetField('customizado', { defaultValue: '' });
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
