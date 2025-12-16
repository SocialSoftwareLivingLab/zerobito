import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../../../../components/ui/Button';
import Input from '../../../../components/ui/Input';
import Modal from '../../../../components/ui/Modal';
import TextArea from '../../../../components/ui/TextArea';
import styled from 'styled-components';

export interface RegistrarAcaoFormData {
    responsavel: string;
    nome: string;
    prazo: string;
    comentario: string;
}

interface Props {
    aberto: boolean;
    handleFecharModal: () => void;
    onSubmit: (data: RegistrarAcaoFormData) => Promise<void>;
}

const Container = styled.div`
    form > div {
        margin-left: 0;
        margin-right: 0;
    }

    footer {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }
`;

export default function RegistrarAcaoModal({ aberto, handleFecharModal, onSubmit }: Props) {
    const { register, reset, handleSubmit } = useForm<RegistrarAcaoFormData>();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!aberto) reset();
    }, [aberto, reset]);

    const onSubmitForm = useCallback(
        async (evt: React.FormEvent) => {
            evt.preventDefault();
            setLoading(true);
            try {
                await handleSubmit(onSubmit)();
            } catch (error) {
                console.error('Erro ao registrar ação:', error);
            } finally {
                setLoading(false);
            }
        },
        [handleSubmit, onSubmit]
    );

    return (
        <Modal titulo="Registrar Ação" aberto={aberto} handleFecharModal={handleFecharModal}>
            <Container>
                <form onSubmit={onSubmitForm}>
                    <Input
                        label="Nome do responsável"
                        placeholder="Fulano da Silva"
                        type="text"
                        required
                        {...register('responsavel', { required: true })}
                    />
                    <Input
                        label="Nome da ação"
                        placeholder="Ação ..."
                        type="text"
                        required
                        {...register('nome', { required: true })}
                    />
                    <Input
                        label="Prazo"
                        type="date"
                        required
                        {...register('prazo', { required: true })}
                    />
                    <TextArea
                        label="Comentários"
                        placeholder="Digite alguma coisa..."
                        required
                        {...register('comentario', { required: true })}
                    />
                    <footer>
                        <Button type="default" action={() => handleFecharModal()}>
                            Cancelar
                        </Button>
                        <Button type="submit" loading={loading}>
                            Registrar
                        </Button>
                    </footer>
                </form>
            </Container>
        </Modal>
    );
}
