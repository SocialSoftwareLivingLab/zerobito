import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
    editarAcao,
    EditarAcaoRequest
} from '../../../../common/api/casos/intervencao/editar-acao';
import { Button } from '../../../../components/ui/Button';
import Input from '../../../../components/ui/Input';
import Modal from '../../../../components/ui/Modal';
import TextArea from '../../../../components/ui/TextArea';
import { Select, SelectOption } from '../../../../components/ui/Select';
import Swal from 'sweetalert2';
import styled from 'styled-components';

interface EditarAcaoFormData {
    nome: string;
    responsavel: string;
    prazo: string;
    status: string;
    statusConclusao: string;
    comentario: string;
}

interface Props {
    idCaso: number;
    idAcao: number;
    aberto: boolean;
    handleFecharModal: () => void;
    onAcaoAtualizada?: () => void;
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;

const Header = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #ddd;

    .titulo {
        font-size: 1.1rem;
        font-weight: 600;
    }

    .acoes {
        display: flex;
        align-items: center;
        gap: 0.5rem;

        select {
            min-width: 150px;
        }
    }
`;

const Content = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
`;

const LeftColumn = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const RightColumn = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const Footer = styled.footer`
    display: flex;
    justify-content: flex-end;
    margin-top: 1rem;
`;

const StatusConclusao = styled.div`
    margin-top: 0.5rem;

    label {
        font-weight: 500;
        display: block;
        margin-bottom: 0.5rem;
    }

    .radio-group {
        display: flex;
        flex-direction: column;
        gap: 0.3rem;

        label {
            display: flex;
            align-items: center;
            gap: 0.4rem;
            font-weight: 400;
        }
    }
`;

const STATUS_OPTIONS = [
    { value: '1', label: 'Pendente' },
    { value: '2', label: 'Em andamento' },
    { value: '3', label: 'Atrasada' },
    { value: '4', label: 'Cancelada' },
    { value: '5', label: 'Concluída' }
];

function mapStatusConclusaoToId(value: string): number | undefined {
    switch (value) {
        case 'com_exito':
            return 1;
        case 'satisfatoria':
            return 2;
        case 'sem_previsao':
            return 3;
        default:
            return undefined;
    }
}

export default function EditarAcaoModal({
    idCaso,
    idAcao,
    aberto,
    handleFecharModal,
    onAcaoAtualizada
}: Props) {
    const { register, handleSubmit, reset } = useForm<EditarAcaoFormData>();

    useEffect(() => {
        if (!aberto) reset();
    }, [aberto, reset]);

    const onSubmit = async (data: EditarAcaoFormData) => {
        try {
            const payload: EditarAcaoRequest = {};

            if (data.nome) payload.nome = data.nome;
            if (data.prazo) payload.prazo = data.prazo;
            if (data.comentario) payload.comentario = data.comentario;

            if (data.status) {
                payload.idStatus = Number(data.status);
            }

            const idStatusConclusao = mapStatusConclusaoToId(data.statusConclusao);
            if (idStatusConclusao) {
                payload.idStatusConclusao = idStatusConclusao;
                payload.idStatus = 5; // CONCLUIDA
                payload.dataConclusao = new Date().toISOString().split('T')[0];
            }

            await editarAcao(idCaso, idAcao, payload);

            Swal.fire({
                text: 'Ação editada com sucesso!',
                icon: 'success',
                timer: 1800,
                showConfirmButton: false,
                position: 'center',
                toast: true
            });

            onAcaoAtualizada?.();
            handleFecharModal();
        } catch (error) {
            console.error('Erro ao editar ação:', error);
            Swal.fire({
                text: 'Erro ao editar ação.',
                icon: 'error',
                timer: 2000,
                showConfirmButton: false,
                position: 'center',
                toast: true
            });
        }
    };

    return (
        <Modal titulo="Editar Ação" aberto={aberto} handleFecharModal={handleFecharModal}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Container>
                    <Header>
                        <div className="titulo">Status da ação</div>
                        <div className="acoes">
                            <Select label="" {...register('status')}>
                                {STATUS_OPTIONS.map((opt) => (
                                    <SelectOption
                                        key={opt.value}
                                        label={opt.label}
                                        value={opt.value}
                                    />
                                ))}
                            </Select>
                            <Button type="default" action={handleFecharModal}>
                                Cancelar
                            </Button>
                            <Button type="submit">Salvar</Button>
                        </div>
                    </Header>

                    <Content>
                        <LeftColumn>
                            <Input
                                label="Nome da ação"
                                placeholder="Digite alguma coisa..."
                                {...register('nome')}
                            />
                            <Input
                                label="Responsável / Instituição"
                                placeholder="Digite alguma coisa..."
                                {...register('responsavel')}
                            />
                            <Input label="Prazo da ação" type="date" {...register('prazo')} />
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
            </form>
        </Modal>
    );
}
