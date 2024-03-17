import React, { useCallback } from "react";
import { IoBagAdd } from "react-icons/io5";
import { useHistory } from "react-router-dom";
import { BoxContainer } from "../../BoxContainer";
import { Button } from "../../Button";

function AdicionarNovoEventoButton() {
    const history = useHistory();

    const handleClick = useCallback(() => {
        history.push('/ocorrencia')
    }, [history]);

    return (
        <Button type="button" action={handleClick}>
            <IoBagAdd /> Adicionar novo evento
        </Button>
    )
}

interface TabelaOcorrenciaNovoProps {
}


export function TabelaOcorrenciaNovo() {
    return (
        <BoxContainer titulo="Comunicação de Evento" acoesContainer={AdicionarNovoEventoButton}>
            <span>Testando</span>

        </BoxContainer>
    );
} 