import React, { useCallback } from 'react';
import { Button } from '../../../../components/ui/Button';
import { FiLogOut } from 'react-icons/fi';
import { BoxContainer } from '../../../../components/ui/BoxContainer';
import { useCasoSelecionado } from '../../../../contexts/caso-selecionado';
import { IoMdAddCircle } from 'react-icons/io';
import { FaCircleQuestion, FaGraduationCap } from 'react-icons/fa6';
import { FaSearch } from 'react-icons/fa';
import { Caso } from '../../../../common/models/caso/caso';
import { useNavigate } from 'react-router-dom';
import { SeparadorAcoes } from './styles';

function BotoesAcoesInvestigacao() {
    const { caso } = useCasoSelecionado();

    return (
        <SeparadorAcoes>
            <Button action={() => console.log(caso)}>
                <FaCircleQuestion />
                Ajuda com o caso
            </Button>
            <Button action={() => console.log(caso)}>
                <FaGraduationCap />
                Formação
            </Button>
            <Button action={() => console.log(caso)}>
                <FaSearch />
                Iniciar Intervenção
            </Button>
        </SeparadorAcoes>
    );
}

export default function AcoesInvestigacao() {
    return (
        <BoxContainer titulo="Ações de Investigação" acoesContainer={BotoesAcoesInvestigacao}>
            {''}
        </BoxContainer>
    );
}
