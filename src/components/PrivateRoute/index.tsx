import React from 'react';
import { useUsuarioAutenticado } from '../../contexts/usuario-autenticado';
import { Navigate } from 'react-router-dom';
import useQuerySearch from '../../hooks/use-query-search.hook';

export interface PrivateRoutePros {
    children: React.ReactElement;
}

export default function PrivateRoute({ children }: PrivateRoutePros) {
    const { isAutenticado } = useUsuarioAutenticado();

    const redirectTo = window.location.pathname;

    console.log('aqui');
    console.log(`/login?redirectTo=${redirectTo}`);

    return isAutenticado ? children : <Navigate to={`/login?redirectTo=${redirectTo}`} replace />;
}
