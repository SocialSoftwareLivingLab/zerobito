import React, { useCallback, useEffect, useState } from 'react';
import { FaLocationDot } from 'react-icons/fa6';
import { LocalizacaoCardContainer, Metadado, Metadados } from './styles';

import { useQuery } from '@tanstack/react-query';
import { FaEdit } from 'react-icons/fa';
import { GeoSearchResult, geosearch } from '../../../common/api/geosearch/geosearch';
import { Localizacao } from '../../../common/models/caso/localizacao';
import { useCasoSelecionado } from '../../../contexts/caso-selecionado';
import AlterarLocalizacaoCasoForm from '../../Forms/Caso/Localizacao';
import MapaGeografico, { MarcadorLocalizacaoMapa } from '../../ui/MapaGeografico';
import { editarLocalizacaoCaso } from '../../../common/api/casos/localizacao/editar-localizacao';

const COORDENADA_PADRAO_ERRO: GeoSearchResult = {
    lat: -47.060898,
    lon: -22.9102,
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

    const buscaGeosearch = await geosearch([
        `${localizacao.logradouro}, ${localizacao.cidade}, ${localizacao.estado}`,
        `${localizacao.cidade}, ${localizacao.estado}`,
        `${localizacao.estado}`
    ]);

    const coordenadaEncontrada = buscaGeosearch[0] || COORDENADA_PADRAO_ERRO;

    return {
        coordenada: [coordenadaEncontrada.lat, coordenadaEncontrada.lon],
        titulo: coordenadaEncontrada.descricao,
        descricao: coordenadaEncontrada.descricao
    };
}

export default function LocalizacaoCard() {
    const { caso } = useCasoSelecionado();

    const [marcadoresMapa, setMarcadoresMapa] = useState<MarcadorLocalizacaoMapa[]>([]);
    const [localizacao, setLocalizacao] = useState(caso.localizacao);

    const { isLoading, data, refetch } = useQuery({
        queryKey: ['localizacao', localizacao],
        queryFn: () => carregarMarcacaoMapaCasoSelecionado(localizacao)
    });

    useEffect(() => {
        console.log('effect', isLoading, data);

        if (!isLoading && data) {
            setMarcadoresMapa([data as MarcadorLocalizacaoMapa]);
        }
    }, [isLoading, data]);

    useEffect(() => {
        refetch();
    }, [localizacao, refetch]);

    const [isFormEdicaoAberto, setFormEdicaoAberto] = useState(false);

    const handleAbrirFormEdicao = useCallback(() => {
        setFormEdicaoAberto(true);
    }, []);

    const handleFecharFormEdicao = useCallback(async () => {
        setFormEdicaoAberto(false);
        setMarcadoresMapa([data as MarcadorLocalizacaoMapa]);
    }, [data]);

    const handleLocalizacaoSelecionada = (longitude: number, latitude: number) => {
        setLocalizacao((prev) => ({
            ...prev,
            latitude,
            longitude,
            logradouro: '',
            estado: '',
            cidade: ''
        }));
    };
    const handleFormEdicaoSubmit = useCallback(
        async (data, event) => {
            event.preventDefault();

            const novaLocalizacao = {
                cidade: data.cidade || localizacao.cidade,
                estado: data.estado || localizacao.estado,
                logradouro: data.logradouro || localizacao.logradouro,
                latitude: data.coordenada.latitude,
                longitude: data.coordenada.longitude
            };

            await editarLocalizacaoCaso(novaLocalizacao, caso.id);

            handleFecharFormEdicao();

            setLocalizacao(novaLocalizacao);
        },
        [
            caso.id,
            handleFecharFormEdicao,
            localizacao.cidade,
            localizacao.estado,
            localizacao.logradouro
        ]
    );

    // console.log(marcadorAtual);

    return (
        <LocalizacaoCardContainer>
            <h3>
                <span>
                    <FaLocationDot /> Localização
                </span>
                {!isFormEdicaoAberto && <FaEdit onClick={handleAbrirFormEdicao} />}
            </h3>
            <div className="separador-localizacao">
                {isLoading && <div>Carregando...</div>}

                {!isLoading && (
                    <>
                        {marcadoresMapa.length && (
                            <MapaGeografico
                                marcadores={marcadoresMapa}
                                handleMarkerDragEnd={handleLocalizacaoSelecionada}
                            />
                        )}
                        <Metadados>
                            {isFormEdicaoAberto && (
                                <AlterarLocalizacaoCasoForm
                                    localizacao={localizacao}
                                    handleSubmitEdicao={handleFormEdicaoSubmit}
                                    handleFecharForm={handleFecharFormEdicao}
                                    handleLocalizacaoSelecionada={handleLocalizacaoSelecionada}
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
                    </>
                )}
            </div>
        </LocalizacaoCardContainer>
    );
}
