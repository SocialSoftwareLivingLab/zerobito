import api from '../../api';

export const createOcorrencia = async (
    denuncia: string,
    titulo: string,
    data: Date,
    local: string,
    nomeVitima: string,
    tipoOcorrencia: string,
    nomeContato: string,
    emailContato: string,
    telefoneContato: string,
    condicaoAcidentado: Enumerator,
    nomeEmpresaEmpregadora: string,
    gravidade: Enumerator,
    statusEvento: Enumerator
) => {
    const response = await api.post('/ocorrencias', {
        denuncia,
        titulo,
        local,
        data,
        nomeVitima,
        tipoOcorrencia,
        nomeContato,
        emailContato,
        telefoneContato,
        condicaoAcidentado,
        nomeEmpresaEmpregadora,
        gravidade,
        status: statusEvento
    });

    return response;
};
