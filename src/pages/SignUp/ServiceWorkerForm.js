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

/* 
TODO: 
- add DOB form
*/

class SignUpServiceWorkerForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      passwordOne: "",
      passwordTwo: "",
      aboutMe: "",
      availability: [],
      firstAidCert: null,
      proofOfPoliceCheck: null
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
  };

  getList = () => {
    return this.state.availability;
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onFormSubmit = e => {
    console.log(this.state);
  };

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
            <SubmitButton onClick={this.onFormSubmit} />
          </Form.Row>
        </Form>
      </Container>
    );
  }
}
export default SignUpServiceWorkerForm;