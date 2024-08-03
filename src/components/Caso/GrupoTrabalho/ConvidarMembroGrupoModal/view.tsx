import React, { useCallback, useState } from 'react';
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
    const [loading, setLoading] = useState(false);

    const onSubmitFormComReset = useCallback(
        async (evt: React.FormEvent) => {
            setLoading(true);
            evt.preventDefault();
            await onSubmitForm();
            setLoading(false);
        },
        [onSubmitForm]
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
                        required
                        {...register('email', { required: true })}
                    />
                    <Input
                        label="Nome completo"
                        placeholder="Fulano da Silva"
                        required
                        {...register('nome', { required: true })}
                    />
                    <TextArea
                        label="Motivo"
                        placeholder="Informe o motivo do convite aqui"
                        required
                        {...register('motivo', { required: true })}
                    />
                    <footer>
                        <Button type="default" action={() => handleFecharModal()}>
                            Cancelar
                        </Button>
                        <Button type="submit" loading={loading}>
                            Convidar
                        </Button>
                    </footer>
                </form>
            </Container>
        </Modal>
    );
}
