import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Snackbar from '@material-ui/core/Snackbar'
import { Offline } from 'react-detect-offline'
import MenuIcon from '@material-ui/icons/Menu'

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class SunAppBar extends Component {
  constructor(props) {
    super(props);
    this.classes = props.classes;
    this.state = {
      networkInfoOpen: true
    }
  }

  toggleDrawer = () => () => {
    console.log("toggle drawer")
  }

  render() {
  return (
    <div className={this.classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton onClick={this.toggleDrawer()} className={this.classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="title" color="inherit" className={this.classes.flex}>
              {this.props.title}
          </Typography>
        </Toolbar>
      </AppBar>
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

export default withStyles(styles)(SunAppBar);
