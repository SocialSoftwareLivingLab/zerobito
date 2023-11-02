import React from 'react';
import { Link } from 'react-router-dom';
import '../style.css';

const TabelaOcorrencia = ({ eventos }) => {
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
          {eventos.map((evento) => (
            <tr key={evento.id}>
              <td>{evento.denuncia}</td>
              <td>{evento.data}</td>
              <td>{evento.condicaoAcidentado}</td>
              <td>{evento.gravidade}</td>
              <td>{evento.andamentoCaso}</td>
              <td>
                <button onClick={() => {}}>Agrupar</button>
                <button onClick={() => {}}>Aceitar</button>
                <button onClick={() => {}}>Não Incorporar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TabelaOcorrencia;