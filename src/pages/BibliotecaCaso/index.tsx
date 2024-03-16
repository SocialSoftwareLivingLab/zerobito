import React from 'react';
import Menu from "../../components/Menu/index.tsx";
import "./style.css";
import {useHistory} from 'react-router-dom';
import TabelaBiblioteca from '../../components/Tabelas/TabelaBiblioteca/index.tsx';
import useHomeViewModel from '../Home/view.model.ts';


function BibliotecaCasos(){

    const history = useHistory();

    const handleObservatorioClick = () => {
        history.push('/observatorio')
    }

    const { eventos } = useHomeViewModel();

    return(
        <div className="Contato">
            <Menu />
            <div className="container-header">
                <h1>Biblioteca de Casos</h1>
                <div className="container-contato">
                    <div className='text'>
                        Aqui o VISITANTE EXTERNO consulta os casos disponíveis na biblioteca
                    </div>
                </div>
            </div>
            <div className='search-container'>
                <input type="text" value="digite alguma coisa"/>
                <button className='search-container-pesquisar' type="submit" >Pesquisar</button>
                <button className="search-container-observatorio" type="submit" onClick={handleObservatorioClick}>Observatório ZerÓbito</button>
            </div>
            <div className='casos-acompanhados'>
                <div className='casos-acompanhados-header'>
                    <h1>Casos que você acompanha</h1>
                </div>
                <div className='indices-casos'>
                    <input type="checkbox"/>
                    <label>Data</label>
                    <label>Denúncia</label>
                    <label>Causa</label>
                    <label>Gravidade</label>
                    <label>Status</label>
                    <label>Cidade</label>
                    <label>Região</label>
                    <button type='submit'>Ver release</button>
                </div>
                <div className='lista-casos-acompanhados'>

                </div>
            </div>
            <div className='tabela_biblioteca'>
                <TabelaBiblioteca eventos={eventos} />
            </div>
        </div>
    );
};

export default BibliotecaCasos;