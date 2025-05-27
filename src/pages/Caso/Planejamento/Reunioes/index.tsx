import { useForm } from 'react-hook-form';
import { useCasoSelecionado } from '../../../../contexts/caso-selecionado';
import { useCallback, useState } from 'react';
import { PlanejamentoContainer } from '../styles';
import AcoesReuniao from '../Acoes';
import { BoxContainer } from '../../../../components/ui/BoxContainer';
import { FaInfoCircle, FaRegCalendar, FaSave } from 'react-icons/fa';
import Input from '../../../../components/ui/Input';
import { Button } from '../../../../components/ui/Button';
import Swal from 'sweetalert2';
import {
    agendarReuniao,
    AgendarReuniaoRequest
} from '../../../../common/api/casos/planejamento/agendar-reuniao';
import AtasAnteriores from '../AtasAnteriores';
import TarefasReuniao from './tarefas';
import { salvarAtaReuniao } from '../../../../common/api/casos/grupo-trabalho/aceitar-ata';

export interface DataReuniaoFormField {
    data: Date;
    hora: string;
}

export default function ReunioesPlanejamento() {
    const { caso } = useCasoSelecionado();
    const { register, handleSubmit } = useForm<DataReuniaoFormField>({});

    const [errorData, setErrorData] = useState<string | null>(null);
    const [data, setData] = useState<Date | null>(null);
    const [ataReuniao, setAtaReuniao] = useState('');

    const handleSalvarAta = async () => {
        if (!ataReuniao.trim()) {
            alert('Preencha a ata antes de salvar.');
            return;
        }

        try {
            await salvarAtaReuniao(ataReuniao, caso.id);
            setAtaReuniao('');
            Swal.fire('Sucesso', 'Ata salva com sucesso!', 'success');
        } catch (error) {
            const erro = 'Erro ao salvar a ata.';
            alert(erro);
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
                alert(errorMessage);
            }
        },
        [caso.id]
    );

    return (
        <PlanejamentoContainer>
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
                        <div className="botao-salvar">
                            <form>
                                <Button size="large" action={handleSalvarAta}>
                                    <FaSave style={{ fontSize: '1.2rem', marginRight: '4px' }} />
                                    Salvar
                                </Button>
                            </form>
                        </div>
                    </BoxContainer>
                </div>
                <div className="column">
                    <div style={{ marginBottom: '20px' }}>
                        <TarefasReuniao></TarefasReuniao>
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
                    <AtasAnteriores></AtasAnteriores>
                </div>
            </div>
        </PlanejamentoContainer>
    );
}
