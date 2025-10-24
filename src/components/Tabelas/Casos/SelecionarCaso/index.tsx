import React, { useEffect, useState } from 'react';
import { TableColumn } from 'react-data-table-component';
import { buscarCasos } from '../../../../common/api/casos/consultar-casos';
import { Caso } from '../../../../common/models/caso/caso';
import { SelecionarCasoTableView } from './view';
import { useUsuarioAutenticado } from '../../../../contexts/usuario-autenticado';

const colunas: TableColumn<Caso>[] = [
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
    }
];

export interface SelecionarCasoTableProps {
    handleCasoSelecionado: (caso: Caso) => void;
}

export function SelecionarCasoTable({ handleCasoSelecionado }: SelecionarCasoTableProps) {
    const [casos, setCasos] = useState<Caso[]>([]);
    const { data: usuario } = useUsuarioAutenticado();

    useEffect(() => {
        async function carregar() {
            const response = await buscarCasos(usuario.id);
            setCasos(response);
        }

        carregar();
    }, [usuario.id]);

    const handleChange = ({ selectedRows }) => {
        handleCasoSelecionado(selectedRows[0]);
    };

    return <SelecionarCasoTableView casos={casos} colunas={colunas} handleChange={handleChange} />;
}
