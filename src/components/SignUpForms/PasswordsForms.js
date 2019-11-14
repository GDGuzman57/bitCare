import React, { Component } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

class PasswordsForms extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <>
        <Form.Group sm as={Col} controlId="formGridPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="passwordOne"
            value={this.props.passwordOne}
            onChange={this.props.onChange}
            type="password"
            placeholder="Password"
          />
        </Form.Group>

        <Form.Group sm as={Col} controlId="formGridPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            name="passwordTwo"
            value={this.props.passwordTwo}
            onChange={this.props.onChange}
            type="password"
            placeholder="Confirm Password"
          />
        </Form.Group>
      </>
    );
  }
}

export default PasswordsForms;
