import React from 'react';
import './style.css'; // Se você desejar adicionar estilos específicos

const TabelaEvento = ({ eventos }) => {
  return (
    <div className='table-container'>
      <h2>Comunicação de Evento</h2>
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
                <button onClick={() => {/* função para agrupar */}}>Agrupar</button>
                <button onClick={() => {/* função para aceitar */}}>Aceitar</button>
                <button onClick={() => {/* função para não incorporar */}}>Não Incorporar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TabelaEvento;