import React from 'react';
import 'react-tabs/style/react-tabs.css';
import AppRoutes from './common/routes/AppRoutes';
import { UsuarioAutenticadoContextProvider } from './contexts/usuario-autenticado';

function App() {
    return (
        <UsuarioAutenticadoContextProvider>
            <div className="app">
                <AppRoutes />
            </div>
        </UsuarioAutenticadoContextProvider>
    );
}

export default App;
