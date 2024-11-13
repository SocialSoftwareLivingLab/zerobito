import { TableColumn } from 'react-data-table-component';
import { AcoesLinha } from '.';
import { MembroGrupoTrabalho } from '../../../../../common/models/caso/grupo-trabalho/membro';

export const COLUNAS_MEMBROS: TableColumn<MembroGrupoTrabalho>[] = [
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
