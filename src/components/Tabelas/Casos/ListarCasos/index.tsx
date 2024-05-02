import React, { useEffect, useState } from 'react';
import { ListarCasosTableView } from './view';
import { ColunasTabelaListarCasos } from './colunas';
import { buscarCasos } from '../../../../common/api/casos/consultar-casos';
import { Caso } from '../../../../common/models/caso/caso';

export default function ListarCasosTable() {
    const [casos, setCasos] = useState<Caso[]>([]);

    useEffect(() => {
        async function carregarCasos() {
            const response = await buscarCasos();
            setCasos(response);
        }

        carregarCasos();
    }, []);

    return <ListarCasosTableView colunas={ColunasTabelaListarCasos} casos={casos} />;
}
