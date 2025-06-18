import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import SignupTokenCard from '../../components/CadastroToken/index.tsx';

function CadastroConvite() {
    return (
        <div>
            <div className="container-principal-register">
                <SignupTokenCard />
                <div className="text-login">
                    Caso ja tenha uma conta, <Link to="../login">Clique Aqui</Link>
                </div>
            </div>
        </div>
    );
}

export default CadastroConvite;
