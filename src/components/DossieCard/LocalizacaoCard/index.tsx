import React from 'react';
import { FaLocationDot } from 'react-icons/fa6';
import { LocalizacaoCardContainer } from './styles';

import MapaGeografico, { MarcadorLocalizacaoMapa } from '../../ui/MapaGeografico';
import { useCasoSelecionado } from '../../../contexts/caso-selecionado';

export default function LocalizacaoCard() {
    const marcadores: MarcadorLocalizacaoMapa[] = [
        {
            coordenada: [-22.9102, -47.060898],
            titulo: 'Campinas',
            descricao: 'Campinas, São Paulo, Brasil'
        },
        {
            coordenada: [-22.9068, -47.0616],
            titulo: 'Faculdade de Campinas',
            descricao: 'Faculdade de Campinas, São Paulo, Brasil'
        },
        {
            titulo: 'Barão Geraldo',
            descricao: 'Barão Geraldo, São Paulo, Brasil',
            coordenada: [-22.8174, -47.0763]
        }
    ];

    return (
        <LocalizacaoCardContainer>
            <h3>
                <FaLocationDot /> Localização
            </h3>
            <MapaGeografico marcadores={marcadores} />
        </LocalizacaoCardContainer>
    );
}
