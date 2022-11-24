import React, { useState } from 'react';
import './App.css';
import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { useRoutes } from "react-router-dom";
import routes from './routes';
import Topbar from './components/global/Topbar';
import Sidebar from './components/global/Sidebar';
import { useSelector } from 'react-redux';

function App() {
  const [theme, colorMode] = useMode();
  const {user} = useSelector(state => state.auth);

  const showRoutes = useRoutes(routes)

  return (
     <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
          <div className="app">
            {user !== false && user !== undefined ? <Sidebar /> : ''}
            <main className="content">
              {user !== false && user !== undefined ? <Topbar /> : ''}
              {showRoutes}
            </main>
          </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
