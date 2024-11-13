import React, { useCallback, useState } from 'react';
import { BoxContainer } from '../../../../components/ui/BoxContainer';
import { Button } from '../../../../components/ui/Button';
import { FaUserPlus } from 'react-icons/fa6';
import DataTable, { TableColumn } from 'react-data-table-component';
import { dataTableStyle } from '../../../../components/Tabelas/custom';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useCasoSelecionado } from '../../../../contexts/caso-selecionado';
import { buscarMembrosGrupo } from '../../../../common/api/casos/grupo-trabalho/consultar-membros-grupo';
import ConvidarMembroGrupoModal, {
    ConvidarMembroGrupoFormData
} from '../../../../components/Caso/GrupoTrabalho/ConvidarMembroGrupoModal';
import { enviarConviteMembroGrupo } from '../../../../common/api/casos/grupo-trabalho/enviar-convite';
import Swal from 'sweetalert2';
import { COLUNAS_MEMBROS_GRUPO_TRABALHO } from './tabela-membros-grupo';
import { MembroGrupoTrabalho } from '../../../../common/models/caso/grupo-trabalho/membro';
import { ColunaAcao } from './styles';

export function AcoesLinha({ row }: { row: MembroGrupoTrabalho }) {
    return (
        <ColunaAcao>
            <Button>Aceitar</Button>
        </ColunaAcao>
    );
}

export default function AtasAnteriores() {
    const { caso } = useCasoSelecionado();

    const { data, isLoading } = useQuery({
        queryKey: ['casos', 'membros-grupo-trabalho'],
        queryFn: () => buscarMembrosGrupo(caso.id)
    });

    return (
        <BoxContainer titulo="Atas Anteriores">
            <DataTable
                data={data ?? []}
                progressPending={isLoading}
                progressComponent="Carregando..."
                noHeader
                noTableHead
                noDataComponent="Nenhum membro foi encontrado"
                columns={COLUNAS_MEMBROS_GRUPO_TRABALHO}
                customStyles={dataTableStyle}></DataTable>
        </BoxContainer>
    );
}
