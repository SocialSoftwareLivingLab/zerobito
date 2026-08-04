import React, { useState } from 'react';
import './style-lib.css';

const TabelaBiblioteca = ({ eventos }) => {
    const itemsPerPage = 8; // Número máximo de itens por página
    const [currentPage, setCurrentPage] = useState(1);

    // Calcule o índice inicial e final dos itens a serem exibidos na página atual
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Filtrar os eventos a serem exibidos na página atual
    const eventosPaginaAtual = eventos.slice(startIndex, endIndex);

    // Função para avançar para a próxima página
    const nextPage = () => {
        if (currentPage < Math.ceil(eventos.length / itemsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    // Função para voltar para a página anterior
    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="table-container">
            <div className="table-header">
                <h2>Todos os Casos</h2>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>
                            <input type="checkbox" />
                        </th>
                        <th>Data</th>
                        <th>Denúncia</th>
                        <th>Causa</th>
                        <th>Gravidade</th>
                        <th>Status</th>
                        <th>Cidade</th>
                        <th>Região</th>
                    </tr>
                </thead>
                <tbody>
                    {eventosPaginaAtual.map((evento) => (
                        <tr key={evento.id}>
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td>{evento.data}</td>
                            <td>{evento.denuncia}</td>
                            <td>{evento.causa}</td>
                            <td>
                                <span
                                    className={`quadrado ${evento.gravidade === 'Investigado' ? 'verde' : 'laranja'}`}>
                                    {evento.gravidade}
                                </span>
                            </td>
                            <td>{evento.status}</td>
                            <td>{evento.cidade}</td>
                            <td>{evento.regiao}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                <button onClick={prevPage} disabled={currentPage === 1}>
                    Anterior
                </button>
                <button
                    onClick={nextPage}
                    disabled={currentPage === Math.ceil(eventos.length / itemsPerPage)}>
                    Próxima
                </button>
            </div>
        </div>
    );
};

export default TabelaBiblioteca;
