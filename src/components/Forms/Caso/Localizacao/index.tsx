import React, { useEffect } from 'react';
import { Button } from '../../../ui/Button';
import { ButtonGroup, FormLocalizacaoContainer } from './styles';

import { Controller, useForm } from 'react-hook-form';
import { geosearch } from '../../../../common/api/geosearch/geosearch';
import { Localizacao } from '../../../../common/models/caso/localizacao';
import Input from '../../../ui/Input';
import SelectAsync, { SelectItem } from '../../../ui/SelectAsync';

export interface LocalizacaoFormField {
    cidade: string;
    estado: string;
    logradouro: string;
    coordenada: {
        latitude: number;
        longitude: number;
    };
}

export interface AlterarLocalizacaoCasoFormProps {
    localizacao: Localizacao;
    handleFecharForm: () => void;
    handleLocalizacaoSelecionada(longitude: number, latitude: number): void;
    handleSubmitEdicao: (data: LocalizacaoFormField, e?: unknown) => void;
}

export default function AlterarLocalizacaoCasoForm({
    localizacao,
    handleFecharForm,
    handleLocalizacaoSelecionada,
    handleSubmitEdicao
}: AlterarLocalizacaoCasoFormProps) {
    const { register, watch, control, setValue, handleSubmit } = useForm<LocalizacaoFormField>({
        defaultValues: {
            cidade: localizacao.cidade,
            estado: localizacao.estado,
            logradouro: localizacao.logradouro,
            coordenada: {
                latitude: localizacao.latitude,
                longitude: localizacao.longitude
            }
        }
    });

    const coordenada = watch('coordenada');

    useEffect(() => {
        console.log('Comparacao');
        console.log(coordenada);
        console.log(localizacao.latitude);
        console.log(localizacao.longitude);
        if (
            coordenada &&
            (coordenada.latitude !== localizacao.latitude ||
                coordenada.longitude !== localizacao.longitude)
        ) {
            setValue('cidade', '');
            setValue('estado', '');
            setValue('logradouro', '');

            handleLocalizacaoSelecionada(coordenada.longitude, coordenada.latitude);
        }
    }, [
        coordenada,
        setValue,
        handleLocalizacaoSelecionada,
        localizacao.latitude,
        localizacao.longitude
    ]);

    const loadOptions = async (inputValue: string): Promise<SelectItem[]> => {
        const response = await geosearch([inputValue]);

        return response.map((result) => ({
            value: `${result.lon}#${result.lat}`,
            label: result.descricao
        }));
    };

    const onChange = (selectedOption: string | number) => {
        const coordenada = selectedOption as string;
        const [longitude, latitude] = coordenada.split('#');

        setValue('coordenada', { latitude: Number(latitude), longitude: Number(longitude) });
    };

    return (
        <div>
            <FormLocalizacaoContainer onSubmit={handleSubmit(handleSubmitEdicao)}>
                <Controller
                    name="coordenada"
                    control={control}
                    // rules={{ required: true }}
                    render={({ field }) => (
                        <div>
                            <SelectAsync
                                {...field}
                                label="Pesquisar local"
                                loadOptions={loadOptions}
                                onChange={onChange}
                            />
                        </div>
                    )}
                />
                <Input label="Cidade" type="text" {...register('cidade', { required: true })} />
                <Input label="Estado" type="text" {...register('estado', { required: true })} />
                <Input
                    label="Logradouro"
                    type="text"
                    {...register('logradouro', { required: true })}
                />
                <ButtonGroup>
                    <Button size="small" type="submit">
                        Salvar
                    </Button>
                    <Button size="small" type="cancel" action={handleFecharForm}>
                        Fechar
                    </Button>
                </ButtonGroup>
            </FormLocalizacaoContainer>
        </div>
    );
}
