import axios from 'axios';
import { CSSProperties, useState } from 'react';
import { redirect } from 'react-router';
import Swal from 'sweetalert2';
import { ValidateError } from '../../common/Errors/ValidateError';
import { register } from '../../common/models/user/create.user';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { redefinirSenha } from '../../common/models/user/update-password.user';

const useRedefinirSenhaViewModel = () => {
    const navigate = useNavigate();
    const [error, setError] = useState<string>();
    const [senha, setSenha] = useState<string>('');
    const [senhaValidation, setSenhaValidation] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');

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
        if (!token) {
            // Trate o erro, exiba uma mensagem ou redirecione
            console.error('Token ausente');
            navigate('/login');
            alert('Token não encontrado.');
            return;
        }

        try {
            setError('');
            setLoading(true);
            if (senha !== senhaValidation) {
                setError('Senhas não coincidem');
                throw new Error('Senhas não coincidem');
            }
            const response = await redefinirSenha(token, senha);
            setLoading(false);
            if (response.status === 201) {
                await Swal.fire({
                    title: 'Senha Redefinida!',
                    text: 'Senha atualizada com sucesso.',
                    icon: 'success',
                    timer: 4000,
                    confirmButtonText: 'Continuar'
                });
                navigate('/login');
            }
        } catch (error) {
            setLoading(false);
            if (axios.isAxiosError<ValidateError, Record<string, unknown>>(error)) {
                setError(String(error.response.data.message));
            }
        }
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
        senha,
        senhaValidation,
        error,
        loading,
        override,
        showPassword,
        showConfirmPassword,
        setSenha,
        setSenhaValidation,
        handleSubmit,
        handleChangeSenha,
        handleChangeSenhaValidation,
        toggleShowPassword,
        toggleShowConfirmPassword
    };
};

export default useRedefinirSenhaViewModel;
