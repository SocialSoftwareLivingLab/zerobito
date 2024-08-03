import React, { useCallback } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { Button } from '../../../ui/Button';
import Input from '../../../ui/Input';
import Modal from '../../../ui/Modal';
import TextArea from '../../../ui/TextArea';
import { ConvidarMembroGrupoFormData } from './index';
import { Container } from './styles';

export interface ConvidarMembroGrupoModalViewProps {
    aberto: boolean;
    handleFecharModal: () => void;
    onSubmitForm: () => Promise<void>;
    register: UseFormRegister<ConvidarMembroGrupoFormData>;
}

export default function ConvidarMembroGrupoModalView({
    aberto,
    handleFecharModal,
    onSubmitForm,
    register
}: ConvidarMembroGrupoModalViewProps) {
    const onSubmitFormComReset = useCallback(
        async (evt: React.FormEvent) => {
            evt.preventDefault();
            await onSubmitForm();
            handleFecharModal();
        },
        [onSubmitForm, handleFecharModal]
    );

    return (
        <Modal titulo="Convite profissional" aberto={aberto} handleFecharModal={handleFecharModal}>
            <span>
                Informe os dados do profissional que deseja convidar para o grupo de trabalho do
                caso
            </span>

            <Container>
                <form onSubmit={onSubmitFormComReset}>
                    <Input
                        label="E-mail"
                        placeholder="fulano@mail.com"
                        type="email"
                        {...register('email', { required: true })}
                    />
                    <Input
                        label="Nome completo"
                        placeholder="Fulano da Silva"
                        {...register('nome', { required: true })}
                    />
                    <TextArea
                        label="Motivo"
                        placeholder="Informe o motivo do convite aqui"
                        {...register('motivo', { required: true })}
                    />
                    <footer>
                        <Button type="default" action={() => handleFecharModal()}>
                            Cancelar
                        </Button>
                        <Button type="submit">Convidar</Button>
                    </footer>
                </form>
            </Container>
        </Modal>
    );
}
