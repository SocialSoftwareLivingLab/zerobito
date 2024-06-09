import React from 'react';
import './style.css';
import Container from '../Container';

interface HeaderProps {
    titulo: string;
    explicacao: string;
}

function Header({ titulo: title, explicacao }: HeaderProps): JSX.Element {
    return (
        <div>
            <Container className="container-header">
                <h1>{title}</h1>
                <div className="text">{explicacao}</div>
            </Container>
        </div>
    );
}

export default Header;
