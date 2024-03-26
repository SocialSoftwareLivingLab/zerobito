import React, { InputHTMLAttributes, forwardRef } from 'react';
import { InputArea, InputLabel, InputStyle } from './styles';

export interface InputProps {
    type?: InputHTMLAttributes<HTMLInputElement>['type'];
    placeholder?: string;
    label: string;
    width?: 'auto' | 'full';
}

const Input = forwardRef<HTMLInputElement, InputProps>((
    {label, type = 'text', placeholder, width = 'auto', ...rest}: InputProps, inputRef
) => {
    return (
        <InputArea>
            <InputLabel>{label}</InputLabel>
            <InputStyle ref={inputRef} width={width} type={type} placeholder={placeholder} {...rest} />
        </InputArea>
    )
});

export default Input;