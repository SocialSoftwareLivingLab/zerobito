import { useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { BoxContainer } from '../../../../components/ui/BoxContainer';
import { Button } from '../../../../components/ui/Button';
import Input from '../../../../components/ui/Input';
import { Select, SelectOption } from '../../../../components/ui/Select';
import { useCasoSelecionado } from '../../../../contexts/caso-selecionado';
import { buscarMembrosGrupo } from '../../../../common/api/casos/grupo-trabalho/consultar-membros-grupo';
import { ListarIntervencoes } from '../../../../common/api/casos/intervencao/buscar-acoes-intervencao';
import { atualizarIntervencao } from '../../../../common/api/casos/intervencao/atualizar-intervencao';
import {
    NivelIntervencaoEnum,
    AcoesIntervencaoStatusEnum
} from '../../../../common/api/casos/intervencao/criar-acao-de-intervencao';
import UploadModal from '../UploadModal';
import { IntervencaoContainer, FormContainer } from '../styles';

interface IntervencaoItem {
    id: number;
    name: string;
    recursos: string;
    prazo: string;
    prioridade: number;
    nivel: NivelIntervencaoEnum;
    status: AcoesIntervencaoStatusEnum;
    autor?: { membro?: { nome?: string } };
}

export default function EditarIntervencao() {
    const { caso } = useCasoSelecionado();
    const navigate = useNavigate();
    const location = useLocation();
    const { intervencaoId } = useParams<{ intervencaoId: string }>();

    const basePath = location.pathname.replace(/\/intervencao.*$/, '');
    const idIntervencao = Number(intervencaoId);

    const queryClient = useQueryClient();

    const { data: membros = [] } = useQuery({
        queryKey: ['membros-grupo', caso.id],
        queryFn: () => buscarMembrosGrupo(caso.id)
    });

    const { data: intervencoes = [], isLoading } = useQuery({
        queryKey: ['intervencoes', caso.id],
        queryFn: () => ListarIntervencoes(caso.id)
    });

    const intervencao = (intervencoes as IntervencaoItem[]).find(
        (i) => Number(i.id) === idIntervencao
    );

    const [name, setName] = useState('');
    const [recursos, setRecursos] = useState('');
    const [prazo, setPrazo] = useState('');
    const [prioridade, setPrioridade] = useState('0.5');
    const [nivel, setNivel] = useState<NivelIntervencaoEnum>(NivelIntervencaoEnum.MACRO);
    const [status, setStatus] = useState<AcoesIntervencaoStatusEnum>(
        AcoesIntervencaoStatusEnum.SEM_PREVISAO
    );
    const [autorNome, setAutorNome] = useState('');
    const [salvando, setSalvando] = useState(false);
    const [uploadAberto, setUploadAberto] = useState(false);

    useEffect(() => {
        if (!intervencao) return;
        setName(intervencao.name ?? '');
        setRecursos(intervencao.recursos ?? '');
        setPrazo(intervencao.prazo ? intervencao.prazo.split('T')[0] : '');
        setPrioridade(String(intervencao.prioridade ?? 0.5));
        setNivel(intervencao.nivel ?? NivelIntervencaoEnum.MACRO);
        setStatus(intervencao.status ?? AcoesIntervencaoStatusEnum.SEM_PREVISAO);
        setAutorNome(intervencao.autor?.membro?.nome ?? '');
    }, [intervencao?.id]);

    const handleSubmit = async () => {
        if (!name.trim()) {
            Swal.fire({
                text: 'O campo "Nome da ação" é obrigatório.',
                icon: 'warning',
                timer: 2500,
                showConfirmButton: false
            });
            return;
        }
        if (!autorNome) {
            Swal.fire({
                text: 'O campo "Responsável" é obrigatório.',
                icon: 'warning',
                timer: 2500,
                showConfirmButton: false
            });
            return;
        }
        if (!prazo) {
            Swal.fire({
                text: 'O campo "Prazo" é obrigatório.',
                icon: 'warning',
                timer: 2500,
                showConfirmButton: false
            });
            return;
        }
        if (prazo <= new Date().toISOString().split('T')[0]) {
            Swal.fire({
                text: 'O "Prazo" deve ser uma data futura.',
                icon: 'warning',
                timer: 2500,
                showConfirmButton: false
            });
            return;
        }

        try {
            setSalvando(true);
            await atualizarIntervencao(caso.id, idIntervencao, {
                name,
                recursos,
                prazo,
                prioridade: Number.parseFloat(prioridade),
                nivel,
                status,
                autorNome
            });
            await queryClient.invalidateQueries({ queryKey: ['intervencoes', caso.id] });
            await queryClient.invalidateQueries({ queryKey: ['intervencoes-agrupado', caso.id] });
            await Swal.fire({
                title: 'Intervenção atualizada!',
                icon: 'success',
                timer: 2000,
                showConfirmButton: false
            });
            navigate(`${basePath}/intervencao`);
        } catch (err: unknown) {
            console.error(err);
            const mensagem =
                (err as { response?: { data?: { message?: string } } })?.response?.data?.message ??
                'Erro ao atualizar intervenção.';
            Swal.fire({
                text: mensagem,
                icon: 'error',
                timer: 3000,
                showConfirmButton: false
            });
        } finally {
            setSalvando(false);
        }
    };

    if (isLoading) return <p>Carregando...</p>;
    if (!intervencao) return <p>Intervenção não encontrada.</p>;

    return (
        <IntervencaoContainer>
            <BoxContainer
                titulo="Editar Intervenção"
                acoesContainer={() => (
                    <Button action={() => setUploadAberto(true)}>Documentos</Button>
                )}>
                <FormContainer>
                    <div>
                        <div className="form-row">
                            <Input
                                label="Nome da ação"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                width="full"
                            />
                        </div>

                        <div className="form-row">
                            <Select
                                label="Nível"
                                value={nivel}
                                onChange={(e) => setNivel(e.target.value as NivelIntervencaoEnum)}>
                                <SelectOption value={NivelIntervencaoEnum.MICRO} label="Micro" />
                                <SelectOption value={NivelIntervencaoEnum.MESO} label="Meso" />
                                <SelectOption value={NivelIntervencaoEnum.MACRO} label="Macro" />
                            </Select>

                            <Select
                                label="Responsável"
                                value={autorNome}
                                onChange={(e) => setAutorNome(e.target.value)}>
                                <SelectOption value="" label="Selecione..." disabled />
                                {membros.map((m) => (
                                    <SelectOption key={m.id} value={m.nome} label={m.nome} />
                                ))}
                            </Select>
                        </div>

                        <div className="form-row">
                            <Input
                                label="Prazo"
                                type="date"
                                value={prazo}
                                onChange={(e) => setPrazo(e.target.value)}
                                required
                            />

                            <Input
                                label="Prioridade (0–1)"
                                type="number"
                                value={prioridade}
                                onChange={(e) => setPrioridade(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-row">
                            <Select
                                label="Status"
                                value={status}
                                onChange={(e) =>
                                    setStatus(e.target.value as AcoesIntervencaoStatusEnum)
                                }>
                                <SelectOption
                                    value={AcoesIntervencaoStatusEnum.SEM_PREVISAO}
                                    label="Sem previsão"
                                />
                                <SelectOption
                                    value={AcoesIntervencaoStatusEnum.EXITO}
                                    label="Êxito"
                                />
                                <SelectOption
                                    value={AcoesIntervencaoStatusEnum.SATISFATORIA}
                                    label="Satisfatória"
                                />
                            </Select>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                            <label
                                style={{ fontWeight: 600, color: '#134780', fontSize: '0.9rem' }}>
                                Recursos necessários
                            </label>
                            <textarea
                                style={{
                                    width: '100%',
                                    minHeight: '80px',
                                    resize: 'vertical',
                                    border: '1px solid #cbd5e0',
                                    borderRadius: '4px',
                                    padding: '0.6rem 0.8rem',
                                    fontSize: '0.9rem',
                                    boxSizing: 'border-box'
                                }}
                                value={recursos}
                                placeholder="Descreva os recursos necessários..."
                                onChange={(e) => setRecursos(e.target.value)}
                            />
                        </div>

                        <div className="form-acoes">
                            <Button
                                type="default"
                                action={() => navigate(`${basePath}/intervencao`)}
                                disabled={salvando}>
                                Cancelar
                            </Button>
                            <Button action={handleSubmit} disabled={salvando}>
                                {salvando ? 'Salvando...' : 'Salvar'}
                            </Button>
                        </div>
                    </div>
                </FormContainer>
            </BoxContainer>

            <UploadModal
                aberto={uploadAberto}
                onFechar={() => setUploadAberto(false)}
                idCaso={caso.id}
                idIntervencao={idIntervencao}
            />
        </IntervencaoContainer>
    );
}
