import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUsuarioAutenticado } from '../../contexts/usuario-autenticado';

export default function PrivateRoute() {
    const { isAutenticado } = useUsuarioAutenticado();

    const redirectTo = window.location.pathname;

    return isAutenticado ? <Outlet /> : <Navigate to={`/login?redirectTo=${redirectTo}`} replace />;
}
