import React from 'react';
import { SeparadorAcoes } from './styles';
import { Button } from '../../../../components/ui/Button';
import { FaCircleQuestion, FaGraduationCap, FaMap } from 'react-icons/fa6';
import { BoxContainer } from '../../../../components/ui/BoxContainer';

function BotoesAcoesPreparacao() {
    return (
        <SeparadorAcoes>
            <Button action={() => (window.location.href = 'mailto:testando@teste.com')}>
                <FaCircleQuestion />
                Ajuda com o caso
            </Button>
            <Button>
                <FaGraduationCap />
                Formações
            </Button>
            <Button>
                <FaMap />
                Iniciar planejamento
            </Button>
        </SeparadorAcoes>
    );
}

export default function AcoesPreparacao() {
    return (
        <BoxContainer titulo="Ações de Preparação" acoesContainer={BotoesAcoesPreparacao}>
            {''}
        </BoxContainer>
    );
}
