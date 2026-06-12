import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import { Button } from '../../../ui/Button';
import Input from '../../../ui/Input';
import Modal from '../../../ui/Modal';
import TextArea from '../../../ui/TextArea';
import { EditarTarefaGrupoModalFormData } from './index';
import {
    Container,
    Header,
    Content,
    LeftColumn,
    RightColumn,
    Footer,
    StatusConclusao
} from './styles';
import { Select, SelectOption } from '../../../ui/Select';

export interface EditarTarefaGrupoModalViewProps {
    readonly aberto: boolean;
    readonly handleFecharModal: () => void;
    readonly register: UseFormRegister<EditarTarefaGrupoModalFormData>;
    readonly handleSalvar?: () => void;
}

export default function EditarTarefaGrupoModalView({
    aberto,
    handleFecharModal,
    register,
    handleSalvar
}: Readonly<EditarTarefaGrupoModalViewProps>) {
    const statusOptions = ['Em andamento', 'Atrasado', 'Concluído'];

    return (
        <Modal titulo="Editar Tarefa" aberto={aberto} handleFecharModal={handleFecharModal}>
            <Container>
                <Header>
                    <div className="titulo">Status da tarefa</div>
                    <div className="acoes">
                        <Select label="" {...register('status', { required: true })}>
                            {statusOptions.map((option) => (
                                <SelectOption key={option} label={option} value={option} />
                            ))}
                        </Select>
                        <Button type="default" action={handleFecharModal}>
                            Cancelar
                        </Button>
                        <Button type="button" action={handleSalvar}>
                            Salvar
                        </Button>
                    </div>
                </Header>

                <Content>
                    <LeftColumn>
                        <Input
                            label="Nome da tarefa"
                            placeholder="Digite alguma coisa..."
                            required
                            {...register('nome', { required: true })}
                        />
                        <Input
                            label="Responsável / Instituição"
                            placeholder="Digite alguma coisa..."
                            required
                            {...register('responsavel')}
                        />
                        <Input
                            label="Prazo da tarefa"
                            required
                            type="date"
                            {...register('prazo')}
                        />
                        <StatusConclusao>
                            <label>
                                <strong>Status de conclusão</strong>
                            </label>

                            <div className="radio-group">
                                <label>
                                    <input
                                        type="radio"
                                        value="com_exito"
                                        {...register('statusConclusao')}
                                    />
                                    Ação concluída com êxito
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        value="satisfatoria"
                                        {...register('statusConclusao')}
                                    />
                                    Ação concluída de forma satisfatória
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        value="sem_previsao"
                                        {...register('statusConclusao')}
                                    />
                                    Ação sem previsão de conclusão
                                </label>
                            </div>
                        </StatusConclusao>
                    </LeftColumn>

                    <RightColumn>
                        <TextArea
                            label="Observações"
                            placeholder="Digite alguma coisa..."
                            {...register('comentario')}
                        />
                    </RightColumn>
                </Content>

                <Footer>
                    <Button type="button" action={() => alert('Função de anexar documento')}>
                        Anexar documento
                    </Button>
                </Footer>
            </Container>
        </Modal>
    );
}
