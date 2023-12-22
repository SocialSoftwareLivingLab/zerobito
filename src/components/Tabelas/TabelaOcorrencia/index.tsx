import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../style.css';

const TabelaOcorrencia = ({ eventos }) => {
  const itemsPerPage = 12; // Número máximo de itens por página
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
    <div className='table-container'>
      <h2>Comunicação de Evento <Link to="/ocorrencia"><button>Adicionar</button></Link></h2>
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
              <td>{evento.condicaoAcidentado}</td>
              <td>{evento.gravidade}</td>
              <td>{evento.status}</td>
              <td>
                <button className='button-tabela-aceitar' onClick={() => {}}>Aceitar</button>
                <button onClick={() => {}}>Não Incorporar</button>
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

export default TabelaOcorrencia;