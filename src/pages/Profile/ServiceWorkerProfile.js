import React, { Component } from "react";

import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";

import { TimeTable } from "../../components/TimeTable";
import Navbar from "../../components/NavBar";

const styles = theme => ({});

class ServiceWorkerProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      aboutMe: "",
      email: "",
      phoneNumber: "",
      availability: []
    };
  }

  async componentDidMount() {
    const user = await this.getUser();
    console.log(user);
    // Set state from matched user.
    this.setState({
      firstName: user.firstName,
      lastName: user.lastName,
      aboutMe: user.aboutMe,
      email: user.email,
      phoneNumber: user.phoneNumber
    });

    user.availability.forEach(block =>
      this.setState({ availability: this.state.availability.concat(block) })
    );
  }

  getUser = async () => {
    if (this.props.model.FindOne) {
      const user = await this.props.model.FindOne(sessionStorage.getItem("id"));
      return user;
    }
  };

  onEditProfile = () => {
    this.props.history.push("service_worker/edit");
  };

  onLogin = () => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (isLoggedIn === "false" || isLoggedIn === null)
      this.props.history.push("signin");
  };

  onLogout = () => {
    if (this.props.model.Logout) {
      this.props.model.Logout();
      this.props.history.replace("/signin");
    }
  };

  onProfile = () => {
    this.props.history.push("/profile");
  };

  render() {
    const { classes } = this.props;

    const {
      firstName,
      lastName,
      aboutMe,
      email,
      phoneNumber,
      availability
    } = this.state;
    return (
      <>
        <Navbar
          username={`${this.state.firstName} ${this.state.lastName} `}
          handleLogin={this.onLogin}
          handleLogout={this.onLogout}
          handleProfile={this.onProfile}
        />
        <Container>
          <h1>
            {firstName} {lastName} **checkmark img** User is certified
          </h1>
          <Button
            onClick={this.onEditProfile}
            color="primary"
            variant="contained"
          >
            Edit
          </Button>
          <h2>About Me</h2>
          <p>{aboutMe}</p>

          <h2>Email</h2>
          <p>{email}</p>

          <h2>Phone</h2>
          <p>{phoneNumber}</p>

          <h2>Availability</h2>
          <TimeTable times={availability} />
        </Container>
      </>
    );
  }
}

ServiceWorkerProfile.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

export default withStyles(styles)(ServiceWorkerProfile);
