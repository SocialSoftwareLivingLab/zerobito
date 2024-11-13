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

function BotoesAcoesReuniao() {
    const { caso } = useCasoSelecionado();

    const navigate = useNavigate();

    const onReunioesClick = useCallback(
        (caso: Caso) => {
            console.log(caso.id);
            navigate(`/casos/${caso.id}/planejemento/reunioes`);
        },
        [navigate]
    );
    return (
        <SeparadorAcoes>
            <Button action={() => onReunioesClick(caso)}>
                <IoMdAddCircle />
                Reuniões
            </Button>
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
                Iniciar Investigação
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
