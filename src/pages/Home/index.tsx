import React from 'react';
import Menu from '../../components/Menu';
import Header from '../../components/Page-Header';
import useHomeViewModel from './view.model'
import TabelaAcompanhamento from '../../components/Tabelas/TabelaAcompanhamento';
import TabelaOcorencia from '../../components/Tabelas/TabelaOcorrencia';
import './style.css';
import {Link} from "react-router-dom";
import ComunicacaoEvento from '../NovaOcorrencia/index.tsx';
import { TabelaOcorrenciaNovo } from '../../components/Tabelas/TabelaOcorrenciaNovo/index.tsx';

const Home = () => {
  const { eventos } = useHomeViewModel();
  
  return (
    <div>
      <Header title='Painel de Controle' explicacao='Aqui o cordenador local consegue visualizar  e gerenciar novos casos/denuncias adicionadas
          ao sistema e tambem os casos que ele já aceitou acompanhar'/>
      <div className='busca'>
      </div >
      <div className='container-content'>
        {/* <TabelaOcorrencias titulo="Comunicacao de'/> */}
        <TabelaOcorrenciaNovo ocorrencias={eventos}/>
        <TabelaOcorencia eventos={eventos} />
        {/* <TabelaAcompanhamento eventos={eventos} /> */}
      </div>
      <div className='container-content-imprensa'>
        <h2>Noticias da Imprensa | Alerta de Caso <Link to="/ocorrencia"><button className='button-denuncia'>Fazer Denuncia a partir de noticia</button></Link></h2>
        <hr />
        <h2>SINAN, RAAT, SIM <button className='button-denuncia'>Fazer Denuncia a partir dos Serviços de Saude</button></h2>
        <hr />
      </div>
    </div>
  );
}

export default Home;