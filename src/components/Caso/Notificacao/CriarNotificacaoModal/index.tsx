import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import { consultarTiposNotificacoes } from '../../../../common/api/casos/notificacoes/consultar-tipos-notificacoes';
import CriarNotificacaoModalView, { CriarNotificacaoModalViewProps } from './view';

export interface CriarNotificacaoForm {
    dataEmissao: Date;
    tipoDocumento: string;
    identificador: string;
    observacao: string;
}

export interface CriarNotificacaoModalProps {
    aberto: boolean;
    handleFecharModal: () => void;
    onSubmit: (data: CriarNotificacaoForm) => Promise<void>;
}

export default function CriarNotificacaoModal({
    aberto,
    handleFecharModal,
    onSubmit
}: CriarNotificacaoModalProps) {
    const { isLoading, data: tiposNotificacoes } = useQuery({
        queryKey: ['casos', 'tipos-notificacoes'],
        queryFn: () => consultarTiposNotificacoes()
    });

    const { register, handleSubmit, reset } = useForm<CriarNotificacaoForm>({
        defaultValues: {
            dataEmissao: new Date(),
            tipoDocumento: '',
            identificador: '',
            observacao: ''
        }
    });

    const props: CriarNotificacaoModalViewProps = {
        aberto,
        isLoadingTiposNotificacoes: isLoading,
        tiposNotificacoes,
        handleFecharModal,
        onSubmitForm: handleSubmit(onSubmit),
        register,
        reset
    };

    return <CriarNotificacaoModalView {...props} />;
}
