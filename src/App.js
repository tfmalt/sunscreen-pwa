import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import './App.css';

document.body.style = 'background: #00bcd4;';

const SunscreenApp = () => (
  <div> 
    <AppBar 
      title="SD60 Sunscreen"
      iconClassNameRight="muidocs-icon-navigation-expand-more"
    />
    <p>
      <RaisedButton label="Default" />
    </p>
    <p>
      Hello world
    </p>
  </div>
);

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <SunscreenApp />
      </MuiThemeProvider>
    );
  }
}

export default App;
