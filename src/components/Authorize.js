import { withStyles } from "@material-ui/core"
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Input from '@material-ui/core/Input'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import Checkbox from '@material-ui/core/Checkbox'
import Typography from '@material-ui/core/Typography'
import SunAppBar from './SunAppBar'
import validator from 'validator'

const styles = theme => ({
  button: {},
  textField: {}
});

class Authorize extends Component {
  constructor(props) {
    super(props)
    this.classes = props.classes
    this.state = {
      url: "",
      password: "",
      rememberCredentials: false,
      showPassword: false,
      isPasswordError: false,
      passwordHelperText: "",
      isURLError: false,
      urlHelperText: "",
      networkInfoOpen: true
    }
  }

  handleChange = name => event => {
    console.log("handle change", name, event.target.value)
    this.setState({
      [name]: event.target.value 
    })
  }

  handleOnBlur = name => event => {
    console.log("handle blur", name, event.target.value)
    if (name === "url") {
      this.validateURL(event.target.value)
    }
  }

  handleShowPasswordChange = name => event => {
    this.setState({
      [name]: this.state.showPassword ? false : true     
    })
  }

  handleCheckboxChange = name => event => {
    this.setState({
      [name]: event.target.checked
    })
  };

  handleIncorrectURL = () => {
    this.setState({
      isURLError: true,
      urlHelperText: "URL is currently incorrect"
    })
  }

  handleCorrectURL = () => {
    this.setState({
      isURLError: false,
      urlHelperText: ""
    })  
  }

  handleCouldNotConnectURL = () => {
    this.setState({
      isURLError: true,
      urlHelperText: "Could not connect to this URL"
    })
  }

  validateURL = url => {
    if(validator.isURL(url) === true) {
      this.handleCorrectURL()
      return true
    }
    else {
      this.handleIncorrectURL()
      return false
    }
  }

  handleButtonClick = name => event => {
    console.log("button:", name, this.state)
    if (this.validateURL(this.state.url) === false) {
      return false
    }

    const url = this.state.url.replace(/\/$/, "")
    console.log("url:", url)
    fetch(`${url}/api/`, {
      method: "GET",
      mode: "no-cors",
      headers: {
        'X-HA-Access': this.state.password,
        'Content-Type': "application/json"
      }
    }).then(res => {
      console.log("Got result", res)
    }).catch(error => {
      console.log("Got error:", error)
      this.handleCouldNotConnectURL()
    })
  }

  handleSubmit = event => event.preventDefault()

  render() {
    return ( 
      <div style={{height: "100%", backgroundColor: "white"}}>
        <SunAppBar title = "SD60 Sunscreen" />
        <div style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          margin: "4vh 8vw",
          height: "80%",
        }}>
          <Typography variant="subheading" color="inherit">
            Please enter the SD60 URI and password to authorize:
          </Typography> 
          <TextField id="hostname" label="Home Assistant URL"
            placeholder="Home Assistant URL"
            autoComplete="url"
            type="url"
            onChange={this.handleChange('url')}
            onBlur={this.handleOnBlur('url')}
            className={this.classes.textField}
            helperText={this.state.urlHelperText}
            error={this.state.isURLError}
            margin="normal"
            style={{flex: "0 0 auto"}}
          />
          <FormControl style={{flex: "0 0 auto"}} onSubmit={this.handleSubmit}>
            <InputLabel htmlFor="adornment-password">Password</InputLabel>
            <Input id="adornment-password"
              type={this.state.showPassword ? 'text' : 'password'}
              value={this.state.password}
              onChange={this.handleChange('password')}
              endAdornment={ 
                <InputAdornment position="end">
                  <IconButton aria-label="Toggle password visibility"
                    onClick={this.handleShowPasswordChange('showPassword')}
                  >
                    {this.state.showPassword ? <VisibilityOff /> : <Visibility />} 
                  </IconButton> 
                </InputAdornment>
            }/>
            <FormHelperText>{this.state.passwordHelperText}</FormHelperText>
          </FormControl> 
          <FormGroup style={{marginBottom: "12px"}}>
            <FormControlLabel 
              control={
               <Checkbox checked={this.state.rememberCredentials}
                 onChange={this.handleCheckboxChange('rememberCredentials')}
                 value="rememberCredentials"
                 color="primary"
                />
              }
              label="remember credentials" 
            />
          </FormGroup> 
          <Button variant="raised"
            className={this.classes.button}
            color="primary"
            onClick={this.handleButtonClick('authorize')}
          >
            Authorize
          </Button>
        </div>
      </div>
    )
  }
}

Authorize.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Authorize);