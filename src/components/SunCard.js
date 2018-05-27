import 'rc-slider/assets/index.css'
import React, { Component } from 'react'
import { withTheme, withStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Slider from 'rc-slider'
// import LocalCache from '../library/LocalCache'
import debug from '../library/Debug'

const TooltipSlider = Slider.createSliderWithTooltip(Slider);

//const cache = new LocalCache()
const styles = theme => ({
  sliderFlexRows: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: "3vh"
  },
  deviceBox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flex: "1 1 auto",
    maxWidth: "360px",
  },
  cardHeader: {
    backgroundColor: theme.palette.primary.light,
    width: "92vw",
    flex: "1 1 auto",
  }, 

  cardTitle: {
    paddingLeft: "12px",
    position: "relative",
  },
  cardSubheader: {
    paddingLeft: "12px",
    position: "relative"
  },
  cardHeaderAction: {
    paddingRight: "12px"
  },

  positionDisplay: {
    height: "10vh",
    textAlign: "center",
  },
  
  positionText: {
    display: "block",
    fontSize: "8vh",
    color: theme.palette.primary.main
  },
})

const marks = {
    10: "",
    25: "",
    50: "",
    75: "",
    90: ""
}


class SunCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sliderPosition: 0,
      verifiedPosition: 0,
      entity: props.data
    }
    this.scss = this.sliderCSS(props.theme)
  }

  handleOnHeaderClick = () => () => {
    this.fetchSunscreenEntities(this.props.auth)
  }

  onSliderChange = () => (value) => {
    this.setState({
      sliderPosition: value,
    })
  };

  sliderCSS = (theme) => {
    return {
      sliderStyle: {
        flex: "0 1 auto",
        height: "40vh",
        width: "18px",
        paddingTop: "12px",
        paddingBottom: "12px"
      },

      handleStyle: {
        width: "40px",
        height: "40px",
        borderColor: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.main,
        marginLeft: "-16px",
        marginBottom: "-16px"
      },
    
     trackStyle: {
       width: "8px",
       backgroundColor: theme.palette.primary.main,
     },

      railStyle: {
        width: "8px",
        backgroundColor: theme.palette.grey[300],
      },

      dotStyle: {
        height: "16px",
        borderColor: theme.palette.grey[300],
        left: "0px",
        width: "16px",
        borderWidth: "4px"
      },

      activeDotStyle: {
        borderColor: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.main
      }
    }
  }

  render() {
    const { entity } = this.state
    const { classes} = this.props
    const scss = this.scss

    return (
      <Card raised className={classes.deviceBox}>
        <CardHeader className={classes.cardHeader} classes={{
          title: classes.cardTitle,
          subheader: classes.cardSubheader,
          action: classes.cardHeaderAction
        }}
          action={
            <IconButton onClick={this.handleOnHeaderClick()}>
              <MoreVertIcon />
            </IconButton>
          }
          title={entity.attributes.friendly_name}
          subheader={(new Date(entity.last_updated).toDateString())}
        />
        <CardContent>
          <div className={classes.positionDisplay}>
            <span className={classes.positionText}>
              {this.state.sliderPosition}
            </span>
          </div>
          <div className={classes.sliderFlexRows}>
            <div style={scss.sliderStyle}>
              <TooltipSlider vertical marks={marks} included={true} min={0} max={100}
                defaultValue={this.state.sliderPosition}
                trackStyle={scss.trackStyle}
                railStyle={scss.railStyle}
                handleStyle={[scss.handleStyle]} 
                dotStyle={scss.dotStyle}
                activeDotStyle={scss.activeDotStyle}
                tipProps={{placement: "right"}}
                onChange={this.onSliderChange('slider')}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }
}

export default withTheme()(withStyles(styles)(SunCard))