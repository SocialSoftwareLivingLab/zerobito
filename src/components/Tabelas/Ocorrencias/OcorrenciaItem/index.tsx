import React from 'react';
import { OcorrenciaModel } from '../../../../common/models/ocorrencias/model';
import { OcorrenciaItemContainer } from './styles';

interface OcorrenciaExpandidaProps {
    data: OcorrenciaModel;
}

const tipoFonte = {
    ANONIMA: 'Anônima',
    VITIMA: 'Vítima',
    FAMILIAR: 'Familiar',
    COLEGA_TRABALHO: 'Colega de Trabalho',
    SINDICATO: 'Sindicato',
    IMPRENSA: 'Imprensa',
    SERVICO_SAUDE: 'Serviço de Saúde',
    OUTRO: 'Outro'
};

export default function OcorrenciaItem({ data }: OcorrenciaExpandidaProps) {
    const dateFormat = Intl.DateTimeFormat('pt-br');

    return (
        <OcorrenciaItemContainer>
            <div className="linha">
                <div>
                    <strong>ID</strong>
                    <span>{data.id}</span>
                </div>
                <div>
                    <strong>Data da Ocorrência</strong>
                    <span>{dateFormat.format(new Date(data.data))}</span>
                </div>
                <div>
                    <strong>Data do registro</strong>
                    <span>{dateFormat.format(new Date(data.dataCriacao))}</span>
                </div>
                <div>
                    <strong>Status</strong>
                    <span>{data.status.descricao}</span>
                </div>
                <div>
                    <strong>Última atualização</strong>
                    <span>{dateFormat.format(new Date(data.dataAlteracao))}</span>
                </div>
            </div>
            <div className="linha">
                <div>
                    <strong>Fonte</strong>
                    <span>
                        {data.fonte.tipo !== 'OUTRO'
                            ? tipoFonte[data.fonte.tipo]
                            : data.fonte.outroTipo}
                    </span>
                </div>

                {data.fonte.tipo !== 'ANONIMA' && (
                    <>
                        <div>
                            <strong>Nome</strong>
                            <span>{data.fonte.nome}</span>
                        </div>
                    </>
                )}
            </div>
            <div className="linha">
                <div>
                    <strong>Descrição</strong>
                    <span>{data.descricao}</span>
                </div>
            </div>
        </OcorrenciaItemContainer>
    );
}
