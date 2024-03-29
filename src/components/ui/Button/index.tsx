import React, { useCallback } from 'react';
import { ButtonStyle } from './styles';

export interface ButtonProps {
    size?: 'small' | 'medium' | 'large';
    type?: 'button' | 'submit' | 'cancel' | 'default';
    action?: () => void;
    disabled?: boolean;
    children: React.ReactNode | React.ReactNode[];
}

export function Button({
    children,
    size = 'medium',
    type = 'button',
    action,
    disabled = false
}: ButtonProps) {
    const handleClick = useCallback(() => {
        if (action) {
            action();
        }
    }, [action]);

    return (
        <ButtonStyle size={size} type={type} onClick={handleClick} disabled={disabled}>
            {children}
        </ButtonStyle>
    );
}
