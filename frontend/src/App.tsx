import { Box, CssBaseline, MuiThemeProvider } from '@material-ui/core';
import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Breadcrumbs from './components/Breadcrumbs';
import { Navbar } from './components/Navbar';
import { Page } from './components/Page';
import AppRouter from './routes/AppRouter';
import theme from './theme';

const App : React.FC = () => {
  return (
    <React.Fragment>
      <MuiThemeProvider theme={theme}>
        <CssBaseline/>
        <BrowserRouter>
          <Navbar/>
          <Box paddingTop={'70px'}>
            <Breadcrumbs/>
            <AppRouter/>
          </Box>
        </BrowserRouter>
      </MuiThemeProvider>
    </React.Fragment>
  );
}

export default App;
