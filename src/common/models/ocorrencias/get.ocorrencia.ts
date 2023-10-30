import api from "../../api";

export const carregarOcorrencias = async() => {
    const response = await api.get("/ocorrencias");
    return response;
};