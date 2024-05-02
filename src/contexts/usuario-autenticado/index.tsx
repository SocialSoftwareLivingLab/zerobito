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

export function UsuarioAutenticadoContextProvider(props: UsuarioAutenticadoContextProviderProps) {
    const tokenStorage = localStorage.getItem('token');
    const usuarioStorage = JSON.parse(localStorage.getItem('usuario') && '{}') as Exclude<
        UsuarioAutenticado,
        'token'
    >;

    const [usuarioLogado, setUsuarioLogado] = useState<UsuarioAutenticado>({
        token: tokenStorage,
        nome: usuarioStorage?.nome || null,
        email: usuarioStorage?.email || null,
        perfil: usuarioStorage?.perfil || null
    });

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
        if (history) {
            if (usuarioLogado?.token) {
                redirect('/home');
            } else {
                redirect('/login');
            }
        }
    }, [usuarioLogado]);

    return (
        <UsuarioAutenticadoContext.Provider
            value={{
                data: usuarioLogado,
                login,
                logout,
                isAutenticado
            }}>
            {props.children}
        </UsuarioAutenticadoContext.Provider>
    );
}

export function useUsuarioAutenticado() {
    return useContext(UsuarioAutenticadoContext);
}
