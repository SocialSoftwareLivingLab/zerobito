import { CSSProperties, useState } from 'react';
import { login } from '../../common/models/user/auth';
import { useUsuarioAutenticado } from '../../contexts/usuario-autenticado';
import { esqueciSenha } from '../../common/models/user/forgot.user';
import Swal from 'sweetalert2';

const useEsqueciSenhaViewModel = () => {
    const [email, setEmail] = useState<string>('');
    const [error, setError] = useState<string>();

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const response = await esqueciSenha(email);
            setLoading(false);
            await Swal.fire({
                title: 'Email enviado!',
                text: 'Um e-mail foi enviado com o link para redefinir a senha.',
                icon: 'success',
                timer: 4000,
                confirmButtonText: 'Continuar'
            });
        } catch (error) {
            setLoading(false);
            setError('E-mail não encontrado');
        }
    };

    const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        setEmail(value);
    };

    return {
        email,
        error,
        loading,
        override,
        handleSubmit,
        handleChangeEmail
    };
};

export default useEsqueciSenhaViewModel;
