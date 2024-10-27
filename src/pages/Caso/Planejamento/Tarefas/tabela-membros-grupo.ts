import { TableColumn } from 'react-data-table-component';
import { MembroGrupoTrabalho } from '../../../../common/models/caso/grupo-trabalho/membro';
import { AcoesLinha } from '.';

export const COLUNAS_MEMBROS_GRUPO_TRABALHO: TableColumn<MembroGrupoTrabalho>[] = [
    {
        name: 'Nome',
        selector: (sel) => sel.nome,
        sortable: true
    },
    {
        name: 'Atribuições',
        selector: (sel) => 'Não informada',
        sortable: true
    }
];
