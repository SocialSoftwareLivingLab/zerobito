import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
    EditInfoGeralRequest,
    editInfoGeral
} from '../../../common/api/DossieInfoGeral/edit-info-geral';
import { InfoGeralFormData, defaultValue } from './model';
import { InfoGeralDossieView, InfoGeralDossieViewProps } from './view';
import { Caso } from '../../../common/models/caso/caso';
import { listarCausas } from '../../../common/api/casos/listarCausas';
import { listarDiagnosticos } from '../../../common/api/casos/listarDiagnosticos';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

export interface InfoGeralDossieCardProps {
    caso: Caso;
}

const loadCausaOptions = async () => {
    const response = await listarCausas();

    const result = response.map((item) => item.codigo);

    return result;
};

const loadDiagnosticoOptions = async () => {
    const response = await listarDiagnosticos();

    const result = response.map((item) => item.codigo);

    return result;
};

const formatData = (infoData: Caso) => {
    console.log(infoData);
    const defaultValue: InfoGeralFormData = {
        CausaPrimaria: infoData.informacoesBasicas.causaPrimaria ?? 'INDEFINIDO',
        CausaSecundaria: infoData.informacoesBasicas.causaSecundaria ?? 'INDEFINIDO',
        Diagnostico: infoData.informacoesBasicas.diagnostico ?? 'INDEFINIDO',
        Comentario: infoData.informacoesBasicas.comentario
    };
    return defaultValue;
};

export function InfoGeralDossieCard({ caso }: InfoGeralDossieCardProps) {
    const { register, handleSubmit, reset, watch, resetField } = useForm<InfoGeralFormData>({
        defaultValues: formatData(caso)
    });
    const causaPrimariaSelecionada = watch('CausaPrimaria');
    const causaSecundariaSelecionada = watch('CausaSecundaria');
    const diagnosticoSelecionado = watch('Diagnostico');
    const comentarioSelecionado = watch('Comentario');
    const [causas, setCausas] = useState<string[]>([]);
    const [diagnosticos, setDiagnosticos] = useState<string[]>([]);

    const handleCompleteEdit = useCallback(
        async (formData: InfoGeralFormData) => {
            console.log(formData);
            console.log(caso.id);
            const payload: EditInfoGeralRequest = {
                causaPrimaria: formData.CausaPrimaria,
                causaSecundaria: formData.CausaSecundaria,
                diagnostico: formData.Diagnostico,
                comentarios: formData.Comentario
            };

            const response = await editInfoGeral(payload, caso.id);
            console.log(response);
        },
        [caso.id]
    );

    React.useEffect(() => {
        if (
            causaPrimariaSelecionada === causaSecundariaSelecionada &&
            causaPrimariaSelecionada !== 'INDEFINIDO' &&
            causaPrimariaSelecionada !== 'OUTROS'
        ) {
            resetField('CausaSecundaria', { defaultValue: 'INDEFINIDO' });
        }
    }, [causaPrimariaSelecionada, causaSecundariaSelecionada, resetField]);

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
        reset,
        handleCompleteEdit: handleSubmit(handleCompleteEdit),
        causaPrimariaSelecionada,
        causaSecundariaSelecionada,
        diagnosticoSelecionado,
        comentarioSelecionado,
        causas,
        diagnosticos
    };

    useEffect(() => {
        const fetchCausas = async () => {
            const causasData = await loadCausaOptions();
            setCausas(causasData);
        };
        const fetchDiagnosticos = async () => {
            const diagnosticosData = await loadDiagnosticoOptions();
            setDiagnosticos(diagnosticosData);
        };
        fetchDiagnosticos();
        fetchCausas();
    }, []);
    return <InfoGeralDossieView {...viewProps} />;
}
