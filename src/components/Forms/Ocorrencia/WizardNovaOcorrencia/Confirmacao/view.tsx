import React from 'react';
import { OcorrenciaFormData } from '../../../../../pages/Ocorrencia/Cadastro/model';
import { FormContainer } from '../styles';
import { Section } from './styles';

export interface ConfirmacaoOcorrenciaViewProps {
    data: OcorrenciaFormData;
}

const labelCondicao = {
    OBITO: 'Óbito',
    INCIDENTE_ALTO_POTENCIAL: 'Incidente de Alto Potencial',
    ATENDIMENTO_HOSPITALAR: 'Atendimento Hospitalar'
};

const labelTipoDenunciante = {
    ANONIMA: 'Denunciante Anônimo',
    VITIMA: 'Vítima',
    FAMILIAR: 'Familiar',
    COLEGA_TRABALHO: 'Colega de Trabalho',
    SINDICATO: 'Sindicato',
    IMPRENSA: 'Imprensa',
    SERVICO_SAUDE: 'Serviço de Saúde',
    OUTRO: 'Outro'
};

export default function ConfirmacaoOcorrenciaView({ data }: ConfirmacaoOcorrenciaViewProps) {
    const dateFormat = Intl.DateTimeFormat('pt-br');
    return (
        <FormContainer>
            <h2>Confirme os dados abaixo para prosseguir</h2>

            <Section>
                <h3>Identificação do acidente</h3>

                <p>Data: {dateFormat.format(new Date(data.informacoesBasicas.data))}</p>
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

                <p>Tipo: {labelTipoDenunciante[data.denunciante.tipo]}</p>
                {data.denunciante.tipo === 'OUTRO' && (
                    <p>Tipo informado: {data.denunciante.outro}</p>
                )}

                {data.denunciante.tipo !== 'ANONIMO' && (
                    <>
                        <p className="justificado">
                            Informações Adicionais: {data.denunciante.adicionais}
                        </p>
                    </>
                )}
            </Section>

            <Section>
                <h3>Gravidade do acidente</h3>

                <p>Condição: {labelCondicao[data.gravidade.obito]} </p>
            </Section>
        </FormContainer>
    );
}
