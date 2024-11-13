import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
import PrivateRoute from './PrivateRoute';
import DossiePage from '../../pages/Caso/Dossie';
import Notificacoes from '../../pages/Caso/Notificacoes';
import CasoConvite from '../../pages/CasoConvite';
import Preparacao from '../../pages/Caso/Preparacao';
import Planejamento from '../../pages/Caso/Planejamento';
import ReunioesPlanejamento from '../../pages/Caso/Planejamento/Reunioes';

interface PrivateRouteConfig {
    path: string;
    Component: React.ComponentType;
}

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
                {/* Rotas Privadas */}
                <Route element={<PrivateRoute />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/ocorrencia" element={<RegistrarOcorrencia />} />
                    <Route path="/ocorrencia/:id/aceitar" element={<AceitarOcorrenciaPage />} />
                    <Route path="/biblioteca" element={<BibliotecaCasos />} />
                    <Route path="/material" element={<Material />} />
                    <Route path="/painel" element={<PainelControle />} />
                    <Route path="/imprensa" element={<Imprensa />} />
                    <Route path="/perfil" element={<Perfil />} />
                    <Route path="/observatorio" element={<ObservatorioZeroObito />} />
                    <Route path="/casos" element={<Caso />}>
                        <Route index path=":id/dossie" element={<DossiePage />} />
                        <Route index path=":id/notificacoes" element={<Notificacoes />} />
                        <Route index path=":id/preparacao" element={<Preparacao />} />
                        <Route index path=":id/planejamento" element={<Planejamento />} />
                        <Route
                            index
                            path=":id/planejemento/reunioes"
                            element={<ReunioesPlanejamento />}
                        />
                    </Route>
                </Route>
                {/* Rotas Públicas */}
                {publicRoutes.map(({ path, Component }) => (
                    <Route key={path} path={path} element={<Component />} />
                ))}

                <Route path="/convites/:token" element={<CasoConvite />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
