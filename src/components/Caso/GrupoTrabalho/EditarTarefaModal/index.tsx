import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ConvidarMembroGrupoModalViewProps } from '../ConvidarMembroGrupoModal/view';
import EditarTarefaGrupoModalView, { EditarTarefaGrupoModalViewProps } from './view';

export interface EditarTarefaGrupoModalFormData {
    responsavel: string;
    nome: string;
    prazo: Date;
    status: string;
    comentario: string;
}

export interface EditarTarefaGrupoModalProps {
    aberto: boolean;
    handleFecharModal: () => void;
}

export default function EditarTarefaGrupoModal({
    aberto,
    handleFecharModal
}: EditarTarefaGrupoModalProps) {
    const { register, reset } = useForm<EditarTarefaGrupoModalFormData>();

    useEffect(() => {
        if (!aberto) {
            reset();
        }
    }, [aberto, reset]);

    const props: EditarTarefaGrupoModalViewProps = {
        aberto,
        handleFecharModal,
        register
    };

    return <EditarTarefaGrupoModalView {...props} />;
}
