import api from "../../api";

export const createOcorrencia = async (
    denuncia: String,
    data: Date,
    local: String,
    nomeVitima: String,
    condicaoAcidentado: Enumerator,
    nomeEmpresaEmpregadora: String,
    gravidade: Enumerator,
    statusEvento: Enumerator,
   
) => {
    const response = await api.post("/ocorrencias", {
        denuncia,
        local,
        data,
        nomeVitima,
        condicaoAcidentado,
        nomeEmpresaEmpregadora,
        gravidade,
        status: statusEvento,
    });

    return response;
};

