import React, { useCallback, useEffect } from 'react';
import { useForm, UseFormRegister } from 'react-hook-form';
import RegistrarTarefaGrupoModalView, { RegistrarTarefaGrupoModalViewProps } from './view';

export interface RegistrarTarefaGrupoModalFormData {
    responsavel: string;
    nome: string;
    prazo: Date;
    comentario: string;
}

export interface RegistrarTarefaGrupoModalProps {
    aberto: boolean;
    handleFecharModal: () => void;
    onSubmit: (data: RegistrarTarefaGrupoModalFormData) => Promise<void>;
}

export default function RegistrarTarefaGrupoModal({
    aberto,
    handleFecharModal,
    onSubmit
}: RegistrarTarefaGrupoModalProps) {
    const { register, reset, handleSubmit } = useForm<RegistrarTarefaGrupoModalFormData>();

    useEffect(() => {
        if (!aberto) {
            reset();
        }
    }, [aberto, reset]);

    const props: RegistrarTarefaGrupoModalViewProps = {
        aberto,
        handleFecharModal,
        onSubmitForm: handleSubmit(onSubmit),
        register
    };

    return <RegistrarTarefaGrupoModalView {...props} />;
}
