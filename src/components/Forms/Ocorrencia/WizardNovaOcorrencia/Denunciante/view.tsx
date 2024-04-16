import { ErrorMessage } from '@hookform/error-message';
import React from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import Input from '../../../../ui/Input';
import { Select, SelectOption } from '../../../../ui/Select';
import '../style.css';
import { FormContainer } from '../styles';
import { DenuncianteFormInput } from './model';
import TextArea from '../../../../ui/TextArea';

export interface DenuncianteViewProps {
    submitForm: () => void;
    errors: FieldErrors<DenuncianteFormInput>;
    register: UseFormRegister<DenuncianteFormInput>;
    tipoDenuncianteSelecionado: string;
}

export default function DenuncianteView({
    register,
    submitForm,
    tipoDenuncianteSelecionado,
    errors
}: DenuncianteViewProps) {
    return (
        <>
            <FormContainer>
                <form onSubmit={submitForm}>
                    <Select label="Tipo da Denúncia" {...register('tipo')}>
                        <SelectOption />
                        <SelectOption label="Denunciante Anônimo" value="ANONIMA" />
                        <SelectOption label="Vítima" value="VITIMA" />
                        <SelectOption label="Familiar" value="FAMILIAR" />
                        <SelectOption label="Colega de Trabalho" value="COLEGA_TRABALHO" />
                        <SelectOption label="Sindicato" value="SINDICATO" />
                        <SelectOption label="Imprensa" value="IMPRENSA" />
                        <SelectOption label="Serviço de Saúde" value="SERVICO_SAUDE" />
                        <SelectOption label="Outro" value="OUTRO" />
                    </Select>

                    <ErrorMessage errors={errors} name="tipo" as="p" />

                    {tipoDenuncianteSelecionado === 'OUTRO' && (
                        <Input
                            label="Tipo de Denunciante"
                            placeholder="Informe o tipo de denunciante"
                            {...register('outro', { required: true })}
                        />
                    )}
                    {tipoDenuncianteSelecionado !== 'ANONIMA' && (
                        <>
                            <TextArea
                                label="Informações Adicionais"
                                placeholder="Adicione mais informações aqui"
                                {...register('adicionais', { required: false })}
                            />
                            <ErrorMessage name="adicionais" errors={errors} as="p" />
                        </>
                    )}
                </form>
            </FormContainer>
        </>
    );
}
