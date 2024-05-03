import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Page-Header';
import { TabelaOcorrenciaNovo } from '../../components/Tabelas/Ocorrencias/index.tsx';
import './style.css';
import useHomeViewModel from './view.model';
import { BoxContainer } from '../../components/ui/BoxContainer/index.tsx';
import Container from '../../components/Container/index.tsx';
import ListarCasosTable from '../../components/Tabelas/Casos/ListarCasos/index.tsx';

const Home = () => {
    const { eventos } = useHomeViewModel();

    return (
        <div className="home-container">
            <Header
                title="Painel de Controle"
                explicacao="Aqui o cordenador local consegue visualizar  e gerenciar novos casos/denuncias adicionadas
          ao sistema e tambem os casos que ele já aceitou acompanhar"
            />
            <div className="busca"></div>
            <Container>
                <TabelaOcorrenciaNovo ocorrencias={eventos} />
            </Container>
            <Container>
                <BoxContainer titulo="Casos aceitos">
                    <ListarCasosTable />
                </BoxContainer>
            </Container>
            <div className="container-content-imprensa">
                <h2>
                    Noticias da Imprensa | Alerta de Caso{' '}
                    <Link to="/ocorrencia">
                        <button className="button-denuncia">
                            Fazer Denuncia a partir de noticia
                        </button>
                    </Link>
                </h2>
                <hr />
                <h2>
                    SINAN, RAAT, SIM{' '}
                    <button className="button-denuncia">
                        Fazer Denuncia a partir dos Serviços de Saude
                    </button>
                </h2>
                <hr />
            </div>
        </div>
    );
};

export default Home;
