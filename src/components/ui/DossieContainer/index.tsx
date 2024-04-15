import React from 'react';
import { DossieColumnStyle, DossieContainerStyle } from './styles';
import { BoxContainer } from '../BoxContainer';

interface DossieContainerProps {
    children: React.ReactNode | React.ReactNode[];
}

export function DossieContainer({ children }: DossieContainerProps) {
    return (
        <DossieContainerStyle>
            <header>
                <DossieColumnStyle>
                    <BoxContainer titulo={'Ocorrencia Info'}>
                        <span>Informações sobre...</span>
                    </BoxContainer>
                </DossieColumnStyle>
                <DossieColumnStyle>
                    <BoxContainer titulo={'Outra Info'}>
                        <span>Informações sobre...</span>
                    </BoxContainer>
                </DossieColumnStyle>
            </header>
        </DossieContainerStyle>
    );
}
