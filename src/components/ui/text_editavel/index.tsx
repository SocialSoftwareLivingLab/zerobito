import React, { forwardRef, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { Button } from '../Button';
import { Select, SelectOption } from '../Select';
import { TextEditavelContainer } from './styles';

export interface TextEditavelProps {
    options: string[];
    label: string;
    title: string;
    handleCompleteEdit: () => void;
}

export const TextEditavel = forwardRef<HTMLSelectElement, TextEditavelProps>(
    ({ label, options, title, handleCompleteEdit }, ref) => {
        const [state, setState] = useState<boolean>(true);
        return (
            <TextEditavelContainer>
                {state && (
                    <div>
                        <span>{title}</span>
                        <FaEdit onClick={() => setState(!state)} />
                    </div>
                )}
                {!state && (
                    <div className="row">
                        <div className="column">
                            <Select ref={ref} label={label}>
                                {options.map((option) => (
                                    <SelectOption key={option} label={option} value={option} />
                                ))}
                            </Select>
                        </div>
                        <div className="column">
                            <Button
                                type="submit"
                                size="small"
                                action={() => {
                                    console.log('cliquei');
                                    setState(!state);
                                    handleCompleteEdit();
                                }}>
                                Salvar
                            </Button>
                        </div>
                    </div>
                )}
            </TextEditavelContainer>
        );
    }
);
