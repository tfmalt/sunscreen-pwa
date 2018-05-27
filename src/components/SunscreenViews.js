import React, { Component } from 'react'
import { withTheme, withStyles } from '@material-ui/core/styles'
// import grey from '@material-ui/core/colors/grey'
import SwipeableViews from 'react-swipeable-views'
import SunCard from './SunCard'
import LocalCache from '../library/LocalCache'
import debug from '../library/Debug'

const cache = new LocalCache()

const styles = theme => ({
  root: {
    width: "100vw",
    height: "100vh",
  },
  outerWrapper: {
    backgroundColor: theme.palette.background.default,
    height: "100vh"
  },
  swipeableCanvas: {
    position: "relative",
    top: "60px",
  },
  swipeableViews: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fcc"
  }
});

class SunscreenViews extends Component {
  constructor(props) {
    super(props)

    const entities = cache.sunscreenEntities
    debug.log("sunscreen views entities from cache:", entities)

    this.state = {
      sunscreenValue: 0,
      sunscreenEntities: cache.sunscreenEntities || [{
        attributes: {
          friendly_name: "placeholder"
        }
      }],
      credentials: this.props.auth
    }
  };

  componentDidMount() {
    this.fetchSunscreenEntities(this.state.credentials)
  }

  fetchSunscreenEntities = (auth) => {
    debug.log("got call to fetch sunscreen:", auth)
    return fetch(`${auth.url}/api/states`, {
      headers: {
        "x-ha-access": auth.apikey
      }
    })
    .then(res => res.json())
    .then(data => data.filter(item => item.entity_id.match(/^cover.*level$/)))
    .then(data => {
      debug.log("got sunscreens:", data)
      this.setState({
        sunscreenEntities: data
      })
      cache.sunscreenEntities = data
    })
    .catch(error => {
      console.log("got error fetching sunscreens:", error)
      alert("got error fetching sunscreens:" + error)
    })
  }

  render() {
    const { classes } = this.props
    const screens = this.state.sunscreenEntities

    return (
      <div id="outer-wrapper" className={classes.outerWrapper}>
        <div id="swipeable-canvas" className={classes.swipeableCanvas}>
          <SwipeableViews>
            {screens.map( item => 
              <div key={btoa(item.entity_id)} style={{
                width: "92vw",
                padding: "2vh 4vw 12vh",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
              }}>
                <SunCard key={btoa(item.entity_id)} data={item} />
              </div>
            )}
          </SwipeableViews>
        </div>
      </div>
    )
  }
}

export default withTheme()(withStyles(styles)(SunscreenViews))
