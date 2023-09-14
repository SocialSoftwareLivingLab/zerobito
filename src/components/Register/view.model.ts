import { useState } from "react";
import { register } from "../../common/models/user/create.user";

const useRegisterViewModel = () => {
    const [nome, setNome] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [senha, setSenha] = useState<string>("");

    const onSubmit = async () => {
        console.log({ nome, email, senha });
        try {
            const response = await register({ nome, email, senha });
            console.log(response);
        } catch (error) {
            console.log(error);
            alert("Erro ao fazer registrar");
        }
    };

    return {
        nome,
        email,
        senha,
        setNome,
        setEmail,
        setSenha,
        onSubmit,
    };
};

export default useRegisterViewModel;
