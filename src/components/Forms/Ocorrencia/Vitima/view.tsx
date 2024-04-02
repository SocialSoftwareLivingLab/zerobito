import { ErrorMessage } from '@hookform/error-message';
import React from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import "../style.css";
import { VitimaFormFields } from './model';
import Input from '../../../ui/Input';
import { FormContainer } from '../styles';
import { Select, SelectOption } from '../../../ui/Select';

export interface VitimaViewProps {
    submitForm: () => void,
    errors: FieldErrors<VitimaFormFields>,
    register: UseFormRegister<VitimaFormFields>,
    nomeEmpresa?: string,
    tomadoraDeServicoNome?: string,
}

export default function VitimaView(
    {
        submitForm,
        errors,
        register,
        nomeEmpresa,
        tomadoraDeServicoNome
    }: VitimaViewProps
) {
    return (
        <FormContainer>
            <form onSubmit={submitForm}>
                {/* <input type="text" placeholder="Nome" {...register('nome')} /> */}
                <Input label="Nome da Vítima" {...register('nome', { required: false })} />
                <ErrorMessage name='nome' errors={errors} as="p" />

                {/* <input type="text" placeholder="Nome da empresa empregadora" {...register('nomeEmpresa')} /> */}
                <Input label="Empresa Empregadora" {...register('nomeEmpresa', { required: false })} />
                <ErrorMessage name='nomeEmpresa' errors={errors} as="p" />

                <Input label="CNPJ Empresa Empregadora" {...register('cnpjEmpresa', { required: false })} />
                <ErrorMessage name='cnpjEmpresa' errors={errors} as="p" />

                {/* <input type="text" placeholder="Nome da tomadora de serviço" {...register('tomadoraDeServicoNome')} /> */}
                <Input label="Tomadora de Serviço" {...register('tomadoraDeServicoNome')} />
                <ErrorMessage name='tomadoraDeServicoNome' errors={errors} as="p" />

                {!!tomadoraDeServicoNome &&
                    <>
                        {/* <input type="text" placeholder="CNPJ da tomadora de serviço" {...register('tomadoraDeServicoCNPJ')} /> */}
                        <Input label="CNPJ Tomadora de Serviço" {...register('tomadoraDeServicoCNPJ', { required: false })} />
                        <ErrorMessage name='tomadoraDeServicoCNPJ' errors={errors} as="p" />
                    </>
                }

                <Select label="Tipo de contrato" {...register('tipoContrato', { required: false })}>
                    <SelectOption label="Selecione um tipo de contrato" value='' disabled />
                    <SelectOption label="CLT" value="CLT" />
                    <SelectOption label="PJ" value="PJ" />
                    <SelectOption label="Estagiário" value="Estagiário" />
                    <SelectOption label="Aprendiz" value="Aprendiz" />
                    <SelectOption label="Temporário" value="Temporário" />
                    <SelectOption label="Terceirizado" value="Terceirizado" />
                    <SelectOption label="Outro" value="Outro" />
                    <SelectOption label="Desconhecido" value="Desconhecido" />
                </Select>
                <ErrorMessage name='tipoContrato' errors={errors} as="p" />
            </form>
        </FormContainer>
    );
}