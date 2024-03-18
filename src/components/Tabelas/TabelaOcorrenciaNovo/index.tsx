import React, { useCallback } from "react";
import { IoBagAdd } from "react-icons/io5";
import { useHistory } from "react-router-dom";
import { BoxContainer } from "../../BoxContainer";
import { Button } from "../../Button";
import { OcorrenciaModel } from "../../../common/models/ocorrencias/model";
import DataTable, { TableColumn } from "react-data-table-component";
import { Paginacao, dataTableStyle } from "../custom";
import { ColunaAcao } from "./styles";

function AdicionarNovoEventoButton() {
    const history = useHistory();

    const handleClick = useCallback(() => {
        history.push('/ocorrencia')
    }, [history]);

    return (
        <Button type="button" action={handleClick}>
            <IoBagAdd /> Adicionar novo evento
        </Button>
    )
}

interface TabelaOcorrenciaNovoProps {
    ocorrencias: OcorrenciaModel[] // TO-DO: Tipar esses retornos.
}


const colunasOcorrencias: TableColumn<OcorrenciaModel>[] = [
    {
        name: 'Denúncia',
        selector: sel => sel.denuncia,
        sortable: true,
        width: '15%',
        allowOverflow: true,
        wrap: true,
    },
    {
        name: 'Data',
        width: '15%',
        selector: sel => sel.data,
        sortable: true,
        allowOverflow: true,
        format: (row) => new Date(row.data).toLocaleDateString(new Intl.Locale('pt-BR')),
        wrap: true
    },
    {
        name: 'Condição do Acidentado',
        width: '15%',
        selector: sel => sel.condicaoAcidentado,
        sortable: true,
        allowOverflow: true,
        wrap: true
    },
    {
        name: 'Gravidade',
        width: '15%',
        selector: sel => sel.gravidade,
        sortable: true,
        allowOverflow: true,
        wrap: true
    },
    {
        name: 'Andamento do caso',
        width: '15%',
        selector: sel => sel.andamentoCaso,
        sortable: true,
        allowOverflow: true,
        wrap: true
    },
    {
        name: 'Ações',
        width: '35%',
        sortable: true,
        cell: (row) => <ColunaAcao>
            <Button type="submit" size="small" action={() => { console.log(row) }}>Aceitar</Button>
            <Button type="default" size="small" action={() => { console.log(row) }}>Não incorporar</Button>
        </ColunaAcao>
    }
]


export function TabelaOcorrenciaNovo(props: TabelaOcorrenciaNovoProps) {
    return (
        <BoxContainer titulo="Comunicação de Evento" acoesContainer={AdicionarNovoEventoButton}>
            <DataTable
                data={props.ocorrencias}
                columns={colunasOcorrencias}
                pagination
                paginationComponent={Paginacao}
                customStyles={dataTableStyle}
                pointerOnHover
                dense
            />
        </BoxContainer>
    );
} 