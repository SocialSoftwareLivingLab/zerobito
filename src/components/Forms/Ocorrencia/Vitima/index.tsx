import { ErrorMessage } from '@hookform/error-message';
import React, { forwardRef, useCallback, useImperativeHandle } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useOcorrenciaWizardContext } from '../../../../pages/NovaOcorrencia/context';
import { FormStepApi } from '../interface';
import "../style.css";

interface VitimaFormInput {
    nome: string;
    nomeEmpresa: string;
    cnpjEmpresa: string;
    tomadoraDeServicoNome: string;
    tomadoraDeServicoCNPJ: string;
    tipoContrato: string;
}

const Vitima = forwardRef<FormStepApi, {}>((props, ref) => {
    const { handleSubmit, register, watch, trigger, formState: { isValid, errors } } = useForm<VitimaFormInput>();

    const nomeEmpresa = watch('nomeEmpresa');
    const tomadoraDeServicoNome = watch('tomadoraDeServicoNome');

    const { setVitimaData } = useOcorrenciaWizardContext();

    const onSubmit: SubmitHandler<VitimaFormInput> = useCallback((data) => {
        setVitimaData({
            nome: data.nome,
            nomeEmpresa: data.nomeEmpresa,
            cnpjEmpresa: data.cnpjEmpresa,
            tomadoraDeServicoNome: data.tomadoraDeServicoNome,
            tomadoraDeServicoCNPJ: data.tomadoraDeServicoCNPJ,
            vinculoEmpresa: data.tipoContrato
        });
    }, [setVitimaData]);

    useImperativeHandle(ref, () => ({
        submitForm: () => {
            handleSubmit(onSubmit)();
        },
        validate(): boolean {
            trigger();
            return isValid;
        }
    }), [isValid, trigger, handleSubmit, onSubmit]);

    return (
        <div className='form-container'>
            <h1>Informações sobre o acidente:</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
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
});

export default Vitima;