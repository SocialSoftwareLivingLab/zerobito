import api from "../../api";

export const createOcorrencia = async (
    denuncia: String,
    data: Date,
    local: String,
    nomeVitima: String,
    tipoOcorrencia: String,
    nomeContato: String,
    emailContato: String,
    telefoneContato: String,
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
        tipoOcorrencia,
	    nomeContato,
		emailContato,
		telefoneContato,
        condicaoAcidentado,
        nomeEmpresaEmpregadora,
        gravidade,
        status: statusEvento,
    });

    return response;
};

