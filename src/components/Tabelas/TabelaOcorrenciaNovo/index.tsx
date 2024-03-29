import React, { useCallback } from 'react';
import DataTable from 'react-data-table-component';
import { IoBagAdd } from 'react-icons/io5';
import { useHistory } from 'react-router-dom';
import { OcorrenciaModel } from '../../../common/models/ocorrencias/model';
import Badge from '../../ui/Badge';
import { BoxContainer } from '../../ui/BoxContainer';
import { Button } from '../../ui/Button';
import { Paginacao, dataTableStyle } from '../custom';
import { ColunaAcao } from './styles';
import { COLUNAS_TABELA_OCORRENCIAS, TIPOS_GRAVIDADE } from './table-columns';

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

export function BadgeGravidade({ gravidade }: { gravidade: string | null }) {
    const tipo = TIPOS_GRAVIDADE[gravidade];

    return gravidade && <Badge texto={tipo.label} type={tipo.type} />;
}

export function AcoesLinha({ row }: { row: OcorrenciaModel }) {
    return (
        <ColunaAcao>
            <Button
                type="submit"
                size="small"
                action={() => {
                    console.log(row);
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

export function TabelaOcorrenciaNovo(props: TabelaOcorrenciaNovoProps) {
    return (
        <BoxContainer titulo="Comunicação de Evento" acoesContainer={AdicionarNovoEventoButton}>
            <DataTable
                data={props.ocorrencias}
                columns={COLUNAS_TABELA_OCORRENCIAS}
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
