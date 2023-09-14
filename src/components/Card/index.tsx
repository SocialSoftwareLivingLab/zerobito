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
                <div className="header-card">
                    {title}
                </div>
                <div className="body-card">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Card;