import React from 'react';
import { Secao } from '../styles';
import { OcorrenciaModel } from '../../../../common/models/ocorrencias/model';

export interface VincularOcorrenciaAoCasoPageProps {
    ocorrencia: OcorrenciaModel;
}

export default function VincularOcorrenciaAoCasoPage(data: VincularOcorrenciaAoCasoPageProps) {
    return (
        <Secao>
            <h3>Selecione o caso para realizar o vínculo</h3>
        </Secao>
    );
}
