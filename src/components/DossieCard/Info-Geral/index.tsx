import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import {
    EditInfoGeralRequest,
    editInfoGeral
} from '../../../common/api/DossieInfoGeral/edit-info-geral';
import { InfoGeralFormData, defaultValue } from './model';
import { InfoGeralDossieView, InfoGeralDossieViewProps } from './view';

export function InfoGeralDossieCard() {
    const { register, handleSubmit, reset } = useForm<InfoGeralFormData>({
        defaultValues: defaultValue
    });

    const handleCompleteEdit = useCallback(async (formData: InfoGeralFormData) => {
        console.log(formData);

        const payload: EditInfoGeralRequest = {
            CausaPrimaria: formData.CausaPrimaria,
            CausaSecundaria: formData.CausaSecundaria,
            Diagnostico: formData.Diagnostico,
            Comentario: formData.Comentario
        };

        await editInfoGeral(payload);
    }, []);

    // TODO: Verificar a necessidade desse trecho
    // useEffect(() => {
    //     const data: DossieForm = {
    //         CausaPrimaria: formData.CausaPrimaria,
    //         CausaSecundaria: formData.CausaSecundaria,
    //         Diagnostico: formData.Diagnostico,
    //         Comentario: formData.Comentario
    //     };

    //     reset(data);
    // }, [formData, reset]);

    const viewProps: InfoGeralDossieViewProps = {
        register,
        handleCompleteEdit: handleSubmit(handleCompleteEdit)
    };

    return <InfoGeralDossieView {...viewProps} />;
}
