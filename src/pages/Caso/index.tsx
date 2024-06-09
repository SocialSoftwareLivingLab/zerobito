import React from 'react';
import Header from '../../components/Page-Header';
import { CasoHeader } from './styles';
import { CasoInfo } from '../../components/Caso/CasoInfo';
import { CasoNavegacao } from '../../components/Caso/CasoNavegacao';

export default function Caso() {
    return (
        <>
            <Header
                titulo="Dossiê"
                explicacao="Aqui o cordenador local tem uma visão global do caso. Pode dar inicio à Preparação/Reunião de Trabalho e Qualificar a documentação"
            />

            <CasoHeader>
                <CasoInfo />
                <CasoNavegacao />
            </CasoHeader>
        </>
    );
}
