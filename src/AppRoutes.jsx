import React, { useContext } from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate
} from "react-router-dom";

import Cadastro from "./pages/Cadastro";
import SobreNos from "./pages/SobreNos";
import Contato from "./pages/Contato";
import Login from "./pages/Login";
import Home from "./pages/Home";

import { AuthProvider, AuthContext} from "./contexts/auth";

const AppRoutes = () => {
    const Private = ({children }) => {
        const { authenticated } = useContext(AuthContext);

        if(!authenticated){
            return <Navigate to="/login" />;
        }

        return children;
    };

    return (
        <Router>
            <AuthProvider>
             <Routes>
                <Route 
                    exact path="/"
                    element={
                        <Private>
                            <Home />
                        </Private>
                    } 
                />
                <Route exact path="/cadastro" element={<Cadastro />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/sobre" element={<SobreNos />} />
                <Route exact path="/contato" element={<Contato />} />
            </Routes>
            </AuthProvider>
        </Router>
    );
};

export default AppRoutes;