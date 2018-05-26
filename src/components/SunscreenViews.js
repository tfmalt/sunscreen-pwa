import 'rc-slider/assets/index.css'
import React, { Component } from 'react'
import { withTheme, withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import grey from '@material-ui/core/colors/grey'
import Slider from 'rc-slider'
import SwipeableViews from 'react-swipeable-views'
import LocalCache from '../library/LocalCache'
import debug from '../library/Debug'

const cache = new LocalCache()
const TooltipSlider = Slider.createSliderWithTooltip(Slider);

const styles = theme => ({
  root: {
    width: "100vw",
    height: "100vh"
  },
  deviceBox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "80vh",
    width: "88vw",
    margin: "14vh 6vw",
  },
  containmentUnit: {
    backgroundColor: grey[100],
  },
  cardHeader: {
    backgroundColor: theme.palette.primary.light,
    width: "80vw"
  },

  sliderFlexRows: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: "3vh"
  }
});

const marks = {
    10: "",
    25: "",
    50: "",
    75: "",
    90: ""
}

class SunscreenViews extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sunscreenValue: 0,
      sunscreenEntities: cache.sunscreenEntities || [{
        attributes: {
          friendly_name: "placeholder"
        }
      }],
      credentials: this.props.auth
    }

    this.palette = props.theme.palette

    this.sliderStyle = {
        flex: "0 1 auto",
        height: "49vh",
        width: "18px",
        paddingTop: "12px",
        paddingBottom: "12px"
    }

    this.handleStyle = [{
        width: "40px",
        height: "40px",
        borderColor: this.palette.primary.main,
        backgroundColor: this.palette.primary.main,
        marginLeft: "-16px",
        marginBottom: "-16px"
    }]

    this.trackStyle = {
        width: "8px",
        backgroundColor: this.palette.primary.main,
    }

    this.railStyle = {
        width: "8px",
        backgroundColor: this.palette.grey[300],
    }

    this.dotStyle = {
        height: "16px",
        borderColor: this.palette.grey[300],
        left: "0px",
        width: "16px",
        borderWidth: "4px"
    }
    this.activeDotStyle = {
        borderColor: this.palette.primary.main,
        backgroundColor: this.palette.primary.main
    }
  };

  onSliderChange = function(value) {
    this.setState({
      sunscreenValue: value,
    })
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

  handleOnHeaderClick = () => () => {
    this.fetchSunscreenEntities(this.props.auth)
  }

  render() {
    const { classes } = this.props
    const screens = this.state.sunscreenEntities

    return (
        <div id="containment-unit" className={classes.containmentUnit}>
          <SwipeableViews>
            {screens.map( item => {
              item.key = item.entity_id
              return (
                <Card raised className={classes.deviceBox} key={item.key}>
                  <CardHeader className={classes.cardHeader}
                    action={
                      <IconButton onClick={this.handleOnHeaderClick()}>
                        <MoreVertIcon />
                      </IconButton>
                    }
                    title={item.attributes.friendly_name}
                    subheader={(new Date(item.last_updated).toDateString())}
                  />
                  <CardContent>
                    <div style={{
                      height: "10vh",
                      textAlign: "center",
                    }}>
                <span style={{
                  display: "block",
                  fontSize: "8vh",
                  color: this.props.theme.palette.primary.main
                }}>
                  {this.state.sunscreenValue}
                </span>
              </div>
              <div className={classes.sliderFlexRows}>
                <div style={this.sliderStyle}>
                  <TooltipSlider vertical marks={marks} included={true} min={0} max={100}
                    defaultValue={this.props.sunscreenValue}
                    trackStyle={this.trackStyle}
                    railStyle={this.railStyle}
                    handleStyle={this.handleStyle} 
                    dotStyle={this.dotStyle}
                    activeDotStyle={this.activeDotStyle}
                    tipProps={{placement: "right"}}
                    onChange={this.onSliderChange.bind(this)}
                  />
                </div>
              </div>
              </CardContent>
            </Card>
              )
            })}
          </SwipeableViews>
        </div>
    )
  }
}

export default withTheme()(withStyles(styles)(SunscreenViews))
