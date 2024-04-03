import React, { forwardRef, useCallback, useImperativeHandle, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useOcorrenciaWizardContext } from '../../../../pages/NovaOcorrencia/context';
import '../style.css';
import InformacoesBasicasView, { InformacoesBasicasViewProps } from './view';
import { InformacoesBasicasFormFields } from './model';

const InformacoesBasicas = forwardRef((props, ref) => {
    const {
        register,
        handleSubmit,
        trigger,
        formState: { isValid, errors }
    } = useForm<InformacoesBasicasFormFields>();

    const { setInformacoesBasicas, formData } = useOcorrenciaWizardContext();

    useEffect(() => {
        const data: InformacoesBasicasFormFields = {
            data: formData.informacoesBasicas.data,
            descricao: formData.informacoesBasicas.descricao,
            estado: formData.informacoesBasicas.local.estado,
            cidade: formData.informacoesBasicas.local.cidade,
            logradouro: formData.informacoesBasicas.local.logradouro
        };
        reset(data);
    }, [formData, reset]);

    const onSubmit: SubmitHandler<InformacoesBasicasFormFields> = useCallback(
        (data) => {
            setInformacoesBasicas({
                data: data.data,
                descricao: data.descricao,
                local: {
                    estado: data.estado,
                    cidade: data.cidade,
                    logradouro: data.logradouro
                }
            });
        },
        [setInformacoesBasicas]
    );

    useImperativeHandle(
        ref,
        () => ({
            submitForm: () => {
                handleSubmit(onSubmit)();
            },
            validate(): boolean {
                trigger();
                return isValid;
            }
        }),
        [trigger, isValid, handleSubmit, onSubmit]
    );

    const informacoesBasicasViewProps: InformacoesBasicasViewProps = {
        submitForm: handleSubmit(onSubmit),
        errors,
        register
    };

    return <InformacoesBasicasView {...informacoesBasicasViewProps} />;
});

InformacoesBasicas.displayName = 'InformacoesBasicas';

export default InformacoesBasicas;
