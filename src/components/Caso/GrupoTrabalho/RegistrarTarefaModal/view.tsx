import React, { useCallback, useState } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { Button } from '../../../ui/Button';
import Input from '../../../ui/Input';
import Modal from '../../../ui/Modal';
import TextArea from '../../../ui/TextArea';
import { RegistrarTarefaGrupoModalFormData } from './index';
import { Container } from './styles';
import Swal from 'sweetalert2';

export interface RegistrarTarefaGrupoModalViewProps {
    aberto: boolean;
    handleFecharModal: () => void;
    register: UseFormRegister<RegistrarTarefaGrupoModalFormData>;
    onSubmitForm: (e?: React.BaseSyntheticEvent) => Promise<void>;
}

export default function RegistrarTarefaGrupoModalView({
    aberto,
    handleFecharModal,
    register,
    onSubmitForm
}: RegistrarTarefaGrupoModalViewProps) {
    const [loading, setLoading] = useState(false);

    const onSubmitFormComReset = useCallback(
        async (evt?: React.BaseSyntheticEvent) => {
            setLoading(true);

            try {
                await onSubmitForm(evt);
            } catch (error: unknown) {
                console.error('Erro ao registrar tarefa:', error);

                if (typeof error === 'object' && error !== null && 'response' in error) {
                    const err = error as { response?: { statusText?: string } };

                    if (err.response?.statusText === 'Not Found') {
                        Swal.fire({
                            text: 'Membro não encontrado no caso. Por favor, revise as informações.',
                            icon: 'error',
                            timer: 2000,
                            showConfirmButton: false,
                            position: 'center',
                            toast: true
                        });
                    }
                }
            } finally {
                setLoading(false);
            }
        },
        [onSubmitForm]
    );

    return (
        <Modal titulo="Registrar Tarefa" aberto={aberto} handleFecharModal={handleFecharModal}>
            <Container>
                <form onSubmit={onSubmitFormComReset}>
                    <Input
                        label="Nome do responsável"
                        placeholder="Fulano da Silva"
                        type="text"
                        required
                        {...register('responsavel', { required: true })}
                    />

                    <Input
                        label="Nome da tarefa"
                        placeholder="Tarefa ..."
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
