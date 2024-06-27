import { Icon, LatLngExpression } from 'leaflet';
import React, { useMemo } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

// import 'leaflet-geosearch/dist/geosearch.css';
import 'leaflet/dist/leaflet.css';

import pinIcone from '../../../assets/pin.svg';
import { MapaGeograficoContainer } from './styles';

const COORDENADA_LATLON_CAMPINAS: LatLngExpression = [-22.9102, -47.060898];

export interface MarcadorLocalizacaoMapa {
    coordenada: LatLngExpression;
    titulo: string;
    descricao: string;
}

export interface MapaGeograficoProps {
    scrollAumentaZoom?: boolean;
    marcadores?: MarcadorLocalizacaoMapa[];
}

export default function MapaGeografico({
    scrollAumentaZoom = false,
    marcadores = []
}: MapaGeograficoProps) {
    const iconeCustomizado = new Icon({
        iconUrl: pinIcone,
        iconSize: [25, 25]
    });

    console.log('marcadores', marcadores);

    const posicaoInicial = useMemo(() => {
        return marcadores.length > 0 ? marcadores[0].coordenada : COORDENADA_LATLON_CAMPINAS;
    }, [marcadores]);

    return (
        <MapaGeograficoContainer>
            <MapContainer center={posicaoInicial} zoom={13} scrollWheelZoom={scrollAumentaZoom}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {/* <BuscaGeografica /> */}
                {marcadores.map((marcador, indice) => (
                    <Marker key={indice} position={marcador.coordenada} icon={iconeCustomizado}>
                        <Popup>
                            <strong>{marcador.titulo}</strong>
                            <span>{marcador.descricao}</span>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </MapaGeograficoContainer>
    );
}
