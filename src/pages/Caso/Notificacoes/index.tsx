import React from 'react';
import { useCasoSelecionado } from '../../../contexts/caso-selecionado';

export default function Notificacoes() {
    const { caso } = useCasoSelecionado();

    return (
        <div>
            <h1>Notificações do caso {caso.id}</h1>
        </div>
    );
}
