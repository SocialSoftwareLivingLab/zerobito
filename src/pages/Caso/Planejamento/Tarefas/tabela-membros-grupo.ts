import { TableColumn } from 'react-data-table-component';
import { MembroGrupoTrabalho } from '../../../../common/models/caso/grupo-trabalho/membro';
import { MembroGrupo } from '.';

export const COLUNAS_MEMBROS_GRUPO_TRABALHO: TableColumn<MembroGrupo>[] = [
    {
        name: 'Nome',
        selector: (sel) => sel.nome,
        sortable: true
    },
    {
        name: 'Instituições',
        selector: (sel) => 'Não informada',
        sortable: true
    },
    {
        name: 'Status',
        selector: (sel) => sel.status.nome,
        sortable: true
    },
    {
        name: 'Tarefas',
        selector: (sel) => sel.tarefasCount?.toString() || '0', // Use tarefasCount or fallback to '0'
        sortable: true
    }
];
