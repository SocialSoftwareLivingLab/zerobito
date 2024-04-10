import { CSSProperties, useState } from 'react';
import { redirect } from 'react-router-dom';
import { login } from '../../common/models/user/auth';
import { useUsuarioAutenticado } from '../../contexts/usuario-autenticado';

const useLoginViewModel = () => {
    const [email, setEmail] = useState<string>('');
    const [senha, setSenha] = useState<string>('');
    const [error, setError] = useState<string>();

    const { login: setData } = useUsuarioAutenticado();
    const [loading, setLoading] = useState(false);

    const token = localStorage.getItem('token');
    if (token) {
        redirect('/home');
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
            redirect('/home');
        } catch (error) {
            setLoading(false);
            setError('E-mail e/ou senha incorretos');
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
