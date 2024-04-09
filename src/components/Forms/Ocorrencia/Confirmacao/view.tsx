import React from 'react';
import { OcorrenciaFormData } from '../../../../pages/NovaOcorrencia/model';
import { FormContainer } from '../styles';
import { Section } from './styles';

export interface ConfirmacaoOcorrenciaViewProps {
    data: OcorrenciaFormData;
}

export default function ConfirmacaoOcorrenciaView({ data }: ConfirmacaoOcorrenciaViewProps) {
    return (
        <FormContainer>
            <h2>Confirme os dados</h2>

            <Section>
                <h3>Identificação do acidente</h3>

                <p>Data: 12/12/2021</p>
                <p>Descrição: {data.informacoesBasicas.descricao}</p>
                <p>Estado: {data.informacoesBasicas.local.estado}</p>
                <p>Cidade: {data.informacoesBasicas.local.cidade}</p>
                <p>Logradouro: {data.informacoesBasicas.local.logradouro}</p>
            </Section>

            <Section>
                <h3>Informações da vítima</h3>

                <p>Nome: {data.vitima.nome}</p>
                <p>Vínculo: {data.vitima.vinculoEmpresa}</p>

                {data.vitima.nomeEmpresa && <p>Empresa: {data.vitima.nomeEmpresa}</p>}
                {data.vitima.cnpjEmpresa && <p>CNPJ Empresa: {data.vitima.cnpjEmpresa}</p>}

                {data.vitima.tomadoraDeServicoNome && (
                    <p>Tomadora de Serviço: {data.vitima.tomadoraDeServicoNome}</p>
                )}
                {data.vitima.tomadoraDeServicoCNPJ && (
                    <p>CNPJ Tomadora de Serviço: {data.vitima.tomadoraDeServicoCNPJ}</p>
                )}
            </Section>

            <Section>
                <h3>Informações do Denunciante</h3>

                <p>Tipo: {data.denunciante.tipo}</p>
                {data.denunciante.tipo === 'OUTRO' && (
                    <p>Tipo informado: {data.denunciante.outro}</p>
                )}

                {data.denunciante.tipo !== 'ANONIMO' && (
                    <>
                        <p>Informações Adicionais: {data.denunciante.adicionais}</p>
                    </>
                )}
            </Section>

            <Section>
                <h3>Gravidade do acidente</h3>

                <p>Condição: Resolver </p>
            </Section>
        </FormContainer>
    );
}
