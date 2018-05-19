import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

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
  };

  render() {
  return (
    <div className={this.classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton className={this.classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="title" color="inherit" className={this.classes.flex}>
              {this.props.title}
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};
}

SunAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SunAppBar);
