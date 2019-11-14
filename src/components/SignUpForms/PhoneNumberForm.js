import React, { Component } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

class PhoneNumberForm extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <>
        <Form.Group sm as={Col} controlId="formGridPhoneNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            name="phoneNumber"
            value={this.props.phoneNumber}
            onChange={this.props.onChange}
            type="tel"
            placeholder="Phone number"
          />
        </Form.Group>
      </>
    );
  }
}

export default PhoneNumberForm;
