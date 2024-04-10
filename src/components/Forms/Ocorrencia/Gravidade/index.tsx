import React, { forwardRef, useCallback, useImperativeHandle } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useOcorrenciaWizardContext } from '../../../../pages/Ocorrencia/Cadastro/context';
import { FormStepApi } from '../interface';
import '../style.css';
import { GravidadeFormFields, defaultValue } from './model';
import GravidadeView, { GravidadeViewProps } from './view';

interface GravidadeProps {}

const Gravidade = forwardRef<FormStepApi, GravidadeProps>((props, ref) => {
    const {
        register,
        handleSubmit,
        trigger,
        reset,
        formState: { isValid, errors }
    } = useForm<GravidadeFormFields>({ defaultValues: defaultValue });

    const { setGravidadeData, formData } = useOcorrenciaWizardContext();

    const submitForm: SubmitHandler<GravidadeFormFields> = useCallback(
        (data) => {
            setGravidadeData({
                obito: data.condicao
            });
        },
        [setGravidadeData]
    );

    React.useEffect(() => {
        const data: GravidadeFormFields = {
            condicao: formData.gravidade.obito as GravidadeFormFields['condicao']
        };
        reset(data);
    }, [formData, reset]);

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
        errors
    };

    return <GravidadeView {...vitimaViewProps} />;
});

Gravidade.displayName = 'Gravidade';

export default Gravidade;
