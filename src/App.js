import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Slider from 'material-ui/Slider';
import AppBar from 'material-ui/AppBar';
import './App.css';

// document.body.style = 'background: #00bcd4;';

class SunscreenApp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sunscreenValue: 0
    }
  };

  onSliderChange = function(event, value) {
    this.setState({
      sunscreenValue: value
    })
  };

  render() {
    return (
      <div style={{height: "80%"}}>
        <AppBar 
          title="SD60 Sunscreen"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
        />
        <div style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "white",
          height: "100%"
        }}>
          <div style={{
            height: "10vh",
            flex: "0 0 auto",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
          }}>
            <span style={{
              display: "block",
              fontSize: "8vh",
              color: "#00bcd4"
            }}>{this.state.sunscreenValue}</span>
          </div>
          <div style={{
            flex: "1 0 auto",
            width: "100%",
            height: "72vh",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",

            alignSelf: "center",
            textAlign: "center"
          }}>
            <Slider 
              style={{
                height: "90%"
              }} 
             axis="y" 
             defaultValue={this.state.sunscreenValue} 
             min={0}
             max={100}
             step={1}
             onChange={this.onSliderChange.bind(this)}
            />
          </div>
          <div style={{
            height: "10.10vh",
            flex: "0 0 auto"
          }}>
          </div>
        </div>
      </div>
    );
  }
}

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
