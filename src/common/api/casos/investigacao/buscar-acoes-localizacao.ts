import { MapaEtapaEnum } from '../../../../pages/Caso/Investigacao/enum/mapa-etapa-enum';
import { MapaEtapaStatusEnum } from '../../../../pages/Caso/Investigacao/enum/mapa-etapa-status-enum';
import { MapaEtapa } from '../../../../pages/Caso/Investigacao/Etapas';
import api from '../../../api';

interface MapaEtapaAPI {
    id: number;
    name: string;
    descricao: string | null;
    status: string;
}

export async function buscarMapaEtapas(idCaso: number): Promise<MapaEtapa[]> {
    const response = await api.get<MapaEtapaAPI[]>(`/api/v1/${idCaso}/investigacao/mapa/buscar`);
    console.log('data dos mapas: ');
    console.log(response.data);
    // conversão explícita de tipos string -> enums
    return response.data.map((etapa) => ({
        ...etapa,
        name: etapa.name as MapaEtapaEnum,
        status: etapa.status as MapaEtapaStatusEnum
    }));
}
