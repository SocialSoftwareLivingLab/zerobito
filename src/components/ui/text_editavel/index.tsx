import React, { forwardRef, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { Button } from '../Button';
import { Select, SelectOption } from '../Select';
import { TextEditavelContainer } from './styles';

export interface TextEditavelProps {
    options: string[];
    label: string;
}

export const TextEditavel = forwardRef<HTMLSelectElement, TextEditavelProps>(
    ({ label, options }, ref) => {
        const [state, setState] = useState<boolean>(false);
        return (
            <TextEditavelContainer>
                {state && (
                    <div>
                        <span>Nada selecionado</span>
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
