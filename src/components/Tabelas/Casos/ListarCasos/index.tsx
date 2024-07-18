import React, { useCallback, useEffect, useState } from 'react';
import { ListarCasosTableView } from './view';
import { ColunasTabelaListarCasos } from './colunas';
import { buscarCasos } from '../../../../common/api/casos/consultar-casos';
import { Caso } from '../../../../common/models/caso/caso';
import { useNavigate } from 'react-router-dom';

export default function ListarCasosTable() {
    const [casos, setCasos] = useState<Caso[]>([]);

    useEffect(() => {
        async function carregarCasos() {
            const response = await buscarCasos();
            setCasos(response);
        }

        carregarCasos();
    }, []);

    const navigate = useNavigate();

    const onRowClick = useCallback(
        (casoAtual: Caso) => {
            navigate(`/casos/${casoAtual.id}/dossie`);
        },
        [navigate]
    );

    return (
        <ListarCasosTableView
            colunas={ColunasTabelaListarCasos}
            casos={casos}
            onRowClick={onRowClick}
        />
    );
}
