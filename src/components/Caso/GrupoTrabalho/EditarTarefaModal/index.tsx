import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import EditarTarefaGrupoModalView from './view';
import { EditarTarefaMembroGrupo } from '../../../../common/api/casos/grupo-trabalho/editar-tarefa';

export interface EditarTarefaGrupoModalFormData {
    responsavel: string;
    nome: string;
    prazo: Date;
    status: string;
    comentario: string;
    statusConclusao: string;
}

interface Props {
    idCaso: number;
    idTarefa: number;
    aberto: boolean;
    handleFecharModal: () => void;
    onTarefaAtualizada?: () => void;
}

export default function EditarTarefaGrupoModal({
    idCaso,
    idTarefa,
    aberto,
    handleFecharModal,
    onTarefaAtualizada
}: Props) {
    const { register, handleSubmit, reset } = useForm<EditarTarefaGrupoModalFormData>();

    useEffect(() => {
        if (!aberto) reset(); // limpa quando o modal fecha
    }, [aberto, reset]);

    const onSubmit = async (data: EditarTarefaGrupoModalFormData) => {
        const sucesso = await EditarTarefaMembroGrupo(idCaso, idTarefa, {
            nome: data.nome,
            comentario: data.comentario,
            prazo: data.prazo,
            nomeMembro: data.responsavel,
            statusCodigo: mapStatusToCodigo(data.status),
            statusConclusaoCodigo: mapStatusConclusaoToCodigo(data.statusConclusao)
        });

        // Só fecha o modal se deu certo
        if (sucesso) {
            onTarefaAtualizada?.();
            handleFecharModal();
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <EditarTarefaGrupoModalView
                aberto={aberto}
                handleFecharModal={handleFecharModal}
                register={register}
                handleSalvar={handleSubmit(onSubmit)}
            />
        </form>
    );
}

// ----------------------
// Funções auxiliares
// ----------------------

function mapStatusToCodigo(status: string): string | undefined {
    switch (status?.toLowerCase()) {
        case 'em andamento':
            return 'EM_ANDAMENTO';
        case 'atrasado':
            return 'ATRASADO';
        case 'concluído':
            return 'REALIZADO';
        default:
            return undefined;
    }
}

function mapStatusConclusaoToCodigo(statusConclusao: string): string | undefined {
    switch (statusConclusao?.toLowerCase()) {
        case 'com_exito':
            return 'EXITO';
        case 'satisfatoria':
            return 'SATISFATORIO';
        case 'sem_previsao':
            return 'SEM_PREVISAO';
        default:
            return undefined;
    }
}
