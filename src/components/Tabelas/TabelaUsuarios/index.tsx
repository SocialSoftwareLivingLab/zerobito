import React from 'react';
import '../style.css'; // Se você desejar adicionar estilos específicos

const TabelaAcompanhamento = ({ usuarios }) => {
    return (
        <div className="table-container">
            <h2>Usuarios Cadastrados</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario) => (
                        <tr key={usuario.id}>
                            <td>{usuario.nome}</td>
                            <td>{usuario.email}</td>
                            <td>
                                <button
                                    onClick={() => {
                                        /* função para agrupar */
                                    }}
                                >
                                    Inativar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TabelaAcompanhamento;
