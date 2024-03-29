import React, { forwardRef, useCallback, useImperativeHandle } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useOcorrenciaWizardContext } from '../../../../pages/NovaOcorrencia/context';
import { FormStepApi } from '../interface';
import '../style.css';
import { VitimaFormFields } from './model';
import VitimaView, { VitimaViewProps } from './view';

interface VitimaProps {}

const Vitima = forwardRef<FormStepApi, VitimaProps>((props, ref) => {
    const {
        handleSubmit,
        register,
        watch,
        trigger,
        formState: { isValid, errors }
    } = useForm<VitimaFormFields>();

    const tomadoraDeServicoNome = watch('tomadoraDeServicoNome');

    const { setVitimaData } = useOcorrenciaWizardContext();

    const onSubmit: SubmitHandler<VitimaFormFields> = useCallback(
        (data) => {
            setVitimaData({
                nome: data.nome,
                nomeEmpresa: data.nomeEmpresa,
                cnpjEmpresa: data.cnpjEmpresa,
                tomadoraDeServicoNome: data.tomadoraDeServicoNome,
                tomadoraDeServicoCNPJ: data.tomadoraDeServicoCNPJ,
                vinculoEmpresa: data.tipoContrato
            });
        },
        [setVitimaData]
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
        [isValid, trigger, handleSubmit, onSubmit]
    );

    const vitimaViewProps: VitimaViewProps = {
        submitForm: handleSubmit(onSubmit),
        errors,
        register,
        tomadoraDeServicoNome
    };

    return <VitimaView {...vitimaViewProps} />;
});
Vitima.displayName = 'Vitima';

export default Vitima;
