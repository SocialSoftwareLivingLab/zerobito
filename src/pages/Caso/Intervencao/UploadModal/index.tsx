import React, { useRef, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Modal from '../../../../components/ui/Modal';
import { Button } from '../../../../components/ui/Button';
import {
    listarAnexosIntervencao,
    uploadAnexoIntervencao,
    removerAnexoIntervencao
} from '../../../../common/api/casos/intervencao/anexos-intervencao';
import Swal from 'sweetalert2';
import styled from 'styled-components';

interface Props {
    aberto: boolean;
    onFechar: () => void;
    idCaso: number;
    idIntervencao: number;
}

const AnexoLista = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0 0 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const AnexoItem = styled.li`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 0.75rem;
    border: 1px solid #e2e8f0;
    border-radius: 4px;
    font-size: 0.9rem;

    .nome {
        color: #134780;
        text-decoration: none;
        &:hover {
            text-decoration: underline;
        }
    }

    .remover {
        background: none;
        border: none;
        cursor: pointer;
        color: #dc2626;
        font-size: 0.85rem;
        &:hover {
            text-decoration: underline;
        }
    }
`;

export default function UploadModal({ aberto, onFechar, idCaso, idIntervencao }: Props) {
    const queryClient = useQueryClient();
    const inputRef = useRef<HTMLInputElement>(null);
    const [enviando, setEnviando] = useState(false);

    const { data: anexos = [], isLoading } = useQuery({
        queryKey: ['anexos-intervencao', idCaso, idIntervencao],
        queryFn: () => listarAnexosIntervencao(idCaso, idIntervencao),
        enabled: aberto
    });

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setEnviando(true);
            await uploadAnexoIntervencao(idCaso, idIntervencao, file);
            await queryClient.invalidateQueries({
                queryKey: ['anexos-intervencao', idCaso, idIntervencao]
            });
        } catch (err) {
            console.error(err);
            Swal.fire({
                text: 'Erro ao enviar arquivo.',
                icon: 'error',
                timer: 3000,
                showConfirmButton: false
            });
        } finally {
            setEnviando(false);
            if (inputRef.current) inputRef.current.value = '';
        }
    };

    const handleRemover = async (arquivoId: string) => {
        const result = await Swal.fire({
            text: 'Remover este anexo?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Remover',
            cancelButtonText: 'Cancelar'
        });

        if (!result.isConfirmed) return;

        try {
            await removerAnexoIntervencao(idCaso, idIntervencao, arquivoId);
            await queryClient.invalidateQueries({
                queryKey: ['anexos-intervencao', idCaso, idIntervencao]
            });
        } catch (err) {
            console.error(err);
            Swal.fire({
                text: 'Erro ao remover arquivo.',
                icon: 'error',
                timer: 3000,
                showConfirmButton: false
            });
        }
    };

    return (
        <Modal titulo="Documentos da Intervenção" aberto={aberto} handleFecharModal={onFechar}>
            {isLoading ? (
                <p>Carregando...</p>
            ) : anexos.length === 0 ? (
                <p style={{ color: '#64748b', marginBottom: '1rem' }}>Nenhum documento anexado.</p>
            ) : (
                <AnexoLista>
                    {(anexos as { id: string; nomeOriginal?: string }[]).map((a) => (
                        <AnexoItem key={a.id}>
                            <span className="nome">{a.nomeOriginal ?? a.id}</span>
                            <button className="remover" onClick={() => handleRemover(a.id)}>
                                Remover
                            </button>
                        </AnexoItem>
                    ))}
                </AnexoLista>
            )}

            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <input
                    ref={inputRef}
                    type="file"
                    style={{ display: 'none' }}
                    onChange={handleUpload}
                />
                <Button action={() => inputRef.current?.click()} disabled={enviando}>
                    {enviando ? 'Enviando...' : '+ Anexar documento'}
                </Button>
            </div>
        </Modal>
    );
}
