import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { withTheme, withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import SettingsIcon from '@material-ui/icons/Settings'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import Snackbar from '@material-ui/core/Snackbar'
import { Offline } from 'react-detect-offline'
import MenuIcon from '@material-ui/icons/Menu'

const styles = theme => ({
  drawerHeader: {
    height: "60px",
    padding: "12px",
    backgroundColor: theme.palette.primary.dark,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    background: "radial-gradient(circle, " + theme.palette.primary.main + " 50%, transparent 50%), radial-gradient(circle, " + theme.palette.primary.main + " 33%, transparent 33%) 33px 33px",
    backgroundSize: "66px 66px",
  },
  iconButton: {
    position: "relative", 
    left: "-12px"
  },
  appBarTitle: {
    position: "relative",
    left: "6px"
  }
})

class SunAppBar extends Component {
  constructor(props) {
    super(props);
    this.classes = props.classes;
    this.state = {
      networkInfoOpen: true,
      openDrawer: false,
      shouldRedirect: false
    }

    console.log("sunbarapp props:", props)
  }

  toggleDrawer = (status) => () => {
    console.log("toggle drawer", status)
    this.setState({
      openDrawer: status
    })
  }

  handleLogout = (props) => () => {
    console.log("got handle logout:", props)
    const storage = window.localStorage;
    storage.removeItem('apikey')
    storage.setItem('authorizeOk', false)
    storage.setItem('rememberCredentials', false)

    this.setState({
      shouldRedirect: this.props.location.pathname === '/auth' ? false : true,
    });
  }

  handleConfiguration = () => () => {
    console.log("got handle configuration")
  }

  render() {
    const { authorizeOk, url } = this.props.auth
    const { classes } = this.props

    if (this.state.shouldRedirect === true) {
      return (<Redirect to="/auth" />)
    }
    return (
      <div>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton 
              onClick={this.toggleDrawer(true)} 
              color="inherit" 
              aria-label="Menu"
              className={classes.iconButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.appBarTitle} variant="title" color="inherit">
                {this.props.title}
            </Typography>
          </Toolbar>
        </AppBar>
        <SwipeableDrawer 
          anchor="left" 
          open={this.state.openDrawer} 
          onClose={this.toggleDrawer(false)}
          onOpen={this.toggleDrawer(true)}
        >
          <div className={this.classes.drawerHeader}
            onClick={this.toggleDrawer(false)}
            onKeyDown={this.toggleDrawer(false)}
          >
            <Typography variant="title" style={{
              color: "white", fontWeight: "bold", textShadow: "0px 3px 10px rgba(0,0,0, 0.5)"
            }}>
              Configuration Menu
            </Typography>
          </div>
          <div
            style={{
              width: "300px",
            }}
          >
            <List component="nav">
              <ListItem button onClick={this.handleConfiguration()}>
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Configuration" />
              </ListItem>
              <ListItem button onClick={this.handleLogout(this.props)}>
                <ListItemIcon>
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary="Log out" secondary={
                  authorizeOk ? `From ${url}`: "Not Authenticated"
                } />
              </ListItem>
            </List>
          </div>
        </SwipeableDrawer>
        <Offline>
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            open={this.state.networkInfoOpen}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={
              <span id="message-id">
                No Internet connection. The app will not work
              </span>
            }
          />
        </Offline>
      </div>
    );
  };
}

SunAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withTheme()(withStyles(styles)(SunAppBar))
