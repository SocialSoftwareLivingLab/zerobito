import React, { useState } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { PalavrasFormData } from './model';
import PalavraChave from '../../ui/PalavraChave';
import { IoMdAddCircle } from 'react-icons/io';

export interface PalavrasDossieViewProps {
    palavrasChave: string[];
    removePalavra: (palavra) => void;
    addPalavra: boolean;
    setAddPalavra: (boolean) => void;
    inputValue: string;
    handleInputChange: (string) => void;
    onEnterPress: (e) => void;
}

export function PalavrasDossieView({
    palavrasChave,
    removePalavra,
    addPalavra,
    setAddPalavra,
    inputValue,
    handleInputChange,
    onEnterPress
}: PalavrasDossieViewProps) {
    return (
        <div className="chave">
            {palavrasChave.map((palavra) => (
                // eslint-disable-next-line react/jsx-key
                <PalavraChave label={palavra} removeHandle={() => removePalavra(palavra)} />
            ))}
            <div className="add">
                <IoMdAddCircle onClick={() => setAddPalavra(true)} />
            </div>
            {addPalavra && (
                <form className="row">
                    <input
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyDown={onEnterPress}
                    />
                </form>
            )}
        </div>
    );
}
