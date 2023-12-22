import React from "react";

import {
    BrowserRouter, Redirect, Route, Switch
} from "react-router-dom";

import PrivateRoute from "../../components/PrivateRoute"
import Cadastro from "../../pages/Cadastro";
import PainelControle from "../../pages/PainelControleUsuario";
import Ocorrencia from "../../pages/Ocorrencia";
import BibliotecaCasos from "../../pages/BibliotecaCaso";
import Material from "../../pages/MaterialConsulta";
import Imprensa from "../../pages/Imprensa";
import SobreNos from "../../pages/SobreNos";
import Contato from "../../pages/Contato";
import Login from "../../pages/Login";
import Home from "../../pages/Home";
import Perfil from "../../pages/Perfil";


const AppRoutes = () => {
    return(
        <BrowserRouter>
                <Switch>
                    <Route exact path="/" render={() => <Redirect to="/login" />} />
                    <Route exact path="/login" component={Login} />
                    <Redirect exact path="/" to="/profile" />
                    <PrivateRoute path="/home" component={Home} />
                    <PrivateRoute path="/ocorrencia" component={Ocorrencia} />
                    <PrivateRoute path="/ocorrencia/:id" component={Ocorrencia} />
                    <PrivateRoute path="/biblioteca" component={BibliotecaCasos} />
                    <PrivateRoute path="/material" component={Material} />
                    <PrivateRoute path="/painel" component={PainelControle} />
                    <PrivateRoute path="/imprensa" component={Imprensa} />
                    <PrivateRoute path="/perfil" component={Perfil} />
                    <Route exact path="/cadastro" component={Cadastro} />
                    <Route exact path="/sobre" component={SobreNos} />
                    <Route exact path="/contato" component={Contato} />
                </Switch>
        </BrowserRouter>
    );
};

export default AppRoutes;