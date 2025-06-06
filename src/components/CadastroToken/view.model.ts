import axios from 'axios';
import { CSSProperties, useEffect, useState } from 'react';
import { redirect, useParams } from 'react-router';
import Swal from 'sweetalert2';
import { ValidateError } from '../../common/Errors/ValidateError';
import { register } from '../../common/models/user/create.user';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { buscarEmailConvite } from '../../common/api/casos/grupo-trabalho/get-email-convidado';
// TODO: OBTER-EMAIL ATRAVÉS DE TOKEN + CHAMADA API.
const useCadastroTokenViewModel = () => {
    const navigate = useNavigate();
    const [error, setError] = useState<string>();
    const [nome, setNome] = useState<string>('');
    const [senha, setSenha] = useState<string>('');
    const [email, setEmail] = useState<string>('');
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

    const { tokenEmail } = useParams(); // pega o ID da URL

    // Obter e-mail ao montar
    useEffect(() => {
        const fetchEmail = async () => {
            if (!tokenEmail) return;

            // setEmail('teste@exemplo.com');
            try {
                const response = await buscarEmailConvite(tokenEmail);
                setEmail(response.email);
            } catch (err) {
                console.error('Erro ao buscar e-mail com token:', err);
                setError('Não foi possível recuperar o e-mail com o token.');
            }
        };

        fetchEmail();
    }, [tokenEmail]);

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
                const redirectTo = `/convites/${tokenEmail}`;
                await Swal.fire({
                    title: 'Cadastro Realizado!',
                    text: 'Usuário foi criado com sucesso',
                    icon: 'success',
                    timer: 4000,
                    confirmButtonText: 'Continuar'
                });
                navigate(`/login?redirectTo=${redirectTo}`);
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
        senha,
        senhaValidation,
        error,
        loading,
        override,
        showPassword,
        showConfirmPassword,
        email,
        setNome,
        setSenha,
        setSenhaValidation,
        handleSubmit,
        handleChangeNome,
        handleChangeSenha,
        handleChangeSenhaValidation,
        toggleShowPassword,
        toggleShowConfirmPassword
    };
};

export default useCadastroTokenViewModel;
