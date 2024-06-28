import { Icon, LatLngExpression, Map } from 'leaflet';
import React, { useEffect, useMemo, useRef } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';

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

const RecenterAutomatically = ({ lat, lng }: { lat: number; lng: number }) => {
    const map = useMap();
    useEffect(() => {
        if (lat && lng && map) {
            map.setView([lng, lat]);
        }
    }, [lat, lng, map]);
    return null;
};

export default function MapaGeografico({
    scrollAumentaZoom = false,
    marcadores = []
}: MapaGeograficoProps) {
    const ref = useRef<Map>(null);

    const iconeCustomizado = new Icon({
        iconUrl: pinIcone,
        iconSize: [25, 25]
    });

    const posicaoInicial = useMemo(() => {
        console.log('Carregando posicao inicial', marcadores);
        return marcadores.length > 0 ? marcadores[0].coordenada : COORDENADA_LATLON_CAMPINAS;
    }, [marcadores]);

    useEffect(() => {
        console.log('Atualizando posicao inicial', posicaoInicial, ref.current);
        ref.current?.flyTo(posicaoInicial, 13, { duration: 1 });
    }, [posicaoInicial]);

    return (
        <MapaGeograficoContainer>
            <MapContainer
                ref={ref}
                center={posicaoInicial}
                zoom={13}
                scrollWheelZoom={scrollAumentaZoom}>
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
