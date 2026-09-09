import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { FaDownload, FaTrash, FaUpload } from 'react-icons/fa';
import Swal from 'sweetalert2';
import styled from 'styled-components';
import {
    listarArquivosCaso,
    uploadArquivoCaso,
    downloadArquivoCaso,
    removerArquivoCaso,
    ArquivoCaso
} from '../../../../common/api/casos/arquivos-caso';

const LIMITE_ARQUIVOS = 10;
const LIMITE_MB = 50;
const INPUT_ID = 'upload-arquivo-caso';

const Lista = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const Item = styled.li`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.6rem 1rem;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    font-size: 0.9rem;

    .info {
        display: flex;
        flex-direction: column;
        gap: 0.1rem;
    }

    .nome {
        color: #134780;
        font-weight: 500;
    }

    .meta {
        font-size: 0.78rem;
        color: #94a3b8;
    }

    .acoes {
        display: flex;
        gap: 0.5rem;
        align-items: center;
    }

    .btn-icone {
        background: none;
        border: none;
        cursor: pointer;
        padding: 0.35rem;
        border-radius: 4px;
        color: #64748b;
        display: flex;
        align-items: center;
        &:hover {
            color: #134780;
            background: #f1f5f9;
        }
        &.remover:hover {
            color: #dc2626;
            background: #fef2f2;
        }
        &:disabled {
            opacity: 0.5;
            cursor: default;
        }
    }
`;

const LabelUpload = styled.label<{ $desabilitado: boolean }>`
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.4rem 0.9rem;
    border-radius: 6px;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: ${({ $desabilitado }) => ($desabilitado ? 'not-allowed' : 'pointer')};
    opacity: ${({ $desabilitado }) => ($desabilitado ? 0.6 : 1)};
    background-color: #134780;
    color: #fff;
    border: none;
    user-select: none;
    &:hover {
        background-color: ${({ $desabilitado }) => ($desabilitado ? '#134780' : '#0f3660')};
    }
`;

const Contador = styled.span`
    font-size: 0.8rem;
    color: #64748b;
`;

const Vazio = styled.p`
    color: #94a3b8;
    font-size: 0.9rem;
    margin: 0.5rem 0;
`;

function formatarTamanho(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function resetarInput() {
    const el = document.getElementById(INPUT_ID) as HTMLInputElement | null;
    if (el) el.value = '';
}

interface Props {
    idCaso: number;
}

export default function ArquivosCaso({ idCaso }: Props) {
    const queryClient = useQueryClient();
    const [enviando, setEnviando] = useState(false);
    const [baixando, setBaixando] = useState<string | null>(null);

    const { data: arquivos = [], isLoading } = useQuery<ArquivoCaso[]>({
        queryKey: ['arquivos-caso', idCaso],
        queryFn: () => listarArquivosCaso(idCaso)
    });

    const invalidar = () => queryClient.invalidateQueries({ queryKey: ['arquivos-caso', idCaso] });

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > LIMITE_MB * 1024 * 1024) {
            Swal.fire({
                text: `O arquivo excede o limite de ${LIMITE_MB} MB.`,
                icon: 'warning',
                confirmButtonText: 'Ok'
            });
            resetarInput();
            return;
        }

        if (arquivos.length >= LIMITE_ARQUIVOS) {
            Swal.fire({
                text: `Limite de ${LIMITE_ARQUIVOS} arquivos por caso atingido.`,
                icon: 'warning',
                confirmButtonText: 'Ok'
            });
            resetarInput();
            return;
        }

        try {
            setEnviando(true);
            await uploadArquivoCaso(idCaso, file);
            await invalidar();
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
            resetarInput();
        }
    };

    const handleDownload = async (arquivo: ArquivoCaso) => {
        if (baixando) return;
        try {
            setBaixando(arquivo.id);
            await downloadArquivoCaso(idCaso, arquivo.id, arquivo.filename);
        } catch (err) {
            console.error(err);
            Swal.fire({
                text: 'Erro ao baixar arquivo.',
                icon: 'error',
                timer: 3000,
                showConfirmButton: false
            });
        } finally {
            setBaixando(null);
        }
    };

    const handleRemover = async (arquivo: ArquivoCaso) => {
        const result = await Swal.fire({
            text: `Remover "${arquivo.filename}"?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Remover',
            cancelButtonText: 'Cancelar'
        });
        if (!result.isConfirmed) return;

        try {
            await removerArquivoCaso(idCaso, arquivo.id);
            await invalidar();
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

    const desabilitarUpload = enviando || arquivos.length >= LIMITE_ARQUIVOS;

    return (
        <div>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    marginBottom: '0.75rem'
                }}>
                <input
                    id={INPUT_ID}
                    type="file"
                    style={{ display: 'none' }}
                    onChange={handleUpload}
                    disabled={desabilitarUpload}
                />
                <LabelUpload
                    htmlFor={desabilitarUpload ? undefined : INPUT_ID}
                    $desabilitado={desabilitarUpload}>
                    <FaUpload />
                    {enviando ? 'Enviando...' : 'Anexar arquivo'}
                </LabelUpload>
                <Contador>
                    {arquivos.length}/{LIMITE_ARQUIVOS} arquivos
                </Contador>
            </div>

            {isLoading ? (
                <p>Carregando...</p>
            ) : arquivos.length === 0 ? (
                <Vazio>Nenhum arquivo anexado ao caso.</Vazio>
            ) : (
                <Lista>
                    {arquivos.map((a) => (
                        <Item key={a.id}>
                            <div className="info">
                                <span className="nome">{a.filename}</span>
                                <span className="meta">{formatarTamanho(a.size)}</span>
                            </div>
                            <div className="acoes">
                                <button
                                    className="btn-icone"
                                    onClick={() => handleDownload(a)}
                                    disabled={baixando === a.id}
                                    title="Baixar">
                                    <FaDownload />
                                </button>
                                <button
                                    className="btn-icone remover"
                                    onClick={() => handleRemover(a)}
                                    disabled={!!baixando}
                                    title="Remover">
                                    <FaTrash />
                                </button>
                            </div>
                        </Item>
                    ))}
                </Lista>
            )}
        </div>
    );
}
