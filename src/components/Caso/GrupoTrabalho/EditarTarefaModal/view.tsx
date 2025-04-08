import React, { useCallback, useState } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { Button } from '../../../ui/Button';
import Input from '../../../ui/Input';
import Modal from '../../../ui/Modal';
import TextArea from '../../../ui/TextArea';
import { EditarTarefaGrupoModalFormData } from './index';
import { Container } from './styles';
import { Select, SelectOption } from '../../../ui/Select';

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
    const options = ['Em andamento', 'Atrasado', 'Concluído'];
    const label = 'status';
    return (
        <Modal titulo="Editar Tarefa" aberto={aberto} handleFecharModal={handleFecharModal}>
            <Container>
                <Input
                    label="Nome tarefa"
                    placeholder=""
                    required
                    {...register('nome', { required: true })}
                />
                <Select label={label} {...register}>
                    {options.map((option) => (
                        <SelectOption key={option} label={option} value={option} />
                    ))}
                </Select>
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
