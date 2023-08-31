import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
} from "react-router-dom";

import Cadastro from "../../pages/Cadastro";
import SobreNos from "../../pages/SobreNos";
import Contato from "../../pages/Contato";
import Login from "../../pages/Login";
import Home from "../../pages/Home";

const AppRoutes = () => {

    return (
        <Router>
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/cadastro" element={<Cadastro />} />
                    <Route exact path="/login" element={<Login />} />
                    <Route exact path="/sobre" element={<SobreNos />} />
                    <Route exact path="/contato" element={<Contato />} />
                </Routes>
        </Router>
    );
};

export default AppRoutes;