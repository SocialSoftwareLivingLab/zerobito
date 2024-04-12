import React from 'react';
import { useUsuarioAutenticado } from '../../contexts/usuario-autenticado';
import { Navigate } from 'react-router-dom';

export interface PrivateRoutePros {
    children: React.ReactElement;
}

export default function PrivateRoute({ children }: PrivateRoutePros) {
    const { isAutenticado } = useUsuarioAutenticado();

    return isAutenticado ? children : <Navigate to="/login" replace />;
}
