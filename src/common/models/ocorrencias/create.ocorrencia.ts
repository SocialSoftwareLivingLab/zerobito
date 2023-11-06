import api from "../../api";

export const createOcorrencia = async(data:Date, local:String, nomeVitima:String,
    condicaoAcidentado:Enumerator, gravidade:Enumerator, status:Enumerator, empresaEmpregadora, descricao) => {
    const response = await api.post("/ocorrencias", {
        local,
        data,
        nomeVitima,
        condicaoAcidentado,
        gravidade,
        status,
        empresaEmpregadora,
        descricao,
    });

    return response;
};

