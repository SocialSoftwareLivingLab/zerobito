import { ErrorMessage } from '@hookform/error-message';
import React, { useCallback } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
// import "../style.css";
import { InformacoesBasicasFormFields } from './model';
import Input from '../../../../ui/Input';
import { FormContainer } from '../styles';
import Fieldset from '../../../../ui/Fieldset';

export interface InformacoesBasicasViewProps {
    submitForm: () => void;
    errors: FieldErrors<InformacoesBasicasFormFields>;
    register: UseFormRegister<InformacoesBasicasFormFields>;
}

export default function InformacoesBasicasView({
    submitForm,
    errors,
    register
}: InformacoesBasicasViewProps) {
    const onSubmitForm = useCallback(
        async (evt: React.FormEvent) => {
            evt.preventDefault();
            await submitForm();
        },
        [submitForm]
    );
    return (
        <FormContainer>
            <form onSubmit={onSubmitForm}>
                <Fieldset legend="Identificação">
                    <div className="input-container">
                        <Input
                            placeholder="Título"
                            label="Informe um título"
                            type="text"
                            {...register('titulo', { required: 'Título é obrigatório' })}
                        />
                        <ErrorMessage
                            name="titulo"
                            errors={errors}
                            as={<p className="error-message" />}
                        />
                    </div>
                    <div className="input-container">
                        <Input
                            placeholder="Informe a data"
                            label="Data relatada"
                            type="date"
                            {...register('data', { required: 'Data inválida' })}
                        />
                        <ErrorMessage
                            name="data"
                            errors={errors}
                            as={<p className="error-message" />}
                        />
                    </div>
                    <div className="input-container">
                        <Input
                            placeholder="Descrição"
                            label="Informe a descrição"
                            type="text"
                            {...register('descricao', { required: 'Descrição é obrigatória' })}
                        />
                        <ErrorMessage
                            name="descricao"
                            errors={errors}
                            as={<p className="error-message" />}
                        />
                    </div>
                </Fieldset>

                <Fieldset legend="Localização">
                    <div className="input-container">
                        <Input
                            placeholder="Informe o estado"
                            label="Estado"
                            {...register('estado', { required: 'Estado é obrigatório' })}
                        />
                        <ErrorMessage
                            name="estado"
                            errors={errors}
                            as={<p className="error-message" />}
                        />
                    </div>
                    <div className="input-container">
                        <Input
                            placeholder="Informe a cidade"
                            label="Cidade"
                            {...register('cidade', { required: 'Cidade é obrigatória' })}
                        />
                        <ErrorMessage
                            name="cidade"
                            errors={errors}
                            as={<p className="error-message" />}
                        />
                    </div>
                    <div className="input-container">
                        <Input
                            placeholder="Informe o logradouro"
                            label="Logradouro"
                            {...register('logradouro', { required: 'Logradouro é obrigatório' })}
                        />
                        <ErrorMessage
                            name="logradouro"
                            errors={errors}
                            as={<p className="error-message" />}
                        />
                    </div>
                </Fieldset>
            </form>
        </FormContainer>
    );
}
