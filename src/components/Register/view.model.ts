import { useState } from "react";
import { useHistory } from "react-router";
import { register } from "../../common/models/user/create.user";
import {login} from "../../common/models/user/auth";
import Swal from 'sweetalert2';

const useRegisterViewModel = () => {
    const history = useHistory();
    const [error, setError] = useState<string>();
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
            if (response.status === 201) {
                Swal.fire({
                    title: 'Cadastro Realizado!',
                    text: 'Você será redirecionado em instantes.',
                    icon: 'success',
                    timer: 2000,
                  })
                  await login({ email: email, senha: senha });
                history.replace("/home");
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
        error,
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
