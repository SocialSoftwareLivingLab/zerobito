import React from 'react';
import { FaLocationDot } from 'react-icons/fa6';
import { MapContainer, TileLayer } from 'react-leaflet';
import { LocalizacaoCardContainer } from './styles';

import 'leaflet/dist/leaflet.css';

export default function LocalizacaoCard() {
    return (
        <LocalizacaoCardContainer>
            <h3>
                <FaLocationDot /> Localização
            </h3>
            <MapContainer center={[-22.9102, -47.060898]} zoom={13}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </MapContainer>
        </LocalizacaoCardContainer>
    );
}
