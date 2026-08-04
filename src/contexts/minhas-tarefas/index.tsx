import React, { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useCasoSelecionado } from '../caso-selecionado';
import { useUsuarioAutenticado } from '../usuario-autenticado';
import { buscarMembrosGrupo } from '../../common/api/casos/grupo-trabalho/consultar-membros-grupo';
import { buscarTarefasMembro } from '../../common/api/casos/grupo-trabalho/tarefas-membro';

export interface Tarefa {
    nome: string;
    status: string;
    prazo: Date;
}

interface TarefasContextType {
    tarefas: Tarefa[];
    isLoading: boolean;
}

const TarefasContext = createContext<TarefasContextType | undefined>(undefined);

export const TarefasProvider = ({ children }: { children: React.ReactNode }) => {
    const { caso } = useCasoSelecionado();
    const { data: user } = useUsuarioAutenticado();

    const { data: membro } = useQuery({
        queryKey: ['casos', 'membros-grupo-trabalho-com-tarefas', caso.id],
        queryFn: () => buscarMembrosGrupo(caso.id),
        select: (result) => result.find((m) => m.nome === user?.nome),
        enabled: !!user && !!caso?.id
    });

    const { data: tarefas = [], isLoading } = useQuery({
        queryKey: ['tarefas', caso.id, membro?.id],
        queryFn: () => (membro?.id ? buscarTarefasMembro(caso.id, membro.id) : Promise.resolve([])),
        select: (result) =>
            result.map((tarefa) => ({
                ...tarefa,
                status: tarefa.status.nome
            })),
        enabled: !!membro?.id
    });

    return (
        <TarefasContext.Provider value={{ tarefas, isLoading }}>{children}</TarefasContext.Provider>
    );
};

export const useTarefas = (): TarefasContextType => {
    const context = useContext(TarefasContext);
    if (!context) {
        throw new Error('useTarefas deve ser usado dentro de um TarefasProvider');
    }
    return context;
};
