import { FieldErrors, UseFormRegister, useForm } from 'react-hook-form';
import { DossieForm, defaultValue } from './model';
import React, { forwardRef, useCallback, useEffect, useState } from 'react';
import {
    EditInfoGeralRequest,
    editInfoGeral
} from '../../../common/api/DossieInfoGeral/edit-info-geral';
import { FormStepApi } from '../interface';
import DossieView from './view';

export interface InfoGeralViewProps {
    handleCompleteEdit: () => void;
    errors: FieldErrors<DossieForm>;
    register: UseFormRegister<DossieForm>;
}

export const DossieViewProps = forwardRef<FormStepApi, InfoGeralViewProps>((props, ref) => {
    const {
        watch,
        register,
        reset,
        formState: { errors }
    } = useForm<DossieForm>({ defaultValues: defaultValue });
    const tipoCausaPrimaria = watch('CausaPrimaria');

    const [formData] = useState<DossieForm>({
        CausaPrimaria: '',
        CausaSecundaria: '',
        Diagnostico: '',
        Comentario: ''
    } as DossieForm);

    const handleCompleteEdit = useCallback(async () => {
        console.log(formData);

        const payload: EditInfoGeralRequest = {
            CausaPrimaria: formData.CausaPrimaria,
            CausaSecundaria: formData.CausaSecundaria,
            Diagnostico: formData.Diagnostico,
            Comentario: formData.Comentario
        };

        await editInfoGeral(payload);
    }, [formData]);

    useEffect(() => {
        const data: DossieForm = {
            CausaPrimaria: formData.CausaPrimaria,
            CausaSecundaria: formData.CausaSecundaria,
            Diagnostico: formData.Diagnostico,
            Comentario: formData.Comentario
        };

        reset(data); // Isso recarrega o contexto do formulário
    }, [formData, reset]); // Este efeito é acionado sempre que o formData mudar

    const viewProps: InfoGeralViewProps = {
        handleCompleteEdit,
        errors,
        register
    };

    return <DossieView {...viewProps} />;
});
