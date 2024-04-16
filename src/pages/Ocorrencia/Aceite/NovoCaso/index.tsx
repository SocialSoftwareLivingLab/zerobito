import React from 'react';
import { Secao } from '../styles';
import Input from '../../../../components/ui/Input';
import CriarCasoForm from '../../../../components/Forms/Caso';

export default function NovoCasoPage() {
    return (
        <Secao>
            <h3>Dados do novo caso</h3>

            <CriarCasoForm />
        </Secao>
    );
}
