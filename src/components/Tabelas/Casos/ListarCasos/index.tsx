import React, { useCallback, useEffect, useState } from 'react';
import { ListarCasosTableView } from './view';
import { ColunasTabelaListarCasos } from './colunas';
import { buscarCasos } from '../../../../common/api/casos/consultar-casos';
import { Caso } from '../../../../common/models/caso/caso';
import { useNavigate } from 'react-router-dom';
import { useUsuarioAutenticado } from '../../../../contexts/usuario-autenticado';

export default function ListarCasosTable() {
    const [casos, setCasos] = useState<Caso[]>([]);

    const { data: usuario } = useUsuarioAutenticado();

    useEffect(() => {
        console.log(usuario);
        async function carregarCasos() {
            if (!usuario?.id) return;

            try {
                const response = await buscarCasos(usuario.id);
                if (response) setCasos(response);
            } catch (error) {
                console.error('Erro ao buscar casos:', error);
            }
        }

        carregarCasos();
    }, [usuario.id]);

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
