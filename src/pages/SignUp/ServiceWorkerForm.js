import React, { Component } from "react";

import AvailabilityForm from "../../components/Availability/Form";
import FullNameForm from "../../components/SignUpForms/FullNameForm";
import EmailForm from "../../components/SignUpForms/EmailForm";
import PhoneNumberForm from "../../components/SignUpForms/PhoneNumberForm";
import TextAreaForm from "../../components/SignUpForms/TextAreaForm";
import SubmitButton from "../../components/SubmitButton";

import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import PasswordsForms from "../../components/SignUpForms/PasswordsForms";

import uuid from "uuid"; // Generates a seemingly random id. Used for user sign ups.

/* 
TODO: 
- add DOB form
*/

class SignUpServiceWorkerForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: uuid(), // Generates a unique, random id for the user.
      firstName: "",
      lastName: "",
      email: "",
      isServiceWorker: true,
      phoneNumber: "",
      password: "",
      passwordConfirm: "",
      aboutMe: "",
      availability: [],
      isCertified: null
    };
  }

  //
  // CALLBACK FUNCTIONS
  //

  onAvailabilitySubmit = value => {
    let availabilityList = this.state.availability.concat(value);

    this.setState({
      availability: availabilityList // FIXME: check for duplicate time blocks.
    });

    console.log("From SignUpServiceWorkerForm: ", value);
  };

  getList = () => {
    return this.state.availability;
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onFormSubmit = e => {
    const {
      id,
      firstName,
      lastName,
      isServiceWorker,
      email,
      passwordOne,
      phoneNumber,
      aboutMe,
      availability
    } = this.state;

    //
    // The reason why I created a new object is to exclude "passwordTwo" in the
    // creation of a new user. The "passwordTwo" property is only used to confirm
    // that both "passwordOne" and "passwordTwo" are the same.
    const user = {
      id: id,
      firstName: firstName,
      lastName: lastName,
      isServiceWorker: isServiceWorker,
      email: email,
      password: passwordOne,
      phoneNumber: phoneNumber,
      aboutMe: aboutMe,
      availability: availability,
      isCertified: true
    };

    //
    // Invokes the model's CreateUser function.
    if (this.props.model.CreateUser) this.props.model.CreateUser(user);
  };

  render() {
    console.log("List from SignUpServiceWorkerForm: ", this.getList());
    console.log("render: From SignUpServiceWorkerForm");
    return (
      <Container className="border border-dark w-100 rounded-sm">
        <Form className="mt-3">
          <Form.Row>
            <FullNameForm onChange={this.onChange} />
          </Form.Row>

          <Form.Row>
            <PhoneNumberForm onChange={this.onChange} />
            <EmailForm onChange={this.onChange} />
            <PasswordsForms onChange={this.onChange} />
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
            handleSubmit={this.onAvailabilitySubmit}
            list={this.getList}
            includeTable={true}
            buttonText="Add"
          />

          <Form.Row className="justify-content-md-center">
            <SubmitButton onClick={this.onFormSubmit} text={"Register"} />
          </Form.Row>
        </Form>
      </Container>
    );
  }
}

export default SignUpServiceWorkerForm;
