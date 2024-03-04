import React from 'react';
import Menu from '../../components/Menu';
import useHomeViewModel from './view.model'
import TabelaAcompanhamento from '../../components/Tabelas/TabelaAcompanhamento';
import TabelaOcorencia from '../../components/Tabelas/TabelaOcorrencia';
import { ocorrencias } from '../../common/models/ocorrencias/ocorrencias_testes.ts';
import './style.css';

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
        <TabelaOcorencia eventos={ocorrencias} />
        <TabelaAcompanhamento eventos={ocorrencias} />
      </div>
      <div className='container-content-imprensa'>
        <h2>Noticias da Imprensa | Alerta de Caso <button className='button-denuncia'>Fazer Denuncia a partir de noticia</button></h2>
        <hr />
        <h2>SINAN, RAAT, SIM <button className='button-denuncia'>Fazer Denuncia a partir dos Serviços de Saude</button></h2>
        <hr />
      </div>
    </div>
  );
}

export default Home;