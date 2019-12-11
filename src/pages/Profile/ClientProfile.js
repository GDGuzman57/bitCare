import React, { Component } from "react";

import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

import NavBar from "../../components/NavBar";

const styles = theme => ({});

export class ClientProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patientFirstName: "",
      patientLastName: "",
      parentGuardianFirstName: "",
      parentGuardianLastName: "",
      aboutMe: "",
      email: "",
      phoneNumber: "",
      patientCondition: "",
      patientNeeds: ""
    };
  }

  async componentDidMount() {
    const user = await this.getUser();

    // Set state from matched user.
    this.setState({
      patientFirstName: user.patientFirstName,
      patientLastName: user.patientLastName,
      parentGuardianFirstName: user.parentGuardianFirstName,
      parentGuardianLastName: user.parentGuardianLastName,
      aboutMe: user.aboutMe,
      email: user.email,
      phoneNumber: user.phoneNumber,
      patientCondition: user.patientCondition,
      patientNeeds: user.patientNeeds
    });
  }

  onEditProfile = () => {
    this.props.history.push("client/edit");
  };

  getUser = async () => {
    if (this.props.model.FindOne) {
      const user = await this.props.model.FindOne(sessionStorage.getItem("id"));
      return user;
    }
  };
  render() {
    const { classes } = this.props;

    const {
      patientFirstName,
      patientLastName,
      parentGuardianFirstName,
      parentGuardianLastName,
      email,
      phoneNumber,
      patientCondition,
      patientNeeds
    } = this.state;

    return (
      <>
        <NavBar />
        <Container>
          <h1>
            {patientFirstName} {patientLastName}
          </h1>
          <Button
            onClick={this.onEditProfile}
            color="primary"
            variant="contained"
          >
            Edit
          </Button>
          <h2>Condition</h2>
          <p>{patientCondition}</p>

          <h2>Needs</h2>
          <p>{patientNeeds}</p>

          <h2>Parent/Guardian</h2>
          <p>
            {parentGuardianFirstName} {parentGuardianLastName}
          </p>

          <h2>Phone</h2>
          <p>{phoneNumber}</p>

          <h2>Email</h2>
          <p>{email}</p>
        </Container>
      </>
    );
  }
}
