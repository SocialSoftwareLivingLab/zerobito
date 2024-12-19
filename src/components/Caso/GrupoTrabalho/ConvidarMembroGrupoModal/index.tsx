import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import ConvidarMembroGrupoModalView, { ConvidarMembroGrupoModalViewProps } from './view';

export interface ConvidarMembroGrupoFormData {
    motivo: string;
    nome: string;
    email: string;
}

export interface ConvidarMembroGrupoModalProps {
    aberto: boolean;
    handleFecharModal: () => void;
    onSubmit: (data: ConvidarMembroGrupoFormData) => Promise<void>;
}

export default function ConvidarMembroGrupoModal({
    aberto,
    handleFecharModal,
    onSubmit
}: ConvidarMembroGrupoModalProps) {
    const { register, handleSubmit, reset } = useForm<ConvidarMembroGrupoFormData>();

    useEffect(() => {
        if (!aberto) {
            reset();
        }
    }, [aberto, reset]);

    const props: ConvidarMembroGrupoModalViewProps = {
        aberto,
        handleFecharModal,
        onSubmitForm: handleSubmit(onSubmit),
        register
    };

    return <ConvidarMembroGrupoModalView {...props} />;
}