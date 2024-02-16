import React from 'react';
import Menu from "../../components/Menu/index.tsx";
import "./style.css";

function Material(){
    return(
        <div className="Contato">
            <Menu />
            <div className="container-header">
                <h1>Materiais para Consulta</h1>
                <div className="container-contato">
                    <div className='text'>
                        Aqui o Coordenador Geral tem acesso aos materiais de formação como cartilhas, vídeos, listas etc. Também podem solicitar formação específica
                    </div>
                </div>
            </div>
            <div className='search-container'>
                <input type="text" value="digite alguma coisa"/>
                <button className='search-container-pesquisar' type="submit" >Pesquisar</button>
                <button className="search-container-observatorio" type="submit" >Voltar para Dashboard</button>
            </div>
            <div className='cartilhas'>
                <div className='cartilhas-header'>
                    <h1>Cartilhas</h1>
                </div>
                <div className='lista-cartilhas'>

                </div>
            </div>

            <div className='videos'>
                <div className='videos-header'>
                    <h1>Vídeos</h1>
                </div>
                <div className='lista-videos'>

                </div>
            </div>

            <div className='cursos'>
                <div className='cursos-header'>
                    <h1>Listas de cursos abertos</h1>
                </div>
                <div className='indices-cursos'>
                    <input type="checkbox"/>
                    <label>Lista</label>
                    <label>Data</label>
                    <label>Descrição</label>
                    <button type='submit'>Baixar</button>
                </div>
                <div className='lista-cursos'>

                </div>
            </div>
        </div>
    );
};

export default Material;