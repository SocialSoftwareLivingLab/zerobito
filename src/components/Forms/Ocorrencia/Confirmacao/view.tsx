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

                <p>Tipo: {data.denunciante.tipoDenuncia}</p>
                {data.denunciante.tipoDenuncia === 'OUTRO' && (
                    <p>Tipo informado: {data.denunciante.tipoDenuncia}</p>
                )}

                {data.denunciante.tipoDenuncia !== 'ANONIMO' && (
                    <>
                        <p>Nome: {data.denunciante.nomeDenuncia}</p>
                        <p>E-mail: {data.denunciante.emailDenuncia}</p>
                        <p>Telefone: {data.denunciante.telefoneDenuncia}</p>
                        <p>Telefone Secundário: {data.denunciante.telefoneSecundarioDenuncia}</p>
                    </>
                )}
            </Section>

            <Section>
                <h3>Gravidade do acidente</h3>

                <p>Houve óbito? {data.gravidade.obito === 'OBITO' ? 'Sim' : 'Não'}</p>
                {data.gravidade.obito === 'INCIDENTE_ALTO_POTENCIAL' && (
                    <p>Gravidade da vítima: {data.gravidade.gravidade}</p>
                )}
            </Section>
        </FormContainer>
    );
}
