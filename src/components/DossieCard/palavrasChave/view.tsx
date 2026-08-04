import React, { KeyboardEventHandler } from 'react';
import { IoMdAddCircle } from 'react-icons/io';
import { PalavraChaveCaso } from '../../../common/models/caso/palavra-chave';
import PalavraChave from '../../ui/PalavraChave';
import { PalavrasFormData } from './model';
import { UseFormRegister, UseFormReset } from 'react-hook-form';
import { Button } from '../../ui/Button';

export interface PalavrasDossieViewProps {
    readonly palavras: PalavraChaveCaso[];
    readonly isModoAdicionarPalavra: boolean;
    readonly setModoAdicionarPalavra: (value: boolean) => void;
    readonly excluirPalavra: (id: number) => void;
    readonly handleSubmit: (e: React.FormEvent) => void;
    readonly register: UseFormRegister<PalavrasFormData>;
    readonly onEnterPress: KeyboardEventHandler<HTMLInputElement>;
    readonly reset: UseFormReset<PalavrasFormData>;
}

export function PalavrasDossieView({
    palavras,
    isModoAdicionarPalavra,
    setModoAdicionarPalavra,
    excluirPalavra,
    handleSubmit,
    register,
    onEnterPress,
    reset
}: Readonly<PalavrasDossieViewProps>) {
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
                    <Button
                        type="cancel"
                        size="small"
                        action={() => {
                            setModoAdicionarPalavra(!isModoAdicionarPalavra);
                            reset();
                        }}>
                        Cancelar
                    </Button>
                </form>
            )}
        </div>
    );
}
