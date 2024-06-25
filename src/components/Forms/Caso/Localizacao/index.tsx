import React from 'react';
import { Button } from '../../../ui/Button';
import { ButtonGroup, FormLocalizacaoContainer } from './styles';

import { Controller, useForm } from 'react-hook-form';
import { geosearch } from '../../../../common/api/geosearch/geosearch';
import { Localizacao } from '../../../../common/models/caso/localizacao';
import Input from '../../../ui/Input';
import SelectAsync, { SelectItem } from '../../../ui/SelectAsync';

export interface AlterarLocalizacaoCasoFormProps {
    localizacao: Localizacao;
    handleFecharForm: () => void;
}

export interface LocalizacaoFormField {
    cidade: string;
    estado: string;
    logradouro: string;
    coordenada: {
        latitude: number;
        longitude: number;
    };
}

export default function AlterarLocalizacaoCasoForm({
    localizacao,
    handleFecharForm
}: AlterarLocalizacaoCasoFormProps) {
    const { register, watch, control } = useForm<LocalizacaoFormField>({
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

    const loadOptions = async (inputValue: string): Promise<SelectItem[]> => {
        const response = await geosearch(inputValue);

        return response.map((result) => ({
            value: `${result.lat}#${result.lon}`,
            label: result.descricao
        }));
    };

    return (
        <div>
            <FormLocalizacaoContainer>
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
            </FormLocalizacaoContainer>

            <ButtonGroup>
                <Button size="small" type="submit" action={handleFecharForm}>
                    Salvar
                </Button>
                <Button size="small" type="cancel" action={handleFecharForm}>
                    Fechar
                </Button>
            </ButtonGroup>
        </div>
    );
}
