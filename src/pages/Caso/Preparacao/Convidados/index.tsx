import React from 'react';
import { BoxContainer } from '../../../../components/ui/BoxContainer';
import { Button } from '../../../../components/ui/Button';
import { FaUserPlus } from 'react-icons/fa6';
import DataTable, { TableColumn } from 'react-data-table-component';
import { dataTableStyle } from '../../../../components/Tabelas/custom';
import { COLUNAS_MEMBROS_GRUPO_TRABALHO } from './tabela-membros-grupo';

import { useQuery } from '@tanstack/react-query';

import { useCasoSelecionado } from '../../../../contexts/caso-selecionado';
import { buscarMembrosGrupo } from '../../../../common/api/casos/grupo-trabalho/consultar-membros-grupo';

export default function ConvidadosGrupoTrabalho() {
    const { caso } = useCasoSelecionado();

    const { data, isLoading } = useQuery({
        queryKey: ['casos', 'membros-grupo-trabalho'],
        queryFn: () => buscarMembrosGrupo(caso.id)
    });

    return (
        <BoxContainer
            titulo="Convidados"
            acoesContainer={() => (
                <Button>
                    <FaUserPlus />
                    Convidar
                </Button>
            )}>
            <DataTable
                data={data ?? []}
                progressPending={isLoading}
                progressComponent="Carregando..."
                noDataComponent="Nenhum membro foi encontrado"
                columns={COLUNAS_MEMBROS_GRUPO_TRABALHO}
                customStyles={dataTableStyle}></DataTable>
        </BoxContainer>
    );
}
