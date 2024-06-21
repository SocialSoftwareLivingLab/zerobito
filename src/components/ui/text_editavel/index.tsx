import React, { forwardRef, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { Button } from '../Button';
import { Select, SelectOption } from '../Select';
import { TextEditavelContainer } from './styles';
import { UseFormRegisterReturn } from 'react-hook-form';

export interface TextEditavelProps {
    options: string[];
    label: string;
    title: string;
    handleCompleteEdit: () => void;
    register: UseFormRegisterReturn;
    cancel: () => void;
}

const formatOption = (option) => {
    return option
        .toLowerCase()
        .replace(/_/g, ' ')
        .replace(/(?:^|\s)\S/g, (a) => a.toUpperCase());
};

export const TextEditavel = forwardRef<HTMLSelectElement, TextEditavelProps>(
    ({ label, options, title, handleCompleteEdit, register, cancel }) => {
        const [state, setState] = useState<boolean>(true);
        return (
            <TextEditavelContainer>
                {state && (
                    <div>
                        <span>{formatOption(title)}</span>
                        <FaEdit onClick={() => setState(!state)} />
                    </div>
                )}
                {!state && (
                    <div className="row">
                        <div className="column">
                            <Select label={label} {...register}>
                                {options.map((option) => (
                                    <SelectOption
                                        key={option}
                                        label={formatOption(option)}
                                        value={option}
                                    />
                                ))}
                            </Select>
                        </div>
                        <div className="column">
                            <div className="row">
                                <Button
                                    type="submit"
                                    size="small"
                                    action={() => {
                                        setState(!state);
                                        handleCompleteEdit();
                                    }}>
                                    Salvar
                                </Button>
                                <Button
                                    type="cancel"
                                    size="small"
                                    action={() => {
                                        setState(!state);
                                        cancel();
                                    }}>
                                    Cancelar
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </TextEditavelContainer>
        );
    }
);
