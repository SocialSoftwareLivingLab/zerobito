import React from 'react';
import AppRoutes from './common/routes/AppRoutes';
import { UsuarioAutenticadoContextProvider } from './contexts/usuario-autenticado';
import 'react-tabs/style/react-tabs.css';

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
