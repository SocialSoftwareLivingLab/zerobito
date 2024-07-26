import React from 'react';
import { OcorrenciaModel } from '../../../../common/models/ocorrencias/model';
import { OcorrenciaItemContainer, SecaoItemOcorrencia } from './styles';

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

const tipoCondicao = {
    OBITO: 'Óbito',
    INCIDENTE_ALTO_POTENCIAL: 'Incidente com alto potencial de óbito'
};

const tipoGravidade = {
    EMERGENCIAL: 'Emergencial',
    URGENTE: 'Urgente',
    MUITO_URGENTE: 'Muito Urgente',
    POUCO_URGENTE: 'Pouco Urgente'
};

export default function OcorrenciaItemSimples({ data }: OcorrenciaExpandidaProps) {
    const dateFormat = Intl.DateTimeFormat('pt-br');

    return (
        <OcorrenciaItemContainer>
            <SecaoItemOcorrencia>
                <h4>Informações básicas</h4>
                <div className="info">
                    <div className="linha">
                        <div className="coluna">
                            <strong>ID</strong>
                            <span>{data.id}</span>
                        </div>
                        <div className="coluna">
                            <strong>Data da ocorrência</strong>
                            <span>{dateFormat.format(new Date(data.data))}</span>
                        </div>
                        <div className="coluna">
                            <strong>Data do registro</strong>
                            <span>{dateFormat.format(new Date(data.data))}</span>
                        </div>
                    </div>
                    <div className="linha">
                        <div className="coluna">
                            <strong>Status</strong>
                            <span>{data.status.descricao}</span>
                        </div>

                        <div className="coluna">
                            <strong>Última atualização</strong>
                            <span>{dateFormat.format(new Date(data.dataAlteracao))}</span>
                        </div>

                        <div className="coluna">
                            <strong>Relator</strong>
                            <span>
                                {data.relator.nome} ({data.relator.email})
                            </span>
                        </div>
                    </div>
                    <div className="linha">
                        <div className="coluna">
                            <strong>Título</strong>
                            <span>{data.titulo || 'Não informado'}</span>
                        </div>
                    </div>
                    <div className="linha">
                        <div className="coluna">
                            <strong>Descrição</strong>
                            <span>{data.descricao || 'Não informado'}</span>
                        </div>
                    </div>
                    <div className="linha">
                        <div className="coluna">
                            <strong>Estado</strong>
                            <span>{data.local.estado}</span>
                        </div>
                        <div className="coluna">
                            <strong>Cidade</strong>
                            <span>{data.local.cidade}</span>
                        </div>
                    </div>
                    <div className="linha">
                        <div className="coluna">
                            <strong>Endereço</strong>
                            <span>{data.local.logradouro || 'Não informado'}</span>
                        </div>
                    </div>
                </div>
            </SecaoItemOcorrencia>
            <SecaoItemOcorrencia>
                <h4>Fonte</h4>
                <div className="info">
                    <div className="linha">
                        <div className="coluna">
                            <strong>Tipo</strong>
                            <span>
                                {data.fonte.tipo !== 'OUTRO'
                                    ? tipoFonte[data.fonte.tipo]
                                    : data.fonte.outroTipo}
                            </span>
                        </div>
                    </div>
                    <div className="linha">
                        <div className="coluna">
                            <strong>Informações adicionais</strong>
                            <span>{data.fonte.detalhe || 'Não informado'}</span>
                        </div>
                    </div>
                </div>
            </SecaoItemOcorrencia>
            <SecaoItemOcorrencia>
                <h4>Vítima</h4>
                <div className="info">
                    <div className="linha">
                        <div className="coluna">
                            <strong>Nome</strong>
                            <span>{data.vitima.nome || 'Não informado'}</span>
                        </div>
                        <div className="coluna">
                            <strong>Vínculo</strong>
                            <span>{data.vitima.vinculo || 'Não informado'}</span>
                        </div>
                    </div>
                    <div className="linha">
                        <div className="coluna">
                            <strong>Condição</strong>
                            <span>{tipoCondicao[data.vitima.condicao] || 'Não informado'}</span>
                        </div>
                    </div>

                    <div className="linha">
                        <div className="coluna">
                            <strong>Empresa</strong>
                            <span>{data.empresa.nome || 'Não informado'}</span>
                        </div>
                        <div className="coluna">
                            <strong>CNPJ Empresa</strong>
                            <span>{data.empresa.cnpj || 'Não informado'}</span>
                        </div>
                    </div>
                    {data.empresa.tomadoraServico && (
                        <div className="linha">
                            <div className="coluna">
                                <strong>Tomadora de Serviço</strong>
                                <span>
                                    {data.empresa?.tomadoraServico?.nome || 'Não informado'}
                                </span>
                            </div>
                            <div className="coluna">
                                <strong>CNPJ Tomadora de Serviço</strong>
                                <span>
                                    {data.empresa?.tomadoraServico?.cnpj || 'Não informado'}
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </SecaoItemOcorrencia>
        </OcorrenciaItemContainer>
    );
}
