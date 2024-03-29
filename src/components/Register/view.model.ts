import { useState } from "react";
import { useHistory } from "react-router";
import { register } from "../../common/models/user/create.user";

const useRegisterViewModel = () => {
    const history = useHistory();
    const [error, setError] = useState<string>("");
    const [nome, setNome] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [senha, setSenha] = useState<string>("");
    const [senhaValidation, setSenhaValidation] = useState<string>("");

    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (senha !== senhaValidation) {
            setError(String("Senha diverge da confirmação"));
            return;
        }

        try {
            const response = await register(nome, email, senha);
            if (response.status === 200) {
                history.replace("/");
            }
        } catch (error: any) {
            setError(
                String(error.response.data?.error ?? error.response.data.message)
            );
        }
    };

    const handleChangeNome = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        setNome(value);
    };

    const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        setEmail(value);
    };

    const handleChangeSenha = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        setSenha(value);
    };

    const handleChangeSenhaValidation = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = event.target.value;

        setSenhaValidation(value);
    };


    return {
        nome,
        email,
        senha,
        senhaValidation,
        setNome,
        setEmail,
        setSenha,
        setSenhaValidation,
        handleSubmit,
        handleChangeNome,
        handleChangeEmail,
        handleChangeSenha,
        handleChangeSenhaValidation
    };
};

export default useRegisterViewModel;
