import api from "../../api";

export const register = async(nome: string, email: string, senha:string) => {
    const response = await api.post("/register", {
        nome, 
        email, 
        senha
    });

    return response;
};

