import React, { useCallback } from 'react';
import Modal from '../../../ui/Modal';
import { UseFormRegister } from 'react-hook-form';
import { CriarNotificacaoForm } from '.';
import Input from '../../../ui/Input';
import { Select, SelectOption } from '../../../ui/Select';
import TextArea from '../../../ui/TextArea';
import { TipoNotificacao } from '../../../../common/models/caso/notificacao';
import { CriarNotificacaoModalContainer } from './styles';
import { Button } from '../../../ui/Button';

export interface CriarNotificacaoModalViewProps {
    aberto: boolean;
    isLoadingTiposNotificacoes: boolean;
    tiposNotificacoes: TipoNotificacao[];
    handleFecharModal: () => void;
    onSubmitForm: () => Promise<void>;
    reset: () => void;
    register: UseFormRegister<CriarNotificacaoForm>;
}

export default function CriarNotificacaoModalView({
    aberto,
    isLoadingTiposNotificacoes,
    tiposNotificacoes,
    handleFecharModal,
    onSubmitForm,
    register,
    reset
}: CriarNotificacaoModalViewProps) {
    const onSubmitFormComReset = useCallback(
        async (evt: React.FormEvent) => {
            evt.preventDefault();
            await onSubmitForm();
            reset();
            handleFecharModal();
        },
        [onSubmitForm, reset, handleFecharModal]
    );

    return (
        <Modal
            titulo="Emitir/Atualizar notificação existente"
            aberto={aberto}
            handleFecharModal={handleFecharModal}>
            {isLoadingTiposNotificacoes && <p>Carregando...</p>}
            {!isLoadingTiposNotificacoes && (
                <>
                    <span>Informe os dados da notificação para prosseguir</span>

                    <CriarNotificacaoModalContainer>
                        <form onSubmit={onSubmitFormComReset}>
                            <Input
                                label="Data Emissao"
                                placeholder="Selecione a data de emissão"
                                type="date"
                                {...register('dataEmissao', { required: true })}
                            />

                            <Input
                                label="Identificador"
                                placeholder="Informe o identificador da notificação"
                                {...register('identificador', { required: true })}
                            />

                            <Select
                                label="Tipo de Notificação"
                                {...register('tipoDocumento', { required: true })}>
                                <SelectOption label="Selecione..." disabled />
                                {tiposNotificacoes
                                    .filter((tipo) => tipo.nome !== 'CAT*')
                                    .map((tipo) => (
                                        <SelectOption
                                            key={tipo.id}
                                            label={tipo.nome}
                                            value={tipo.nome}
                                        />
                                    ))}
                            </Select>

                            <TextArea
                                label="Observação"
                                placeholder="Informe uma observação sobre a notificação"
                                {...register('observacao')}
                            />
                            <footer>
                                <Button type="submit">Cadastrar</Button>
                            </footer>
                        </form>
                    </CriarNotificacaoModalContainer>
                </>
            )}
        </Modal>
    );
}
