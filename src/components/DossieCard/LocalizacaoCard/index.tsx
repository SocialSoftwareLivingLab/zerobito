import React from 'react';
import { FaLocationDot } from 'react-icons/fa6';
import { LocalizacaoCardContainer, Metadado, Metadados } from './styles';

import { useCasoSelecionado } from '../../../contexts/caso-selecionado';
import MapaGeografico, { MarcadorLocalizacaoMapa } from '../../ui/MapaGeografico';

export default function LocalizacaoCard() {
    const {
        caso: { localizacao }
    } = useCasoSelecionado();

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
            <div className="separador-localizacao">
                <MapaGeografico marcadores={marcadores} />
                <Metadados>
                    <Metadado>
                        <h4>Cidade</h4>
                        <span>{localizacao.cidade}</span>
                    </Metadado>
                    <Metadado>
                        <h4>Estado</h4>
                        <span>{localizacao.estado}</span>
                    </Metadado>
                    <Metadado>
                        <h4>Logradouro</h4>
                        <span>{localizacao.logradouro}</span>
                    </Metadado>
                </Metadados>
            </div>
        </LocalizacaoCardContainer>
    );
}
