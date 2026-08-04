import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { redirect } from 'react-router-dom';
import { UsuarioAutenticado, UsuarioAutenticadoContextData } from './model';

export const UsuarioAutenticadoContext = createContext({} as UsuarioAutenticadoContextData);

export interface UsuarioAutenticadoContextProviderProps {
    children: React.ReactNode;
}

export function resetarDados() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
}

export function salvarDados(data: UsuarioAutenticado) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('usuario', JSON.stringify(data));
}

export interface Perfil {
    codigo: string;
    nome: string;
    permissoes: string[];
}

export function UsuarioAutenticadoContextProvider(props: UsuarioAutenticadoContextProviderProps) {
    const [usuarioLogado, setUsuarioLogado] = useState<UsuarioAutenticado>({
        token: null,
        id: null,
        nome: null,
        email: null
    });
    const [isLoading, setIsLoading] = useState(true);

    const logout = useCallback(() => {
        resetarDados();
        setUsuarioLogado(null);
    }, [setUsuarioLogado]);

    const login = useCallback(
        (data: UsuarioAutenticado) => {
            salvarDados(data);
            setUsuarioLogado(data);
        },
        [setUsuarioLogado]
    );

    const isAutenticado = useMemo(() => {
        return !!usuarioLogado?.token;
    }, [usuarioLogado?.token]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const usuarioSalvo = JSON.parse(localStorage.getItem('usuario') || '{}') as Exclude<
            UsuarioAutenticado,
            'token'
        >;
        if (token) {
            setUsuarioLogado({ ...usuarioSalvo, token });
        }
        setIsLoading(false);
    }, []);

    return (
        <UsuarioAutenticadoContext.Provider
            value={{
                data: usuarioLogado,
                login,
                logout,
                isAutenticado,
                isLoading
            }}>
            {props.children}
        </UsuarioAutenticadoContext.Provider>
    );
}

export function useUsuarioAutenticado() {
    return useContext(UsuarioAutenticadoContext);
}
