import React from 'react';
import { FieldsetContainer } from './styles';

export interface FieldsetProps {
    legend: string;
    children: React.ReactElement | React.ReactElement[];
}

export default function Fieldset({ legend, children }: FieldsetProps) {
    return (
        <FieldsetContainer>
            <legend>{legend}</legend>
            {children}
        </FieldsetContainer>
    );
}
