import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle } from "react-icons/fa";
import { LiaPaperPlane } from "react-icons/lia";
import './style.css';
import { GoInfo } from "react-icons/go";
import { IoBagAdd } from "react-icons/io5";
import { IoMdCloseCircle } from "react-icons/io";

const TabelaOcorrencia = ({ eventos }) => {
  const itemsPerPage = 6; // Número máximo de itens por página
  const [currentPage, setCurrentPage] = useState(1);
  const [showCard, setShowCard] = useState(false);
  const [showMonitorCard, setMonitorCard] = useState(false);
  const [showEncaminharCard, setEncaminharCard] = useState(false);
  const [email, setEmail] = useState('');
  const [instituicao, setInstituicao] = useState('');
  const [descricao, setDescricao] = useState('');

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

  const openMonitorCard = () => {
    setMonitorCard(true);
  }

  const closeMonitorCard = () => {
    setMonitorCard(false);
  }

  const openEncaminharCard = () => {
    setEncaminharCard(true);
  }

  const closeEncaminharCard = () => {
    setEncaminharCard(false);
  }


  // Função para abrir o card
  const openCard = () => {
    setShowCard(true);
  };

  // Função para fechar o card
  const closeCard = () => {
    setShowCard(false);
  };


  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleInstituicaoChange = (event) => {
    setInstituicao(event.target.value);
  };

  const handleDescricaoChange = (event) => {
    setDescricao(event.target.value);
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
              <span className={`quadrado ${evento.gravidade === 'Muito Urgente' ? 'vermelho' : evento.gravidade === 'Emergencial' ? 'vinho' : evento.gravidade === 'Pouca Urgência' ? 'amarelo-claro' : evento.gravidade === 'Urgência' ? 'amarelo' : 'vazio'}`}>{evento.gravidade}
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
                <button className='button-nao-incorporar' onClick={() => {openCard()}}><LiaPaperPlane /> Não Incorporar</button>
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
      {showCard && (
        <div className="card-overlay">
          <div className="card">
            <button onClick={() => { closeCard(); openMonitorCard(); }}>Monitorar Denúncia</button>
            <button onClick={() => {closeCard(); openEncaminharCard();}}>Encaminhar Denúncia</button>
            <button className='close-button' onClick={closeCard}><IoMdCloseCircle /></button>
          </div>
        </div>
      )}
      {showMonitorCard && (
        <div className='card-overlay'>
            <div className='card'>
              <h2>Monitorar denúncia por</h2>
              <button className='dias-monitoramento' onClick={closeMonitorCard}>7 dias</button>
              <button className='dias-monitoramento' onClick={closeMonitorCard}>30 dias</button>
              <button className='dias-monitoramento' onClick={closeMonitorCard}>60 dias</button>
              <button className='dias-monitoramento' onClick={closeMonitorCard}>90 dias</button>
              <button className='close-button' onClick={closeMonitorCard}><IoMdCloseCircle /></button>

            </div>
        </div>
      )}
      {showEncaminharCard && (

        <div className='card-overlay'>
          <div className='card'>
            <h2>Encaminhar denúnica</h2>
            <div className="input-wrapper">
              <input placeholder= "E-mail" type="email" id="email" value={email} onChange={handleEmailChange} />
            </div>
            <div className="input-wrapper">
              <input placeholder="Instituição" type="text" id="instituicao" value={instituicao} onChange={handleInstituicaoChange} />
            </div>
            <div className="input-wrapper">
              <textarea className='convite' placeholder= "Descreva o motivo do convite" id="descricao" value={descricao} onChange={handleDescricaoChange}></textarea>
            </div>
            <button className='close-button' onClick={closeEncaminharCard}><IoMdCloseCircle /></button>

            <button className='botoes-guia' onClick={closeEncaminharCard}>Cancelar</button>
            <button className='botoes-guia' onClick={closeEncaminharCard}><LiaPaperPlane /> Enviar</button>
          </div>
        </div>
      )
      }
    </div>
    
  );
}

export default TabelaOcorrencia;