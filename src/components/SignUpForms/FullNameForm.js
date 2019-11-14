import React, { Component } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

class FullNameForm extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <>
        <Form.Group sm as={Col} controlId="formGridFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            name="firstName"
            onChange={this.props.onChange}
            value={this.props.firstName}
            type="text"
            placeholder="Your first name"
          />
        </Form.Group>

        <Form.Group sm as={Col} controlId="formGridLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            name="lastName"
            onChange={this.props.onChange}
            value={this.props.lastName}
            type="text"
            placeholder="Your last name"
          />
        </Form.Group>
      </>
    );
  }
}

export default FullNameForm;
