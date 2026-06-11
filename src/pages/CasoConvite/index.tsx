import React, { useEffect } from 'react';
import { ConvitePageContainer, DadosConviteContainer } from './styles';
import { Button } from '../../components/ui/Button';
import { MdOutgoingMail } from 'react-icons/md';
import { aceitarConviteMembroGrupo } from '../../common/api/casos/grupo-trabalho/aceitar-convite';
import { useNavigate, useParams } from 'react-router-dom';
import { UsuarioAutenticado } from '../../contexts/usuario-autenticado/model';
import { buscarEmailConvite } from '../../common/api/casos/grupo-trabalho/get-email-convidado';
import Swal from 'sweetalert2';
import { recusarConviteMembroGrupo } from '../../common/api/casos/grupo-trabalho/recusar-convite';

export default function CasoConvite() {
    const { token } = useParams();
    const navigate = useNavigate();
    const redirectTo = window.location.pathname;

    const [logoutDone, setLogoutDone] = React.useState(false);

    useEffect(() => {
        const tokenArmazenado = localStorage.getItem('token');
        if (!tokenArmazenado) return;

        const usuarioSalvo = JSON.parse(localStorage.getItem('usuario') || '{}') as Exclude<
            UsuarioAutenticado,
            'token'
        >;

        const verificarEmail = async () => {
            try {
                const response = await buscarEmailConvite(token);
                const emailDoConvite = response.email;

                if (!usuarioSalvo?.email || usuarioSalvo.email !== emailDoConvite) {
                    // Logout + redirecionar
                    localStorage.removeItem('token');
                    localStorage.removeItem('usuario');
                    setLogoutDone(true);
                    Swal.fire({
                        text: 'Por favor faça login com o e-mail convidado.',
                        icon: 'error',
                        timer: 2000,
                        showConfirmButton: false,
                        position: 'center',
                        toast: true
                    });
                }
            } catch (err) {
                Swal.fire({
                    text: 'Convite não encontrado.',
                    icon: 'error',
                    timer: 2000,
                    showConfirmButton: false,
                    position: 'center',
                    toast: true
                });

                navigate('/login');
            }
        };

        verificarEmail();
    }, [token, navigate, redirectTo]);

    if (logoutDone) {
        window.location.href = `/login?redirectTo=${redirectTo}`;
        return null;
    }

    const handleAceitar = async () => {
        const tokenArmazenado = localStorage.getItem('token');
        if (!tokenArmazenado) {
            navigate(`/login?redirectTo=${redirectTo}`);
            return;
        }

        try {
            await aceitarConviteMembroGrupo(token);
            await Swal.fire({
                title: 'Convite aceito!',
                text: 'Você agora faz parte do caso x.',
                icon: 'success',
                timer: 4000,
                confirmButtonText: 'Continuar para a home'
            });
            navigate('/home');
        } catch (error) {
            Swal.fire({
                text: 'Erro ao aceitar convite.',
                icon: 'error',
                timer: 2000,
                showConfirmButton: false,
                position: 'center',
                toast: true
            });
        }
    };
    const handleRecusar = async () => {
        const tokenArmazenado = localStorage.getItem('token');
        if (!tokenArmazenado) {
            navigate(`/login?redirectTo=${redirectTo}`);
            return;
        }

        try {
            await recusarConviteMembroGrupo(token);
            await Swal.fire({
                title: 'Convite recusado com sucesso',
                icon: 'success',
                timer: 4000,
                confirmButtonText: 'Continuar para a home'
            });
            navigate('/home');
        } catch (error) {
            Swal.fire({
                text: 'Erro ao recusar convite.',
                icon: 'error',
                timer: 2000,
                showConfirmButton: false,
                position: 'center',
                toast: true
            });
        }
    };

    return (
        <ConvitePageContainer>
            <DadosConviteContainer>
                <header>
                    <span>ZerÓbito</span>
                    <span>
                        <MdOutgoingMail /> Olá, você tem um convite
                    </span>
                </header>
                <section>
                    <span>Nome e Sobrenome</span>, da <span>Instituição ABC</span>, convidou você
                    para contribuir com o caso Nº<span>12345</span>
                </section>
                <section>
                    <strong>Dados do caso</strong>
                    <span>
                        Acidente envolvendo X pessoas, com causas primárias, secundárias e
                        determinado nível de gravidade. Denunciado em uma data.
                    </span>
                </section>
                <section>
                    <Button type="submit" action={handleAceitar}>
                        Aceitar
                    </Button>
                    <Button type="cancel" action={handleRecusar}>
                        Recusar
                    </Button>
                    <Button>Indicar outro ator</Button>
                </section>
            </DadosConviteContainer>
        </ConvitePageContainer>
    );
}
