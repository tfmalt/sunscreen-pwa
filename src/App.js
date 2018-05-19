import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import SunscreenApp from './components/SunscreenApp';
import './App.css';

const sunTheme = createMuiTheme({
  palette: {
    primary: {
      light: '#fff763',
      main: '#f9c42d',
      dark: '#c29400',
      contrastText: '#000',
    }
  }
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={sunTheme}>
        <SunscreenApp theme={sunTheme} />
      </MuiThemeProvider>
    );
  }
}

export default App;
