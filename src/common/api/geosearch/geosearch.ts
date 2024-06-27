import { OpenStreetMapProvider } from 'leaflet-geosearch';

export interface GeoSearchResult {
    lat: number;
    lon: number;
    descricao: string;
}

export async function geosearch(termosPesquisa: string[]): Promise<GeoSearchResult[]> {
    const provider = new OpenStreetMapProvider();

    // tenta processar X termos... se nenhum trouxer resultados, retorna uma lista vazia
    for (const termo of termosPesquisa) {
        const result = await provider.search({ query: termo });

        if (result.length > 0) {
            return result.map((location) => ({
                lon: location.x,
                lat: location.y,
                descricao: location.label
            }));
        }
    }

    return [];
}
