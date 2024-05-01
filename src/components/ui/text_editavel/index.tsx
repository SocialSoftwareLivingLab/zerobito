import React, { useState } from 'react';
import { TextEditavelContainer } from './styles';
import { Select, SelectOption } from '../Select';
import { Button } from '../Button';
import { FaEdit } from 'react-icons/fa';

export interface TextEditavelProps {
    options: string[];
    label: string;
}

export default function TextEditavel({ options, label }: TextEditavelProps) {
    const [state, setState] = useState<boolean>(false);
    return (
        <TextEditavelContainer>
            {!state && (
                <div>
                    <span>Nada selecionado</span>
                    <FaEdit onClick={() => setState(!state)} />
                </div>
            )}
            {state && (
                <div className="row">
                    <div className="column">
                        <Select label={label}>
                            {options.map((option) => (
                                // eslint-disable-next-line react/jsx-key
                                <SelectOption label={option} value={option}></SelectOption>
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
