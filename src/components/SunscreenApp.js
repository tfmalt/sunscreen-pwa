import 'rc-slider/assets/index.css'
import React, { Component } from 'react'
import SunAppBar from './SunAppBar'
import { withStyles } from '@material-ui/core'
import Slider from 'rc-slider';

const TooltipSlider = Slider.createSliderWithTooltip(Slider);

const styles = {}
const marks = {
    10: "",
    25: "",
    50: "",
    75: "",
    90: ""
}

class SunscreenApp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sunscreenValue: 0
    }
    this.palette = props.theme.palette

    this.sliderStyle = {
        flex: "0 1 auto",
        height: "60vh",
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

    console.log(props)
  };

  onSliderChange = function(value) {
    console.log(value);
    this.setState({
      sunscreenValue: value
    })
  };

  render() {
    return (
      <div>
      <SunAppBar title="SD60 Sunscreen" />
      <div style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "white",
          height: "100%",
          justifyContent: "center"
      }}>
        <div style={{
            height: "10vh",
            textAlign: "center",
          }}>
          <span style={{
              display: "block",
              fontSize: "8vh",
              color: this.palette.primary.main
          }}>{this.state.sunscreenValue}</span>
        </div>
        <div id="slider-flex-rows">
            <div id="slider-wrapper" style={this.sliderStyle}>
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
        <div id="bottom-footer"></div>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(SunscreenApp);
