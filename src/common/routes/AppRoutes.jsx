import React from "react";

import {
    BrowserRouter, Redirect, Route, Switch
} from "react-router-dom";

import PrivateRoute from "../../components/PrivateRoute"
import Cadastro from "../../pages/Cadastro";
import SobreNos from "../../pages/SobreNos";
import Contato from "../../pages/Contato";
import Login from "../../pages/Login";
import Home from "../../pages/Home";

const AppRoutes = () => {
    return(
        <BrowserRouter>
                <Switch>
                    <Route exact path="/" render={() => <Redirect to="/login" />} />
                    <Route exact path="/login" component={Login} />
                    <PrivateRoute exact path="/home" component={Home} />
                    <Route exact path="/cadastro" component={Cadastro} />
                    <Route exact path="/sobre" component={SobreNos} />
                    <Route exact path="/contato" component={Contato} />
                </Switch>
        </BrowserRouter>
    );
};

export default AppRoutes;