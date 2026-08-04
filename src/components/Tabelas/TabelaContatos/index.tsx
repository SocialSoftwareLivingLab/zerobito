import React from 'react';
import '../style.css';

const contato = [
    {
        id: 1,
        name: 'Ministério Público',
        phoneNumber: '(XX) XXXX-XXXX',
        email: ''
    },
    {
        id: 2,
        name: 'Emergência em Saúde Pública',
        phoneNumber: '192',
        email: ''
    },
    {
        id: 3,
        name: 'Ceres Regional',
        phoneNumber: '(XX) XXXX-XXXX',
        email: ''
    },
    {
        id: 4,
        name: 'Anvisa',
        phoneNumber: '(XX) XXXX-XXXX',
        email: ''
    }
];

const TabelaContatos = () => {
    return (
        <div className="table-container">
            <center>
                <h2>Contatos Importantes</h2>
            </center>
            <table>
                <thead>
                    <tr>
                        <th>Nome do Orgão Publico</th>
                        <th>Ramal</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {contato.map((contato) => (
                        <tr key={contato.id}>
                            <td>{contato.name}</td>
                            <td>{contato.phoneNumber}</td>
                            <td>{contato.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TabelaContatos;
