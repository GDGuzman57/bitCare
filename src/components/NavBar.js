import React, { Component } from "react";

import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

//
// MATERIAL-UI REQUIREMENT #1: tweak or add values here to apply styles to a Material-UI component.
const styles = theme => ({
  root: { flexGrow: 1 },
  menuButton: { marginRight: theme.spacing(2) },
  title: { flexGrow: 1 }
});

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    //
    // MATERIAL-UI REQUIREMENT #2: Needed for accessing "styles" CB function declared above this class.
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              bitCare
            </Typography>
            <Button color="inherit" className={classes.button}>
              Login
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

//
// MATERIAL-UI REQUIREMENT #3: I don't know why this is needed.
NavBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NavBar);
