import api from '../../../api';
interface EmailResponse {
    email: string;
}

export async function buscarEmailConvite(identificador: string) {
    const response = await api.get<emailResponse>(
        `/api/v1/casos/grupo-trabalho/convite/${identificador}/email`
    );
    return response.data;
}
