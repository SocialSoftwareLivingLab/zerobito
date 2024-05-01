import axios from 'axios';
import { CSSProperties, useState } from 'react';
import { redirect } from 'react-router';
import Swal from 'sweetalert2';
import { ValidateError } from '../../common/Errors/ValidateError';
import { register } from '../../common/models/user/create.user';

const useRegisterViewModel = () => {
    const [error, setError] = useState<string>();
    const [nome, setNome] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [senha, setSenha] = useState<string>('');
    const [senhaValidation, setSenhaValidation] = useState<string>('');
    const [loading, setLoading] = useState(false);

    const override: CSSProperties = {
        display: 'block',
        margin: '0 auto',
        textAlign: 'center',
        justifyContent: 'center',
        overflow: 'auto',
        position: 'relative',
        transform: 'transalate(-50%, -50%)'
    };

    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            setError('');
            setLoading(true);
            if (senha !== senhaValidation) {
                setError('Senhas não coincidem');
                throw new Error('Senhas não coincidem');
            }
            const response = await register(nome, email, senha);
            setLoading(false);
            if (response.status === 201) {
                Swal.fire({
                    title: 'Cadastro Realizado!',
                    text: 'Usuário foi criado com sucesso',
                    icon: 'success',
                    timer: 4000,
                    confirmButtonText: 'Continuar'
                });
                redirect('/login');
            }
        } catch (error) {
            setLoading(false);
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
        loading,
        override,
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
