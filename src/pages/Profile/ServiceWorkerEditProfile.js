import React, { Component } from "react";

import "../../editPageStyle.css";

import uuid from "uuid";

import AvailabilityForm from "../../components/Availability/Form";
import FullNameForm from "../../components/SignUpForms/FullNameForm";
import EmailForm from "../../components/SignUpForms/EmailForm";
import PhoneNumberForm from "../../components/SignUpForms/PhoneNumberForm";
import TextAreaForm from "../../components/SignUpForms/TextAreaForm";

import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

import { NavLink } from "react-router-dom";

class ServiceWorkerEditProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      aboutMe: "",
      availability: []
    };
  }

  updateUser = async () => {
    let user, userId;
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      aboutMe,
      availability
    } = this.state;

    if (this.props.model.FindOne) {
      userId = sessionStorage.getItem("id");
      user = JSON.parse(JSON.stringify(await this.props.model.FindOne(userId)));

      user.firstName = firstName;
      user.lastName = lastName;
      user.email = email;
      user.phoneNumber = phoneNumber;
      user.aboutMe = aboutMe;
      user.availability = availability;

      if (this.props.model.UpdateUser) {
        if (await this.props.model.UpdateUser(user))
          this.props.history.push("/profile/");

        return true;
      }
    }
  };

  //
  // Adds to the worker's list of availabilities.
  onAddRow = value => {
    const timeBlock = {
      blockId: uuid(),
      day: value[0]["day"],
      start: value[0]["start"],
      end: value[0]["end"]
    };

    let availabilityList = this.state.availability.concat(timeBlock);

    this.setState({
      availability: availabilityList // FIXME: check for duplicate time blocks.
    });

    console.log("From ServiceWorkerEditProfile: ", timeBlock);
  };

  onDeleteRow = value => {
    //
    // Creates a new array from the current array and filters out any
    // objects from the current array that DO NOT contain the same value
    // that is same as "value". For example: if an object in "availability"
    // has an id of 2, and what came back from "value" is also 2, then objects with
    // an id of 1 and 3 are included in the new array.
    const filteredArray = this.state.availability.filter(
      block => block.blockId !== value
    );

    this.setState({
      availability: filteredArray
    });
  };

  async componentDidMount() {
    const user = await this.getUser();

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

  //
  // Invokes the model's FindOne function which returns a user object whose
  // id matches to one that was stored in the session storage.
  getUser = async () => {
    if (this.props.model.FindOne) {
      const user = await this.props.model.FindOne(sessionStorage.getItem("id"));
      return user;
    }
  };

  //
  // Handles any changes made to the input fields.
  onChange = e => {
    if (!this.props.model.ExpressionIsNotSafe(e.target.value))
      this.setState({ [e.target.name]: e.target.value });
  }

  //
  // Used to pass down to the AvailabilityForm component to render the rows
  // for each of the worker's availability blocks.
  getList = () => this.state.availability;

  render() {
    return (
      <Container className="border border-dark w-100 rounded-sm">
        <Form className="mt-3">
          <Form.Row>
            <FullNameForm onChange={this.onChange} />
          </Form.Row>

          <Form.Row>
            <PhoneNumberForm onChange={this.onChange} />
            <EmailForm onChange={this.onChange} />
          </Form.Row>

          <Form.Row>
            <TextAreaForm
              onChange={this.onChange}
              label={"About me"}
              placeholder={"Tell us about yourself..."}
              name="aboutMe"
            />
          </Form.Row>

          <AvailabilityForm
            handleSubmit={this.onAddRow}
            handleDelete={this.onDeleteRow}
            list={this.getList}
            includeTable={true}
            buttonText="Add"
          />

          <Form.Row className="justify-content-md-center">
            <Button onClick={this.updateUser} className="mb-2 mt-3">
              <NavLink
                to="/signup/service_worker-profile"
                className="profileSaveButton"
              >
                Save
              </NavLink>
            </Button>
          </Form.Row>
        </Form>
      </Container>
    );
  }
}

export { ServiceWorkerEditProfile };
