import React from 'react';
import './style.css';
import Menu from '../Menu';

interface HeaderProps {
    title: string;
    explicacao: string;
}

function Header({ title, explicacao }: HeaderProps): JSX.Element {
    return (
        <div>
            <Menu />
            <div className='container-header'>
                <h1>{title}</h1>
                <div className="text">
                    {explicacao}
                </div>
            </div>
        </div>
    );
}


export default Header;