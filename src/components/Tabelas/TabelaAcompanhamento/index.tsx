import React from 'react';
import '../style.css'; // Se você desejar adicionar estilos específicos

const TabelaAcompanhamento = ({ eventos }) => {
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
          {eventos.map((evento) => (
            <tr key={evento.id}>
              <td>{evento.denuncia}</td>
              <td>{evento.data}</td>
              <td>{evento.condicaoAcidentado}</td>
              <td>{evento.gravidade}</td>
              <td>{evento.andamentoCaso}</td>
              <td>
                <button onClick={() => {/* função para agrupar */}}>Acompanhar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TabelaAcompanhamento;