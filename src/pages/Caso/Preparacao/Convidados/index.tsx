import React, { useState } from 'react';
import { BoxContainer } from '../../../../components/ui/BoxContainer';
import { Button } from '../../../../components/ui/Button';
import { FaUserPlus } from 'react-icons/fa6';
import DataTable from 'react-data-table-component';
import { dataTableStyle } from '../../../../components/Tabelas/custom';
import { COLUNAS_MEMBROS_GRUPO_TRABALHO, TIPOS_STATUS } from './tabela-membros-grupo';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useCasoSelecionado } from '../../../../contexts/caso-selecionado';
import { buscarMembrosGrupo } from '../../../../common/api/casos/grupo-trabalho/consultar-membros-grupo';
import ConvidarMembroGrupoModal, {
    ConvidarMembroGrupoFormData
} from '../../../../components/Caso/GrupoTrabalho/ConvidarMembroGrupoModal';
import { enviarConviteMembroGrupo } from '../../../../common/api/casos/grupo-trabalho/enviar-convite';
import Badge from '../../../../components/ui/Badge';

export function BadgeStatusTarefa({ status }: { status: string | null }) {
    const tipo = TIPOS_STATUS[status];
    return status && <Badge texto={tipo.label} type={tipo.type} />;
}

export default function ConvidadosGrupoTrabalho() {
    const { caso } = useCasoSelecionado();

    const coordenador = caso.coordenador.nome;

    const { data, isLoading } = useQuery({
        queryKey: ['casos', 'membros-grupo-trabalho'],
        queryFn: () => buscarMembrosGrupo(caso.id)
    });

    const queryClient = useQueryClient();

    const enviarConviteMutation = useMutation({
        mutationFn: (data: ConvidarMembroGrupoFormData) => {
            return enviarConviteMembroGrupo(caso.id, {
                motivo: data.motivo,
                convidado: {
                    instituicao: data.instituicao,
                    nome: data.nome,
                    email: data.email
                }
            });
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['casos', 'membros-grupo-trabalho'] });
            setModalConvidarAberto(false);
        }
    });

    const [isModalConvidarAberto, setModalConvidarAberto] = useState(false);

    const membrosComNomeModificado = (data ?? []).map((membro) => ({
        ...membro,
        nome: membro.nome === coordenador ? `* ${membro.nome}` : membro.nome
    }));

    return (
        <BoxContainer
            titulo="Convidados"
            acoesContainer={() => (
                <Button action={() => setModalConvidarAberto(true)}>
                    <FaUserPlus />
                    Convidar
                </Button>
            )}>
            <DataTable
                data={membrosComNomeModificado}
                progressPending={isLoading}
                progressComponent="Carregando..."
                noDataComponent="Nenhum membro foi encontrado"
                columns={COLUNAS_MEMBROS_GRUPO_TRABALHO}
                customStyles={dataTableStyle}></DataTable>
            <span style={{ marginTop: '20px', display: 'inline-block' }}>
                * Coordenador do Caso
            </span>
            <ConvidarMembroGrupoModal
                aberto={isModalConvidarAberto}
                handleFecharModal={() => setModalConvidarAberto(false)}
                onSubmit={(data) => enviarConviteMutation.mutateAsync(data)}
            />
        </BoxContainer>
    );
}
