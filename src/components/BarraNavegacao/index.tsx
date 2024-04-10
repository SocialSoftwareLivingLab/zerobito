import React from 'react';
import { BiSolidHelpCircle } from 'react-icons/bi';
import { BsBookmarkFill } from 'react-icons/bs';
import { FaMicrophone, FaUniversity } from 'react-icons/fa';
import ItemAbaNavegacao from './Item';
import { Links, NavbarAcoesContainer, NavbarContainer, NavbarHomeContainer } from './styles';
import { FiLogOut } from 'react-icons/fi';
import { useUsuarioAutenticado } from '../../contexts/usuario-autenticado';

export default function BarraNavegacao(): JSX.Element {
    const { data, logout } = useUsuarioAutenticado();

    return (
        <NavbarContainer>
            <NavbarHomeContainer to="/">
                <span className="Zer">Zer</span>
                <span className="Obito">Óbito</span>
            </NavbarHomeContainer>
            {data?.token && (
                <NavbarAcoesContainer>
                    <Links>
                        <ItemAbaNavegacao
                            titulo="Biblioteca de Casos"
                            icone={<BsBookmarkFill />}
                            url="#/#/#"
                        />
                        <ItemAbaNavegacao
                            titulo="Materiais para Consulta"
                            icone={<FaUniversity />}
                            url="#"
                        />
                        <ItemAbaNavegacao
                            titulo="Imprensa"
                            icone={<FaMicrophone />}
                            url="#/#/#/#/#/#/#/#"
                        />
                        <ItemAbaNavegacao
                            titulo="Ajuda"
                            icone={<BiSolidHelpCircle />}
                            url="#/#/#"
                        />
                        <ItemAbaNavegacao
                            titulo="Biblioteca de Casos"
                            icone={<BsBookmarkFill />}
                            url="#/#/#"
                        />

                        <ItemAbaNavegacao
                            titulo="Sair"
                            icone={<FiLogOut />}
                            url="#"
                            action={() => logout()}
                        />
                    </Links>
                </NavbarAcoesContainer>
            )}
        </NavbarContainer>
    );
}
