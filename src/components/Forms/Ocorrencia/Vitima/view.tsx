import { ErrorMessage } from '@hookform/error-message';
import React from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import "../style.css";
import { VitimaFormFields } from './model';

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
        <div className='form-container'>
            <h1>Informações sobre o acidente:</h1>
            <form onSubmit={submitForm}>
                <input type="text" placeholder="Nome" {...register('nome')} />
                <ErrorMessage name='nome' errors={errors} as="p" />

                <input type="text" placeholder="Nome da empresa empregadora" {...register('nomeEmpresa')} />
                <ErrorMessage name='nomeEmpresa' errors={errors} as="p" />

                {!!nomeEmpresa &&
                    <>
                        <input type="text" placeholder="CNPJ da empresa empregadora" {...register('cnpjEmpresa')} />
                        <ErrorMessage name='cnpjEmpresa' errors={errors} as="p" />
                    </>
                }

                <ErrorMessage name='cnpjEmpresa' errors={errors} as="p" />

                <input type="text" placeholder="Nome da tomadora de serviço" {...register('tomadoraDeServicoNome')} />
                <ErrorMessage name='tomadoraDeServicoNome' errors={errors} as="p" />

                {!!tomadoraDeServicoNome &&
                    <>
                        <input type="text" placeholder="CNPJ da tomadora de serviço" {...register('tomadoraDeServicoCNPJ')} />
                        <ErrorMessage name='tomadoraDeServicoCNPJ' errors={errors} as="p" />
                    </>
                }

                <select className='form-container-select' {...register('tipoContrato')}>

                    <option>Selecione...</option>
                    <option value="CLT">CLT</option>
                    <option value="PJ">PJ</option>
                    <option value="Estagiário">Estagiário</option>
                    <option value="Aprendiz">Aprendiz</option>
                    <option value="Temporário">Temporário</option>
                    <option value="Terceirizado">Terceirizado</option>
                    <option value="Outro">Outro</option>
                    <option value="Desconhecido">Desconhecido</option>
                </select>
                <ErrorMessage name='tipoContrato' errors={errors} as="p" />
            </form>
        </div>
    );
}