import React from 'react';
import { Button } from '../../../../components/ui/Button';
import { FiLogOut } from 'react-icons/fi';
import { BoxContainer } from '../../../../components/ui/BoxContainer';
import { SeparadorAcoes } from './styles';
import { useCasoSelecionado } from '../../../../contexts/caso-selecionado';

function BotoesAcoesReuniao() {
    const { caso } = useCasoSelecionado();
    return (
        <SeparadorAcoes>
            <Button action={() => console.log(caso)}>
                <FiLogOut />
                Fechar Reunião
            </Button>
        </SeparadorAcoes>
    );
}

export default function AcoesReuniao() {
    return (
        <BoxContainer titulo="Ações da Reunião" acoesContainer={BotoesAcoesReuniao}>
            {''}
        </BoxContainer>
    );
}
