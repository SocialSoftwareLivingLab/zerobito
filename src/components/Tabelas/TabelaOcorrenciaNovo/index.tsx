import React, { useCallback } from 'react';
import { IoBagAdd } from 'react-icons/io5';
import { useHistory } from 'react-router-dom';
import { BoxContainer } from '../../ui/BoxContainer';
import { Button } from '../../ui/Button';
import { OcorrenciaModel } from '../../../common/models/ocorrencias/model';
import DataTable, { TableColumn } from 'react-data-table-component';
import { Paginacao, dataTableStyle } from '../custom';
import { ColunaAcao } from './styles';

function AdicionarNovoEventoButton() {
    const history = useHistory();

    const handleClick = useCallback(() => {
        history.push('/ocorrencia');
    }, [history]);

    return (
        <Button type="button" action={handleClick}>
            <IoBagAdd /> Adicionar novo evento
        </Button>
    );
}

interface TabelaOcorrenciaNovoProps {
    ocorrencias: OcorrenciaModel[]; // TO-DO: Tipar esses retornos.
}

const colunasOcorrencias: TableColumn<OcorrenciaModel>[] = [
    {
        name: 'Denúncia',
        selector: (sel) => sel.descricao,
        sortable: true,
        width: '15%',
        allowOverflow: true,
        wrap: true
    },
    {
        name: 'Data',
        width: '15%',
        selector: (sel) => String(sel.data),
        sortable: true,
        allowOverflow: true,
        format: (row) =>
            Intl.DateTimeFormat('pt-BR', { dateStyle: 'short' }).format(new Date(row.data)),
        wrap: true
    },
    {
        name: 'Tipo',
        width: '15%',
        selector: (sel) => sel.vitima.condicao,
        sortable: true,
        allowOverflow: true,
        wrap: true
    },
    {
        name: 'Gravidade',
        width: '15%',
        selector: (sel) => sel.vitima.gravidade,
        sortable: true,
        allowOverflow: true,
        wrap: true
    },
    {
        name: 'Status',
        width: '15%',
        selector: (sel) => sel.status,
        sortable: true,
        allowOverflow: true,
        wrap: true
    },
    {
        name: 'Ações',
        width: '35%',
        sortable: true,
        cell: (row) => (
            <ColunaAcao>
                <Button
                    type="submit"
                    size="small"
                    action={() => {
                        console.log(row);
                    }}
                >
                    Aceitar
                </Button>
                <Button
                    type="default"
                    size="small"
                    action={() => {
                        console.log(row);
                    }}
                >
                    Não incorporar
                </Button>
            </ColunaAcao>
        )
    }
];

export function TabelaOcorrenciaNovo(props: TabelaOcorrenciaNovoProps) {
    return (
        <BoxContainer titulo="Comunicação de Evento" acoesContainer={AdicionarNovoEventoButton}>
            <DataTable
                data={props.ocorrencias}
                columns={colunasOcorrencias}
                responsive
                pagination
                paginationComponent={Paginacao}
                customStyles={dataTableStyle}
                pointerOnHover
                dense
            />
        </BoxContainer>
    );
}
