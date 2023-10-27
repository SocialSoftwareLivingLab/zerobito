import React from 'react';
import Menu from '../../components/Menu';
import TabelaAcompanhamento from '../../components/Tabelas/TabelaAcompanhamento';
import TabelaOcorencia from '../../components/Tabelas/TabelaOcorrencia';
import './style.css';

const eventos = [
  { id: 1, denuncia: 'Denúncia 1', data: '01/01/2023', condicaoAcidentado: 'Estável', gravidade: 'Baixa', andamentoCaso: 'Em Análise' },
  { id: 2, denuncia: 'Denúncia 2', data: '02/02/2023', condicaoAcidentado: 'Grave', gravidade: 'Alta', andamentoCaso: 'Em Análise' },
  { id: 3, denuncia: 'Denúncia 3', data: '03/03/2023', condicaoAcidentado: 'Estável', gravidade: 'Média', andamentoCaso: 'Em Análise' },
  { id: 4, denuncia: 'Denúncia 4', data: '04/04/2023', condicaoAcidentado: 'Grave', gravidade: 'Alta', andamentoCaso: 'Em Análise' },
  { id: 5, denuncia: 'Denúncia 5', data: '05/05/2023', condicaoAcidentado: 'Estável', gravidade: 'Baixa', andamentoCaso: 'Em Análise' },
  { id: 6, denuncia: 'Denúncia 6', data: '06/06/2023', condicaoAcidentado: 'Grave', gravidade: 'Alta', andamentoCaso: 'Em Análise' },
  { id: 7, denuncia: 'Denúncia 7', data: '07/07/2023', condicaoAcidentado: 'Estável', gravidade: 'Média', andamentoCaso: 'Em Análise' },
  { id: 8, denuncia: 'Denúncia 8', data: '08/08/2023', condicaoAcidentado: 'Grave', gravidade: 'Alta', andamentoCaso: 'Em Análise' },
  { id: 9, denuncia: 'Denúncia 9', data: '09/09/2023', condicaoAcidentado: 'Estável', gravidade: 'Baixa', andamentoCaso: 'Em Análise' },
  { id: 10, denuncia: 'Denúncia 10', data: '10/10/2023', condicaoAcidentado: 'Grave', gravidade: 'Alta', andamentoCaso: 'Em Análise' },
  { id: 11, denuncia: 'Denúncia 11', data: '11/11/2023', condicaoAcidentado: 'Estável', gravidade: 'Média', andamentoCaso: 'Em Análise' },
];

const Home = () => {
  return (
    <div>
      <Menu />
      <div className='container-header'>
        <h1>Painel de Controle</h1>
        <div className="text">
          Aqui o cordenador local consegue vizualizar  e gerenciar novos casos/denuncias adicionadas
          ao sistema e tambem os casos que ele já aceitou acompanhar
        </div>
      </div>
      <div className='busca'>

      </div >
      <div className='container-content'>
        <TabelaOcorencia eventos={eventos} /> { }
        <TabelaAcompanhamento eventos={eventos} /> { }
      </div>
      <div className='container-content-imprensa'>
        <h2>Noticias da Imprensa | Alerta de Caso <button>Fazer Denuncia a partir de noticia</button></h2>
        <hr />
        <h2>SINAN, RAAT, SIM <button>Fazer Denuncia a partir dos Serviços de Saude</button></h2>
        <hr />
      </div>
    </div>
  );
}

export default Home;