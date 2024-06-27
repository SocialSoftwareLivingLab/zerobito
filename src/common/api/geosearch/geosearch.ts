import { OpenStreetMapProvider } from 'leaflet-geosearch';

export interface GeoSearchResult {
    lat: number;
    lon: number;
    descricao: string;
}

export async function geosearch(query: string): Promise<GeoSearchResult[]> {
    const provider = new OpenStreetMapProvider();
    const result = await provider.search({ query });

    return result.map((location) => ({
        lon: location.x,
        lat: location.y,
        descricao: location.label
    }));
}
