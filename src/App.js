import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles'
import { amber, teal } from '@material-ui/core/colors'
import './App.css';
import Home from './components/Home'
import Authorize from './components/Authorize'
import debug from './library/Debug'

const sunTheme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: amber[700],
    }, 
    secondary: {
      main: teal[700],
    }
  }
});

debug.log("dark color:", sunTheme.palette.primary.dark)
debug.log("Theme:", sunTheme)

const styles = sunTheme => ({});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={sunTheme}>
        <BrowserRouter>
          <div>
            <Route exact path="/" component={Home} />
            <Route path="/auth" component={Authorize} />
          </div>
        </BrowserRouter>
      </MuiThemeProvider>
    )
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(App);
