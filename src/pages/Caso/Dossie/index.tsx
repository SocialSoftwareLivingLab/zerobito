import React, { useCallback, useEffect, useState } from 'react';
import { DossieCard } from '../../../components/DossieCard';
import { BoxContainer } from '../../../components/ui/BoxContainer';
import { ColumnContainer } from '../../../components/ui/ColumnContainer';
import { useCasoSelecionado } from '../../../contexts/caso-selecionado';
import { DossieContainer } from './styles';
import { TabelaOcorrenciaNovo } from '../../../components/Tabelas/Ocorrencias';
import useDossieViewModel from './model';
import { TabelaOcorrenciaSimplesNovo } from '../../../components/Tabelas/OcorrenciasSimples';
import SuasTarefas from '../../../components/Tabelas/tarefas-user-dossie';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Value } from 'react-calendar/dist/esm/shared/types.js';
import CalendarioCustomizado, { CalendarItem } from '../../../components/Calendario';
import { getReunioes } from '../../../common/api/casos/planejamento/get-reunioes-marcadas';

export default function DossiePage() {
    const { caso } = useCasoSelecionado();

    const { eventos } = useDossieViewModel(caso.id);

    const [value, onChange] = useState<Value>(new Date());

    const [reunioes, setReunioes] = useState<CalendarItem[]>([]);

    useEffect(() => {
        const fetchReunioes = async () => {
            try {
                if (caso?.id) {
                    const response = await getReunioes(caso.id);
                    setReunioes(response); // ou apenas response, conforme sua API
                    console.log(response);
                }
            } catch (error) {
                console.error('Erro ao buscar a próxima reunião:', error);
            }
        };

        fetchReunioes(); // chama assim que a página carrega
    }, [caso?.id]); // roda sempre que caso.id mudar
    return (
        <DossieContainer>
            <ColumnContainer>
                <DossieCard caso={caso}></DossieCard>
            </ColumnContainer>
            <ColumnContainer>
                <TabelaOcorrenciaSimplesNovo ocorrencias={eventos} />
                <SuasTarefas />
                <CalendarioCustomizado reunioes={reunioes} />
            </ColumnContainer>
        </DossieContainer>
    );
}
