import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { login } from '../../common/models/user/auth';
import { useUsuarioAutenticado } from '../../contexts/usuario-autenticado';

const useLoginViewModel = () => {
    const history = useHistory();
    const [email, setEmail] = useState<string>('');
    const [senha, setSenha] = useState<string>('');
    const [error, setError] = useState<string>();

    const { login: setData } = useUsuarioAutenticado();

    const token = localStorage.getItem('token');
    if (token) {
        history.replace('/home');
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await login({ email, senha });
            setData({
                token: response.token,
                nome: response.usuario.nome,
                email: response.usuario.email,
                perfil: response.usuario.perfil
            });
            history.replace('/login');
        } catch (error) {
            setError('Erro ao tentar fazer login.');
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
        handleSubmit,
        handleChangeEmail,
        handleChangeSenha
    };
};

export default useLoginViewModel;
