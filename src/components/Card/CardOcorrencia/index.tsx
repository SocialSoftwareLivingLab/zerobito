import React from 'react';
import './style.css';

interface CardProps {
    title: string;
    children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, children }) => {
    return (
        <div className="Card">
            <div className="container">
                <div className="title">
                    <h2>Encaminhar Denuncia</h2>
                    <b>x</b>
                </div>
               <form>
                    <input type="text" placeholder="Email" />
                    <input type="text" placeholder="Institução" />
                    <input type="text" placeholder="Descreva o motivo do convite" />
                    <button>Cancelar</button>
                    <button type="submit">Enviar</button>
               </form>
            </div>
        </div>
    );
}

export default Card;