import api from "../../api";

export const createOcorrencia = async(denuncia: string, data: Date, condicao:string, gravidade:string, status: string) => {
    const response = await api.post("/ocorrencia/criar", {
        denuncia, 
        data, 
        condicao,
        gravidade,
        status
    });

    return response;
};

