import React from 'react';
import { TableColumn } from 'react-data-table-component';
import { Caso } from '../../../../common/models/caso/caso';
import { Button } from '../../../ui/Button';
import { FaEye } from 'react-icons/fa';

export const ColunasTabelaListarCasos: TableColumn<Caso>[] = [
    {
        name: 'Nome',
        selector: (data) => data.nome,
        sortable: true
    },
    {
        name: 'Coordenador',
        selector: (data) => data.coordenador.nome,
        sortable: true
    },
    {
        name: 'Criador',
        selector: (data) => data.criador.nome,
        sortable: true
    },
    {
        name: 'Data de Criação',
        selector: (data) => String(data.dataCriacao),
        sortable: true,
        format: (row) =>
            Intl.DateTimeFormat('pt-BR', { dateStyle: 'short' }).format(new Date(row.dataCriacao))
    },
    {
        name: 'Ação',
        sortable: false,
        cell: (row) => (
            <Button type="default">
                <FaEye /> Acompanhar
            </Button>
        )
    }
];
