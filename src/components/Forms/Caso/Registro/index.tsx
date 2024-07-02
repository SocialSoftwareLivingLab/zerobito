import React from 'react';
import { useForm } from 'react-hook-form';

import { buscarCoordenador } from '../../../../common/api/usuarios/coordenador/buscar-coordenador';
import CriarCasoFormView, { CriarCasoFormViewProps } from './view';
import { CriarCasoFormData } from './models';

export interface CriarCasoFormProps {
    submit: (data: CriarCasoFormData) => Promise<void>;
}

export default function CriarCasoForm({ submit }: CriarCasoFormProps) {
    const { register, control, handleSubmit } = useForm<CriarCasoFormData>({
        defaultValues: { nome: null, coordenador: null }
    });

    const loadOptions = async (inputValue: string) => {
        const response = await buscarCoordenador(inputValue);

        return response.data.map((coordenador) => ({
            value: coordenador.id,
            label: coordenador.nome
        }));
    };

    const props: CriarCasoFormViewProps = {
        register,
        control,
        submit: handleSubmit(submit),
        loadSelectOptions: loadOptions
    };

    return <CriarCasoFormView {...props} />;
}
