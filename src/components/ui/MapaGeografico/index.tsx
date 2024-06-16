import { LatLngExpression } from 'leaflet';
import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

const COORDENADA_LATLON_CAMPINAS: LatLngExpression = [-22.9102, -47.060898];

export interface MapaGeograficoProps {
    coordenadaVisualizacaoInicial?: LatLngExpression;
    scrollAumentaZoom?: boolean;
}

export default function MapaGeografico({
    coordenadaVisualizacaoInicial = COORDENADA_LATLON_CAMPINAS,
    scrollAumentaZoom = false
}: MapaGeograficoProps) {
    return (
        <MapContainer
            center={coordenadaVisualizacaoInicial}
            zoom={13}
            scrollWheelZoom={scrollAumentaZoom}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
        </MapContainer>
    );
}
