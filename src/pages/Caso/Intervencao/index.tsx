import { useNavigate, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { BoxContainer } from '../../../components/ui/BoxContainer';
import { Button } from '../../../components/ui/Button';
import { useCasoSelecionado } from '../../../contexts/caso-selecionado';
import {
    ListarIntervencoesAgrupadoPorAutor,
    ListarIntervencoesCalendario
} from '../../../common/api/casos/intervencao/buscar-acoes-intervencao';
import AcoesIntervencao from './Acoes';
import { IntervencaoContainer } from './styles';
import CalendarioCustomizado from '../../../components/Calendario';
import Badge from '../../../components/ui/Badge';
import { FaPencilAlt } from 'react-icons/fa';
import { AcoesIntervencaoStatusEnum } from '../../../common/api/casos/intervencao/criar-acao-de-intervencao';

const STATUS_BADGE: Record<string, { label: string; type: string }> = {
    [AcoesIntervencaoStatusEnum.EXITO]: { label: 'Êxito', type: 'success' },
    [AcoesIntervencaoStatusEnum.SATISFATORIA]: { label: 'Satisfatória', type: 'warning' },
    [AcoesIntervencaoStatusEnum.SEM_PREVISAO]: { label: 'Sem previsão', type: 'danger' }
};

const NIVEL_LABEL: Record<string, string> = {
    MICRO: 'Micro',
    MESO: 'Meso',
    MACRO: 'Macro'
};

function BotaoNovaIntervencao({ onClick }: { onClick: () => void }) {
    return <Button action={onClick}>+ Nova Intervenção</Button>;
}

function formatarData(data: string): string {
    const datePart = data.split('T')[0];
    const [year, month, day] = datePart.split('-');
    return `${day}/${month}/${year}`;
}

export default function Intervencao() {
    const { caso } = useCasoSelecionado();
    const navigate = useNavigate();
    const location = useLocation();

    const basePath = location.pathname.replace(/\/intervencao.*$/, '');

    const { data: agrupado = {}, isLoading } = useQuery({
        queryKey: ['intervencoes-agrupado', caso.id],
        queryFn: () => ListarIntervencoesAgrupadoPorAutor(caso.id)
    });

    const { data: calendario = [] } = useQuery({
        queryKey: ['intervencoes-calendario', caso.id],
        queryFn: () => ListarIntervencoesCalendario(caso.id)
    });

    const grupos = Object.values(agrupado) as Array<{
        autor: { id: number; membro: { nome: string } };
        intervencoes: Array<{
            id: number;
            name: string;
            nivel: string;
            status: string;
            prazo: string;
            prioridade: number;
        }>;
    }>;

    const reunioesCalendario = calendario.map(
        (item: { id: number; prazo: string; status: string }) => ({
            data: item.prazo,
            titulo: 'Intervenção'
        })
    );

    return (
        <IntervencaoContainer>
            <AcoesIntervencao />

            <BoxContainer
                titulo="Intervenções por Ator"
                acoesContainer={() => (
                    <BotaoNovaIntervencao
                        onClick={() => navigate(`${basePath}/intervencao/nova`)}
                    />
                )}>
                {isLoading ? (
                    <p>Carregando...</p>
                ) : grupos.length === 0 ? (
                    <p>Nenhuma intervenção registrada.</p>
                ) : (
                    <table className="tabela-intervencoes">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Nível</th>
                                <th>Prazo</th>
                                <th>Status</th>
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            {grupos.map((grupo) => (
                                <>
                                    <tr key={`autor-${grupo.autor.id}`} className="tr-autor">
                                        <td colSpan={5}>{grupo.autor.membro?.nome ?? '—'}</td>
                                    </tr>
                                    {grupo.intervencoes.map((item) => {
                                        const badge = STATUS_BADGE[item.status];
                                        return (
                                            <tr key={item.id}>
                                                <td>{item.name}</td>
                                                <td>{NIVEL_LABEL[item.nivel] ?? item.nivel}</td>
                                                <td>{formatarData(item.prazo)}</td>
                                                <td>
                                                    {badge && (
                                                        <Badge
                                                            texto={badge.label}
                                                            type={
                                                                badge.type as
                                                                    | 'success'
                                                                    | 'warning'
                                                                    | 'danger'
                                                            }
                                                        />
                                                    )}
                                                </td>
                                                <td>
                                                    <button
                                                        className="btn-editar"
                                                        onClick={() =>
                                                            navigate(
                                                                `${basePath}/intervencao/${item.id}/editar`
                                                            )
                                                        }>
                                                        <FaPencilAlt />
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </>
                            ))}
                        </tbody>
                    </table>
                )}
            </BoxContainer>

            <BoxContainer titulo="Calendário de Intervenções">
                <CalendarioCustomizado
                    reunioes={reunioesCalendario}
                    tarefas={[]}
                    onDiaClick={() => {}}
                />
            </BoxContainer>
        </IntervencaoContainer>
    );
}
