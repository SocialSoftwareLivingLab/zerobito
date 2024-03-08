import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle } from "react-icons/fa";
import { LiaPaperPlane } from "react-icons/lia";
import './style.css';
import { GoInfo } from "react-icons/go";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoBagAdd } from "react-icons/io5";

const TabelaOcorrencia = ({ eventos }) => {
  const itemsPerPage = 6; // Número máximo de itens por página
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
      <div className='table-header'>
      <h2>Comunicação de Evento <Link to="/ocorrencia"><button className='button-novo-evento'> <IoBagAdd />Adicionar novo evento</button></Link></h2>
     
      </div>
      <table>
        <thead>
          <tr>
            <th style={{width: '15%'}}>Denúncia</th>
            <th style={{width: '10%'}}>Data</th>
            <th style={{width: '20%'}}>Condição do Acidentado</th>
            <th style={{width: '15%'}}>Gravidade</th>
            <th style={{width: '15%'}}>Andamento de Caso</th>
            <th style={{width: '35%'}}>Ação</th>
          </tr>
        </thead>
        <tbody>
          {eventosPaginaAtual.map((evento) => (
            <tr key={evento.id}>
              <td>{evento.denuncia}</td>
              <td>{evento.data}</td>
              <td>{evento.condicaoAcidentado}</td>
              <td>
              <span className={`quadrado ${evento.gravidade === 'Muito Urgente' ? 'vermelho' : evento.gravidade === 'Emergencial' ? 'vinho' : evento.gravidade === 'Pouca Urgencia' ? 'amarelo-claro' : evento.gravidade === 'Urgencia' ? 'amarelo' : 'vazio'}`}>{evento.gravidade}
                {evento.gravidade && (
                  <>
                    <GoInfo title={`Explicação do evento: ${evento.gravidade}`} />
                  </>
                )}
              </span>
              </td>
              <td>{evento.status}</td>
              <td>
                <button className='button-tabela-aceitar' onClick={() => {}}> <FaCheckCircle /> Aceitar</button>
                <button className='button-nao-incorporar' onClick={() => {}}><LiaPaperPlane /> Não Incorporar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>Anterior </button>
        <button onClick={nextPage} disabled={currentPage === Math.ceil(eventos.length / itemsPerPage)}>Próxima</button>
        <span className="page-info">{currentPage} / {Math.ceil(eventos.length / itemsPerPage)}</span>
      </div>
    </div>
  );
}

export default TabelaOcorrencia;