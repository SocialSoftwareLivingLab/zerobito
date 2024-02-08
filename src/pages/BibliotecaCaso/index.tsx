import React from 'react';
import Menu from "../../components/Menu/index.tsx";
import "./style.css";

function BibliotecaCasos(){
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
                <button className="search-container-observatorio" type="submit" >Observatório ZerÓbito</button>
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
            <div className='casos-acompanhados'>
                <div className='casos-acompanhados-header'>
                    <h1>Todos os casos</h1>
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
                </div>
                <div className='lista-casos-acompanhados'>

                </div>
            </div>
        </div>
    );
};

export default BibliotecaCasos;