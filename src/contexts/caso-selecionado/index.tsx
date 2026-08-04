import React, { createContext, useContext } from 'react';
import { Caso } from '../../common/models/caso/caso';

export interface CasoSelecionadoContextProviderProps {
    caso: Caso;
    children: React.ReactNode;
}

export interface CasoSelecionadoContextData {
    caso: Caso;
}

export const CasoSelecionadoContext = createContext({} as CasoSelecionadoContextData);

export function CasoSelecionadoContextProvider({
    caso,
    children
}: CasoSelecionadoContextProviderProps) {
    const initialData: CasoSelecionadoContextData = {
        caso
    };

    return (
        <CasoSelecionadoContext.Provider value={initialData}>
            {children}
        </CasoSelecionadoContext.Provider>
    );
}

export function useCasoSelecionado() {
    const context = useContext(CasoSelecionadoContext);

    if (!context) {
        throw new Error(
            'useCasoSelecionado precisa estar inserido dentro de um CasoSelecionadoContext'
        );
    }

    return context;
}
