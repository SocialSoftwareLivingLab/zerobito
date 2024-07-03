import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { consultarTiposNotificacoes } from '../../../../common/api/casos/notificacoes/consultar-tipos-notificacoes';
import CriarNotificacaoModalView, { CriarNotificacaoModalViewProps } from './view';

export interface CriarNotificacaoForm {
    dataEmissao: Date;
    tipoDocumento: string;
    identificador: string;
    observacao: string;
    statusNotificacao: string;
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

    const { register, handleSubmit, reset, watch, resetField } = useForm<CriarNotificacaoForm>({
        defaultValues: {
            dataEmissao: new Date(),
            tipoDocumento: '',
            identificador: '',
            observacao: '',
            statusNotificacao: 'Aguardando'
        }
    });

    const statusNotificacaoSelecionado = watch('statusNotificacao');
    const tipoNotificacaoSelecionado = watch('tipoDocumento');
    useEffect(() => {
        if (tipoNotificacaoSelecionado !== 'CAT*') {
            resetField('statusNotificacao', { defaultValue: 'Aguardando' });
        }
    }, [tipoNotificacaoSelecionado, resetField]);

    const props: CriarNotificacaoModalViewProps = {
        aberto,
        isLoadingTiposNotificacoes: isLoading,
        tiposNotificacoes,
        statusNotificacaoSelecionado,
        tipoNotificacaoSelecionado,
        handleFecharModal,
        onSubmitForm: handleSubmit(onSubmit),
        register,
        reset
    };

    return <CriarNotificacaoModalView {...props} />;
}
