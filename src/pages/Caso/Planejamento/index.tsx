import React, { useCallback, useState } from 'react';
import { PlanejamentoContainer } from './styles';
import AcoesReuniao from './Acoes';
import { ColumnContainer } from '../../../components/ui/ColumnContainer';
import { BoxContainer } from '../../../components/ui/BoxContainer';
import { FaInfoCircle, FaRegCalendar } from 'react-icons/fa';
import DataTable from 'react-data-table-component';
import TarefasReuniao from './Tarefas';
import AtasAnteriores from './Atas-Anteriores';
import Input from '../../../components/ui/Input';
import { useForm } from 'react-hook-form';
import { Button } from '../../../components/ui/Button';
import { useCasoSelecionado } from '../../../contexts/caso-selecionado';
import {
    agendarReuniao,
    AgendarReuniaoRequest
} from '../../../common/api/casos/planejamento/agendar-reuniao';
import Swal from 'sweetalert2';

export interface DataReuniaoFormField {
    data: Date;
    hora: string;
}

export default function Planejamento() {
    const { caso } = useCasoSelecionado();
    const { register, handleSubmit } = useForm<DataReuniaoFormField>({});

    const [errorData, setErrorData] = useState<string | null>(null);
    const [data, setData] = useState<Date | null>(null);

    const handleSubmitDataReuniao = useCallback(
        async (formData: DataReuniaoFormField) => {
            const dataString = `${formData.data}T${formData.hora}:00`;
            console.log(dataString);
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
