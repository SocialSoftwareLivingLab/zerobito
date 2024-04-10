import React from 'react';
import './style.css';

interface HeaderProps {
    title: string;
    explicacao: string;
}

function Header({ title, explicacao }: HeaderProps): JSX.Element {
    return (
        <div>
            <div className="container-header">
                <h1>{title}</h1>
                <div className="text">{explicacao}</div>
            </div>
        </div>
    );
}

export default Header;
