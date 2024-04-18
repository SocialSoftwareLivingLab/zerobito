import React from 'react';
import CriarCasoForm from '../../../../components/Forms/Caso';
import { Secao } from '../styles';

export default function NovoCasoPage() {
    return (
        <Secao>
            <h3>Dados do novo caso</h3>

            <CriarCasoForm />
        </Secao>
    );
}
