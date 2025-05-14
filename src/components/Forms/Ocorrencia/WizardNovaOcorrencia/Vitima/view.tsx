import { ErrorMessage } from '@hookform/error-message';
import React from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import Input from '../../../../ui/Input';
import { Select, SelectOption } from '../../../../ui/Select';
import '../style.css';
import { FormContainer } from '../styles';
import { VitimaFormFields } from './model';
import { validarCNPJ } from '../../../../../common/Errors/MascaraCNPJ';
import { validarCNAE } from '../../../../../common/Errors/MascaraCNAE';

export interface VitimaViewProps {
    submitForm: () => void;
    errors: FieldErrors<VitimaFormFields>;
    register: UseFormRegister<VitimaFormFields>;
    tomadoraDeServicoNome?: string;
}

export default function VitimaView({
    submitForm,
    errors,
    register,
    tomadoraDeServicoNome
}: VitimaViewProps) {
    return (
        <FormContainer>
            <form onSubmit={submitForm}>
                {/* <input type="text" placeholder="Nome" {...register('nome')} /> */}
                <Input
                    type="number"
                    label="Quantidade de Vítimas"
                    {...register('quantidade', {
                        required: 'Campo Obrigatório',
                        validate: {
                            isNumber: (value) =>
                                !isNaN(Number(value)) || 'Quantidade precisa ser um número válido',
                            minOne: (value) =>
                                Number(value) >= 1 || 'Quantidade deve ser maior ou igual a 1'
                        }
                    })}
                />
                <ErrorMessage
                    name="quantidade"
                    errors={errors}
                    as={<p className="error-message" />}
                />
                <Input label="Nome da Vítima" {...register('nome', { required: false })} />
                <ErrorMessage name="nome" errors={errors} as="p" />

                {/* <input type="text" placeholder="Nome da empresa empregadora" {...register('nomeEmpresa')} /> */}
                <Input
                    label="Empresa Empregadora"
                    {...register('nomeEmpresa', { required: false })}
                />
                <ErrorMessage
                    name="nomeEmpresa"
                    errors={errors}
                    as={<p className="error-message" />}
                />

                <Input
                    label="CNPJ Empresa Empregadora"
                    {...register('cnpjEmpresa', {
                        required: false,
                        validate: {
                            isValidCNPJ: (value) => validarCNPJ(value) || 'CNPJ inválido'
                        }
                    })}
                />
                <ErrorMessage
                    name="cnpjEmpresa"
                    errors={errors}
                    as={<p className="error-message" />}
                />

                <Input
                    label="CNAE Empresa Empregadora"
                    {...register('cnaeEmpresa', {
                        required: false,
                        validate: {
                            isValidCNAE: (value) => validarCNAE(value) || 'CNAE inválido'
                        }
                    })}
                />
                <ErrorMessage
                    name="cnaeEmpresa"
                    errors={errors}
                    as={<p className="error-message" />}
                />

                {/* <input type="text" placeholder="Nome da tomadora de serviço" {...register('tomadoraDeServicoNome')} /> */}
                <Input label="Tomadora de Serviço" {...register('tomadoraDeServicoNome')} />
                <ErrorMessage name="tomadoraDeServicoNome" errors={errors} as="p" />

                {!!tomadoraDeServicoNome && (
                    <>
                        {/* <input type="text" placeholder="CNPJ da tomadora de serviço" {...register('tomadoraDeServicoCNPJ')} /> */}
                        <Input
                            label="CNPJ Tomadora de Serviço"
                            {...register('tomadoraDeServicoCNPJ', {
                                required: false,
                                validate: {
                                    isValidCNPJ: (value) => validarCNPJ(value) || 'CNPJ inválido'
                                }
                            })}
                        />
                        <ErrorMessage
                            name="tomadoraDeServicoCNPJ"
                            errors={errors}
                            as={<p className="error-message" />}
                        />
                        <Input
                            label="CNAE Tomadora de Serviço"
                            {...register('tomadoraDeServicoCNAE', {
                                required: false,
                                validate: {
                                    isValidCNPJ: (value) => validarCNAE(value) || 'CNAE inválido'
                                }
                            })}
                        />
                        <ErrorMessage
                            name="tomadoraDeServicoCNAE"
                            errors={errors}
                            as={<p className="error-message" />}
                        />
                    </>
                )}

                <Select label="Tipo de contrato" {...register('tipoContrato', { required: false })}>
                    <SelectOption label="Selecione um tipo de contrato" value="" disabled />
                    <SelectOption label="CLT" value="CLT" />
                    <SelectOption label="PJ" value="PJ" />
                    <SelectOption label="Estagiário" value="Estagiário" />
                    <SelectOption label="Aprendiz" value="Aprendiz" />
                    <SelectOption label="Temporário" value="Temporário" />
                    <SelectOption label="Terceirizado" value="Terceirizado" />
                    <SelectOption label="Outro" value="Outro" />
                    <SelectOption label="Desconhecido" value="Desconhecido" />
                </Select>
                <ErrorMessage name="tipoContrato" errors={errors} as="p" />
            </form>
        </FormContainer>
    );
}
