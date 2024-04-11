import React, { forwardRef } from 'react';
import { TextAreaContainer, TextAreaLabel, TextAreaStyle } from './styles';

export interface TextAreaProps {
    placeholder?: string;
    required?: boolean;
    label: string;
    width?: 'auto' | 'full';
}

const TextArea = forwardRef<HTMLInputElement, TextAreaProps>(
    (
        { label, placeholder, width = 'auto', required = false, ...rest }: TextAreaProps,
        inputRef
    ) => {
        return (
            <TextAreaContainer>
                <TextAreaLabel required={required}>{label}</TextAreaLabel>
                <TextAreaStyle
                    ref={inputRef}
                    width={width}
                    rows="8"
                    placeholder={placeholder}
                    {...rest}
                />
            </TextAreaContainer>
        );
    }
);

TextArea.displayName = 'Input';

export default TextArea;
