import React, { useCallback } from 'react';
import { ClipLoader } from 'react-spinners';
import { buttonColors, ButtonStyle } from './styles';

export interface ButtonProps {
    size?: 'small' | 'medium' | 'large';
    type?: 'button' | 'submit' | 'cancel' | 'default';
    action?: () => void;
    disabled?: boolean;
    loading?: boolean;
    children: React.ReactNode | React.ReactNode[];
}

export function Button({
    children,
    size = 'medium',
    type = 'button',
    action,
    disabled = false,
    loading = false
}: ButtonProps) {
    const handleClick = useCallback(() => {
        if (action) {
            action();
        }
    }, [action]);

    const spinnerColor = buttonColors[type].text;

    return (
        <ButtonStyle size={size} type={type} onClick={handleClick} disabled={disabled || loading}>
            {loading ? (
                <ClipLoader
                    color={spinnerColor}
                    loading={true}
                    size={10}
                    speedMultiplier={0.6}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            ) : (
                children
            )}
        </ButtonStyle>
    );
}
