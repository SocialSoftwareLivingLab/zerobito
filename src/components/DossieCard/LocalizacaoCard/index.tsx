import React from 'react';
import { FaLocationDot } from 'react-icons/fa6';
import { MapContainer, TileLayer } from 'react-leaflet';
import { LocalizacaoCardContainer } from './styles';

import 'leaflet/dist/leaflet.css';
import MapaGeografico from '../../ui/MapaGeografico';

export default function LocalizacaoCard() {
    return (
        <LocalizacaoCardContainer>
            <h3>
                <FaLocationDot /> Localização
            </h3>
            <MapaGeografico />
        </LocalizacaoCardContainer>
    );
}
