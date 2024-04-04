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

export default function OcorrenciaItem({ data }: OcorrenciaExpandidaProps) {
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
                            <span>{dateFormat.format(new Date(data.dataCriacao))}</span>
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
                    </div>
                    <div className="linha">
                        <div className="coluna">
                            <strong>Descrição</strong>
                            <span>{data.descricao || 'Não informado'}</span>
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
                        <div className="coluna">
                            {data.fonte.tipo !== 'ANONIMA' && (
                                <>
                                    <div>
                                        <strong>Nome</strong>
                                        <span>{data.fonte.nome}</span>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="linha">
                        <div className="coluna">
                            <strong>E-mail</strong>
                            <span>{data.fonte.email || 'Não informado'}</span>
                        </div>
                        <div className="coluna">
                            <strong>Telefone Principal</strong>
                            <span>{data.fonte.telefonePrincipal || 'Não informado'}</span>
                        </div>

                        <div className="coluna">
                            <strong>Telefone Secundário</strong>
                            <span>{data.fonte.telefoneSecundario || 'Não informado'}</span>
                        </div>
                    </div>
                </div>
            </SecaoItemOcorrencia>
            <SecaoItemOcorrencia>
                <h4>Localização</h4>
                <div className="info">
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
        </OcorrenciaItemContainer>
    );
}
