import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import Input from '../../ui/Input';

import { buscarCoordenador } from '../../../common/api/usuarios/coordenador/buscar-coordenador';

import SelectAsync from '../../ui/SelectAsync';
import { Button } from '../../ui/Button';
import { FormContainer } from './styles';

interface CriarCasoFormData {
    nome: string;
    coordenador: number;
}

export default function CriarCasoForm() {
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

    const submit = (data: CriarCasoFormData) => {
        console.log(data);
    };

    return (
        <>
            <FormContainer onSubmit={handleSubmit(submit)}>
                <Input label="Nome do caso" type="text" {...register('nome', { required: true })} />

                <Controller
                    name="coordenador"
                    control={control}
                    // rules={{ required: true }}
                    render={({ field }) => (
                        <SelectAsync
                            {...field}
                            label="Selecione um coordenador"
                            loadOptions={loadOptions}
                        />
                    )}
                />

                <div className="submit">
                    <Button type="button">Criar caso</Button>
                </div>
            </FormContainer>
        </>
    );
}
