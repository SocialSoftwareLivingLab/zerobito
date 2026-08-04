import DataTable from 'react-data-table-component';
import { OcorrenciaModel } from '../../../common/models/ocorrencias/model';
import Badge from '../../ui/Badge';
import { BoxContainer } from '../../ui/BoxContainer';
import { Paginacao, dataTableStyle } from '../custom';
import { COLUNAS_TABELA_OCORRENCIAS, TIPOS_STATUS } from './table-columns';
import OcorrenciaItemSimples from './OcorrenciaSimplesItem';

export function BadgeStatus({ status }: { status: string | null }) {
    const tipo = TIPOS_STATUS[status];

    return status && <Badge texto={tipo.label} type={tipo.type} />;
}

function OcorrenciaExpandida({ data }: { data: OcorrenciaModel }) {
    return <OcorrenciaItemSimples data={data} />;
}

interface TabelaOcorrenciaNovoProps {
    readonly ocorrencias: OcorrenciaModel[];
}

export function TabelaOcorrenciaSimplesNovo(props: Readonly<TabelaOcorrenciaNovoProps>) {
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
                expandOnRowClicked
                expandableRowsComponent={OcorrenciaExpandida}
                dense
            />
        </BoxContainer>
    );
}
