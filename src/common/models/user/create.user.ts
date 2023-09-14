import api from "../../api";

export interface registerDTO{
    nome: string;
    email: string;
    senha: string;
}

export const register = async({nome, email, senha}: registerDTO) => {
    const response = await api.post("/register", {
        nome, 
        email, 
        senha
    });

    return response;
};

