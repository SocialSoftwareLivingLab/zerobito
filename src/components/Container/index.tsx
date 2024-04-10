import React from 'react';
import { ContainerStyle } from './styles';

export interface ContainerProps extends React.HTMLProps<HTMLDivElement> {
    children: React.ReactNode;
}

export default function Container({ children, ...rest }: ContainerProps) {
    return <ContainerStyle {...rest}>{children}</ContainerStyle>;
}
