import React from 'react';
import { ColumnContainerStyle } from './styles';

interface ColumnContainerProps {
    children: React.ReactNode | React.ReactNode[];
    className?: string;
}

export function ColumnContainer({ children, className }: ColumnContainerProps) {
    return <ColumnContainerStyle className={className}>{children}</ColumnContainerStyle>;
}
