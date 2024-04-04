import { useState } from 'react';
import { useHistory } from 'react-router';
import Swal from 'sweetalert2';
import { register } from '../../common/models/user/create.user';
import axios from 'axios';
import { ValidateError } from '../../common/Errors/ValidateError';

const useRegisterViewModel = () => {
    const history = useHistory();
    const [error, setError] = useState<string>();
    const [nome, setNome] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [senha, setSenha] = useState<string>('');
    const [senhaValidation, setSenhaValidation] = useState<string>('');

    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await register(nome, email, senha);
            if (response.status === 201) {
                Swal.fire({
                    title: 'Cadastro Realizado!',
                    text: 'Usuário foi criado com sucesso',
                    icon: 'success',
                    timer: 2000
                });
                history.replace('/login');
            }
        } catch (error) {
            if (axios.isAxiosError<ValidateError, Record<string, unknown>>(error)) {
                setError(String(error.response.data.message));
            }
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

    const handleChangeSenhaValidation = (event: React.ChangeEvent<HTMLInputElement>) => {
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
