import React, { Component } from "react";

import FullNameForm from "../../components/SignUpForms/FullNameForm";
import PhoneNumberForm from "../../components/SignUpForms/PhoneNumberForm";
import EmailForm from "../../components/SignUpForms/EmailForm";
import PasswordsForms from "../../components/SignUpForms/PasswordsForms";
import TextAreaForm from "../../components/SignUpForms/TextAreaForm";
import SubmitButton from "../../components/SubmitButton";

import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";

/*
TODO:
- add DOB form
- add a form for their condition(s)
- add a form for describing the client's medical condition
*/

class SignUpClientForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      passwordOne: "",
      passwordTwo: "",
      medicalConditions: "",
      needsDescription: "",
      specialConcerns: ""
    };
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onFormSubmit = e => {
    console.log(this.state);
  };

  render() {
    return (
      <>
        <Container className="border border-dark w-100 rounded-sm">
          <Form className="mt-3">
            <Form.Row>
              <FullNameForm
                onChange={this.onChange}
                firstName={this.state.firstName}
                lastName={this.state.lastName} />
            </Form.Row>

            <Form.Row>
              <PhoneNumberForm
                onChange={this.onChange}
                phoneNumber={this.state.phoneNumber} />
              <EmailForm onChange={this.onChange} email={this.state.email} />
              <PasswordsForms
                onChange={this.onChange}
                passwordOne={this.state.passwordOne}
                passwordTwo={this.state.passwordTwo} />
            </Form.Row>
            <hr />

            <Form.Row>
              <TextAreaForm
                onChange={this.onChange}
                label="Patient Needs"
                placeholder="Please describe the patient's needs..."
                name="needsDescription" />
            </Form.Row>

            <Form.Row>
              <TextAreaForm
                onChange={this.onChange}
                email={this.state.needsDescription}
                label="Medical Condition(s)"
                placeholder="Please provide the patient's medical conditions..."
                  name="medicalConditions" />
            </Form.Row>

            <Form.Row>
              <TextAreaForm
                onChange={this.onChange}
                email={this.state.specialConcerns}
                label="Special Concerns"
                placeholder="Please provide us a description of your concerns or the patient's..."
                name="specialConcerns" />
            </Form.Row>

            <Form.Row className="justify-content-md-center">
              <SubmitButton onClick={this.onFormSubmit} />
            </Form.Row>
          </Form>
        </Container>
      </>
    );
  }
}

export default SignUpClientForm;
