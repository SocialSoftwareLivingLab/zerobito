import React, { useCallback } from 'react';
import DataTable from 'react-data-table-component';
import { IoBagAdd } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { OcorrenciaModel } from '../../../common/models/ocorrencias/model';
import Badge from '../../ui/Badge';
import { BoxContainer } from '../../ui/BoxContainer';
import { Button } from '../../ui/Button';
import { Paginacao, dataTableStyle } from '../custom';
import { COLUNAS_TABELA_OCORRENCIAS, TIPOS_STATUS } from './table-columns';
import { ColunaAcao } from './styles';
import OcorrenciaItemSimples from './OcorrenciaSimplesItem';

export function BadgeStatus({ status }: { status: string | null }) {
    const tipo = TIPOS_STATUS[status];

    return status && <Badge texto={tipo.label} type={tipo.type} />;
}
interface TabelaOcorrenciaNovoProps {
    ocorrencias: OcorrenciaModel[];
}

export function TabelaOcorrenciaSimplesNovo(props: TabelaOcorrenciaNovoProps) {
    return (
        <BoxContainer titulo="Eventos relacionados ao caso">
            <DataTable
                data={props.ocorrencias}
                columns={COLUNAS_TABELA_OCORRENCIAS}
                responsive
                pagination
                paginationComponent={Paginacao}
                customStyles={dataTableStyle}
                pointerOnHover
                expandableRows
                noDataComponent="Nenhum registro encontrado"
                // expandableRowExpanded={(row) => !!row}
                expandOnRowClicked
                expandableRowsComponent={({ data }) => <OcorrenciaItemSimples data={data} />}
                dense
            />
        </BoxContainer>
    );
}
