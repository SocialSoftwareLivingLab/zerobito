import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUsuarioAutenticado } from '../../contexts/usuario-autenticado';

export default function PrivateRoute() {
    const { isAutenticado, isLoading } = useUsuarioAutenticado();

    const redirectTo = globalThis.location.pathname;

    if (isLoading) return null;

    return isAutenticado ? <Outlet /> : <Navigate to={`/login?redirectTo=${redirectTo}`} replace />;
}
