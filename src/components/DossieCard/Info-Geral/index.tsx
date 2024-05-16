import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import {
    EditInfoGeralRequest,
    editInfoGeral
} from '../../../common/api/DossieInfoGeral/edit-info-geral';
import { InfoGeralFormData, defaultValue } from './model';
import { InfoGeralDossieView, InfoGeralDossieViewProps } from './view';
import { Caso } from '../../../common/models/caso/caso';

export interface InfoGeralDossieCardProps {
    caso: Caso;
}

export function InfoGeralDossieCard({ caso }: InfoGeralDossieCardProps) {
    const { register, handleSubmit, reset, watch } = useForm<InfoGeralFormData>({
        defaultValues: defaultValue
    });
    const causaPrimariaSelecionada = watch('CausaPrimaria');
    const causaSecundariaSelecionada = watch('CausaSecundaria');
    const diagnosticoSelecionado = watch('Diagnostico');
    const comentarioSelecionado = watch('Comentario');

    const handleCompleteEdit = useCallback(async (formData: InfoGeralFormData) => {
        console.log(formData);

        const payload: EditInfoGeralRequest = {
            CausaPrimaria: formData.CausaPrimaria,
            CausaSecundaria: formData.CausaSecundaria,
            Diagnostico: formData.Diagnostico,
            Comentario: formData.Comentario
        };

        await editInfoGeral(payload, caso.id);
    }, []);

    // TODO: Verificar a necessidade desse trecho
    // useEffect(() => {
    //     const data: DossieForm = {
    //         CausaPrimaria: formData.CausaPrimaria,
    //         CausaSecundaria: formData.CausaSecundaria,
    //         Diagnostico: formData.Diagnostico,
    //         Comentario: formData.Comentario
    //     };

    //     reset(data);A
    // }, [formData, reset]);

    const viewProps: InfoGeralDossieViewProps = {
        register,
        handleCompleteEdit: handleSubmit(handleCompleteEdit),
        causaPrimariaSelecionada,
        causaSecundariaSelecionada,
        diagnosticoSelecionado,
        comentarioSelecionado
    };

    return <InfoGeralDossieView {...viewProps} />;
}
