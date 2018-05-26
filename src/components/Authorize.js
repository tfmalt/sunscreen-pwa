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
import LocalCache from '../library/LocalCache'
import debug from '../library/Debug'

const cache = new LocalCache()

const styles = theme => ({
  button: {},
  textField: {},
  cardWrapper: {
    position: "relative",
    top: "60px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "80vh",
  },
  formWrapper: {
    display: "flex",
    flex: "1 1 auto",
    flexDirection: "column",
    justifyContent: "center",
    margin: "12px 8vw",
    maxWidth: "480px",
    minWidth: "280px",
  },
  root: {
    height: "100vh", 
    width: "100vw", 
    backgroundColor: "white", 
  }
})

class Authorize extends Component {
  constructor(props) {
    super(props)
    this.classes = props.classes
    this.state = {
      credentials: cache.credentials,
      rememberCredentials: cache.rememberCredentials,
      showPassword: false,
      isPasswordError: false,
      passwordHelperText: "",
      isURLError: false,
      urlHelperText: "",
    }

    debug.log(process.env.NODE_ENV, "Authorize state", this.state);
  }

  handleChange = name => event => {

    const newCreds = this.state.credentials
    newCreds[name] = event.target.value
    this.setState({
      credentials: newCreds
    })
  }

  handleOnBlur = name => event => {
    debug.log("handle blur", name, event.target.value)
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
    if (typeof url !== 'string') {
      debug.log("credentials url is not a valid string")
      this.handleIncorrectURL()
      return false
    }

    if(validator.isURL(url) === true) {
      this.handleCorrectURL()
      return true
    }
    else {
      this.handleIncorrectURL()
      debug.log("credentials url not a valid url")
      return false
    }
  }

  handleAuthorize = credentials => event => {
    debug.log("handle Authorize:", credentials)
    if (this.validateURL(credentials.url) === false) {
      return false
    }

    const url = `${credentials.url.replace(/\/$/, "")}/api/`
    debug.log("Doing fetch", "url:", url, "apikey:", credentials.apikey)
    return fetch(url, {
      headers: {
        'x-ha-access': credentials.apikey
      },
    }).then((res) => {
      if (res.status === 200) {
        credentials.authorizeOk = true;
        this.setState({credentials: credentials})

        if (this.state.rememberCredentials) {
          cache.rememberCredentials = this.state.rememberCredentials
          cache.credentials = credentials
        }

        debug.log("Authorize status:", res.status, credentials)
        return
      }
      if (res.status === 401) {
        this.handleIncorrectPassword()
        credentials.authorizeOk = false
        return
      }
    }).catch(error => {
      debug.log("Got error:", error)
      this.handleCouldNotConnectURL()
    })
  }

  handleSubmit = event => event.preventDefault()

  render() {
    if (this.state.credentials.authorizeOk) {
      return (<Redirect to={{
        pathname: '/', 
        state: {credentials: this.state.credentials}
      }} />)
    }

    return ( 
      <div className={this.classes.root}>
        <SunAppBar title="SD60 Sunscreen" auth={this.state} location={this.props.location}/>
        <div className={this.classes.cardWrapper}>
        <div className={this.classes.formWrapper}>
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
            value={this.state.credentials.url || ""}
          />
          <FormControl style={{flex: "0 0 auto"}} onSubmit={this.handleSubmit}>
            <InputLabel htmlFor="adornment-password">Password</InputLabel>
            <Input id="adornment-password"
              type={this.state.showPassword ? 'text' : 'password'}
              value={this.state.credentials.apikey || ""}
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
            onClick={this.handleAuthorize(this.state.credentials)}
          >
            Authorize
          </Button>
        </div>
        </div>
      </div>
    )
  }
}

Authorize.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Authorize);