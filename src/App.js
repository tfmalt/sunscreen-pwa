import React, { Component } from 'react'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { withStyles } from '@material-ui/core/styles'
import './App.css';
import SunscreenApp from './components/SunscreenApp'
import Authorize from './components/Authorize'

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

const styles = theme => ({
  textField: {
    marginLeft: sunTheme.spacing.unit,
    marginRight: sunTheme.spacing.unit,
    width: 200,
  },
})

const storage = window.localStorage;

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      apikey: storage.getItem("apikey")
    }
    console.log(this.state);
  }

  render() {
    if (this.state.apikey === null) {
      return <Redirect to="/auth" />
    }
    return (
        <SunscreenApp theme={sunTheme} />
    );
  }
}

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
