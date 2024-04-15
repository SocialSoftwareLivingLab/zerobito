import React from 'react';
import { DossieItemNavegacaoContainer } from './styles';
import { OcorrenciaStep } from '..';

interface DossieItemAbaNavegacaoProps {
    titulo: string;
    step: OcorrenciaStep;
    icone: React.ReactNode;
    url: string;
    action?: () => void;
}

export default function DossieItemAbaNavegacao({
    titulo,
    icone,
    url,
    step,
    action
}: DossieItemAbaNavegacaoProps) {
    return (
        <DossieItemNavegacaoContainer to={url} onClick={action} isstep={step.step === titulo}>
            <div>
                {icone}
                {titulo}
            </div>
        </DossieItemNavegacaoContainer>
    );
}
