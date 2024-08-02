import { TableColumn } from 'react-data-table-component';
import { MembroGrupoTrabalho } from '../../../../common/models/caso/grupo-trabalho/membro';

export const COLUNAS_MEMBROS_GRUPO_TRABALHO: TableColumn<MembroGrupoTrabalho>[] = [
    {
        name: 'Nome',
        selector: (sel) => sel.nome,
        sortable: true
    },
    {
        name: 'Instituição',
        selector: (sel) => 'Não informada',
        sortable: true
    },
    {
        name: 'Status',
        selector: (sel) => sel.status.nome,
        sortable: true
    },
    {
        name: 'Atribuições',
        selector: (sel) => 'Não informada',
        grow: 2,
        sortable: true
    }
];