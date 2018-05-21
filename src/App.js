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

    if (typeof props.location.state !== 'undefined') {
      this.handleLocationState(props.location.state)
      this.state = props.location.state
    }
    else {
      this.state = {
        apikey: storage.getItem("apikey"),
        url: storage.getItem('url'),
        authorizeOk: storage.getItem('authorizeOk'),
        rememberCredentials: storage.getItem('rememberCredentials'),
      }
    }

    console.log("state", this.state);
  }

  handleLocationState = params => {
      console.log("got params:", params)
      if (params.rememberCredentials === true) {
        storage.setItem('rememberCredentials', true)
        storage.setItem('apikey', params.password)
        storage.setItem('url', params.url)
        storage.setItem('authorizeOk', params.authorizeOk)
      }
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
