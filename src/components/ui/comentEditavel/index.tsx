import React, { forwardRef, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { Button } from '../Button';
import TextArea from '../TextArea';
import { CommentEditavelContainer } from './styles';
import Input from '../Input';
import { UseFormRegisterReturn } from 'react-hook-form';

export interface CommentEditavelProps {
    label: string;
    title: string;
    handleCompleteEdit: () => void;
    register: UseFormRegisterReturn;
    cancel: () => void;
}

export const CommentEditavel = forwardRef<HTMLSelectElement, CommentEditavelProps>(
    ({ label, title, handleCompleteEdit, register, cancel }) => {
        const [state, setState] = useState<boolean>(true);
        return (
            <CommentEditavelContainer>
                {state && (
                    <div>
                        <span>{title}</span>
                        <FaEdit onClick={() => setState(!state)} />
                    </div>
                )}
                {!state && (
                    <div className="row">
                        <div className="column">
                            <TextArea placeholder="Comentario" label={label} {...register} />
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
            </CommentEditavelContainer>
        );
    }
);
