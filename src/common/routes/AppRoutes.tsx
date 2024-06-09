import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from '../../components/PrivateRoute';
import BibliotecaCasos from '../../pages/BibliotecaCaso';
import Cadastro from '../../pages/Cadastro';
import Contato from '../../pages/Contato';
import Home from '../../pages/Home';
import Imprensa from '../../pages/Imprensa';
import Login from '../../pages/Login';
import Material from '../../pages/MaterialConsulta';
import ObservatorioZeroObito from '../../pages/ObservatorioZeroObito';
import AceitarOcorrenciaPage from '../../pages/Ocorrencia/Aceite';
import RegistrarOcorrencia from '../../pages/Ocorrencia/Cadastro';
import PainelControle from '../../pages/PainelControleUsuario';
import Perfil from '../../pages/Perfil';
import SobreNos from '../../pages/SobreNos';
import BarraNavegacao from '../../components/BarraNavegacao';
import Caso from '../../pages/Caso';

interface PrivateRouteConfig {
    path: string;
    Component: React.ComponentType;
}

const privateRoutes: PrivateRouteConfig[] = [
    { path: '/', Component: Home },
    { path: '/home', Component: Home },
    { path: '/ocorrencia', Component: RegistrarOcorrencia },
    { path: '/ocorrencia/:id/aceitar', Component: AceitarOcorrenciaPage },
    { path: '/biblioteca', Component: BibliotecaCasos },
    { path: '/material', Component: Material },
    { path: '/painel', Component: PainelControle },
    { path: '/imprensa', Component: Imprensa },
    { path: '/perfil', Component: Perfil },
    { path: '/observatorio', Component: ObservatorioZeroObito },
    { path: '/casos/:id', Component: Caso }
];

const publicRoutes: PrivateRouteConfig[] = [
    { path: '/login', Component: Login },
    { path: '/cadastro', Component: Cadastro },
    { path: '/sobre', Component: SobreNos },
    { path: '/contato', Component: Contato }
];

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <BarraNavegacao />
            <Routes>
                {privateRoutes.map(({ path, Component }) => (
                    <Route
                        key={path}
                        path={path}
                        element={
                            <PrivateRoute>
                                <Component />
                            </PrivateRoute>
                        }
                    />
                ))}
                {publicRoutes.map(({ path, Component }) => (
                    <Route key={path} path={path} element={<Component />} />
                ))}
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
