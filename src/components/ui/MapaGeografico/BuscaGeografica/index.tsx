import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';

import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';

export default function BuscaGeografica() {
    const map = useMap();

    const control = GeoSearchControl({ provider: getProviderBuscaGeografica() });

    const provider = getProviderBuscaGeografica();
    const result = provider.search({ query: 'Ji-Paraná' });

    result.then((response) => console.log(response));

    useEffect(() => {
        map.addControl(control);

        return () => map.removeControl(control);
    }, [map, control]);

    return null;
}

function getProviderBuscaGeografica(): OpenStreetMapProvider {
    return new OpenStreetMapProvider({});
}
