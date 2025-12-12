import React, { useCallback, useEffect, useState } from 'react';
import { BoxContainer } from '../../../../components/ui/BoxContainer';
import { Button } from '../../../../components/ui/Button';
import { FaChevronDown, FaChevronUp, FaCompress } from 'react-icons/fa';
import { useCasoSelecionado } from '../../../../contexts/caso-selecionado';
import Badge from '../../../../components/ui/Badge';
import { MapaEtapaEnum } from '../enum/mapa-etapa-enum';
import { MapaEtapaStatusEnum } from '../enum/mapa-etapa-status-enum';
import { buscarMapaEtapas } from '../../../../common/api/casos/investigacao/buscar-acoes-localizacao';
import { alterarMapaEtapa } from '../../../../common/api/casos/investigacao/alterar-acoes-localizacao';
import { Select, SelectOption } from '../../../../components/ui/Select';
import { MapaContainer } from './styles';

/** Representa uma etapa do mapa no backend */
export interface MapaEtapa {
    id: number;
    name: MapaEtapaEnum;
    descricao: string | null;
    status: MapaEtapaStatusEnum;
}

/** Badge visual de status */
function BadgeStatusEtapa({ status }: { status: MapaEtapaStatusEnum }) {
    const statusMap: Record<string, { label: string; type: 'success' | 'warning' | 'danger' }> = {
        [MapaEtapaStatusEnum.EM_ELABORACAO]: { label: 'Em elaboração', type: 'warning' },
        [MapaEtapaStatusEnum.BLOQUEADA]: { label: 'Bloqueada', type: 'danger' },
        [MapaEtapaStatusEnum.FINALIZADA]: { label: 'Finalizada', type: 'success' }
    };

    const tipo = statusMap[status] ?? { label: status ?? 'Desconhecido', type: 'warning' };
    return <Badge texto={tipo.label} type={tipo.type} />;
}

export default function MapaInvestigacao(): JSX.Element {
    const { caso } = useCasoSelecionado();

    const [etapas, setEtapas] = useState<MapaEtapa[]>([]);
    const [abertas, setAbertas] = useState<number[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isAlterando, setIsAlterando] = useState<boolean>(false);
    const [erro, setErro] = useState<string | null>(null);

    const carregarEtapas = useCallback(async (): Promise<void> => {
        try {
            setIsLoading(true);
            setErro(null);
            const response = await buscarMapaEtapas(caso.id);
            setEtapas(response);
        } catch (err) {
            console.error(err);
            setErro('Erro ao carregar etapas do mapa.');
        } finally {
            setIsLoading(false);
        }
    }, [caso.id]);

    /** Atualiza uma etapa localmente (sem enviar ao backend ainda) */
    const atualizarEtapaLocal = (id: number, data: Partial<MapaEtapa>): void => {
        setEtapas((prev) => prev.map((etapa) => (etapa.id === id ? { ...etapa, ...data } : etapa)));
    };

    /** Salva alterações no backend apenas quando clicado */
    const salvarEtapa = async (etapa: MapaEtapa): Promise<void> => {
        try {
            setIsAlterando(true);
            await alterarMapaEtapa({
                idCaso: caso.id,
                name: etapa.name,
                novoStatus: etapa.status,
                descricao: etapa.descricao ?? undefined
            });
            await carregarEtapas();
        } catch (err) {
            console.error(err);
            setErro('Erro ao salvar alterações da etapa.');
        } finally {
            setIsAlterando(false);
        }
    };

    /** Controle de colapso */
    const alternarAbertura = (id: number): void => {
        setAbertas((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
    };
    const colapsarTodas = (): void => setAbertas([]);

    useEffect(() => {
        if (caso?.id) carregarEtapas();
    }, [caso?.id, carregarEtapas]);

    if (isLoading) return <p>Carregando mapa de investigação...</p>;
    if (erro) return <p className="text-red-500">{erro}</p>;

    return (
        <BoxContainer
            titulo="Mapa de Investigação"
            acoesContainer={() => (
                <Button action={colapsarTodas}>
                    <FaCompress className="mr-2" />
                    Colapsar todas
                </Button>
            )}>
            {etapas.length > 0 ? (
                <MapaContainer>
                    {etapas.map((etapa, index) => {
                        const aberta = abertas.includes(etapa.id);

                        return (
                            <div
                                key={etapa.id}
                                className="border rounded-2xl p-4 shadow-sm bg-white">
                                {/* Cabeçalho */}
                                <div
                                    className="flex justify-between items-center cursor-pointer"
                                    onClick={() => alternarAbertura(etapa.id)}>
                                    <div className="flex items-center gap-2 font-medium">
                                        <span>
                                            {index + 1}. {etapa.name}
                                        </span>
                                        <BadgeStatusEtapa status={etapa.status} />
                                    </div>
                                    {aberta ? <FaChevronUp /> : <FaChevronDown />}
                                </div>

                                {/* Conteúdo expandido */}
                                {aberta && (
                                    <div className="mt-3 border-t pt-3 text-sm text-gray-700 whitespace-pre-line">
                                        <textarea
                                            className="descricao-etapa"
                                            value={etapa.descricao ?? ''}
                                            placeholder="Adicione uma descrição..."
                                            onChange={(e) =>
                                                atualizarEtapaLocal(etapa.id, {
                                                    descricao: e.target.value
                                                })
                                            }
                                        />

                                        <div className="acoes-etapa">
                                            <label htmlFor={`status-${etapa.id}`}>
                                                Status da etapa
                                            </label>
                                            <Select
                                                label=""
                                                value={etapa.status}
                                                disabled={isAlterando}
                                                onChange={(e) =>
                                                    atualizarEtapaLocal(etapa.id, {
                                                        status: e.target
                                                            .value as MapaEtapaStatusEnum
                                                    })
                                                }>
                                                <SelectOption
                                                    label="Em elaboração"
                                                    value={MapaEtapaStatusEnum.EM_ELABORACAO}
                                                />
                                                <SelectOption
                                                    label="Finalizada"
                                                    value={MapaEtapaStatusEnum.FINALIZADA}
                                                />
                                                <SelectOption
                                                    label="Bloqueada"
                                                    value={MapaEtapaStatusEnum.BLOQUEADA}
                                                />
                                            </Select>

                                            <Button
                                                action={() => salvarEtapa(etapa)}
                                                disabled={isAlterando}>
                                                Salvar
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </MapaContainer>
            ) : (
                <p>Nenhuma etapa encontrada.</p>
            )}
        </BoxContainer>
    );
}
