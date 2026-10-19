import { useRef, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { FaFileAlt, FaSort } from 'react-icons/fa';
import { BoxContainer } from '../../../../components/ui/BoxContainer';
import { Button } from '../../../../components/ui/Button';
import { useCasoSelecionado } from '../../../../contexts/caso-selecionado';
import {
    atualizarAtorRelatorioFinalizacao,
    AtorRelatorioFinalizacao,
    buscarRelatorioFinalizacao,
    RelatorioFinalizacao,
    StatusRelatorioFinalizacaoEnum
} from '../../../../common/api/casos/finalizacao/relatorio-finalizacao';
import { MapaContainer } from '../../Investigacao/Etapas/styles';

const STATUS_EDITAVEIS = [
    StatusRelatorioFinalizacaoEnum.RASCUNHO,
    StatusRelatorioFinalizacaoEnum.REVISAO
];

export default function AtoresFinalizacao(): JSX.Element {
    const { caso } = useCasoSelecionado();
    const queryClient = useQueryClient();
    const queryKey = ['relatorio-finalizacao', caso.id];

    const [abertos, setAbertos] = useState<number[]>([]);
    const [textos, setTextos] = useState<Record<number, string>>({});
    const [salvandoIds, setSalvandoIds] = useState<Set<number>>(new Set());
    const [erro, setErro] = useState<string | null>(null);

    const debounceTimers = useRef<Map<number, ReturnType<typeof setTimeout>>>(new Map());

    const {
        data: relatorio,
        isLoading,
        isError
    } = useQuery({
        queryKey,
        queryFn: () => buscarRelatorioFinalizacao(caso.id)
    });

    const atores = relatorio?.atores ?? [];
    const editavel = !!relatorio && STATUS_EDITAVEIS.includes(relatorio.status);
    const todosAbertos = atores.length > 0 && abertos.length === atores.length;

    const textoAtual = (ator: AtorRelatorioFinalizacao): string =>
        textos[ator.id] ?? ator.descricao ?? '';

    const autoSalvarAtor = async (id: number, descricao: string): Promise<void> => {
        setSalvandoIds((prev) => new Set(prev).add(id));
        try {
            const atorSalvo = await atualizarAtorRelatorioFinalizacao(caso.id, id, descricao);
            queryClient.setQueryData<RelatorioFinalizacao>(queryKey, (anterior) =>
                anterior
                    ? {
                          ...anterior,
                          atores: anterior.atores.map((a) =>
                              a.id === atorSalvo.id ? { ...a, descricao: atorSalvo.descricao } : a
                          )
                      }
                    : anterior
            );
            setErro(null);
        } catch (err) {
            console.error(err);
            setErro('Erro ao salvar informações do ator.');
        } finally {
            setSalvandoIds((prev) => {
                const next = new Set(prev);
                next.delete(id);
                return next;
            });
        }
    };

    const handleDescricaoChange = (id: number, valor: string): void => {
        setTextos((prev) => ({ ...prev, [id]: valor }));
        const timer = debounceTimers.current.get(id);
        if (timer) clearTimeout(timer);
        debounceTimers.current.set(
            id,
            setTimeout(() => autoSalvarAtor(id, valor), 800)
        );
    };

    const alternarAbertura = (id: number): void => {
        setAbertos((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
    };

    const alternarTodos = (): void => {
        setAbertos(todosAbertos ? [] : atores.map((a) => a.id));
    };

    if (isLoading) return <p>Carregando relatório de finalização...</p>;
    if (isError) return <p className="text-red-500">Erro ao carregar relatório de finalização.</p>;

    return (
        <BoxContainer
            titulo="Atores / Situação das ações"
            acoesContainer={() => (
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <Button>
                        <FaFileAlt className="mr-2" />
                        Baixar PDF
                    </Button>
                    <Button action={alternarTodos}>
                        <FaSort className="mr-2" />
                        {todosAbertos ? 'Colapsar todos' : 'Expandir todos'}
                    </Button>
                </div>
            )}>
            {erro && <p className="text-red-500">{erro}</p>}
            {atores.length > 0 ? (
                <MapaContainer>
                    {atores.map((ator, index) => {
                        const aberto = abertos.includes(ator.id);

                        return (
                            <div key={ator.id} className="etapa-item">
                                <div
                                    className="etapa-cabecalho"
                                    onClick={() => alternarAbertura(ator.id)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ')
                                            alternarAbertura(ator.id);
                                    }}
                                    role="button"
                                    tabIndex={0}>
                                    <div className="etapa-titulo">
                                        <FaSort />
                                        <span>
                                            {index + 1}. {ator.ator}
                                        </span>
                                    </div>
                                </div>

                                {aberto && (
                                    <div className="etapa-conteudo">
                                        <textarea
                                            className="descricao-etapa"
                                            value={textoAtual(ator)}
                                            disabled={!editavel}
                                            placeholder={`Descreva as informações sobre ${ator.ator.toLowerCase()}...`}
                                            onChange={(e) =>
                                                handleDescricaoChange(ator.id, e.target.value)
                                            }
                                        />
                                        <div className="acoes-etapa">
                                            <span
                                                style={{
                                                    fontSize: '0.8rem',
                                                    color: '#888',
                                                    visibility: salvandoIds.has(ator.id)
                                                        ? 'visible'
                                                        : 'hidden'
                                                }}>
                                                Salvando...
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </MapaContainer>
            ) : (
                <p>Nenhum ator encontrado.</p>
            )}
        </BoxContainer>
    );
}
