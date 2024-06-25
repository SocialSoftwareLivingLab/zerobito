import { OpenStreetMapProvider } from 'leaflet-geosearch';

const mock = [
    {
        x: -61.9277854,
        y: -10.8778148,
        label: 'Ji-Paraná, Região Geográfica Imediata de Ji-Paraná, Região Geográfica Intermediária de Ji-Paraná, Rondônia, Região Norte, Brasil',
        bounds: [
            [-11.2133269, -62.164],
            [-9.684, -61.461]
        ],
        raw: {
            place_id: 11070379,
            licence: 'Data © OpenStreetMap contributors, ODbL 1.0. http://osm.org/copyright',
            osm_type: 'relation',
            osm_id: 325879,
            lat: '-10.8778148',
            lon: '-61.9277854',
            class: 'boundary',
            type: 'administrative',
            place_rank: 16,
            importance: 0.4428526421901152,
            addresstype: 'municipality',
            name: 'Ji-Paraná',
            display_name:
                'Ji-Paraná, Região Geográfica Imediata de Ji-Paraná, Região Geográfica Intermediária de Ji-Paraná, Rondônia, Região Norte, Brasil',
            boundingbox: ['-11.2133269', '-9.6840000', '-62.1640000', '-61.4610000']
        }
    },
    {
        x: -61.703581159420295,
        y: -10.361,
        label: 'Ji-Paraná, Região Geográfica Imediata de Ji-Paraná, Região Geográfica Intermediária de Ji-Paraná, Rondônia, Região Norte, Brasil',
        bounds: [
            [-11.0304137, -62.164],
            [-9.684, -61.461]
        ],
        raw: {
            place_id: 11122703,
            licence: 'Data © OpenStreetMap contributors, ODbL 1.0. http://osm.org/copyright',
            osm_type: 'relation',
            osm_id: 8395776,
            lat: '-10.361',
            lon: '-61.703581159420295',
            class: 'boundary',
            type: 'administrative',
            place_rank: 18,
            importance: 0.30000999999999994,
            addresstype: 'city_district',
            name: 'Ji-Paraná',
            display_name:
                'Ji-Paraná, Região Geográfica Imediata de Ji-Paraná, Região Geográfica Intermediária de Ji-Paraná, Rondônia, Região Norte, Brasil',
            boundingbox: ['-11.0304137', '-9.6840000', '-62.1640000', '-61.4610000']
        }
    }
];

export interface GeoSearchResult {
    lat: number;
    lon: number;
    descricao: string;
}

export async function geosearch(query: string): Promise<GeoSearchResult[]> {
    const provider = new OpenStreetMapProvider();
    const result = await provider.search({ query });

    return result.map((location) => ({
        lat: location.x,
        lon: location.y,
        descricao: location.label
    }));
}
