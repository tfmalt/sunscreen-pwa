import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import SunscreenViews from './SunscreenViews'
import SunAppBar from './SunAppBar'
import LocalCache from '../library/LocalCache'
import debug from '../library/Debug'

const cache = new LocalCache()

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      credentials: cache.credentials,
      rememberCredentials: cache.rememberCredentials
    }

    if (typeof this.props.location.state === 'object') {
      if (typeof this.props.location.state.credentials === 'object') {
        this.state.credentials = this.props.location.state.credentials
      }
    }
    
    debug.log("Home state and props:", this.state, this.props);
  }

  render() {
    if (typeof this.state.credentials.apikey !== 'string') {
      debug.log("Home: Did not find apikey redirecting", this.state)
      return <Redirect to="/auth" />
    }
    return (
      <div>
        <SunAppBar auth={this.state.credentials} title="SD60 Sunscreen" location={this.props.location} />
        <SunscreenViews auth={this.state.credentials} location={this.props.location}/>
      </div>
    );
  }
}

export default Home