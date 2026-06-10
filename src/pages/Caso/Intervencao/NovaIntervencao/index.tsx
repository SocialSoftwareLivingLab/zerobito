import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { BoxContainer } from '../../../../components/ui/BoxContainer';
import { Button } from '../../../../components/ui/Button';
import Input from '../../../../components/ui/Input';
import { Select, SelectOption } from '../../../../components/ui/Select';
import { useCasoSelecionado } from '../../../../contexts/caso-selecionado';
import { buscarMembrosGrupo } from '../../../../common/api/casos/grupo-trabalho/consultar-membros-grupo';
import {
    CriarIntervencao,
    NivelIntervencaoEnum
} from '../../../../common/api/casos/intervencao/criar-acao-de-intervencao';
import { IntervencaoContainer, FormContainer } from '../styles';

export default function NovaIntervencao() {
    const { caso } = useCasoSelecionado();
    const navigate = useNavigate();
    const location = useLocation();

    const basePath = location.pathname.replace(/\/intervencao.*$/, '');

    const { data: membros = [] } = useQuery({
        queryKey: ['membros-grupo', caso.id],
        queryFn: () => buscarMembrosGrupo(caso.id)
    });

    const [name, setName] = useState('');
    const [recursos, setRecursos] = useState('');
    const [prazo, setPrazo] = useState('');
    const [prioridade, setPrioridade] = useState('0.5');
    const [nivel, setNivel] = useState<NivelIntervencaoEnum>(NivelIntervencaoEnum.MACRO);
    const [autorNome, setAutorNome] = useState('');
    const [salvando, setSalvando] = useState(false);

    const handleSubmit = async () => {
        if (!autorNome) {
            Swal.fire({
                text: 'Selecione um responsável.',
                icon: 'warning',
                timer: 2000,
                showConfirmButton: false
            });
            return;
        }

        try {
            setSalvando(true);
            await CriarIntervencao(caso.id, {
                name,
                recursos,
                prazo,
                prioridade: parseFloat(prioridade),
                nivel,
                autorNome
            });
            await Swal.fire({
                title: 'Intervenção criada!',
                icon: 'success',
                timer: 2000,
                showConfirmButton: false
            });
            navigate(`${basePath}/intervencao`);
        } catch (err) {
            console.error(err);
            Swal.fire({
                text: 'Erro ao criar intervenção.',
                icon: 'error',
                timer: 3000,
                showConfirmButton: false
            });
        } finally {
            setSalvando(false);
        }
    };

    return (
        <IntervencaoContainer>
            <BoxContainer titulo="Nova Intervenção">
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
        </IntervencaoContainer>
    );
}
