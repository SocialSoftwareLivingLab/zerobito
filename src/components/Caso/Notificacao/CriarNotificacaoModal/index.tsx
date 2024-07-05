import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { set, useForm } from 'react-hook-form';
import { consultarTiposNotificacoes } from '../../../../common/api/casos/notificacoes/consultar-tipos-notificacoes';
import CriarNotificacaoModalView, { CriarNotificacaoModalViewProps } from './view';
import { NotificacaoCaso } from '../../../../common/models/caso/notificacao';

export interface CriarNotificacaoForm {
    dataEmissao: Date | null;
    tipoDocumento: string;
    identificador: string;
    observacao: string;
    statusNotificacao: string;
}

export interface CriarNotificacaoModalProps {
    aberto: boolean;
    handleFecharModal: () => void;
    onSubmit: (data: CriarNotificacaoForm) => Promise<void>;
    notificacao?: NotificacaoCaso | null;
}

export default function CriarNotificacaoModal({
    aberto,
    handleFecharModal,
    onSubmit,
    notificacao
}: CriarNotificacaoModalProps) {
    const { isLoading, data: tiposNotificacoes } = useQuery({
        queryKey: ['casos', 'tipos-notificacoes'],
        queryFn: () => consultarTiposNotificacoes()
    });

    const { register, handleSubmit, reset, watch, resetField, setValue } =
        useForm<CriarNotificacaoForm>({
            defaultValues: {
                dataEmissao: new Date(),
                tipoDocumento: notificacao?.tipo.nome,
                identificador: '',
                observacao: '',
                statusNotificacao: 'Aguardando'
            }
        });

    useEffect(() => {
        if (notificacao) {
            console.log(notificacao);
            setValue('dataEmissao', new Date(notificacao.dataEmissao));
            setValue('tipoDocumento', notificacao.tipo.nome);
            setValue('identificador', notificacao.identificador);
            setValue('observacao', notificacao.observacao);
            setValue('statusNotificacao', notificacao.statusNotificacao);
        }
    }, [notificacao, setValue]);

    const statusNotificacaoSelecionado = watch('statusNotificacao');
    const tipoNotificacaoSelecionado = watch('tipoDocumento');
    useEffect(() => {
        if (tipoNotificacaoSelecionado !== 'CAT*') {
            resetField('statusNotificacao', { defaultValue: 'Aguardando' });
        } else {
            setValue(
                'statusNotificacao',
                notificacao?.statusNotificacao === 'Emitida' ? 'Aplicável' : 'Não se aplica'
            );
        }
    }, [tipoNotificacaoSelecionado, notificacao, resetField, setValue]);

    useEffect(() => {
        if (statusNotificacaoSelecionado === 'Não se aplica') {
            resetField('dataEmissao', { defaultValue: null });
            resetField('identificador', { defaultValue: '' });
            resetField('observacao', { defaultValue: '' });
        }
    }, [statusNotificacaoSelecionado, resetField]);

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
