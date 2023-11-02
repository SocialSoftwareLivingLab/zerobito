import api from "../../api";

export const createOcorrencia = async(denuncia:String, data:Date, local:String, nomeVitima:String,
    condicaoAcidentado:Enumerator, gravidade:Enumerator, status:Enumerator, vinculo, empresaEmpregadora, empresaTomadora,  tipoOcorrencia, descricao) => {
    const response = await api.post("/ocorrencia", {
        denuncia, 
        data,
        local,
        nomeVitima,
        condicaoAcidentado,
        gravidade,
        status,
        vinculo,
        empresaEmpregadora,
        tipoOcorrencia,
        descricao,
    });

    return response;
};

