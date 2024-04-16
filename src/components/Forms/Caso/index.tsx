import React from 'react';
import Input from '../../ui/Input';
import { useForm } from 'react-hook-form';

import AsyncSelect from 'react-select/async';
import { buscarCoordenador } from '../../../common/api/usuarios/coordenador/buscar-coordenador';

import { useDebouncedCallback } from 'use-debounce';

interface CriarCasoFormData {
    nome: string;
    coordenador: number;
}

export default function CriarCasoForm() {
    const { register } = useForm<CriarCasoFormData>({
        defaultValues: { nome: null, coordenador: null }
    });

    const loadOptions = async (inputValue: string) => {
        const response = await buscarCoordenador(inputValue);

        return response.data.map((coordenador) => ({
            value: coordenador.id,
            label: coordenador.nome
        }));
    };

    const loadOptionsDebounced = useDebouncedCallback(loadOptions, 500);

    return (
        <>
            <form>
                <Input
                    width="full"
                    label="Nome do caso"
                    type="text"
                    {...register('nome', { required: true })}
                />

                <AsyncSelect cacheOptions defaultOptions loadOptions={loadOptionsDebounced} />
            </form>
        </>
    );
}
