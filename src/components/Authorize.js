import { withStyles }       from "@material-ui/core"
import React, { Component } from 'react'
import PropTypes            from 'prop-types'
import FormControl          from '@material-ui/core/FormControl'
import InputLabel           from '@material-ui/core/InputLabel'
import Button               from '@material-ui/core/Button'
import TextField            from '@material-ui/core/TextField'
import Input                from '@material-ui/core/Input'
import FormGroup            from '@material-ui/core/FormGroup'
import FormControlLabel     from '@material-ui/core/FormControlLabel'
import InputAdornment       from '@material-ui/core/InputAdornment'
import IconButton           from '@material-ui/core/IconButton'
import Visibility           from '@material-ui/icons/Visibility'
import VisibilityOff        from '@material-ui/icons/VisibilityOff'
import Checkbox             from '@material-ui/core/Checkbox'
import SunAppBar            from './SunAppBar'

const styles = theme => ({
    button: {
    },
    textField: {
    }
});

class Authorize extends Component {
    constructor(props) {
      super(props)
      this.classes = props.classes
      this.state = {
        rememberCredentials: false
      }
      console.log("classes", this.classes)
    }

    handleChange = event => {
        // console.log("handle change", "event", event.target.value)
    }

    handleCheckboxChange = name => event => {
        this.setState({ [name]: event.target.checked })
        console.log(name, "state", this.state)
    };

    render() {
        return (
            <div style={{
                height: "100%",
                backgroundColor: "white"
            }}>
                <SunAppBar title="SD60 Sunscreen"/>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "20vh 8vw",
                    height: "100%",
                }}>
                    <div style={{marginBottom: "12px"}}>
                        Please enter the SD60 URI and password to authorize:
                    </div>
                    <TextField
                        id="hostname"
                        label="Home Assistant URL"
                        placeholder="Home Assitant URL"
                        className={this.classes.textField}
                        margin="normal"
                        style={{flex: "0 0 auto"}}
                    />
                    <FormControl style={{flex: "0 0 auto"}}>
                        <InputLabel htmlFor="adornment-password">Password</InputLabel>
                        <Input
                            id="adornment-password"
                            type={this.state.showPassword ? 'text' : 'password'}
                            value={this.state.password}
                            onChange={this.handleChange}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="Toggle password visibility"
                                        onClick={this.handleClickShowPassword}
                                        onMouseDown={this.handleMouseDownPassword}
                                    >
                                        {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <FormGroup style={{marginBottom: "12px"}}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={this.state.rememberCredentials}
                                    onChange={this.handleCheckboxChange('rememberCredentials')}
                                    value="rememberCredentials"
                                    color="primary"
                                />
                            }
                            label="remember credentials"
                        />
                    </FormGroup>
                    <Button variant="raised" className={this.classes.button} color="primary" style={{}}>
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