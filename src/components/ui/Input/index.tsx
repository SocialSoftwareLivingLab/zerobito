import React, { InputHTMLAttributes, forwardRef } from 'react';
import { InputArea, InputLabel, InputStyle } from './styles';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'width'> {
    label: string;
    width?: 'auto' | 'full';
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            label,
            type = 'text',
            placeholder,
            width = 'auto',
            required = false,
            ...rest
        }: InputProps,
        inputRef
    ) => {
        return (
            <InputArea>
                <InputLabel required={required}>{label}</InputLabel>
                <InputStyle
                    ref={inputRef}
                    width={width}
                    type={type}
                    placeholder={placeholder}
                    {...rest}
                />
            </InputArea>
        );
    }
);

Input.displayName = 'Input';

export default Input;
