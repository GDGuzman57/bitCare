import React, { Component } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

class EmailForm extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <>
        <Form.Group sm as={Col} controlId="formGridEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            name="email"
            value={this.props.email}
            onChange={this.props.onChange}
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>
      </>
    );
  }
}

export default EmailForm;
