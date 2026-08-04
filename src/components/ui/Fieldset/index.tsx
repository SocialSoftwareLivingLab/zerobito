import React from 'react';
import { FieldsetContainer } from './styles';

export interface FieldsetProps {
    readonly legend: string;
    readonly children: React.ReactElement | React.ReactElement[];
}

export default function Fieldset({ legend, children }: Readonly<FieldsetProps>) {
    return (
        <FieldsetContainer>
            <legend>{legend}</legend>
            {children}
        </FieldsetContainer>
    );
}
