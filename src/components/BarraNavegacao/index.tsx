import React from 'react';
import { BiSolidHelpCircle } from 'react-icons/bi';
import { BsBookmarkFill } from 'react-icons/bs';
import { FaMicrophone, FaUniversity } from 'react-icons/fa';
import ItemAbaNavegacao from './Item';
import { Links, NavbarAcoesContainer, NavbarContainer, NavbarHomeContainer } from './styles';

export default function BarraNavegacao() {
    return (
        <NavbarContainer>
            <NavbarHomeContainer>
                <span className="Zer">Zer</span>
                <span className="Obito">Óbito</span>
            </NavbarHomeContainer>
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
                    <ItemAbaNavegacao titulo="Ajuda" icone={<BiSolidHelpCircle />} url="#/#/#" />
                    <ItemAbaNavegacao
                        titulo="Biblioteca de Casos"
                        icone={<BsBookmarkFill />}
                        url="#/#/#"
                    />
                </Links>
            </NavbarAcoesContainer>
        </NavbarContainer>
    );
}
