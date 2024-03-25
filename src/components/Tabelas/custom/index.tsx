import React, { useCallback, useMemo } from "react";
import { PaginationComponentProps, TableStyles } from "react-data-table-component";
import styled from "styled-components";
import { Button } from "../../ui/Button";

export const dataTableStyle: TableStyles = {
    head: {
        style: {
            backgroundColor: '#fff',
            boxShadow: '0 1px 4px rgba(0, 0, 0, 0.5)',
        },
    },
    headRow: {
        style: {
            backgroundColor: '#fff'
        },
    },
    headCells: {
        style: {
            fontWeight: 'bold',
            fontSize: '16px',
            color: '#141414',
            textWrap: 'wrap'
        },
    },
    rows: {
        style: {
            '&:not(:last-of-type)': {
                borderBottomStyle: 'solid',
                borderBottomWidth: '0.5px',
                borderBottomColor: '#E6EBF0',
            }
        }
    },
    cells: {
        style: {
            fontSize: '16px',
            color: '#141414'
        },
    }
};

export const PaginacaoTabela = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    
    background: #fff;
    margin-top: 16px;

    div.botoes {
        display: flex;
        gap: 8px;
    }
`;

export function Paginacao(props: PaginationComponentProps) {
    const paginaAtual = props.currentPage;
    const totalPaginas = Math.ceil(props.rowCount / props.rowsPerPage);

    const ehPrimeiraPagina = useMemo(() => paginaAtual === 1, [paginaAtual]);
    const ehUltimaPagina = useMemo(() => paginaAtual === Math.ceil(props.rowCount / props.rowsPerPage), [props, paginaAtual]);

    const handleClickProximaPagina = useCallback(() => {
        if (ehUltimaPagina) return;
        props.onChangePage(paginaAtual + 1, props.rowsPerPage);
    }, [ehUltimaPagina, paginaAtual, props]);

    const handleClickPaginaAnterior = useCallback(() => {
        if (ehPrimeiraPagina) return;
        props.onChangePage(paginaAtual - 1, props.rowsPerPage);
    }, [ehPrimeiraPagina, paginaAtual, props]);

    return (
        <PaginacaoTabela>
            <div className="botoes">
                <Button action={handleClickPaginaAnterior} disabled={ehPrimeiraPagina}>Anterior</Button>
                <Button action={handleClickProximaPagina} disabled={ehUltimaPagina}>Próximo</Button>
            </div>
            <span>Página {paginaAtual} / {totalPaginas}</span>
        </PaginacaoTabela>
    );
}
