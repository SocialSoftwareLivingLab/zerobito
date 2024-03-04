import React, { useState } from 'react';
import { LuEye } from "react-icons/lu";
import '../style.css';

const TabelaAcompanhamento = ({ eventos }) => {
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const eventosPaginaAtual = eventos.slice(startIndex, endIndex);

  const nextPage = () => {
    if (currentPage < Math.ceil(eventos.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className='table-container'>
      <h2>Casos</h2>
      <table>
        <thead>
          <tr>
            <th>Denúncia</th>
            <th>Data</th>
            <th>Condição do Acidentado</th>
            <th>Gravidade</th>
            <th>Andamento de Caso</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {eventosPaginaAtual.map((evento) => (
            <tr key={evento.id}>
              <td>{evento.denuncia}</td>
              <td>{evento.data}</td>
              <td>{evento.condicao}</td>
              <td>
              <span className={`quadrado ${evento.gravidade === 'Investigado' ? 'verde' : 'laranja'}`}>{evento.gravidade}</span>
              </td>
              <td>{evento.andamentoCaso}</td>
              <td>
                <button onClick={() => {}}><LuEye />Acompanhar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        
        <button onClick={prevPage} disabled={currentPage === 1}>Anterior</button>
        <button onClick={nextPage} disabled={currentPage === Math.ceil(eventos.length / itemsPerPage)}>Próxima</button>
      </div>
    </div>
  );
}

export default TabelaAcompanhamento;