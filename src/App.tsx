import React from 'react';
import 'react-tabs/style/react-tabs.css';
import AppRoutes from './common/routes/AppRoutes';
import { UsuarioAutenticadoContextProvider } from './contexts/usuario-autenticado';

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
    return (
        <UsuarioAutenticadoContextProvider>
            <QueryClientProvider client={queryClient}>
                <div className="app">
                    <AppRoutes />
                </div>
            </QueryClientProvider>
        </UsuarioAutenticadoContextProvider>
    );
}

export default App;
