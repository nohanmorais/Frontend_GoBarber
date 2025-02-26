import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import GlobalStyle from './styles/global';

import AppProvider from './context/index';

import Routes from './routes/index';


const App: React.FC = () => (

    <BrowserRouter>
        <AppProvider>
                <Routes />
        </AppProvider>

        <GlobalStyle />
    </BrowserRouter>

);

export default App;
