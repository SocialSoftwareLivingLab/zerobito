import React, { useCallback, useState } from 'react';
import { OcorrenciaModel } from '../../../common/models/ocorrencias/model';
import Container from '../../../components/Container';
import Header from '../../../components/Page-Header';
import OcorrenciaItem from '../../../components/Tabelas/Ocorrencias/OcorrenciaItem';
import { OcorrenciaCarregadaType } from './models';
import { Secao, ToggleButton, ToggleButtonGroup } from './styles';
import NovoCasoPage from './NovoCaso';
import VincularOcorrenciaAoCasoPage from './VincularCaso';

export interface AceitarOcorrenciaPageProps {
    ocorrencia: OcorrenciaCarregadaType;
    opcaoAceiteSelecionada: 'criar' | 'vincular' | undefined;
    setOpcaoAceiteSelecionada: (opcao: 'criar' | 'vincular' | undefined) => void;
}

export default function AceitarOcorrenciaPageView({
    ocorrencia,
    opcaoAceiteSelecionada,
    setOpcaoAceiteSelecionada
}: AceitarOcorrenciaPageProps) {
    const [mostrarDadosOcorrencia, setMostrarDadosOcorrencia] = useState<boolean>(false);

    const toggleMostrarDadosOcorrencia = useCallback(() => {
        setMostrarDadosOcorrencia((prevState) => !prevState);
    }, []);

    return (
        <>
            <Header
                title="Aceitar evento"
                explicacao="Aqui você pode criar um novo caso para o evento encontrado ou vinculá-lo a um caso já existente"
            />
            <Container>
                {ocorrencia.loading && <span>Carregando...</span>}

                {ocorrencia.success && ocorrencia.data && (
                    <>
                        <Secao>
                            <div>
                                <h3>Dados do evento</h3>
                                <a href="#" onClick={() => toggleMostrarDadosOcorrencia()}>
                                    {mostrarDadosOcorrencia ? 'Ocultar dados' : 'Exibir dados'}
                                </a>
                            </div>
                            {mostrarDadosOcorrencia && (
                                <DadosOcorrenciaView ocorrencia={ocorrencia.data} />
                            )}
                        </Secao>

                        <Secao>
                            <h3>O que deseja fazer?</h3>

                            <ToggleButtonGroup>
                                <ToggleButton
                                    size="large"
                                    type="button"
                                    onClick={() => setOpcaoAceiteSelecionada('criar')}
                                    selected={opcaoAceiteSelecionada === 'criar'}>
                                    Criar novo caso
                                </ToggleButton>
                                <ToggleButton
                                    size="large"
                                    type="button"
                                    onClick={() => setOpcaoAceiteSelecionada('vincular')}
                                    selected={opcaoAceiteSelecionada === 'vincular'}>
                                    Vincular a um caso existente
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </Secao>

                        {opcaoAceiteSelecionada === 'criar' && (
                            <NovoCasoPage ocorrencia={ocorrencia.data} />
                        )}
                        {opcaoAceiteSelecionada === 'vincular' && (
                            <VincularOcorrenciaAoCasoPage ocorrencia={ocorrencia.data} />
                        )}
                    </>
                )}
            </Container>
        </>
    );
}

interface DadosOcorrenciaViewProps {
    ocorrencia: OcorrenciaModel;
}

function DadosOcorrenciaView({ ocorrencia }: DadosOcorrenciaViewProps) {
    return (
        <>
            <OcorrenciaItem data={ocorrencia} />
        </>
    );
}
