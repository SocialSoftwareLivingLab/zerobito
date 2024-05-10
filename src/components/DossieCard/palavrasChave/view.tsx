import React, { KeyboardEventHandler } from 'react';
import { IoMdAddCircle } from 'react-icons/io';
import { PalavraChaveCaso } from '../../../common/models/caso/palavra-chave';
import PalavraChave from '../../ui/PalavraChave';
import { PalavrasFormData } from './model';
import { UseFormRegister } from 'react-hook-form';

export interface PalavrasDossieViewProps {
    palavras: PalavraChaveCaso[];
    isModoAdicionarPalavra: boolean;
    setModoAdicionarPalavra: (value: boolean) => void;
    excluirPalavra: (id: number) => void;
    handleSubmit: (e: React.FormEvent) => void;
    register: UseFormRegister<PalavrasFormData>;
    onEnterPress: KeyboardEventHandler<HTMLInputElement>;
}

export function PalavrasDossieView({
    palavras,
    isModoAdicionarPalavra,
    setModoAdicionarPalavra,
    excluirPalavra,
    handleSubmit,
    register,
    onEnterPress
}: PalavrasDossieViewProps) {
    return (
        <div className="chave">
            {palavras.map((palavra) => (
                <PalavraChave
                    key={palavra.id}
                    label={palavra.valor}
                    removeHandle={() => excluirPalavra(palavra.id)}
                />
            ))}
            <div className="add">
                <IoMdAddCircle onClick={() => setModoAdicionarPalavra(true)} />
            </div>
            {isModoAdicionarPalavra && (
                <form onSubmit={handleSubmit}>
                    <input {...register('palavra')} onKeyDown={onEnterPress} />
                </form>
            )}
        </div>
    );
}
