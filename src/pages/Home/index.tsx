import React from 'react';
import Menu from '../../components/Menu';
import useHomeViewModel from './view.model'
import TabelaAcompanhamento from '../../components/Tabelas/TabelaAcompanhamento';
import TabelaOcorencia from '../../components/Tabelas/TabelaOcorrencia';
import './style.css';
import {Link} from "react-router-dom";
import ComunicacaoEvento from '../Ocorrencia/index.tsx';

const Home = () => {
  const { eventos } = useHomeViewModel();
  
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
        <TabelaOcorencia eventos={eventos} />
        <TabelaAcompanhamento eventos={eventos} />
      </div>
    </div>
  );
}

export default Home;