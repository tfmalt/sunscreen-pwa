import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { withStyles } from "@material-ui/core"
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
  textField: {},
  formPage: {
    position: "relative",
    top: "48px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    margin: "12px 8vw",
    height: "76vh",
  },
  root: {
    height: "100vh", 
    width: "100vw", 
    backgroundColor: "white", 
  }
});

class Authorize extends Component {
  constructor(props) {
    super(props)
    this.classes = props.classes
    this.state = {
      url: "",
      apikey: "",
      rememberCredentials: false,
      showPassword: false,
      isPasswordError: false,
      passwordHelperText: "",
      isURLError: false,
      urlHelperText: "",
      authorizeOk: false
    }

    console.log("classes", props.classes)
  }

  handleChange = name => event => {
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

  handleAuthorize = name => event => {
    console.log("button:", name, this.state)
    if (this.validateURL(this.state.url) === false) {
      return false
    }

    const url = `${this.state.url.replace(/\/$/, "")}/api/`
    console.log("url:", url, "apikey:", this.state.apikey)
    return fetch(url, {
      headers: {
        'x-ha-access': this.state.apikey
      },
    }).then((res) => {
      console.log("Got result", res.status)
      if (res.status === 200) {
        this.setState({
          authorizeOk: true
        })
        return
      }
      if (res.status === 401) {
        this.handleIncorrectPassword()
        return
      }
    }).catch(error => {
      console.log("Got error:", error)
      this.handleCouldNotConnectURL()
    })
  }

  handleSubmit = event => event.preventDefault()

  render() {
    if (this.state.authorizeOk) {
      return (<Redirect to={{pathname: '/', state: this.state}} />)
    }

    return ( 
      <div className={this.classes.root}>
        <SunAppBar title="SD60 Sunscreen" auth={this.state} location={this.props.location}/>
        <div className={this.classes.formPage}>
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
              value={this.state.apikey}
              onChange={this.handleChange('apikey')}
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
            onClick={this.handleAuthorize('authorize')}
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