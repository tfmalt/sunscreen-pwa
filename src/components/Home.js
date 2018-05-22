import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import SunscreenViews from './SunscreenViews'
import SunAppBar from './SunAppBar'

const storage = window.localStorage;

class Home extends Component {
  constructor(props) {
    super(props)

    console.log("home props location:", props.location)
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
      <div>
        <SunAppBar auth={this.state} title="SD60 Sunscreen" location={this.props.location} />
        <SunscreenViews auth={this.state} location={this.props.location}/>
      </div>
    );
  }
}

export default Home