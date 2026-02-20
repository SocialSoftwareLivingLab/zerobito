import { useForm } from 'react-hook-form';
import { useCasoSelecionado } from '../../../../contexts/caso-selecionado';
import { useCallback, useEffect, useState } from 'react';
import { IntervencaoContainer } from '../styles';
import AcoesReuniao from '../Acoes';
import { BoxContainer } from '../../../../components/ui/BoxContainer';
import { FaInfoCircle, FaRegCalendar, FaSave } from 'react-icons/fa';
import Input from '../../../../components/ui/Input';
import { Button } from '../../../../components/ui/Button';
import Swal from 'sweetalert2';
import {
    agendarReuniao,
    AgendarReuniaoRequest
} from '../../../../common/api/casos/intervencao/agendar-reuniao';
import AtasAnteriores from '../AtasAnteriores';
import TarefasReuniao from './tarefas';
import { salvarAtaReuniao } from '../../../../common/api/casos/grupo-trabalho/aceitar-ata';
import AtoresReuniao from '../Tarefas';
import { useParams } from 'react-router-dom';
import { obterAtaReuniao } from '../../../../common/api/casos/grupo-trabalho/obter-ata';
import { obterPermissoesUsuarioNoCaso } from '../../../../common/api/usuarios/permissoes/permissoes-user';
import { useQuery } from '@tanstack/react-query';

export interface DataReuniaoFormField {
    data: Date;
    hora: string;
}

export default function ReunioesIntervencao() {
    const { caso } = useCasoSelecionado();
    const { id, dataReuniao } = useParams();
    const { register, handleSubmit } = useForm<DataReuniaoFormField>({});

    const [errorData, setErrorData] = useState<string | null>(null);
    const [data, setData] = useState<Date | null>(null);
    const [ataReuniao, setAtaReuniao] = useState('');

    const { data: permissoes = [] } = useQuery({
        queryKey: ['permissoes'],
        queryFn: () => obterPermissoesUsuarioNoCaso(caso.id)
    });

    const [isAtaChanged, setAtaChanged] = useState(false);

    useEffect(() => {
        const carregarAta = async () => {
            if (!dataReuniao) return;
            try {
                const response = await obterAtaReuniao(caso.id, dataReuniao);
                if (response.data && response.data !== '') {
                    setAtaChanged(true);
                }
                // Assumindo que a API retorna { conteudo: string }
                setAtaReuniao(response.data || '');
            } catch (error) {
                console.error('Erro ao carregar a ata:', error);
                setAtaReuniao(''); // fallback
            }
        };

        carregarAta();
    }, [dataReuniao, caso.id]);

    const handleSalvarAta = async () => {
        if (isAtaChanged && !permissoes.includes('casos:editar-ata')) {
            Swal.fire({
                text: 'Somente coordenadores podem alterar atas',
                icon: 'error',
                timer: 4000,
                showConfirmButton: false,
                position: 'center',
                toast: true
            });

            return;
        }
        if (!ataReuniao.trim()) {
            Swal.fire({
                text: 'Preencha a ata antes de salvar.',
                icon: 'error',
                timer: 4000,
                showConfirmButton: false,
                position: 'center',
                toast: true
            });

            return;
        }

        if (ataReuniao.trim().length < 150) {
            Swal.fire({
                text: 'A ata deve conter no mínimo 150 caracteres.',
                icon: 'error',
                timer: 4000,
                showConfirmButton: false,
                position: 'center',
                toast: true
            });

            return;
        }

        try {
            await salvarAtaReuniao(ataReuniao, caso.id, dataReuniao);
            setAtaReuniao('');
            Swal.fire('Sucesso', 'Ata salva com sucesso!', 'success');
        } catch (error) {
            const erro = 'Erro ao salvar a ata.';
            Swal.fire({
                text: erro,
                icon: 'error',
                timer: 2000,
                showConfirmButton: false,
                position: 'center',
                toast: true
            });
        }
    };

    const handleSubmitDataReuniao = useCallback(
        async (formData: DataReuniaoFormField) => {
            const dataString = `${formData.data}T${formData.hora}:00`;
            const dataSelecionada = new Date(dataString);
            const dataFormatada = dataSelecionada.toISOString();
            try {
                const data: AgendarReuniaoRequest = {
                    data: dataFormatada
                };
                setData(dataSelecionada);
                setErrorData(null);
                await agendarReuniao(data, caso.id);

                const dataLegivel = dataSelecionada.toLocaleString();

                Swal.fire({
                    title: 'Reunião agendada!',
                    text: `A reunião foi marcada para ${dataLegivel}.`,
                    icon: 'success',
                    timer: 4000,
                    confirmButtonText: 'Continuar'
                });
            } catch (error) {
                const errorMessage = error.response?.data?.message;
                Swal.fire({
                    text: errorMessage,
                    icon: 'error',
                    timer: 2000,
                    showConfirmButton: false,
                    position: 'center',
                    toast: true
                });
            }
        },
        [caso.id]
    );

    return (
        <IntervencaoContainer>
            <AcoesReuniao />
            <div className="row">
                <div className="column">
                    <BoxContainer titulo={''}>
                        <div className="blue-line">
                            <h3>
                                {' '}
                                <FaInfoCircle /> Ata da reunião
                            </h3>
                        </div>
                        <textarea
                            name="ata-reuniao"
                            rows={30}
                            cols={70}
                            placeholder="Digite alguma coisa"
                            style={{
                                resize: 'none',
                                outline: 'none', // remove o contorno padrão
                                border: '1px solid #ccc', // borda padrão
                                padding: '8px'
                            }}
                            onFocus={(e) => (e.currentTarget.style.border = '1px solid #134780')} // azul ao focar
                            onBlur={(e) => (e.currentTarget.style.border = '1px solid #ccc')}
                            value={ataReuniao}
                            onChange={(e) => setAtaReuniao(e.target.value)}
                        />
                        {dataReuniao && (
                            <div className="botao-salvar">
                                <form>
                                    <Button size="large" action={handleSalvarAta}>
                                        <FaSave
                                            style={{ fontSize: '1.2rem', marginRight: '4px' }}
                                        />
                                        Salvar
                                    </Button>
                                </form>
                            </div>
                        )}
                    </BoxContainer>
                </div>
                <div className="column">
                    <div style={{ marginBottom: '20px' }}>
                        <AtoresReuniao></AtoresReuniao>
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <BoxContainer titulo={''}>
                            <div className="blue-line">
                                <h3>
                                    {' '}
                                    <FaRegCalendar /> Próxima Reunião
                                </h3>
                            </div>
                            <form onSubmit={handleSubmit(handleSubmitDataReuniao)}>
                                <div className="rowInput">
                                    <Input
                                        label="Data"
                                        type="date"
                                        {...register('data', { required: true })}
                                    />
                                    <Input
                                        label="Horário"
                                        type="time"
                                        {...register('hora', { required: true })}
                                    />
                                    <Button size="small" type="submit">
                                        Agendar
                                    </Button>
                                    {errorData && <p style={{ color: 'red' }}>{errorData}</p>}
                                </div>
                            </form>
                        </BoxContainer>
                    </div>
                </div>
            </div>
        </IntervencaoContainer>
    );
}
