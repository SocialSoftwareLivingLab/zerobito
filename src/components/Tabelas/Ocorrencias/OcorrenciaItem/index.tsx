import React from 'react';
import { OcorrenciaModel } from '../../../../common/models/ocorrencias/model';
import { OcorrenciaItemContainer } from './styles';

interface OcorrenciaExpandidaProps {
    data: OcorrenciaModel;
}

const tipoFonte = {
    ANONIMA: 'Anônima'
};

export default function OcorrenciaItem({ data }: OcorrenciaExpandidaProps) {
    const dateFormat = Intl.DateTimeFormat('pt-br');
    return (
        <OcorrenciaItemContainer>
            <section>
                <h4>Identificação Básica</h4>
                <span>Identificador: {data.id}</span>
                <span>Data: {dateFormat.format(new Date(data.data))}</span>
                <span>Data de registro: {dateFormat.format(new Date(data.dataCriacao))}</span>
                <span>Descrição: {data.descricao}</span>
                <span>Situação: {data.status.descricao}</span>
            </section>

            <section>
                <h4>Informações sobre a fonte</h4>

                {data.fonte.tipo !== 'OUTRO' && <span>Tipo: {tipoFonte[data.fonte.tipo]}</span>}
                {data.fonte.tipo === 'OUTRO' && <span>Tipo: {data.fonte.outroTipo}</span>}
                {data.fonte.tipo !== 'ANONIMA' && (
                    <>
                        <span>Nome: {data.fonte.nome}</span>
                        <span>Email: {data.fonte.email}</span>
                        <span>Telefone principal: {data.fonte.telefonePrincipal}</span>
                        <span>Telefone secundário: {data.fonte.telefoneSecundario}</span>
                    </>
                )}
            </section>

            <section>
                <h4>Empresa</h4>
                <span>Nome: {data.empresa.nome}</span>
                <span>CNPJ: {data.empresa.cnpj || 'Não informado'}</span>
                <span>
                    Tomadora de serviço: {data.empresa.tomadoraServico?.nome || 'Não informado'}
                </span>
                <span>
                    CNPJ tomadora de serviço:{' '}
                    {data.empresa.tomadoraServico?.cnpj || 'Não informado'}
                </span>
            </section>
        </OcorrenciaItemContainer>
    );
}
