import React, { useCallback } from 'react';
import { Button } from '../../../../components/ui/Button';
import { FiLogOut } from 'react-icons/fi';
import { BoxContainer } from '../../../../components/ui/BoxContainer';
import { SeparadorAcoes } from './styles';
import { useCasoSelecionado } from '../../../../contexts/caso-selecionado';
import { IoMdAddCircle } from 'react-icons/io';
import { FaCircleQuestion, FaGraduationCap } from 'react-icons/fa6';
import { FaSearch } from 'react-icons/fa';
import { Caso } from '../../../../common/models/caso/caso';
import { useNavigate } from 'react-router-dom';
import { finalizarIntervencao } from '../../../../common/api/casos/intervencao/finalizar-intervencao';

function BotoesAcoesIntervencao() {
    const { caso } = useCasoSelecionado();

    const navigate = useNavigate();

    const onIntervencaoClick = useCallback(
        (caso: Caso) => {
            navigate(`/casos/${caso.id}/intervencao/nova-intervencao`);
        },
        [navigate]
    );
    return (
        <SeparadorAcoes>
            <Button action={() => onIntervencaoClick(caso)}>
                <IoMdAddCircle />
                Reuniões
            </Button>
            <Button action={() => console.log(caso)}>
                <FaCircleQuestion />
                Ajuda com o caso
            </Button>
            <Button action={() => finalizarIntervencao(caso.id)}>
                <FaSearch />
                Finalizar Intervenção
            </Button>
        </SeparadorAcoes>
    );
}

export default function AcoesIntervencao() {
    return (
        <BoxContainer titulo="Ações de Intervenção" acoesContainer={BotoesAcoesIntervencao}>
            {''}
        </BoxContainer>
    );
}
