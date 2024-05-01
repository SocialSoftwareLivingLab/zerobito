import React, { Children } from 'react';
import { DossieContainerStyle } from './styles';

interface DossieContainerProps {
    children: React.ReactNode | React.ReactNode[];
}

export function DossieContainer({ children }: DossieContainerProps) {
    return <DossieContainerStyle>{children}</DossieContainerStyle>;
}
