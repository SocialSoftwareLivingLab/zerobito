import React, { useCallback, useState } from 'react';
import { FaLocationDot } from 'react-icons/fa6';
import { LocalizacaoCardContainer, Metadado, Metadados } from './styles';

import { useCasoSelecionado } from '../../../contexts/caso-selecionado';
import MapaGeografico, { MarcadorLocalizacaoMapa } from '../../ui/MapaGeografico';
import { FaEdit } from 'react-icons/fa';
import AlterarLocalizacaoCasoForm from '../../Forms/Caso/Localizacao';
import { Localizacao } from '../../../common/models/caso/localizacao';
import { geosearch } from '../../../common/api/geosearch/geosearch';

const COORDENADA_PADRAO_ERRO = {
    coordenada: [-22.9102, -47.060898],
    titulo: 'Nenhuma localização encontrada',
    descricao: 'Nenhuma localização encontrada'
};

async function carregarMarcacaoMapaCasoSelecionado(
    localizacao: Localizacao
): Promise<MarcadorLocalizacaoMapa> {
    const { latitude, longitude } = localizacao;

    if (latitude && longitude) {
        return {
            coordenada: [latitude, longitude],
            titulo: localizacao.cidade,
            descricao: `${localizacao.logradouro}, ${localizacao.cidade}, ${localizacao.estado}, Brasil`
        };
    }

    const buscaGeosearch = await geosearch(`${localizacao.cidade}, ${localizacao.estado}`);
    const coordenadaEncontrada = buscaGeosearch[0] || COORDENADA_PADRAO_ERRO;

    return {
        coordenada: [coordenadaEncontrada.lat, coordenadaEncontrada.lon],
        titulo: coordenadaEncontrada.descricao,
        descricao: coordenadaEncontrada.descricao
    };
}

export default function LocalizacaoCard() {
    const {
        caso: { localizacao }
    } = useCasoSelecionado();

    const marcadores: MarcadorLocalizacaoMapa[] = [
        {
            coordenada: [-22.9102, -47.060898],
            titulo: 'Campinas',
            descricao: 'Campinas, São Paulo, Brasil'
        },
        {
            coordenada: [-22.9068, -47.0616],
            titulo: 'Faculdade de Campinas',
            descricao: 'Faculdade de Campinas, São Paulo, Brasil'
        },
        {
            titulo: 'Barão Geraldo',
            descricao: 'Barão Geraldo, São Paulo, Brasil',
            coordenada: [-22.8174, -47.0763]
        }
    ];

    const [isFormEdicaoAberto, setFormEdicaoAberto] = useState(false);

    const handleAbrirFormEdicao = useCallback(() => {
        setFormEdicaoAberto(true);
    }, []);

    const handleFecharFormEdicao = useCallback(() => {
        setFormEdicaoAberto(false);
    }, []);

    return (
        <LocalizacaoCardContainer>
            <h3>
                <span>
                    <FaLocationDot /> Localização
                </span>
                {!isFormEdicaoAberto && <FaEdit onClick={handleAbrirFormEdicao} />}
            </h3>
            <div className="separador-localizacao">
                <MapaGeografico marcadores={marcadores} />
                <Metadados>
                    {isFormEdicaoAberto && (
                        <AlterarLocalizacaoCasoForm
                            localizacao={localizacao}
                            handleFecharForm={handleFecharFormEdicao}
                        />
                    )}

                    {!isFormEdicaoAberto && (
                        <>
                            <Metadado>
                                <h4>Cidade</h4>
                                <span>{localizacao.cidade}</span>
                            </Metadado>
                            <Metadado>
                                <h4>Estado</h4>
                                <span>{localizacao.estado}</span>
                            </Metadado>
                            <Metadado>
                                <h4>Logradouro</h4>
                                <span>{localizacao.logradouro}</span>
                            </Metadado>
                        </>
                    )}
                </Metadados>
            </div>
        </LocalizacaoCardContainer>
    );
}
