import React, { useCallback, useState } from 'react';
import DataTable from 'react-data-table-component';
import { IoBagAdd } from 'react-icons/io5';
import { FaEdit } from 'react-icons/fa'; // ← ADICIONAR ESTE IMPORT
import { useNavigate } from 'react-router-dom';
import { OcorrenciaModel } from '../../../common/models/ocorrencias/model';
import Badge from '../../ui/Badge';
import { BoxContainer } from '../../ui/BoxContainer';
import { Button } from '../../ui/Button';
import { Paginacao, dataTableStyle } from '../custom';
import OcorrenciaItem from './OcorrenciaItem';
import { ColunaAcao } from './styles';
import { COLUNAS_TABELA_OCORRENCIAS, TIPOS_STATUS } from './table-columns';
import { EditarOcorrenciaModal } from '../../Forms/Ocorrencia/WizardEditarOcorrencia'; // ← ADICIONAR ESTE IMPORT

function AdicionarNovoEventoButton() {
    const navigate = useNavigate();

    const handleClick = useCallback(() => {
        navigate('/ocorrencia');
    }, [navigate]);

    return (
        <Button type="button" action={handleClick}>
            <IoBagAdd /> Adicionar novo evento
        </Button>
    );
}

export function BadgeStatus({ status }: { status: string | null }) {
    const tipo = TIPOS_STATUS[status];

    return status && <Badge texto={tipo.label} type={tipo.type} />;
}

export function AcoesLinha({ row }: { row: OcorrenciaModel }) {
    const navigate = useNavigate();

    return (
        <ColunaAcao>
            <Button
                type="submit"
                size="small"
                action={() => {
                    navigate(`/ocorrencia/${row.id}/aceitar`);
                }}>
                Aceitar
            </Button>
            <Button
                type="default"
                size="small"
                action={() => {
                    console.log(row);
                }}>
                Não incorporar
            </Button>
        </ColunaAcao>
    );
}

// ← ADICIONAR ESTE NOVO COMPONENTE
export function AcoesLinhaComEdicao({
    row,
    onEditarClick
}: {
    row: OcorrenciaModel;
    onEditarClick: (ocorrencia: OcorrenciaModel) => void;
}) {
    const navigate = useNavigate();

    return (
        <ColunaAcao>
            {/* Botão de Editar */}
            <button
                onClick={() => onEditarClick(row)}
                title="Editar ocorrência"
                style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '1.2rem',
                    color: '#134780',
                    padding: '5px',
                    marginRight: '10px'
                }}>
                <FaEdit />
            </button>

            {/* Botões existentes */}
            <Button
                type="submit"
                size="small"
                action={() => {
                    navigate(`/ocorrencia/${row.id}/aceitar`);
                }}>
                Aceitar
            </Button>
            <Button
                type="default"
                size="small"
                action={() => {
                    console.log(row);
                }}>
                Não incorporar
            </Button>
        </ColunaAcao>
    );
}

interface TabelaOcorrenciaNovoProps {
    ocorrencias: OcorrenciaModel[];
}

export default function TabelaOcorrenciaNovo({ ocorrencias }: TabelaOcorrenciaNovoProps) {
    // ← ADICIONAR ESTES ESTADOS
    const [ocorrenciaParaEditar, setOcorrenciaParaEditar] = useState<OcorrenciaModel | null>(null);
    const [modalAberto, setModalAberto] = useState(false);

    // ← ADICIONAR ESTAS FUNÇÕES
    const handleAbrirModal = useCallback((ocorrencia: OcorrenciaModel) => {
        setOcorrenciaParaEditar(ocorrencia);
        setModalAberto(true);
    }, []);

    const handleFecharModal = useCallback(() => {
        setModalAberto(false);
        setOcorrenciaParaEditar(null);
    }, []);

    const handleSucesso = useCallback(() => {
        // Recarregar a página para atualizar a lista
        window.location.reload();
    }, []);

    const expandableRowsComponent = useCallback((data: { data: OcorrenciaModel }) => {
        return <OcorrenciaItem data={data.data} />;
    }, []);

    // ← MODIFICAR AS COLUNAS PARA USAR O NOVO COMPONENTE DE AÇÕES
    const colunasComEdicao = COLUNAS_TABELA_OCORRENCIAS.map((coluna) => {
        if (coluna.name === 'Ações') {
            return {
                ...coluna,
                cell: (row: OcorrenciaModel) => (
                    <AcoesLinhaComEdicao row={row} onEditarClick={handleAbrirModal} />
                )
            };
        }
        return coluna;
    });

    return (
        <>
            <BoxContainer
                titulo="Comunicação de eventos"
                acoesContainer={AdicionarNovoEventoButton}>
                <DataTable
                    columns={colunasComEdicao} // ← USAR AS COLUNAS MODIFICADAS
                    data={ocorrencias}
                    expandableRows
                    expandableRowsComponent={expandableRowsComponent}
                    pagination
                    paginationComponent={Paginacao}
                    customStyles={dataTableStyle}
                />
            </BoxContainer>

            {/* ← ADICIONAR O MODAL NO FINAL */}
            {ocorrenciaParaEditar && (
                <EditarOcorrenciaModal
                    ocorrencia={{
                        id: ocorrenciaParaEditar.id,
                        titulo: ocorrenciaParaEditar.titulo,
                        descricao: ocorrenciaParaEditar.descricao,
                        data:
                            typeof ocorrenciaParaEditar.data === 'string'
                                ? ocorrenciaParaEditar.data
                                : new Date(ocorrenciaParaEditar.data).toISOString(), // ← CONVERTER Date para string
                        local: ocorrenciaParaEditar.local,
                        vitima: ocorrenciaParaEditar.vitima,
                        empresa: ocorrenciaParaEditar.empresa,
                        fonte: {
                            tipo: ocorrenciaParaEditar.fonte.tipo,
                            outroTipo: ocorrenciaParaEditar.fonte.outroTipo,
                            detalhe: ocorrenciaParaEditar.fonte.detalhe || '' // ← GARANTIR que não seja undefined
                        }
                    }}
                    isOpen={modalAberto}
                    onClose={handleFecharModal}
                    onSuccess={handleSucesso}
                />
            )}
        </>
    );
}

// ← ADICIONAR ESTE EXPORT NOMEADO TAMBÉM
export { TabelaOcorrenciaNovo };
