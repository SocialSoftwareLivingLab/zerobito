import React from 'react';
import { ContainerStyle } from './styles';

export interface ContainerProps extends React.HTMLProps<HTMLDivElement> {
    readonly children: React.ReactNode;
}

export default function Container({ children, ...rest }: Readonly<ContainerProps>) {
    return <ContainerStyle {...rest}>{children}</ContainerStyle>;
}
