import React, { useCallback, useState } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { Button } from '../../../ui/Button';
import Input from '../../../ui/Input';
import Modal from '../../../ui/Modal';
import TextArea from '../../../ui/TextArea';
import { EditarTarefaGrupoModalFormData } from './index';
import { Container } from './styles';

export interface EditarTarefaGrupoModalViewProps {
    aberto: boolean;
    handleFecharModal: () => void;
    register: UseFormRegister<EditarTarefaGrupoModalFormData>;
}

export default function EditarTarefaGrupoModalView({
    aberto,
    handleFecharModal,
    register
}: EditarTarefaGrupoModalViewProps) {
    return (
        <Modal titulo="Editar Tarefa" aberto={aberto} handleFecharModal={handleFecharModal}>
            <Container>
                <Input
                    label="Nome completo"
                    placeholder="Fulano da Silva"
                    required
                    {...register('nome', { required: true })}
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
                    <Button type="default" action={() => handleFecharModal()}>
                        Convidar
                    </Button>
                </footer>
            </Container>
        </Modal>
    );
}
