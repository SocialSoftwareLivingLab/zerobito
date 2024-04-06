import { useState, CSSProperties } from 'react';
import { useHistory } from 'react-router-dom';
import { login } from '../../common/models/user/auth';
import { useUsuarioAutenticado } from '../../contexts/usuario-autenticado';
import axios from 'axios';
import { ValidateError } from '../../common/Errors/ValidateError';

const useLoginViewModel = () => {
    const history = useHistory();
    const [email, setEmail] = useState<string>('');
    const [senha, setSenha] = useState<string>('');
    const [error, setError] = useState<string>();

    const { login: setData } = useUsuarioAutenticado();
    const [loading, setLoading] = useState(false);

    const token = localStorage.getItem('token');
    if (token) {
        history.replace('/home');
    }

    const override: CSSProperties = {
        display: 'block',
        margin: '0 auto',
        textAlign: 'center',
        justifyContent: 'center',
        overflow: 'auto',
        position: 'absolute',
        top: '51%',
        left: '48%',
        transform: 'transalate(-50%, -50%)'
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const response = await login({ email, senha });
            setData({
                token: response.token,
                nome: response.usuario.nome,
                email: response.usuario.email,
                perfil: response.usuario.perfil
            });
            setLoading(false);
            history.replace('/login');
        } catch (error) {
            setLoading(false);
            if (axios.isAxiosError<ValidateError, Record<string, unknown>>(error)) {
                setError(String(error.response.data.message));
            }
        }
    };

    const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        setEmail(value);
    };

    const handleChangeSenha = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        setSenha(value);
    };

    return {
        email,
        senha,
        error,
        loading,
        override,
        handleSubmit,
        handleChangeEmail,
        handleChangeSenha
    };
};

export default useLoginViewModel;
