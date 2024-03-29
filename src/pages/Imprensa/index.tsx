import React from 'react';
import Menu from '../../components/BarraNavegacao';
import './style.css';

const Imprensa = () => {
    const noticias = [
        {
            titulo: 'ZerObito lança nova versão do software',
            data: '10 de agosto de 2021',
            descricao:
                'A ZerObito anunciou hoje o lançamento da versão 2.0 do seu software de segurança cibernética.'
        },
        {
            titulo: 'ZerObito é destaque em conferência de segurança',
            data: '5 de agosto de 2021',
            descricao:
                'O CEO da ZerObito, João Silva, apresentou a palestra de abertura da conferência anual de segurança cibernética.'
        },
        {
            titulo: 'ZerObito recebe investimento de R$ 10 milhões',
            data: '1 de agosto de 2021',
            descricao:
                'A ZerObito anunciou hoje que recebeu um investimento de R$ 10 milhões da empresa de capital de risco XYZ.'
        }
    ];

    return (
        <div>
            <Menu />
            <h1>Esta é a página da imprensa</h1>
            <h2>Notícias recentes</h2>
            {noticias.map((noticia, index) => (
                <div key={index}>
                    <h3>{noticia.titulo}</h3>
                    <p>{noticia.data}</p>
                    <p>{noticia.descricao}</p>
                </div>
            ))}
        </div>
    );
};

export default Imprensa;
