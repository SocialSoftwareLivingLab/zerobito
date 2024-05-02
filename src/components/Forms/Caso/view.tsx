import React from 'react';
import { FormContainer } from './styles';
import { Control, Controller, SubmitHandler, UseFormRegister } from 'react-hook-form';
import SelectAsync from '../../ui/SelectAsync';
import { Button } from '../../ui/Button';

import { CriarCasoFormData } from './models';
import Input from '../../ui/Input';

export interface CriarCasoFormViewProps {
    register: UseFormRegister<CriarCasoFormData>;
    submit: (e: React.FormEvent) => void;
    control: Control<CriarCasoFormData>;
    loadSelectOptions: (inputValue: string) => Promise<{ value: number; label: string }[]>;
}

export default function CriarCasoFormView({
    register,
    submit,
    control,
    loadSelectOptions
}: CriarCasoFormViewProps) {
    return (
        <FormContainer onSubmit={submit}>
            <Input label="Nome do caso" type="text" {...register('nome', { required: true })} />

            <Controller
                name="coordenador"
                control={control}
                // rules={{ required: true }}
                render={({ field }) => (
                    <SelectAsync
                        {...field}
                        label="Selecione um coordenador"
                        loadOptions={loadSelectOptions}
                    />
                )}
            />

            <div className="submit">
                <Button type="submit">Criar caso</Button>
            </div>
        </FormContainer>
    );
}
