import { useCallback, useEffect, useRef, useState } from 'react';
import { BoxContainer } from '../../../../components/ui/BoxContainer';
import { Button } from '../../../../components/ui/Button';
import {
    FaCheckCircle,
    FaChevronDown,
    FaChevronUp,
    FaCompress,
    FaExclamationTriangle,
    FaFilePdf,
    FaTimesCircle
} from 'react-icons/fa';
import { useCasoSelecionado } from '../../../../contexts/caso-selecionado';
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
function BadgeStatusEtapa({ status }: Readonly<{ status: MapaEtapaStatusEnum }>) {
    const statusMap: Record<string, { label: string; icon: JSX.Element }> = {
        [MapaEtapaStatusEnum.EM_ELABORACAO]: {
            label: 'Em elaboração',
            icon: <FaExclamationTriangle style={{ color: '#d97706', fontSize: '1.1rem' }} />
        },
        [MapaEtapaStatusEnum.BLOQUEADA]: {
            label: 'Bloqueada',
            icon: <FaTimesCircle style={{ color: '#dc2626', fontSize: '1.1rem' }} />
        },
        [MapaEtapaStatusEnum.FINALIZADA]: {
            label: 'Finalizada',
            icon: <FaCheckCircle style={{ color: '#16a34a', fontSize: '1.1rem' }} />
        }
    };

    const tipo = statusMap[status] ?? {
        label: status ?? 'Desconhecido',
        icon: <FaExclamationTriangle style={{ color: '#d97706' }} />
    };
    return <span title={tipo.label}>{tipo.icon}</span>;
}

function BotaoColapsarTodas({ onColapsar }: Readonly<{ onColapsar: () => void }>) {
    return (
        <Button action={onColapsar}>
            <FaCompress className="mr-2" />
            Colapsar todas
        </Button>
    );
}

export default function MapaInvestigacao(): JSX.Element {
    const { caso } = useCasoSelecionado();

    const [etapas, setEtapas] = useState<MapaEtapa[]>([]);
    const [etapasServidor, setEtapasServidor] = useState<MapaEtapa[]>([]);
    const [abertas, setAbertas] = useState<number[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [salvandoIds, setSalvandoIds] = useState<Set<number>>(new Set());
    const [erro, setErro] = useState<string | null>(null);

    const etapasRef = useRef<MapaEtapa[]>([]);
    const debounceTimers = useRef<Map<number, ReturnType<typeof setTimeout>>>(new Map());

    useEffect(() => {
        etapasRef.current = etapas;
    }, [etapas]);

    const carregarEtapas = useCallback(async (): Promise<void> => {
        try {
            setIsLoading(true);
            setErro(null);
            const response = await buscarMapaEtapas(caso.id);
            setEtapas(response);
            setEtapasServidor(response);
        } catch (err) {
            console.error(err);
            setErro('Erro ao carregar etapas do mapa.');
        } finally {
            setIsLoading(false);
        }
    }, [caso.id]);

    const atualizarEtapaLocal = (id: number, data: Partial<MapaEtapa>): void => {
        setEtapas((prev) => prev.map((etapa) => (etapa.id === id ? { ...etapa, ...data } : etapa)));
    };

    const autoSalvarEtapa = async (etapa: MapaEtapa): Promise<void> => {
        setSalvandoIds((prev) => new Set(prev).add(etapa.id));
        try {
            await alterarMapaEtapa({
                idCaso: caso.id,
                name: etapa.name,
                novoStatus: etapa.status,
                descricao: etapa.descricao ?? undefined
            });
            setEtapasServidor((prev) => prev.map((e) => (e.id === etapa.id ? { ...etapa } : e)));
        } catch (err) {
            console.error(err);
            setErro('Erro ao salvar alterações da etapa.');
        } finally {
            setSalvandoIds((prev) => {
                const next = new Set(prev);
                next.delete(etapa.id);
                return next;
            });
        }
    };

    const handleDescricaoChange = (id: number, valor: string): void => {
        atualizarEtapaLocal(id, { descricao: valor });
        const timer = debounceTimers.current.get(id);
        if (timer) clearTimeout(timer);
        debounceTimers.current.set(
            id,
            setTimeout(() => {
                const etapa = etapasRef.current.find((e) => e.id === id);
                if (etapa) autoSalvarEtapa({ ...etapa, descricao: valor });
            }, 800)
        );
    };

    const handleStatusChange = (id: number, novoStatus: MapaEtapaStatusEnum): void => {
        atualizarEtapaLocal(id, { status: novoStatus });
        const etapa = etapasRef.current.find((e) => e.id === id);
        if (etapa) autoSalvarEtapa({ ...etapa, status: novoStatus });
    };

    /** Controle de colapso */
    const alternarAbertura = (id: number): void => {
        setAbertas((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
    };
    const colapsarTodas = (): void => setAbertas([]);

    const baixarPDF = (): void => {
        const statusLabel: Record<string, string> = {
            EM_ELABORACAO: 'Em elaboração',
            FINALIZADA: 'Finalizada',
            BLOQUEADA: 'Bloqueada'
        };

        const linhas = etapas
            .map(
                (etapa, i) => `
                <div class="etapa">
                    <div class="etapa-titulo">${i + 1}. ${etapa.name} — <span class="status">${statusLabel[etapa.status] ?? etapa.status}</span></div>
                    <div class="etapa-descricao">${etapa.descricao ? etapa.descricao.replace(/\n/g, '<br>') : '<em>Sem descrição</em>'}</div>
                </div>`
            )
            .join('');

        const script =
            '<script>window.onload=function(){window.print();window.close();}</' + 'script>';
        const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8"/>
  <title>Mapa de Investigação</title>
  <style>
    body { font-family: Arial, sans-serif; font-size: 13px; color: #1a202c; margin: 2cm; }
    h1 { font-size: 18px; color: #134780; margin-bottom: 1.5rem; border-bottom: 2px solid #134780; padding-bottom: 0.5rem; }
    .etapa { border: 1px solid #cbd5e0; border-radius: 4px; margin-bottom: 1rem; overflow: hidden; }
    .etapa-titulo { background: #134780; color: #fff; padding: 0.6rem 1rem; font-weight: 700; font-size: 14px; }
    .status { font-weight: 400; font-size: 12px; opacity: 0.9; }
    .etapa-descricao { padding: 0.75rem 1rem; background: #f8fafc; min-height: 40px; }
    @page { margin: 1.5cm; }
  </style>
</head>
<body>
  <h1>Mapa de Investigação</h1>
  ${linhas}
  ${script}
</body>
</html>`;

        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');
    };

    useEffect(() => {
        if (caso?.id) carregarEtapas();
    }, [caso?.id, carregarEtapas]);

    if (isLoading) return <p>Carregando mapa de investigação...</p>;
    if (erro) return <p className="text-red-500">{erro}</p>;

    return (
        <BoxContainer
            titulo="MAPA de Investigação"
            acoesContainer={() => (
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <BotaoColapsarTodas onColapsar={colapsarTodas} />
                    <Button action={baixarPDF}>
                        <FaFilePdf className="mr-2" />
                        Baixar PDF
                    </Button>
                </div>
            )}>
            {etapas.length > 0 ? (
                <MapaContainer>
                    {etapas.map((etapa, index) => {
                        const aberta = abertas.includes(etapa.id);

                        return (
                            <div key={etapa.id} className="etapa-item">
                                {/* Cabeçalho */}
                                <div
                                    className="etapa-cabecalho"
                                    onClick={() => alternarAbertura(etapa.id)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ')
                                            alternarAbertura(etapa.id);
                                    }}
                                    role="button"
                                    tabIndex={0}>
                                    <div className="etapa-titulo">
                                        <span>
                                            {index + 1}. {etapa.name}
                                        </span>
                                        <BadgeStatusEtapa status={etapa.status} />
                                    </div>
                                    {aberta ? <FaChevronUp /> : <FaChevronDown />}
                                </div>

                                {/* Conteúdo expandido */}
                                {aberta && (
                                    <div className="etapa-conteudo">
                                        <textarea
                                            className="descricao-etapa"
                                            value={etapa.descricao ?? ''}
                                            placeholder="Adicione uma descrição..."
                                            onChange={(e) =>
                                                handleDescricaoChange(etapa.id, e.target.value)
                                            }
                                        />

                                        <div className="acoes-etapa">
                                            <label htmlFor={`status-${etapa.id}`}>
                                                Status da etapa
                                            </label>
                                            <Select
                                                label=""
                                                value={etapa.status}
                                                disabled={salvandoIds.has(etapa.id)}
                                                onChange={(e) =>
                                                    handleStatusChange(
                                                        etapa.id,
                                                        e.target.value as MapaEtapaStatusEnum
                                                    )
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
                                            {salvandoIds.has(etapa.id) && (
                                                <span style={{ fontSize: '0.8rem', color: '#888' }}>
                                                    Salvando...
                                                </span>
                                            )}
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
