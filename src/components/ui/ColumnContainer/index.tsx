import React from 'react';
import { ColumnContainerStyle } from './styles';

interface ColumnContainerProps {
    children: React.ReactNode | React.ReactNode[];
}

export function ColumnContainer({ children }: ColumnContainerProps) {
    return <ColumnContainerStyle>{children}</ColumnContainerStyle>;
}
