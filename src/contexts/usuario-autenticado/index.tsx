import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { UsuarioAutenticado, UsuarioAutenticadoContextData } from './model';
import { useHistory } from 'react-router-dom';

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

    const history = useHistory();

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

    useEffect(() => {
        if (history) {
            if (usuarioLogado?.token) {
                history.replace('/home');
            } else {
                history.replace('/login');
            }
        }
    }, [usuarioLogado, history]);

    return (
        <UsuarioAutenticadoContext.Provider
            value={{
                data: usuarioLogado,
                login,
                logout
            }}>
            {props.children}
        </UsuarioAutenticadoContext.Provider>
    );
}

export function useUsuarioAutenticado() {
    return useContext(UsuarioAutenticadoContext);
}
