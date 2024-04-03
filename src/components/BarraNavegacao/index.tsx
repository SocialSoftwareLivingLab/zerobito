import React from 'react';
import { BiSolidHelpCircle } from 'react-icons/bi';
import { BsBookmarkFill } from 'react-icons/bs';
import { FaMicrophone, FaUniversity } from 'react-icons/fa';
import ItemAbaNavegacao from './Item';
import { Links, NavbarAcoesContainer, NavbarContainer, NavbarHomeContainer } from './styles';

interface BarProps {
    token: boolean;
}

export default function BarraNavegacao({ token = true }: BarProps): JSX.Element {
    return (
        <NavbarContainer>
            <NavbarHomeContainer to="/">
                <span className="Zer">Zer</span>
                <span className="Obito">Óbito</span>
            </NavbarHomeContainer>
            {token && (
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
                    </Links>
                </NavbarAcoesContainer>
            )}
        </NavbarContainer>
    );
}
