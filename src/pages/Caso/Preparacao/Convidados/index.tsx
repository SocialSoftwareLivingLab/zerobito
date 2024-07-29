import React from 'react';
import { BoxContainer } from '../../../../components/ui/BoxContainer';
import { Button } from '../../../../components/ui/Button';
import { FaUserPlus } from 'react-icons/fa6';
import DataTable, { TableColumn } from 'react-data-table-component';
import { dataTableStyle } from '../../../../components/Tabelas/custom';

type MembroType = {
    nome: string;
    instituicao: string;
    status: { nome: string; descricao: string };
    atribuicoes: string;
};

const membros: MembroType[] = [
    {
        nome: 'Leonardo Braz',
        instituicao: 'UNICAMP',
        status: {
            nome: 'Inativo',
            descricao: 'Membro do grupo de trabalho inativo para o caso atual'
        },
        atribuicoes:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, nulla omnis. Neque illum laborum impedit, officiis fugit porro est iusto praesentium accusamus et, hic, nesciunt harum reprehenderit cum natus ducimus.'
    },
    {
        nome: 'Breno França',
        instituicao: 'UNICAMP',
        status: {
            nome: 'Ativo',
            descricao: 'Membro do grupo de trabalho ativo para o caso atual'
        },
        atribuicoes:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, nulla omnis. Neque illum laborum impedit, officiis fugit porro est iusto praesentium accusamus et, hic, nesciunt harum reprehenderit cum natus ducimus.'
    },
    {
        nome: 'Henrique Manoel',
        instituicao: 'UNICAMP',
        status: {
            nome: 'Ativo',
            descricao: 'Membro do grupo de trabalho ativo para o caso atual'
        },
        atribuicoes:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, nulla omnis. Neque illum laborum impedit, officiis fugit porro est iusto praesentium accusamus et, hic, nesciunt harum reprehenderit cum natus ducimus.'
    },
    {
        nome: 'Lucas Almeida',
        instituicao: 'UNICAMP',
        status: {
            nome: 'Aguardando aceite',
            descricao: 'Aguardando o aceite para o novo membro do grupo'
        },
        atribuicoes:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, nulla omnis. Neque illum laborum impedit, officiis fugit porro est iusto praesentium accusamus et, hic, nesciunt harum reprehenderit cum natus ducimus.'
    }
];

const COLUNAS_MEMBROS_GRUPO_TRABALHO: TableColumn<MembroType>[] = [
    {
        name: 'Nome',
        selector: (sel) => sel.nome,
        sortable: true
    },
    {
        name: 'Instituição',
        selector: (sel) => sel.instituicao,
        sortable: true
    },
    {
        name: 'Status',
        selector: (sel) => sel.status.nome,
        sortable: true
    },
    {
        name: 'Atribuições',
        selector: (sel) => sel.atribuicoes,
        grow: 2,
        sortable: true
    }
];

export default function ConvidadosGrupoTrabalho() {
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
                data={membros}
                columns={COLUNAS_MEMBROS_GRUPO_TRABALHO}
                customStyles={dataTableStyle}></DataTable>
        </BoxContainer>
    );
}
