import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import SignupCard from '../../components/Register/index.tsx';

function Cadastro() {
    return (
        <div>
            <div className="container-principal-register">
                <SignupCard />
                <div className="text-login">
                    Caso ja tenha uma conta, <Link to="../login">Clique Aqui</Link>
                </div>
            </div>
        </div>
    );
}

export default Cadastro;
